const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class UsuariosController {
  // Registrar un nuevo usuario
  async register(req, res) {
    try {
      const nuevoUsuario = await Usuario.create(req.body);
      const token = jwt.sign({ id: nuevoUsuario._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
      });

      res.status(201).json({
        status: 'success',
        token,
        data: {
          usuario: nuevoUsuario
        }
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: error.message
      });
    }
  }

  // Login de usuario
  async login(req, res) {
    try {
      const { correoElectronico, contrasena } = req.body;

      // 1) Revisar si el email y la contraseña existen
      if (!correoElectronico || !contrasena) {
        return res.status(400).json({
          status: 'fail',
          message: 'Por favor, proporciona email y contraseña'
        });
      }

      // 2) Revisar si el usuario existe y la contraseña es correcta
      const usuario = await Usuario.findOne({ correoElectronico }).select('+contrasena');

      if (!usuario || !(await usuario.compararContrasena(contrasena, usuario.contrasena))) {
        return res.status(401).json({
          status: 'fail',
          message: 'Email o contraseña incorrectos'
        });
      }

      // 3) Si todo está bien, enviar el token al cliente
      const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
      });

      res.status(200).json({
        status: 'success',
        token
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: error.message
      });
    }
  }

  // Obtener perfil de usuario
  async getProfile(req, res) {
    try {
      const usuario = await Usuario.findById(req.usuario.id);
      res.status(200).json({
        status: 'success',
        data: {
          usuario
        }
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: error.message
      });
    }
  }

  // Actualizar perfil de usuario
  async updateProfile(req, res) {
    const updates = Object.keys(req.body);

    // Solo permitir actualizar los campos especificados
    const allowedUpdates = ['nombre', 'correoElectronico', 'contrasena', 'apellido', 'edad', 'direccionEnvio', 'metodoPago'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).json({
            status: 'fail',
            message: 'Actualización inválida'
        });
    }

    // Verificar si el campo 'contrasena' está siendo actualizado
    if (req.body.contrasena) {
        req.body.contrasena = await bcrypt.hash(req.body.contrasena, 12);
    }

    // Actualizar el usuario en la base de datos
    try {
      const usuarioActualizado = await Usuario.findByIdAndUpdate(req.usuario.id, req.body, {
        new: true,          // Devolver el documento actualizado
        runValidators: true // Ejecutar las validaciones del esquema
      });

      res.status(200).json({
        status: 'success',
        data: {
          usuario: usuarioActualizado
        }
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: error.message
      });
    }
  }
}

module.exports = new UsuariosController();