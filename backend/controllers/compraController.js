const Compra = require('../models/compra');
const Pedido = require('../models/pedido');
const Libro = require('../models/libro');

class CompraController {
  // Crear una nueva compra
  async crearCompra(req, res) {
    try {
      const { pedidoId, direccionEnvio, metodoPago } = req.body;

      const pedido = await Pedido.findById(pedidoId);
      if (!pedido || pedido.estado !== 'Checkout') {
        return res.status(400).json({ status: 'fail', message: 'Pedido no válido para compra' });
      }

      // Verificar stock y actualizar
      for (let item of pedido.libros) {
        const libro = await Libro.findById(item.libro);
        if (libro.stock < item.cantidad) {
          return res.status(400).json({ status: 'fail', message: `Stock insuficiente para el libro ${libro.titulo}` });
        }
        await Libro.findByIdAndUpdate(item.libro, { $inc: { stock: -item.cantidad } });
      }

      const nuevaCompra = await Compra.create({
        pedido: pedidoId,
        usuario: pedido.usuario,
        total: pedido.total,
        estado: 'En proceso',
        direccionEnvio,
        metodoPago
      });

      pedido.estado = 'Completado';
      await pedido.save();

      res.status(201).json({
        status: 'success',
        data: { compra: nuevaCompra }
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: error.message
      });
    }
  }

  // Confirmar envío (para administradores)
  async confirmarEnvio(req, res) {
    try {
      const { compraId } = req.params;

      const compra = await Compra.findByIdAndUpdate(compraId,
        { estado: 'Enviado' },
        { new: true }
      );

      if (!compra) {
        return res.status(404).json({ status: 'fail', message: 'Compra no encontrada' });
      }

      res.status(200).json({
        status: 'success',
        data: { compra }
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: error.message
      });
    }
  }

  // Confirmar entrega (para usuarios)
  async confirmarEntrega(req, res) {
    try {
      const { compraId } = req.params;

      const compra = await Compra.findByIdAndUpdate(compraId,
        { estado: 'Entregado', entregaConfirmada: true },
        { new: true }
      );

      if (!compra) {
        return res.status(404).json({ status: 'fail', message: 'Compra no encontrada' });
      }

      res.status(200).json({
        status: 'success',
        data: { compra }
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: error.message
      });
    }
  }

  // Obtener compra por ID
  async obtenerCompra(req, res) {
    try {
      const { compraId } = req.params;

      const compra = await Compra.findById(compraId).populate('pedido');
      if (!compra) {
        return res.status(404).json({ status: 'fail', message: 'Compra no encontrada' });
      }

      res.status(200).json({
        status: 'success',
        data: { compra }
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