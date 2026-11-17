const express = require('express');
const cors = require('cors');
const path = require('path');

const alertaRoutes = require('./routes/alertaRoutes');
const chatbotRoutes = require('./routes/chatbotRoutes');
const expedienteRoutes = require('./routes/expedienteRoutes');
const adopcionRoutes = require('./routes/adopcionRoutes');
const zoonosisRoutes = require('./routes/zoonosisRoutes');

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Servir la carpeta estática con la web HTML/CSS
app.use(express.static(path.join(__dirname, '../public')));

// Endpoints API REST
app.use('/api/alertas', alertaRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/expedientes', expedienteRoutes);
app.use('/api/adopciones', adopcionRoutes);
app.use('/api/zoonosis', zoonosisRoutes);

module.exports = app;