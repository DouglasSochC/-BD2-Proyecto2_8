const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: [true, 'El usuario del pedido es requerido']
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
    required: [true, 'La dirección de envío es requerida']
  },
  metodoPago: {
    type: String,
    required: [true, 'El método de pago es requerido']
  },
  fechaPedido: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Pedido', pedidoSchema);