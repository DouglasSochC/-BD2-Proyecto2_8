const Compra = require('../models/compra');
const Usuario = require('../models/usuario');
const Libro = require('../models/libro');

class CompraController {
  async crearCompra(req, res) {
    try {
      const { usuario, libros, direccionEnvio, metodoPago } = req.body;

      // Verificar si el usuario existe
      const usuarioExiste = await Usuario.findById(usuario);
      if (!usuarioExiste) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }

      // Calcular el total y verificar el stock
      let total = 0;
      for (let item of libros) {
        const libro = await Libro.findById(item.libro);
        console.log("libro: ", libro);
        if (!libro) {
          return res.status(404).json({ mensaje: `Libro con ID ${item.libro} no encontrado` });
        }
        if (libro.cantidadDisponible < item.cantidad) {
          return res.status(400).json({ mensaje: `Stock insuficiente para ${libro.titulo}` });
        }
        total += libro.precio * item.cantidad;

        // Actualizar el stock del libro
        libro.cantidadDisponible -= item.cantidad;
        await libro.save();
      }

      const nuevaCompra = new Compra({
        usuario,
        libros,
        total,
        direccionEnvio,
        metodoPago
      });

      await nuevaCompra.save();

      // Actualizar la lista de compras del usuario
      await Usuario.findByIdAndUpdate(usuario, { $push: { compras: nuevaCompra._id } });

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

  async obtenerComprasUsuario(req, res) {
    try {
      const compras = await Compra.find({ usuario: req.params.usuarioId })
        .populate('libros.libro', 'titulo autor precio');
      res.json({
        status: 'success',
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

  async actualizarEstadoCompra(req, res) {
    try {
      const { estado } = req.body;
      const compra = await Compra.findByIdAndUpdate(
        req.params.compraId,
        { estado },
        { new: true, runValidators: true }
      );
      if (!compra) {
        return res.status(404).json({ mensaje: 'Compra no encontrada' });
      }
      res.json({
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

  async obtenerTodasLasCompras(req, res) {
    try {
      const compras = await Compra.find()
        .populate('usuario', 'nombre apellido')
        .populate('libros.libro', 'titulo autor');
      res.json({
        status: 'success',
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
}

module.exports = new CompraController();