const Libro = require("../models/libro");
const Autor = require("../models/autor"); // Asumiendo que tienes un modelo de Autor
const Usuario = require("../models/usuario"); // Asumiendo que tienes un modelo de Usuario

class LibrosController {
  async create(req, res) {
    try {
      // Verificar si la imagen se subió correctamente por multer y multerS3
      console.log(req.file, req.body);
      if (!req.file) {
        return res.status(400).json({
          status: 'fail',
          message: 'Debe proporcionar una imagen'
        });
      }

      // Crear el libro en la base de datos con la URL de la imagen en S3
      const nuevoLibro = await Libro.create({
        titulo: req.body.titulo,
        autor: req.body.autor,
        descripcion: req.body.descripcion,
        genero: req.body.genero,
        fechaPublicacion: req.body.fechaPublicacion,
        cantidadDisponible: req.body.cantidadDisponible,
        precio: req.body.precio,
        imagen: req.file.location, // URL de la imagen en S3 (se asume que multer guarda el resultado en req.file)
      });

      res.status(201).json({
        status: 'success',
        data: {
          libro: nuevoLibro
        }
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: error.message || "Error al realizar la creación del libro"
      });
    }
  }

  async findAll(req, res) {
    try {
      const { titulo, autor, genero, precioMin, precioMax, puntuacionMedia } =
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
      if (puntuacionMedia)
        filtro.puntuacionMedia = { $gte: parseFloat(puntuacionMedia) };
      console.log("filtro:", filtro)
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

  // Método para actualizar un libro
  async actualizarLibro(req, res) {
    try {
      const { titulo, autor, descripcion, precio, stock, genero, fechaPublicacion, cantidadDisponible } = req.body;

      // Validar el ID del autor
      if (autor && !mongoose.Types.ObjectId.isValid(autor)) {
        return res.status(400).json({
          status: 'fail',
          message: 'ID de autor no válido'
        });
      }

      const updatedData = {
        titulo,
        descripcion,
        precio,
        stock,
        genero,
        fechaPublicacion,
        cantidadDisponible,
      };

      if (autor) {
        updatedData.autor = autor;
      }

      if (req.file) {
        updatedData.imagen = req.file.location;
      }

      // Actualizar el libro en la base de datos
      const libroActualizado = await Libro.findByIdAndUpdate(req.params.id, updatedData, { new: true });

      res.json({
        status: 'success',
        data: {
          libro: libroActualizado
        }
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: error.message
      });
    }
  }

  async agregarResena(req, res) {
    try {
      const { id } = req.params;
      const { usuario, puntuacion, comentario } = req.body;

      // Encontrar el libro por ID
      const libro = await Libro.findById(id);
      if (!libro) {
        return res.status(404).json({ message: "Libro no encontrado" });
      }

      // Encontrar el usuario por ID
      const user = await Usuario.findById(usuario);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      // Concatenar nombre y apellido del usuario
      const usuarioNombre = `${user.nombre} ${user.apellido}`;

      // Agregar la nueva reseña
      libro.resenas.push({
        usuarioId: usuario,
        usuarioNombre, // Usar el campo correcto del modelo
        puntuacion,
        comentario
      });

      // Recalcular la puntuación media
      const totalPuntuaciones = libro.resenas.reduce((sum, resena) => sum + resena.puntuacion, 0);
      libro.puntuacionMedia = totalPuntuaciones / libro.resenas.length;

      // Guardar el libro actualizado en la base de datos
      await libro.save();

      // Responder con el libro actualizado
      res.status(201).json({
        status: "success",
        data: {
          libro,
        },
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: error.message,
      });
    }
  }



  // Eliminar un libro por ID
  async delete(req, res) {
    try {
      const { id } = req.params;
      const libroEliminado = await Libro.findByIdAndDelete(id);
      if (!libroEliminado) {
        return res.status(404).json({
          status: 'fail',
          message: 'No se encontró el libro con ese ID'
        });
      }
      res.status(204).json({
        status: 'success',
        data: null,
        message: 'Libro eliminado exitosamente'
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: error.message
      });
    }
  }
}

module.exports = new LibrosController();
