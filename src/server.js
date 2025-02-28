require('dotenv').config(); // Carregar variáveis de ambiente

const express = require('express');
const usuariosRoutes = require('./routes/usuariosRoutes');

const app = express();

app.use(express.json()); // Permitir JSON no body das requisições
app.use('/usuarios', usuariosRoutes); // Definir as rotas de usuário

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`✅ Servidor rodando na porta ${PORT}`);
    console.log(`🔑 Chave secreta carregada: ${process.env.JWT_SECRET}`);
});
