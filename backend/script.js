const mongoose = require('mongoose');
const Usuario = require('./models/usuario'); // Importa el modelo de Usuario

// Conectar a la base de datos
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/BookStore');
    console.log('MongoDB connected successfully');


    // Verificar si ya existe un administrador
    const adminExistente = await Usuario.findOne({ rol: 'Administrador' });
    if (adminExistente) {
      console.log('Ya existe un usuario administrador.');
      return;
    }

    // Crear un nuevo usuario administrador
    const nuevoAdmin = new Usuario({
      nombre: 'Admin',
      apellido: 'User',
      edad: 30,
      correoElectronico: 'admin@example.com',
      contrasena: 'adminpassword', // Asegúrate de cambiar esto por una contraseña segura
      rol: 'Administrador'
    });
    await nuevoAdmin.save();
    console.log('Usuario administrador creado exitosamente.');

  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  } finally {
    mongoose.connection.close();
  }
};

// Importar modelos para asegurarse de que están registrados en Mongoose
require('./models/autor');
require('./models/libro');
require('./models/usuario');
require('./models/pedido');
require('./models/compra');

// Mensaje de éxito
connectDB().then(() => {
  console.log("Modelos cargados y base de datos conectada exitosamente.");
});
