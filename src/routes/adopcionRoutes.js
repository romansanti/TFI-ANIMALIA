const express = require('express');
const router = express.Router();
const adopcionController = require('../controllers/adopcionController');

router.get('/catalogo', adopcionController.obtenerCatalogoAdopcion);

module.exports = router;