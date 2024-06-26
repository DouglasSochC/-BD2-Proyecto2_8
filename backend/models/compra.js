const mongoose = require('mongoose');

const compraSchema = new mongoose.Schema({
  pedido: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pedido',
    required: true
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
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
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Compra', compraSchema);