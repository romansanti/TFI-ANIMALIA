const express = require('express');
const router = express.Router();
const chatbotController = require('../controllers/chatbotController');

router.post('/consultar', chatbotController.consultarChatbot);

module.exports = router;