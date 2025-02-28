const pool = require('../config/db');

const createTables = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        senha VARCHAR(255) NOT NULL,
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Tabela 'usuarios' criada com sucesso!");
  } catch (err) {
    console.error("❌ Erro ao criar tabela 'usuarios':", err);
  } finally {
    client.release();
  }
};

createTables();
