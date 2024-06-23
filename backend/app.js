const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');

dotenv.config();

// Importar rutas
const autorRoutes = require('./routes/autor');

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB
const connectDB = require('./config/connection');
connectDB();

// Rutas
app.use('/api/autor', autorRoutes);
// app.use('/api/libros', require('./routes/libros')); // Descomenta y añade más rutas según sea necesario

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
