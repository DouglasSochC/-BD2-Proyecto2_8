const mongoose = require('mongoose');

const autorSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del autor es requerido'],
    trim: true
  },
  biografia: {
    type: String,
    required: [true, 'La biografía del autor es requerida'],
    trim: true
  },
  foto: {
    type: String,
    required: [true, 'La URL de la foto del autor es requerida']
  },
  libros: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Libro'
  }]
}, {
  timestamps: true,
  collection: 'autores' // Especificar el nombre de la colección
});

autorSchema.index({ nombre: 1 });

module.exports = mongoose.model('Autor', autorSchema);
