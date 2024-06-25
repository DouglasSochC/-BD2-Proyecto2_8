const express = require('express');
const usuarios = require('../controllers/usuarioController');
const upload = require('../config/S3');
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
 * /api/usuario/register:
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
 * /api/usuario/login:
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
 * /api/usuario/profile/{id}:
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
 * /api/usuario/update-profile/{id}:
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               correoElectronico:
 *                 type: string
 *               contrasena:
 *                 type: string
 *               apellido:
 *                 type: string
 *               edad:
 *                 type: number
 *               direccionEnvio:
 *                 type: string
 *               metodoPago:
 *                 type: string
 *               fotoPerfil:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Perfil del usuario actualizado exitosamente
 *       400:
 *         description: Actualización inválida
 */
router.patch('/update-profile/:id', upload.single('fotoPerfil'), usuarios.updateProfile);

/**
 * @swagger
 * /api/usuario:
 *   get:
 *     summary: Obtener lista de usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 results:
 *                   type: integer
 *                   example: 1
 *                 data:
 *                   type: object
 *                   properties:
 *                     usuarios:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Error al obtener la lista de usuarios
 */
router.get('/', usuarios.findAll);

module.exports = router;
