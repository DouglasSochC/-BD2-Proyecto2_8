const express = require('express');
const router = express.Router();
const compraController = require('../controllers/compraController');
const authMiddleware = require('../middleware/auth');

// Crear una nueva compra

/**
 * @swagger
 * /api/compras:
 *   post:
 *     summary: Crear una nueva compra
 *     tags: [Compras]
 *     security:
 *       - bearerAuth: []
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
 *                       type: integer
 *               direccionEnvio:
 *                 type: string
 *               metodoPago:
 *                 type: string
 *     responses:
 *       201:
 *         description: Compra creada exitosamente
 *       400:
 *         description: Error en la solicitud
 *       401:
 *         description: No autorizado
 */
router.post('/', authMiddleware.protect, compraController.crearCompra);

// Obtener compras de un usuario específico

/**
 * @swagger
 * /api/compras/usuario/{usuarioId}:
 *   get:
 *     summary: Obtener compras de un usuario específico
 *     tags: [Compras]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de compras obtenida exitosamente
 *       400:
 *         description: Error en la solicitud
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/usuario/:usuarioId', authMiddleware.protect, compraController.obtenerComprasUsuario);

// Actualizar el estado de una compra (solo para administradores)

/**
 * @swagger
 * /api/compras/{compraId}:
 *   patch:
 *     summary: Actualizar el estado de una compra (solo para administradores)
 *     tags: [Compras]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: compraId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la compra
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estado:
 *                 type: string
 *                 example: "Enviado"
 *     responses:
 *       200:
 *         description: Estado de la compra actualizado exitosamente
 *       400:
 *         description: Error en la solicitud
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Compra no encontrada
 */
router.patch('/:compraId', authMiddleware.protect, authMiddleware.restringirA('Administrador'), compraController.actualizarEstadoCompra);

// Obtener todas las compras (solo para administradores)

/**
 * @swagger
 * /api/compras:
 *   get:
 *     summary: Obtener todas las compras (solo para administradores)
 *     tags: [Compras]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todas las compras obtenida exitosamente
 *       400:
 *         description: Error en la solicitud
 *       401:
 *         description: No autorizado
 */
router.get('/', authMiddleware.protect, authMiddleware.restringirA('Administrador'), compraController.obtenerTodasLasCompras);

module.exports = router;