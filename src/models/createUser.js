const pool = require('../config/db');
const bcrypt = require('bcrypt');

const criarUsuario = async () => {
    const nome = "João Silva";
    const email = "joao@email.com";
    const senha = "123456";
    const senhaHash = await bcrypt.hash(senha, 10);

    try {
        await pool.query(
            'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)',
            [nome, email, senhaHash]
        );
        console.log("✅ Usuário criado com sucesso!");
    } catch (erro) {
        console.error("❌ Erro ao criar usuário:", erro);
    } finally {
        pool.end();
    }
};

criarUsuario();
