const jwt = require('jsonwebtoken');

// Middleware para autenticar o usuário via token JWT
const autenticarUsuarioMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // Verifica se o cabeçalho 'authorization' existe
    if (!authHeader) {
        return res.status(401).json({ erro: 'Token não fornecido!' });
    }

    // Verifica se o formato do token é "Bearer <token>"
    if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ erro: 'Token inválido, formato deve ser Bearer <token>!' });
    }

    // Extraí o token do cabeçalho
    const token = authHeader.split(' ')[1]; // Pega apenas a parte do token após 'Bearer'

    try {
        // Verifica e decodifica o token usando a chave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Salva o ID do usuário na requisição
        req.usuarioId = decoded.id;

        // Passa o controle para a próxima função de middleware ou rota
        next();
    } catch (erro) {
        // Em caso de erro (token inválido ou expirado)
        console.error('❌ Erro ao verificar token:', erro);
        return res.status(401).json({ erro: 'Token inválido ou expirado!' });
    }
};

module.exports = autenticarUsuarioMiddleware;
