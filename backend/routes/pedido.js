const express = require('express');
const pedidos = require('../controllers/pedidoController');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Pedido:
 *       type: object
 *       properties:
 *         usuario:
 *           type: string
 *           description: ID del usuario que realiza el pedido
 *           example: "60d5ecb74e7e882fac742381"
 *         libros:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               libro:
 *                 type: string
 *                 description: ID del libro
 *                 example: "60d5ecb74e7e882fac742382"
 *               cantidad:
 *                 type: number
 *                 example: 2
 *               precio:
 *                 type: number
 *                 example: 29.99
 *         total:
 *           type: number
 *           example: 59.98
 *         estado:
 *           type: string
 *           enum: ['En carrito', 'Checkout', 'Completado', 'Cancelado']
 *           example: "En carrito"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     Compra:
 *       type: object
 *       properties:
 *         pedido:
 *           type: string
 *           description: ID del pedido asociado a la compra
 *           example: "60d5ecb74e7e882fac742383"
 *         usuario:
 *           type: string
 *           description: ID del usuario que realiza la compra
 *           example: "60d5ecb74e7e882fac742381"
 *         total:
 *           type: number
 *           example: 59.98
 *         estado:
 *           type: string
 *           enum: ['En proceso', 'Enviado', 'Entregado']
 *           example: "En proceso"
 *         direccionEnvio:
 *           type: string
 *           example: "Calle Falsa 123, Ciudad Ejemplo"
 *         metodoPago:
 *           type: string
 *           example: "Tarjeta de Crédito"
 *         entregaConfirmada:
 *           type: boolean
 *           example: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/pedido/carrito:
 *   post:
 *     summary: Agregar libro al carrito
 *     tags: [Pedido]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usuarioId
 *               - libroId
 *               - cantidad
 *             properties:
 *               usuarioId:
 *                 type: string
 *               libroId:
 *                 type: string
 *               cantidad:
 *                 type: number
 *     responses:
 *       200:
 *         description: Libro agregado al carrito exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post('/carrito', pedidos.agregarAlCarrito);

/**
 * @swagger
 * /api/pedido/carrito/{usuarioId}:
 *   put:
 *     summary: Actualizar carrito
 *     tags: [Pedido]
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - libros
 *             properties:
 *               libros:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     libro:
 *                       type: string
 *                     cantidad:
 *                       type: number
 *     responses:
 *       200:
 *         description: Carrito actualizado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.put('/carrito/:usuarioId', pedidos.actualizarCarrito);

/**
 * @swagger
 * /api/pedido/carrito/{usuarioId}:
 *   get:
 *     summary: Obtener carrito del usuario
 *     tags: [Pedido]
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Carrito obtenido exitosamente
 *       404:
 *         description: Carrito no encontrado
 */
router.get('/carrito/:usuarioId', pedidos.obtenerCarrito);

/**
 * @swagger
 * /api/pedido/checkout/{usuarioId}:
 *   post:
 *     summary: Proceder al checkout
 *     tags: [Pedido]
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Checkout realizado exitosamente
 *       404:
 *         description: Carrito no encontrado
 */
router.post('/checkout/:usuarioId', pedidos.procederAlCheckout);

module.exports = router;