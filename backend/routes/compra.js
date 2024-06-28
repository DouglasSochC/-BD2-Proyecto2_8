const express = require('express');
const router = express.Router();
const compraController = require('../controllers/compraController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Compra:
 *       type: object
 *       required:
 *         - usuario
 *         - libros
 *         - total
 *         - direccionEnvio
 *         - metodoPago
 *       properties:
 *         _id:
 *           type: string
 *           description: ID auto-generado de la compra
 *         usuario:
 *           type: string
 *           description: ID del usuario que realiza la compra
 *         libros:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               libro:
 *                 type: string
 *                 description: ID del libro
 *               cantidad:
 *                 type: number
 *                 description: Cantidad de libros comprados
 *               precio:
 *                 type: number
 *                 description: Precio unitario del libro
 *         total:
 *           type: number
 *           description: Total de la compra
 *         estado:
 *           type: string
 *           enum: [En proceso, Enviado, Entregado]
 *           description: Estado actual de la compra
 *         direccionEnvio:
 *           type: string
 *           description: Dirección de envío
 *         metodoPago:
 *           type: string
 *           description: Método de pago utilizado
 *         fechaCompra:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora de la compra
 */

/**
 * @swagger
 * /api/compras:
 *   post:
 *     summary: Realizar una nueva compra
 *     tags: [Compras]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usuario
 *               - libros
 *               - direccionEnvio
 *               - metodoPago
 *             properties:
 *               usuario:
 *                 type: string
 *               libros:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     libro:
 *                       type: string
 *                     cantidad:
 *                       type: number
 *               direccionEnvio:
 *                 type: string
 *               metodoPago:
 *                 type: string
 *     responses:
 *       201:
 *         description: Compra realizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Compra'
 *       400:
 *         description: Datos inválidos o stock insuficiente
 *       500:
 *         description: Error del servidor
 */
router.post('/', compraController.crearCompra);

/**
 * @swagger
 * /api/compras/usuario/{usuarioId}:
 *   get:
 *     summary: Obtener compras de un usuario específico
 *     tags: [Compras]
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de compras del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Compra'
 *       500:
 *         description: Error del servidor
 */
router.get('/usuario/:usuarioId', compraController.obtenerComprasUsuario);

/**
 * @swagger
 * /api/compras/{compraId}:
 *   patch:
 *     summary: Actualizar el estado de una compra
 *     tags: [Compras]
 *     parameters:
 *       - in: path
 *         name: compraId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la compra
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - estado
 *             properties:
 *               estado:
 *                 type: string
 *                 enum: [En proceso, Enviado, Entregado]
 *     responses:
 *       200:
 *         description: Estado de la compra actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Compra'
 *       404:
 *         description: Compra no encontrada
 *       500:
 *         description: Error del servidor
 */
router.patch('/:compraId', compraController.actualizarEstadoCompra);

/**
 * @swagger
 * /api/compras:
 *   get:
 *     summary: Obtener todas las compras
 *     tags: [Compras]
 *     responses:
 *       200:
 *         description: Lista de todas las compras
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Compra'
 *       500:
 *         description: Error del servidor
 */
router.get('/', compraController.obtenerTodasLasCompras);

module.exports = router;