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
router.get('/usuario/:usuarioId', authMiddleware.protect, compraController.obtenerComprasUsuario);

// Actualizar el estado de una compra (solo para administradores)
router.patch('/:compraId', authMiddleware.protect, authMiddleware.restringirA('Administrador'), compraController.actualizarEstadoCompra);

// Obtener todas las compras (solo para administradores)
router.get('/', authMiddleware.protect, authMiddleware.restringirA('Administrador'), compraController.obtenerTodasLasCompras);

module.exports = router;