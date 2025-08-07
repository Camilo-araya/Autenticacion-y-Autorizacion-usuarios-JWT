const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registrarUsuario, buscarUsuarioPorEmail } = require('../models/usuariosModel');
require('dotenv').config();

const registrarUsuarioController = async (req, res) => {
  try {
    const { email, password, rol, lenguage } = req.body;
    const passwordEncriptada = await bcrypt.hash(password, 10);
    const nuevoUsuario = await registrarUsuario(email, passwordEncriptada, rol, lenguage);
    res.status(201).json({ message: 'Usuario registrado con éxito', usuario: nuevoUsuario });
  } catch (error) {
    console.error('Error en el controlador de registro:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await buscarUsuarioPorEmail(email);

    if (!usuario) {
      return res.status(400).json({ error: 'Credenciales inválidas.' });
    }

    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(400).json({ error: 'Credenciales inválidas.' });
    }

    const token = jwt.sign({ email: usuario.email }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error en el controlador de login:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

const obtenerUsuarioController = async (req, res) => {
  try {
    const { email } = req;
    const usuario = await buscarUsuarioPorEmail(email);
    const { password, ...usuarioSinPassword } = usuario;
    res.status(200).json(usuarioSinPassword);
  } catch (error) {
    console.error('Error en el controlador de obtener usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

module.exports = {
  registrarUsuarioController,
  loginController,
  obtenerUsuarioController
};