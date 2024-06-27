const mongoose = require('mongoose');

const libroSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'El título del libro es requerido'],
    trim: true
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Autor',
    required: [true, 'El autor del libro es requerido']
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción del libro es requerida']
  },
  genero: {
    type: String,
    required: [true, 'El género del libro es requerido']
  },
  fechaPublicacion: {
    type: Date,
    required: [true, 'La fecha de publicación es requerida']
  },
  disponibilidad: {
    type: Boolean,
    default: true
  },
  cantidadDisponible: {
    type: Number,
    required: [true, 'La cantidad disponible es requerida'],
    min: 0
  },
  precio: {
    type: Number,
    required: [true, 'El precio del libro es requerido'],
    min: 0
  },
  imagen: {
    type: String,
    required: [true, 'La URL de la imagen del libro es requerida']
  },
  puntuacionMedia: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  resenas: [{
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario'
    },
    usuarioNombre: {
      type: String,
      required: true,
      trim: true
    },
    puntuacion: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comentario: String,
    fecha: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

libroSchema.index({ titulo: 1, autor: 1 });

module.exports = mongoose.model('Libro', libroSchema);
