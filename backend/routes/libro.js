const express = require('express');
const libros = require('../controllers/libroController');
const router = express.Router();

// Ruta para crear un libro
/**
 * @swagger
 * /api/libro:
 *   post:
 *     summary: Crea un nuevo libro
 *     tags: [Libros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Cien Años de Soledad"
 *               autor:
 *                 type: string
 *                 example: "6678ab170f2260b428683b62"
 *               descripcion:
 *                 type: string
 *                 example: "Una descripción detallada del libro."
 *               genero:
 *                 type: string
 *                 example: "Realismo Mágico"
 *               fechaPublicacion:
 *                 type: string
 *                 format: date
 *                 example: "1967-05-30"
 *               cantidadDisponible:
 *                 type: number
 *                 example: 10
 *               precio:
 *                 type: number
 *                 example: 25.99
 *               imagen:
 *                 type: string
 *                 example: "http://example.com/imagen.jpg"
 *     responses:
 *       201:
 *         description: Libro creado exitosamente
 *       400:
 *         description: Error al realizar la creación del libro
 */
router.post('/', libros.create);

// Ruta para obtener todos los libros
/**
 * @swagger
 * /api/libro:
 *   get:
 *     summary: Obtiene todos los libros
 *     tags: [Libros]
 *     parameters:
 *       - in: query
 *         name: titulo
 *         schema:
 *           type: string
 *         description: Título del libro
 *       - in: query
 *         name: autor
 *         schema:
 *           type: string
 *         description: Nombre del autor
 *       - in: query
 *         name: genero
 *         schema:
 *           type: string
 *         description: Género del libro
 *       - in: query
 *         name: precioMin
 *         schema:
 *           type: number
 *         description: Precio mínimo del libro
 *       - in: query
 *         name: precioMax
 *         schema:
 *           type: number
 *         description: Precio máximo del libro
 *       - in: query
 *         name: puntuacionMedia
 *         schema:
 *           type: number
 *         description: Puntuación media mínima del libro
 *     responses:
 *       200:
 *         description: Lista de todos los libros
 *       400:
 *         description: Error al obtener los libros
 */
router.get('/', libros.findAll);

// Ruta para agregar una reseña a un libro

/**
 * @swagger
 * /api/libro/{id}/resenas:
 *   post:
 *     summary: Agrega una reseña a un libro
 *     tags: [Libros]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del libro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *                 example: "6678ab170f2260b428683b62"
 *               puntuacion:
 *                 type: number
 *                 example: 5
 *               comentario:
 *                 type: string
 *                 example: "Una reseña del libro."
 *     responses:
 *       201:
 *         description: Reseña agregada exitosamente
 *       400:
 *         description: Error al agregar la reseña
 *       404:
 *         description: Libro no encontrado
 */
router.post('/:id/resenas', libros.agregarResena);

module.exports = router;



