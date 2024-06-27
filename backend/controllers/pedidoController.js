const Pedido = require('../models/pedido');
const Libro = require('../models/libro');
const Usuario = require('../models/usuario');

class PedidoController {
  // Agregar al carrito (crear o actualizar pedido)
  async agregarAlCarrito(req, res) {
    try {
      const { usuarioId, libroId, cantidad } = req.body;

      const usuario = await Usuario.findById(usuarioId);
      if (!usuario) {
        return res.status(400).json({ status: 'fail', message: 'Usuario no encontrado' });
      }

      const libro = await Libro.findById(libroId);
      if (!libro) {
        return res.status(400).json({ status: 'fail', message: 'Libro no encontrado' });
      }

      if (libro.stock < cantidad) {
        return res.status(400).json({ status: 'fail', message: 'Stock insuficiente' });
      }

      let pedido = await Pedido.findOne({ usuario: usuarioId, estado: 'En carrito' });

      if (!pedido) {
        pedido = new Pedido({ usuario: usuarioId, libros: [], total: 0, estado: 'En carrito' });
      }

      const itemIndex = pedido.libros.findIndex(item => item.libro.toString() === libroId);

      if (itemIndex > -1) {
        pedido.libros[itemIndex].cantidad += cantidad;
      } else {
        pedido.libros.push({ libro: libroId, cantidad, precio: libro.precio });
      }

      pedido.total = pedido.libros.reduce((total, item) => total + (item.cantidad * item.precio), 0);

      await pedido.save();

      res.status(200).json({
        status: 'success',
        data: { pedido }
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: error.message
      });
    }
  }

  // Actualizar carrito
  async actualizarCarrito(req, res) {
    try {
      const { usuarioId, libros } = req.body;

      const pedido = await Pedido.findOne({ usuario: usuarioId, estado: 'En carrito' });
      if (!pedido) {
        return res.status(404).json({ status: 'fail', message: 'Carrito no encontrado' });
      }

      // Verificar stock y actualizar
      for (let item of libros) {
        const libro = await Libro.findById(item.libro);
        if (!libro) {
          return res.status(400).json({ status: 'fail', message: `Libro con id ${item.libro} no encontrado` });
        }
        if (libro.stock < item.cantidad) {
          return res.status(400).json({ status: 'fail', message: `Stock insuficiente para el libro ${libro.titulo}` });
        }
        item.precio = libro.precio;
      }

      pedido.libros = libros;
      pedido.total = libros.reduce((total, item) => total + (item.cantidad * item.precio), 0);

      await pedido.save();

      res.status(200).json({
        status: 'success',
        data: { pedido }
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: error.message
      });
    }
  }

  // Obtener carrito del usuario
  async obtenerCarrito(req, res) {
    try {
      const { usuarioId } = req.params;

      const pedido = await Pedido.findOne({ usuario: usuarioId, estado: 'En carrito' })
        .populate('libros.libro', 'titulo precio');

      if (!pedido) {
        return res.status(404).json({ status: 'fail', message: 'Carrito no encontrado' });
      }

      res.status(200).json({
        status: 'success',
        data: { pedido }
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: error.message
      });
    }
  }

  // Proceder al checkout
  async procederAlCheckout(req, res) {
    try {
      const { usuarioId } = req.params;

      const pedido = await Pedido.findOne({ usuario: usuarioId, estado: 'En carrito' });
      if (!pedido) {
        return res.status(404).json({ status: 'fail', message: 'Carrito no encontrado' });
      }

      pedido.estado = 'Checkout';
      await pedido.save();

      res.status(200).json({
        status: 'success',
        data: { pedido }
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