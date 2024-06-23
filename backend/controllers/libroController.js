const Libro = require("../models/libro");
const Autor = require("../models/autor"); // Asumiendo que tienes un modelo de Autor

class LibrosController {
  async create(req, res) {
    try {
      // Verificar si el autor existe
      const autorExiste = await Autor.findById(req.body.autor);
      console.log('Autor encontrado:', autorExiste);
      if (!autorExiste) {
        return res.status(400).json({
          status: "fail",
          message: "El autor especificado no existe",
        });
      }

      const nuevoLibro = await Libro.create(req.body);
      res.status(201).json({
        status: "success",
        data: {
          libro: nuevoLibro,
        },
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: error.message || "Error al realizar la creación del libro",
      });
    }
  }

  async obtenerLibros(req, res) {
    try {
      const { titulo, autor, genero, precioMin, precioMax, puntuacionMin } =
        req.query;
      let filtro = {};

      if (titulo) filtro.titulo = { $regex: titulo, $options: "i" };
      if (autor) {
        const autorEncontrado = await Autor.findOne({
          nombre: { $regex: autor, $options: "i" },
        });
        if (autorEncontrado) filtro.autor = autorEncontrado._id;
      }
      if (genero) filtro.genero = genero;
      if (precioMin || precioMax) {
        filtro.precio = {};
        if (precioMin) filtro.precio.$gte = parseFloat(precioMin);
        if (precioMax) filtro.precio.$lte = parseFloat(precioMax);
      }
      if (puntuacionMin)
        filtro.puntuacionMedia = { $gte: parseFloat(puntuacionMin) };

      const libros = await Libro.find(filtro).populate("autor", "nombre");
      res.json(libros);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async obtenerLibro(req, res) {
    try {
      const libro = await Libro.findById(req.params.id).populate("autor");
      res.json(libro);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async actualizarLibro(req, res) {
    try {
      const { titulo, autor, descripcion, precio, stock } = req.body;
      await Libro.findByIdAndUpdate(req.params.id, {
        titulo,
        autor,
        descripcion,
        precio,
        stock,
      });
      res.json("Libro actualizado");
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async eliminarLibro(req, res) {
    try {
      await Libro.findByIdAndDelete(req.params.id);
      res.json("Libro eliminado");
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new LibrosController();
