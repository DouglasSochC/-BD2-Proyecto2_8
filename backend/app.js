const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');

dotenv.config();

// Importar rutas
const autorRoutes = require('./routes/autor');
const usuarioRoutes = require('./routes/usuario');
const libroRoutes = require('./routes/libro');

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conexión a MongoDB
const connectDB = require('./config/connection');
connectDB();

// Rutas
app.use('/api/autor', autorRoutes);
app.use('/api/libro', libroRoutes);
app.use('/api/usuario', usuarioRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Algo salió mal!'
  });
});

// Exportar la app
module.exports = app;
