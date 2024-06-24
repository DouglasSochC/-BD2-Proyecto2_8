const express = require('express');
const usuarios = require('../controllers/usuarioController');
const { protect } = require('../middleware/auth');
const router = express.Router();

// Rutas públicas

/**
 * @swagger
 * /api/usuarios/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Juan"
 *               correoElectronico:
 *                 type: string
 *                 example: "juan@example.com"
 *               contrasena:
 *                 type: string
 *                 example: "password123"
 *               apellido:
 *                 type: string
 *                 example: "Pérez"
 *               edad:
 *                 type: number
 *                 example: 30
 *               direccionEnvio:
 *                 type: string
 *                 example: "Calle Falsa 123"
 *               metodoPago:
 *                 type: string
 *                 example: "Tarjeta de Crédito"
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Error al registrar el usuario
 */
router.post('/register', usuarios.register);
/**
 * @swagger
 * /api/usuarios/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correoElectronico:
 *                 type: string
 *                 example: "juan@example.com"
 *               contrasena:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Usuario autenticado exitosamente
 *       400:
 *         description: Error en la autenticación del usuario
 *       401:
 *         description: Email o contraseña incorrectos
 */
router.post('/login', usuarios.login);

// Rutas protegidas

/**
 * @swagger
 * /api/usuarios/profile:
 *   get:
 *     summary: Obtener perfil del usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil del usuario obtenido exitosamente
 *       400:
 *         description: Error al obtener el perfil del usuario
 */
router.get('/profile', protect, usuarios.getProfile);

/**
 * @swagger
 * /api/usuarios/update-profile:
 *   patch:
 *     summary: Actualizar perfil del usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Juan"
 *               correoElectronico:
 *                 type: string
 *                 example: "juan@example.com"
 *               contrasena:
 *                 type: string
 *                 example: "newpassword123"
 *               apellido:
 *                 type: string
 *                 example: "Pérez"
 *               edad:
 *                 type: number
 *                 example: 31
 *               direccionEnvio:
 *                 type: string
 *                 example: "Calle Falsa 123"
 *               metodoPago:
 *                 type: string
 *                 example: "PayPal"
 *     responses:
 *       200:
 *         description: Perfil del usuario actualizado exitosamente
 *       400:
 *         description: Actualización inválida
 */
router.patch('/update-profile', protect, usuarios.updateProfile);

module.exports = router;