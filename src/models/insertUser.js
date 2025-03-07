const pool = require('../config/db');
const bcrypt = require('bcrypt');

const inserirUsuario = async () => {
    try {
        const email = 'joao@email.com';
        const nome = 'João Silva';
        const senhaCriptografada = await bcrypt.hash('123456', 10);

        // Verificar se o e-mail já existe no banco
        const usuarioExiste = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);

        if (usuarioExiste.rows.length > 0) {
            console.log('⚠️ Usuário já existe no banco de dados!');
            return;
        }

        // Se não existir, cadastra
        const resultado = await pool.query(
            `INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *`,
            [nome, email, senhaCriptografada]
        );

        console.log('✅ Usuário cadastrado com sucesso!', resultado.rows[0]);
    } catch (erro) {
        console.error('❌ Erro ao cadastrar usuário:', erro);
    } finally {
        pool.end();
    }
};

inserirUsuario();
