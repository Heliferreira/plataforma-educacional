
const pool = require('../config/db');

const criarTabelaUsuarios = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id SERIAL PRIMARY KEY,
                nome VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                senha VARCHAR(255) NOT NULL
            );
        `);
        console.log("✅ Tabela 'usuarios' criada com sucesso!");
    } catch (erro) {
        console.error("❌ Erro ao criar a tabela:", erro);
    } finally {
        pool.end();
    }
};

criarTabelaUsuarios();
