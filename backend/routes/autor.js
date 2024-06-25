const express = require('express');
const autores = require('../controllers/autorController');
const router = express.Router();


// ruta para crear un autor
/**
 * @swagger
 * /api/autor:
 *   post:
 *     summary: Crea un nuevo autor
 *     tags: [Autores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Gabriel García Márquez"
 *               biografia:
 *                 type: string
 *                 example: "Biografía del autor"
 *               foto:
 *                 type: string
 *                 example: "http://example.com/foto.jpg"
 *     responses:
 *       201:
 *         description: Autor creado exitosamente
 *       400:
 *         description: Error al realizar la creación del autor
 */
router.post('/', autores.create);

// Ruta para obtener todos los auotres registrados

/**
 * @swagger
 * /api/autor:
 *   get:
 *     summary: Obtiene todos los autores
 *     tags: [Autores]
 *     responses:
 *       200:
 *         description: Lista de todos los autores
 *       400:
 *         description: Error al obtener los autores
 */
router.get('/', autores.findAll);

//Ruta para obtener un solo autor
/**
 * @swagger
 * /api/autor/{nombre}:
 *   get:
 *     summary: Obtiene un autor por nombre
 *     tags: [Autores]
 *     parameters:
 *       - in: path
 *         name: nombre
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre del autor
 *     responses:
 *       200:
 *         description: Información del autor
 *       400:
 *         description: Por favor, proporciona un nombre de autor
 *       404:
 *         description: No se encontró ningún autor con ese nombre exacto
 */
router.get('/:nombre', autores.findOne);

// Ruta para eliminar un autor
/**
 * @swagger
 * /api/autor/{id}:
 *   delete:
 *     summary: Elimina un autor por ID
 *     tags: [Autores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del autor
 *     responses:
 *       204:
 *         description: Autor eliminado exitosamente
 *       400:
 *         description: Error al eliminar el autor
 *       404:
 *         description: No se encontró el autor con ese ID
 */
router.delete('/:id', autores.delete);


module.exports = router;