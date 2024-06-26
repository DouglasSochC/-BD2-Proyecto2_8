const Pedido = require('../models/pedido');
const Libro = require('../models/libro');
const Usuario = require('../models/usuario');

class PedidoController {
  // Crear un nuevo pedido
  async crearPedido(req, res) {
    try {
      const { usuario, libros, direccionEnvio, metodoPago } = req.body;

      // Verificar que el usuario existe
      const usuarioExiste = await Usuario.findById(usuario);
      if (!usuarioExiste) {
        return res.status(400).json({ status: 'fail', message: 'Usuario no encontrado' });
      }

      // Calcular el total y verificar stock
      let total = 0;
      for (let item of libros) {
        const libro = await Libro.findById(item.libro);
        if (!libro) {
          return res.status(400).json({ status: 'fail', message: `Libro con id ${item.libro} no encontrado` });
        }
        if (libro.stock < item.cantidad) {
          return res.status(400).json({ status: 'fail', message: `Stock insuficiente para el libro ${libro.titulo}` });
        }
        item.precio = libro.precio;
        total += item.precio * item.cantidad;

        // Actualizar stock
        await Libro.findByIdAndUpdate(item.libro, { $inc: { stock: -item.cantidad } });
      }

      const nuevoPedido = await Pedido.create({
        usuario,
        libros,
        total,
        direccionEnvio,
        metodoPago
      });

      res.status(201).json({
        status: 'success',
        data: {
          pedido: nuevoPedido
        }
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: error.message
      });
    }
  }

  // Obtener todos los pedidos (para administradores)
  async obtenerPedidos(req, res) {
    try {
      const pedidos = await Pedido.find().populate('usuario', 'nombre').populate('libros.libro', 'titulo');
      res.status(200).json({
        status: 'success',
        results: pedidos.length,
        data: {
          pedidos
        }
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: error.message
      });
    }
  }

  // Obtener pedidos de un usuario
  async obtenerPedidosUsuario(req, res) {
    try {
      const pedidos = await Pedido.find({ usuario: req.params.userId }).populate('libros.libro', 'titulo');
      res.status(200).json({
        status: 'success',
        results: pedidos.length,
        data: {
          pedidos
        }
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: error.message
      });
    }
  }

  // Actualizar estado del pedido
  async actualizarEstadoPedido(req, res) {
    try {
      const { estado } = req.body;
      const pedido = await Pedido.findByIdAndUpdate(req.params.id, { estado }, { new: true });
      if (!pedido) {
        return res.status(404).json({
          status: 'fail',
          message: 'Pedido no encontrado'
        });
      }
      res.status(200).json({
        status: 'success',
        data: {
          pedido
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

module.exports = new PedidoController();