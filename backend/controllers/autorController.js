const Autor = require('../models/autor');

class AutoresController {
  // crear un nuevo autor
  async create(req, res) {
    try {
      const nuevoAutor = await Autor.create(req.body);
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
    try {
      const autores = await Autor.find().populate('libros');
      res.status(200).json({
        status: 'success',
        results: autores.length,
        data: {
          autores
        }
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: error.message
      });
    }
  }

  async findOne(req, res) {
    try {

      const { nombre } = req.params;
      if (!nombre) {
        return res.status(400).json({
          status: 'fail',
          message: 'Por favor, proporciona un nombre de autor'
        });
      }

      const autor = await Autor.findOne({ nombre: nombre }).populate('libros');
      if (!autor) {
        return res.status(404).json({
          status: 'fail',
          message: 'No se encontró ningún autor con ese nombre exacto'
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

// exports.crearAutor = async (req, res) => {
//   console.log("entramos a crear autor")
//   try {
//     console.log(req.body);
//     const nuevoAutor = await Autor.create(req.body);
//     res.status(201).json({
//       status: 'success',
//       data: {
//         autor: nuevoAutor
//       }
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: 'fail',
//       message: error.message
//     });
//   }
// };

// exports.obtenerAutores = async (req, res) => {
//   try {
//     const autores = await Autor.find();
//     res.status(200).json({
//       status: 'success',
//       results: autores.length,
//       data: {
//         autores
//       }
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: 'fail',
//       message: error.message
//     });
//   }
// };

// exports.obtenerAutor = async (req, res) => {
//   try {
//     const autor = await Autor.findById(req.params.id).populate('libros');
//     if (!autor) {
//       return res.status(404).json({
//         status: 'fail',
//         message: 'No se encontró el autor con ese ID'
//       });
//     }
//     res.status(200).json({
//       status: 'success',
//       data: {
//         autor
//       }
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: 'fail',
//       message: error.message
//     });
//   }
// };

// Añade aquí más funciones como actualizarAutor y eliminarAutor


