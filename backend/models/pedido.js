const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  libros: [{
    libro: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Libro',
      required: true
    },
    cantidad: {
      type: Number,
      required: true,
      min: 1
    },
    precio: {
      type: Number,
      required: true
    }
  }],
  total: {
    type: Number,
    required: true
  },
  estado: {
    type: String,
    enum: ['En carrito', 'Checkout', 'Completado', 'Cancelado'],
    default: 'En carrito'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Pedido', pedidoSchema);