// script.js

const mongoose = require('mongoose');

// Conectar a la base de datos
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/BookStore');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Importar modelos para asegurarse de que están registrados en Mongoose
require('./models/autor');
require('./models/libro');
require('./models/usuario');
require('./models/pedido');

// Mensaje de éxito
connectDB().then(() => {
    console.log("Modelos cargados y base de datos conectada exitosamente.");
});
