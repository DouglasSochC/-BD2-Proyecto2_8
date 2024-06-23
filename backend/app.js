const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB (asumiendo que tienes un archivo de configuración)
const connectDB = require('./config/connection');
connectDB();

// Rutas (las importarías aquí)
// app.use('/api/autores', require('./routes/autores'));
// app.use('/api/libros', require('./routes/libros'));
// ...

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

module.exports = app;