const express = require('express');
const pedidos = require('../controllers/pedidoController');
const router = express.Router();

/**
 * @swagger
 * /api/pedido:
 *   post:
 *     summary: Crear un nuevo pedido
 *     tags: [Pedidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
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
 *         description: Pedido creado exitosamente
 *       400:
 *         description: Error al crear el pedido
 */
router.post('/', pedidos.crearPedido);

/**
 * @swagger
 * /api/pedido:
 *   get:
 *     summary: Obtener todos los pedidos (para administradores)
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: Lista de pedidos obtenida exitosamente
 *       400:
 *         description: Error al obtener los pedidos
 */
router.get('/', pedidos.obtenerPedidos);

/**
 * @swagger
 * /api/pedido/usuario/{userId}:
 *   get:
 *     summary: Obtener pedidos de un usuario específico
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pedidos del usuario obtenidos exitosamente
 *       400:
 *         description: Error al obtener los pedidos del usuario
 */
router.get('/usuario/:userId', pedidos.obtenerPedidosUsuario);

/**
 * @swagger
 * /api/pedido/{id}:
 *   patch:
 *     summary: Actualizar el estado de un pedido
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estado:
 *                 type: string
 *                 enum: [En proceso, Enviado, Entregado]
 *     responses:
 *       200:
 *         description: Estado del pedido actualizado exitosamente
 *       400:
 *         description: Error al actualizar el estado del pedido
 *       404:
 *         description: Pedido no encontrado
 */
router.patch('/:id', pedidos.actualizarEstadoPedido);

module.exports = router;