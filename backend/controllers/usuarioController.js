const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const upload = require('../config/S3');

class UsuariosController {
  // Registrar un nuevo usuario
  async register(req, res) {
    try {
      const nuevoUsuario = await Usuario.create(req.body);
      res.status(201).json({
        status: 'success',
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

      // 3) Si todo está bien, iniciar sesión
      // Aquí podrías establecer una sesión de usuario en el servidor o devolver algún tipo de identificación de sesión
      res.status(200).json({
        status: 'success',
        message: 'Login exitoso',
        usuario: usuario
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
      const usuario = await Usuario.findById(req.params.id); // Obtener el ID del usuario desde los parámetros de la ruta
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

  async updateProfile(req, res) {
    try {
      const updates = Object.keys(req.body);
      const allowedUpdates = ['nombre', 'correoElectronico', 'contrasena', 'apellido', 'edad', 'direccionEnvio', 'metodoPago'];
      const isValidOperation = updates.every(update => allowedUpdates.includes(update));

      if (!isValidOperation) {
        return res.status(400).json({
          status: 'fail',
          message: 'Actualización inválida'
        });
      }

      const updateData = { ...req.body };

      if (updateData.contrasena) {
        updateData.contrasena = await bcrypt.hash(updateData.contrasena, 12);
      }

      if (req.file) {
        console.log('Archivo subido:', req.file);
        updateData.fotoPerfil = req.file.location; // URL de S3
      }

      const usuarioActualizado = await Usuario.findByIdAndUpdate(req.params.id, updateData, {
        new: true,
        runValidators: true
      });

      if (!usuarioActualizado) {
        return res.status(404).json({
          status: 'fail',
          message: 'Usuario no encontrado'
        });
      }

      res.status(200).json({
        status: 'success',
        data: {
          usuario: usuarioActualizado
        }
      });
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      res.status(400).json({
        status: 'fail',
        message: error.message
      });
    }
  }

  // Obtener lista de usuarios
  async findAll(req, res) {
    try {
      const usuarios = await Usuario.find();
      res.status(200).json({
        status: 'success',
        results: usuarios.length,
        data: {
          usuarios
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
