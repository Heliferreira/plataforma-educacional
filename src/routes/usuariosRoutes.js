const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const router = express.Router();

// 🔹 Rota GET: Listar todos os usuários
router.get('/usuarios', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT id, nome, email FROM usuarios');
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro ao buscar usuários!" });
    }
});

// 🔹 Rota POST: Cadastrar um novo usuário
router.post('/usuarios', async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        // Verifica se o e-mail já existe
        const usuarioExistente = await pool.query(
            'SELECT id FROM usuarios WHERE email = $1', [email]
        );
        console.log(usuarioExistente.rows);
        if (usuarioExistente.rows.length > 0) {
            return res.status(400).json({ mensagem: "Este e-mail já está em uso!" });
        }

        // Criptografa a senha antes de salvar
        const senhaCriptografada = await bcrypt.hash(senha, 10);

        // Insere o novo usuário
        const resultado = await pool.query(
            'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email',
            [nome, email, senhaCriptografada] // Alterado para senhaCriptografada
        );

        res.status(201).json(resultado.rows[0]); // Retorna o usuário cadastrado
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro ao cadastrar usuário!" });
    }
});

// 🔹 Rota PUT: Atualizar um usuário
router.put('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ mensagem: "Preencha todos os campos!" });
        }

        // Hash da nova senha
        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const resultado = await pool.query(
            'UPDATE usuarios SET nome = $1, email = $2, senha = $3 WHERE id = $4 RETURNING *',
            [nome, email, senhaCriptografada, id]
        );
        
        if (resultado.rowCount === 0) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado!' });
        }
        
        res.status(200).json({ mensagem: 'Usuário atualizado com sucesso!', usuario: resultado.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro ao atualizar usuário!" });
    }
});

// 🔹 Rota POST: Login de usuário (gera um token JWT)
router.post('/login', async (req, res) => {
    console.log(req.body);

    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ mensagem: "Preencha todos os campos!" });
        }

        const { rows } = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);

        if (rows.length === 0) {
            return res.status(404).json({ mensagem: "Usuário não encontrado!" });
        }

        const usuario = rows[0];

        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            return res.status(401).json({ mensagem: "Senha incorreta!" });
        }

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email }, 
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ mensagem: "Login realizado com sucesso!", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro ao fazer login!" });
    }
});

module.exports = router;
