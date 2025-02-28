const jwt = require('jsonwebtoken');

const autenticarUsuarioMiddleware = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ erro: 'Acesso negado! Nenhum token fornecido.' });
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.usuarioId = decoded.id;
        next();
    } catch (erro) {
        res.status(401).json({ erro: 'Token inválido!' });
    }
};

module.exports = autenticarUsuarioMiddleware;
