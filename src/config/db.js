require('dotenv').config();
console.log('✅ Variáveis de ambiente carregadas:', process.env);

const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || process.env.URL_DO_BANCO_DE_DADOS, // Usa a variável correta
    ssl: (process.env.DATABASE_URL || process.env.URL_DO_BANCO_DE_DADOS).includes("railway.app") 
        ? { rejectUnauthorized: false } 
        : false,
});

pool.connect()
    .then(() => console.log('✅ Conectado ao PostgreSQL com sucesso!'))
    .catch(err => console.error('❌ Erro ao conectar ao PostgreSQL:', err));

module.exports = pool;
