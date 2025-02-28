const { Pool } = require('pg');

// Configuração do banco de dados
const pool = new Pool({
  user: 'postgres',           // Seu usuário do PostgreSQL
  host: 'localhost',          // O banco está rodando localmente
  database: 'plataforma_cursos', // Nome do banco de dados que criamos
  password: '5432', // Senha do PostgreSQL (a que você configurou na instalação)
  port: 5432,                 // Porta padrão do PostgreSQL
});

// Teste de conexão
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Erro ao conectar ao banco:', err.stack);
  }
  console.log('Conectado ao PostgreSQL com sucesso!');
  release();
});

module.exports = pool;
