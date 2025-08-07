const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const registrarUsuario = async (email, password, rol, lenguage) => {
  try {
    const query = 'INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [email, password, rol, lenguage];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    throw error;
  }
};

const buscarUsuarioPorEmail = async (email) => {
  try {
    const query = 'SELECT * FROM usuarios WHERE email = $1';
    const values = [email];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error al buscar el usuario:', error);
    throw error;
  }
};

module.exports = {
  registrarUsuario,
  buscarUsuarioPorEmail
};