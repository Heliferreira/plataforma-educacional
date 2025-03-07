const pool = require('../config/db');

const listarUsuarios = async () => {
    try {
        const resultado = await pool.query('SELECT * FROM usuarios');
        console.log("📜 Usuários cadastrados:", resultado.rows);
    } catch (erro) {
        console.error("❌ Erro ao listar usuários:", erro);
    } finally {
        pool.end();
    }
};

listarUsuarios();
