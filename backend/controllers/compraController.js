const Compra = require('../models/compra');
const Pedido = require('../models/pedido');
const Libro = require('../models/libro');

class CompraController {
  // Crear una nueva compra
  async crearCompra(req, res) {
    try {
      const { pedidoId, direccionEnvio, metodoPago } = req.body;

      // Verificar que el pedido existe y está pendiente
      const pedido = await Pedido.findById(pedidoId);
      if (!pedido || pedido.estado !== 'Pendiente') {
        return res.status(400).json({ status: 'fail', message: 'Pedido no válido' });
      }

      // Verificar stock y actualizar
      for (let item of pedido.libros) {
        const libro = await Libro.findById(item.libro);
        if (libro.stock < item.cantidad) {
          return res.status(400).json({ status: 'fail', message: `Stock insuficiente para el libro ${libro.titulo}` });
        }
        await Libro.findByIdAndUpdate(item.libro, { $inc: { stock: -item.cantidad } });
      }

      // Crear la compra
      const nuevaCompra = await Compra.create({
        pedido: pedidoId,
        usuario: pedido.usuario,
        total: pedido.total,
        direccionEnvio,
        metodoPago
      });

      // Actualizar el estado del pedido
      await Pedido.findByIdAndUpdate(pedidoId, { estado: 'Completado' });

      res.status(201).json({
        status: 'success',
        data: {
          compra: nuevaCompra
        }
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: error.message
      });
    }
  }

  // Obtener todas las compras (para administradores)
  async obtenerCompras(req, res) {
    try {
      const compras = await Compra.find().populate('usuario', 'nombre').populate('pedido');
      res.status(200).json({
        status: 'success',
        results: compras.length,
        data: {
          compras
        }
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: error.message
      });
    }
  }

  // Obtener compras de un usuario
  async obtenerComprasUsuario(req, res) {
    try {
      const compras = await Compra.find({ usuario: req.params.userId }).populate('pedido');
      res.status(200).json({
        status: 'success',
        results: compras.length,
        data: {
          compras
        }
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: error.message
      });
    }
  }

  // Actualizar estado de la compra
  async actualizarEstadoCompra(req, res) {
    try {
      const { estado } = req.body;
      const compra = await Compra.findByIdAndUpdate(req.params.id, { estado }, { new: true });
      if (!compra) {
        return res.status(404).json({
          status: 'fail',
          message: 'Compra no encontrada'
        });
      }
      res.status(200).json({
        status: 'success',
        data: {
          compra
        }
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: error.message
      });
    }
  }
}

module.exports = new CompraController();