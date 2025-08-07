const express = require('express');
const router = express.Router();
const { registrarUsuarioController, loginController, obtenerUsuarioController } = require('../controllers/usuariosController');
const reportMiddleware = require('../middlewares/reportMiddleware');
const validarCredencialesMiddleware = require('../middlewares/validarCredencialesMiddleware');
const validarTokenMiddleware = require('../middlewares/validarTokenMiddleware');

router.use(reportMiddleware);

router.post('/usuarios', registrarUsuarioController);
router.post('/login', validarCredencialesMiddleware, loginController);
router.get('/usuarios', validarTokenMiddleware, obtenerUsuarioController);

module.exports = router;