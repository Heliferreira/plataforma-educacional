require('dotenv').config();
console.log('✅ Variáveis de ambiente carregadas:', process.env);

const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || process.env.URL_DO_BANCO_DE_DADOS;

// Configuração correta do SSL
const sslConfig = connectionString.includes("railway.app") ? { rejectUnauthorized: false } : false;

const pool = new Pool({
    connectionString,
    ssl: sslConfig
});

pool.connect()
    .then(() => console.log('✅ Conectado ao PostgreSQL com sucesso!'))
    .catch(err => console.error('❌ Erro ao conectar ao PostgreSQL:', err));

module.exports = pool;
