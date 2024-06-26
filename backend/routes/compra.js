const express = require('express');
const compras = require('../controllers/compraController');
const router = express.Router();

/**
 * @swagger
 * /api/compra:
 *   post:
 *     summary: Crear una nueva compra a partir de un pedido
 *     tags: [Compras]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pedidoId:
 *                 type: string
 *               direccionEnvio:
 *                 type: string
 *               metodoPago:
 *                 type: string
 *     responses:
 *       201:
 *         description: Compra creada exitosamente
 *       400:
 *         description: Error al crear la compra
 */
router.post('/', compras.crearCompra);

/**
 * @swagger
 * /api/compra:
 *   get:
 *     summary: Obtener todas las compras (para administradores)
 *     tags: [Compras]
 *     responses:
 *       200:
 *         description: Lista de compras obtenida exitosamente
 *       400:
 *         description: Error al obtener las compras
 */
router.get('/', compras.obtenerCompras);

/**
 * @swagger
 * /api/compra/usuario/{userId}:
 *   get:
 *     summary: Obtener compras de un usuario específico
 *     tags: [Compras]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Compras del usuario obtenidas exitosamente
 *       400:
 *         description: Error al obtener las compras del usuario
 */
router.get('/usuario/:userId', compras.obtenerComprasUsuario);

/**
 * @swagger
 * /api/compra/{id}:
 *   patch:
 *     summary: Actualizar el estado de una compra
 *     tags: [Compras]
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
 *         description: Estado de la compra actualizado exitosamente
 *       400:
 *         description: Error al actualizar el estado de la compra
 *       404:
 *         description: Compra no encontrada
 */
router.patch('/:id', compras.actualizarEstadoCompra);

module.exports = router;