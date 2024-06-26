const express = require('express');
const autores = require('../controllers/autorController');
const upload = require('../config/S3');
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
router.post('/', upload.single('foto'), autores.create);

// Ruta para obtener todos los auotres registrados

/**
 * @swagger
 * /api/autor/{nombre}:
 *   get:
 *     summary: Obtiene todos los autores que coinciden con el nombre proporcionado
 *     tags: [Autores]
 *     parameters:
 *       - in: path
 *         name: nombre
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre del autor para buscar (búsqueda parcial, no sensible a mayúsculas/minúsculas)
 *     responses:
 *       200:
 *         description: Lista de autores filtrada
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
 *                     autores:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Autor'
 *       400:
 *         description: Error al obtener los autores
 *       404:
 *         description: No se encontró ningún autor con ese nombre exacto
 */
router.get('/:nombre', autores.findAll);

//Ruta para obtener un solo autor
/**
 * @swagger
 * /api/autor/{id}:
 *   get:
 *     summary: Obtiene un autor por ID
 *     tags: [Autores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del autor
 *     responses:
 *       200:
 *         description: Información del autor obtenida exitosamente
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
 *                     autor:
 *                       $ref: '#/components/schemas/Autor'
 *       400:
 *         description: Error en la solicitud
 *       404:
 *         description: Autor no encontrado
 */
router.get('/:id', autores.findOne);


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