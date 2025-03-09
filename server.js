require('dotenv').config();
console.log('DATABASE_URL:', process.env.DATABASE_URL);
console.log('JWT_SECRET:', process.env.JWT_SECRET);

const express = require('express');
const app = express();
const usuariosRoutes = require('./src/routes/usuariosRoutes');

app.use(express.json()); // ATENÇÃO: Isso permite receber JSON no POST
app.use('/api', usuariosRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

