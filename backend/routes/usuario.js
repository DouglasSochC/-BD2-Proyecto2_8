const express = require('express');
const usuarios = require('../controllers/usuarioController');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           example: "Juan"
 *         correoElectronico:
 *           type: string
 *           example: "juan@example.com"
 *         contrasena:
 *           type: string
 *           example: "password123"
 *         apellido:
 *           type: string
 *           example: "Pérez"
 *         edad:
 *           type: number
 *           example: 30
 *         direccionEnvio:
 *           type: string
 *           example: "Calle Falsa 123"
 *         metodoPago:
 *           type: string
 *           example: "Tarjeta de Crédito"
 */

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
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
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
 *                     usuario:
 *                       $ref: '#/components/schemas/Usuario'
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Login exitoso
 *       400:
 *         description: Error en la autenticación del usuario
 *       401:
 *         description: Email o contraseña incorrectos
 */
router.post('/login', usuarios.login);

/**
 * @swagger
 * /api/usuarios/profile/{id}:
 *   get:
 *     summary: Obtener perfil del usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Perfil del usuario obtenido exitosamente
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
 *                     usuario:
 *                       $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Error al obtener el perfil del usuario
 */
router.get('/profile/:id', usuarios.getProfile);

/**
 * @swagger
 * /api/usuarios/update-profile/{id}:
 *   patch:
 *     summary: Actualizar perfil del usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
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
 *                     usuario:
 *                       $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Actualización inválida
 */
router.patch('/update-profile/:id', usuarios.updateProfile);

module.exports = router;
