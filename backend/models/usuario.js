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
  direccionEnvio: String,
  metodoPago: String
}, {
  timestamps: true
});

usuarioSchema.pre('save', async function(next) {
  if (!this.isModified('contrasena')) return next();
  this.contrasena = await bcrypt.hash(this.contrasena, 12);
  next();
});

usuarioSchema.methods.compararContrasena = async function(contrasenaCandidata, contrasenaUsuario) {
  return await bcrypt.compare(contrasenaCandidata, contrasenaUsuario);
};

module.exports = mongoose.model('Usuario', usuarioSchema);