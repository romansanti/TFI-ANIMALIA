const express = require('express');
const router = express.Router();
const zoonosisController = require('../controllers/zoonosisController');

router.get('/puntos', zoonosisController.obtenerPuntosZoonosis);

module.exports = router;