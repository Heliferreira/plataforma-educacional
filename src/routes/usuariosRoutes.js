const express = require('express');
const { autenticarUsuario, buscarPerfil } = require('../controllers/usuariosController');
const autenticarUsuarioMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/login', autenticarUsuario);
router.get('/perfil', autenticarUsuarioMiddleware, buscarPerfil);

module.exports = router;
