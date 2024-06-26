const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
// swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

dotenv.config();

// Importar rutas
const autorRoutes = require('./routes/autor');
const usuarioRoutes = require('./routes/usuario');
const libroRoutes = require('./routes/libro');
const compraRoutes = require('./routes/compra');
const reporteRoutes = require('./routes/reporte');

const swaggerSpec /*options */= {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bookstore API',
      version: '1.0.0',
      description: 'Una API para una librería online',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Servidor de desarrollo',
      },
    ],
  },
  apis: [`${path.join(__dirname, './routes/*.js')}`],
};



const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerSpec)));

// Conexión a MongoDB
const connectDB = require('./config/connection');
connectDB();

// Rutas
app.use('/api/autor', autorRoutes);
app.use('/api/libro', libroRoutes);
app.use('/api/usuario', usuarioRoutes);
app.use('/api/compra', compraRoutes);
app.use('/api/reporte', reporteRoutes);

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
