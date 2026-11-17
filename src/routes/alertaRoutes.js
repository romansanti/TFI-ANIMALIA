const express = require('express');
const router = express.Router();
const alertaController = require('../controllers/alertaController');

router.post('/', alertaController.crearAlerta);
router.get('/', alertaController.obtenerAlertas);
router.put('/:id/estado', alertaController.cambiarEstadoAlerta);

module.exports = router;