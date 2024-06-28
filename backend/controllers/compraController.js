const Compra = require('../models/compra');
const Usuario = require('../models/usuario');
const Libro = require('../models/libro');

class CompraController {
  // Crear una nueva compra
  async crearCompra(req, res) {
    try {
      const { usuario, libros, direccionEnvio, metodoPago } = req.body;

      // Calcular el total y verificar el stock
      let total = 0;
      const librosArray = JSON.parse(libros);
      for (let item of librosArray) {
        const libro = await Libro.findById(item.libro);
        if (!libro) {
          return res.status(404).json({ message: 'Libro no encontrado' });
        }
        if (libro.stock < item.cantidad) {
          return res.status(400).json({ message: 'Stock insuficiente' });
        }
        total += libro.precio * item.cantidad;

        // Actualizar el stock del libro
        libro.stock -= item.cantidad;
        await libro.save();
      }

      // Crear la compra
      const nuevaCompra = new Compra({
        usuario,
        libros: librosArray,
        total,
        direccionEnvio,
        metodoPago
      });

      await nuevaCompra.save();

      // Actualizar el usuario con la nueva compra
      await Usuario.findByIdAndUpdate(usuario, { $push: { compras: nuevaCompra._id } });

      res.status(201).json(nuevaCompra);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al realizar la compra', error: error.message });
    }
  }

  async obtenerComprasUsuario(req, res) {
    try {
      const compras = await Compra.find({ usuario: req.params.usuarioId })
        .populate('libros.libro', 'titulo autor');
      res.json(compras);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener las compras', error: error.message });
    }
  }

  async actualizarEstadoCompra(req, res) {
    try {
      const { estado } = req.body;
      const compra = await Compra.findByIdAndUpdate(req.params.compraId, { estado }, { new: true });
      if (!compra) {
        return res.status(404).json({ mensaje: 'Compra no encontrada' });
      }
      res.json(compra);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al actualizar el estado de la compra', error: error.message });
    }
  }

  // Obtener compra por ID
  async obtenerTodasLasCompras(req, res) {
    try {
      const compras = await Compra.find().populate('usuario', 'nombre email').populate('libros.libro', 'titulo autor');
      res.json(compras);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener todas las compras', error: error.message });
    }
  }
}

module.exports = new CompraController();