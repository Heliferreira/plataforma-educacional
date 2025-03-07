const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.URL_DO_BANCO_DE_DADOS,

    ssl: {
        rejectUnauthorized: false, // Necessário para conexões seguras
    }
});

pool.connect()
    .then(() => console.log('✅ Conectado ao PostgreSQL com sucesso!'))
    .catch(err => console.error('❌ Erro ao conectar ao PostgreSQL:', err));

module.exports = pool;
