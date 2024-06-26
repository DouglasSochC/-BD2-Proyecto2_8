const express = require('express');
const reportes = require('../controllers/reporteController');
const router = express.Router();

/**
 * @swagger
 * /api/reporte/top-libros:
 *   get:
 *     summary: Obtener el top de libros más vendidos
 *     tags: [Reportes]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Número de libros top a mostrar (por defecto 10)
 *     responses:
 *       200:
 *         description: Top de libros más vendidos obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     topLibros:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           libro:
 *                             type: string
 *                           autor:
 *                             type: string
 *                           totalVentas:
 *                             type: number
 *       400:
 *         description: Error al obtener el top de libros
 */
router.get('/top-libros', reportes.getTopLibros);

module.exports = router;