const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true
  },
  apellido: {
    type: String,
    required: [true, 'El apellido es requerido'],
    trim: true
  },
  edad: {
    type: Number,
    required: [true, 'La edad es requerida'],
    min: 0
  },
  correoElectronico: {
    type: String,
    required: [true, 'El correo electrónico es requerido'],
    unique: true,
    lowercase: true,
    trim: true
  },
  contrasena: {
    type: String,
    required: [true, 'La contraseña es requerida'],
    minlength: 6,
    select: false
  },
  rol: {
    type: String,
    enum: ['Administrador', 'Cliente'],
    default: 'Cliente'
  },
  fotoPerfil: {
    type: String,
    default: ''  // URL de la imagen por defecto o vacío
  },
  compras: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Compra'
  }],
  direccionEnvio: String,
  metodoPago: String,
  saldo: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true
});

// Método para comparar contraseñas
usuarioSchema.methods.compararContrasena = async function (candidatePassword, userPassword) {
  console.log('Contraseña candidata:', candidatePassword);
  console.log('Contraseña usuario:', userPassword);
  return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model('Usuario', usuarioSchema);
