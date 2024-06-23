const mongoose = require('mongoose');

const compraSchema = new mongoose.Schema({
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
    enum: ['En proceso', 'Enviado', 'Entregado'],
    default: 'En proceso'
  },
  direccionEnvio: {
    type: String,
    required: true
  },
  metodoPago: {
    type: String,
    required: true
  },
  fechaCompra: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Compra', compraSchema);