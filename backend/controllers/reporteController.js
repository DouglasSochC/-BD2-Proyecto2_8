const Compra = require('../models/compra');
const Libro = require('../models/libro');

class ReporteController {
  async getTopLibros(req, res) {
    try {
      const limit = parseInt(req.query.limit) || 10; // Número de libros top a mostrar, por defecto 10

      const topLibros = await Compra.aggregate([
        { $unwind: "$libros" },
        {
          $group: {
            _id: "$libros.libro",
            totalVentas: { $sum: "$libros.cantidad" }
          }
        },
        { $sort: { totalVentas: -1 } },
        { $limit: limit },
        {
          $lookup: {
            from: "libros",
            localField: "_id",
            foreignField: "_id",
            as: "libroInfo"
          }
        },
        { $unwind: "$libroInfo" },
        {
          $project: {
            _id: 0,
            libro: "$libroInfo.titulo",
            autor: "$libroInfo.autor",
            totalVentas: 1
          }
        }
      ]);

      res.status(200).json({
        status: 'success',
        data: {
          topLibros
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

module.exports = new ReporteController();