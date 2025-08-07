const jwt = require('jsonwebtoken');
require('dotenv').config();

const validarTokenMiddleware = (req, res, next) => {
  try {
    const token = req.header('Authorization').split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado.' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.email = decoded.email;
    next();
  } catch (error) {
    console.error('Error al validar el token:', error);
    res.status(401).json({ error: 'Token inválido o expirado.' });
  }
};

module.exports = validarTokenMiddleware;