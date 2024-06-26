const Autor = require('../models/autor');
const upload = require('../config/S3'); // Importar la configuración de S3 y multer

class AutoresController {
  // crear un nuevo autor
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

      // Crear el autor en la base de datos con la URL de la foto en S3
      const nuevoAutor = await Autor.create({
        nombre: req.body.nombre,
        biografia: req.body.biografia,
        foto: req.file.location, // URL de la foto en S3 (se asume que multer guarda el resultado en req.file)
        libros: req.body.libros
      });

      res.status(201).json({
        status: 'success',
        data: {
          autor: nuevoAutor
        }
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: error.message || "Error al realizar la creación del autor"
      });
    }
  }

  async findAll(req, res) {
    const { nombre } = req.params;
    if (!nombre) {ki
      return res.status(400).json({
        status: 'fail',
        message: '' //Por favor, proporciona un nombre de autor
      });
    }

    try {
      // Usamos una expresión regular para buscar nombres similares
      const regex = new RegExp(nombre, 'i'); // 'i' hace que la búsqueda sea insensible a mayúsculas/minúsculas
      const autores = await Autor.find({ nombre: regex }).populate('libros');

      res.status(200).json({
        status: 'success',
        data: {
          autores
        }
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Error al buscar autores',
        error: error.message
      });
    }
  }

  async findOne(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          status: 'fail',
          message: 'Por favor, proporciona un ID de autor'
        });
      }

      const autor = await Autor.findById(id).populate('libros');
      if (!autor) {
        return res.status(404).json({
          status: 'fail',
          message: 'No se encontró ningún autor con ese ID'
        });
      }
      res.status(200).json({
        status: 'success',
        data: {
          autor
        }
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: error.message
      });
    }
  }

  // Eliminar un autor
  async delete(req, res) {
    try {
      const { id } = req.params;
      const autorEliminado = await Autor.findByIdAndDelete(id);
      if (!autorEliminado) {
        return res.status(404).json({
          status: 'fail',
          message: 'No se encontró el autor con ese ID'
        });
      }
      res.status(204).json({
        status: 'success',
        data: null,
        message: 'Autor eliminado exitosamente'
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: error.message
      });
    }
  }

}

module.exports = new AutoresController();
