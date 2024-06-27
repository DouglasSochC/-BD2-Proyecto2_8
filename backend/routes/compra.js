const express = require('express');
const compras = require('../controllers/compraController');
const router = express.Router();

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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pedido'
 *       400:
 *         description: Error en la solicitud
 */

/**
 * @swagger
 * /api/compra:
 *   post:
 *     summary: Crear una nueva compra
 *     tags: [Compra]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pedidoId
 *               - direccionEnvio
 *               - metodoPago
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
 *         description: Error en la solicitud
 */
router.post('/compra', compras.crearCompra);

/**
 * @swagger
 * /api/compra/{compraId}/confirmar-envio:
 *   put:
 *     summary: Confirmar envío de una compra (para administradores)
 *     tags: [Compra]
 *     parameters:
 *       - in: path
 *         name: compraId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Envío confirmado exitosamente
 *       404:
 *         description: Compra no encontrada
 */
router.put('/compra/:compraId/confirmar-envio', compras.confirmarEnvio);

/**
 * @swagger
 * /api/compra/{compraId}/confirmar-entrega:
 *   put:
 *     summary: Confirmar entrega de una compra (para usuarios)
 *     tags: [Compra]
 *     parameters:
 *       - in: path
 *         name: compraId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Entrega confirmada exitosamente
 *       404:
 *         description: Compra no encontrada
 */
router.put('/compra/:compraId/confirmar-entrega', compras.confirmarEntrega);

/**
 * @swagger
 * /api/compra/{compraId}:
 *   get:
 *     summary: Obtener detalles de una compra
 *     tags: [Compra]
 *     parameters:
 *       - in: path
 *         name: compraId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles de la compra obtenidos exitosamente
 *       404:
 *         description: Compra no encontrada
 */
router.get('/compra/:compraId', compras.obtenerCompra);

module.exports = router;