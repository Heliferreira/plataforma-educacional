const pool = require('../config/db'); // <-- IMPORTAÇÃO DA CONEXÃO
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const autenticarUsuario = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ erro: 'E-mail e senha são obrigatórios!' });
    }

    try {  
        const usuario = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);

        if (usuario.rows.length === 0) {
            return res.status(401).json({ erro: 'Usuário ou senha inválidos!' });
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.rows[0].senha);
        if (!senhaCorreta) {
            return res.status(401).json({ erro: 'Usuário ou senha inválidos!' });
        }
        console.log('🔍 Testando JWT:');
        console.log('📢 Chave secreta carregada:', process.env.JWT_SECRET);
        console.log('📢 Dados do usuário:', usuario.rows[0]); // Verifica se o usuário existe antes de gerar o token

        const token = jwt.sign({ id: usuario.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('🔑 Token gerado:', token);

        res.json({ mensagem: 'Login realizado com sucesso!', token });
    } catch (erro) {
        console.error('Erro ao realizar login:', erro);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
};

const buscarPerfil = async (req, res) => {
    try {
        console.log("📢 ID extraído do token:", req.usuarioId); // <-- VERIFICA SE O ID ESTÁ SENDO EXTRAÍDO

        const usuario = await pool.query('SELECT id, nome, email FROM usuarios WHERE id = $1', [req.usuarioId]);

        if (usuario.rows.length === 0) {
            return res.status(404).json({ erro: 'Usuário não encontrado!' });
        }

        res.json(usuario.rows[0]);
    } catch (erro) {
        console.error('Erro ao buscar perfil do usuário:', erro);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
};

module.exports = { autenticarUsuario, buscarPerfil };
