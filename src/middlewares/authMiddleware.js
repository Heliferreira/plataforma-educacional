const jwt = require('jsonwebtoken');

const autenticarUsuarioMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ erro: 'Token não fornecido!' });
    }

    const token = authHeader.split(' ')[1]; // Pega apenas o token sem o "Bearer"
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('✅ ID extraído do token:', decoded.id); // Verificar se o ID está sendo extraído
        req.usuarioId = decoded.id; // Salva o ID do usuário na requisição para uso futuro
        next();
    } catch (erro) {
        console.error('❌ Erro ao verificar token:', erro);
        return res.status(401).json({ erro: 'Token inválido!' });
    }
};

module.exports = autenticarUsuarioMiddleware;
