const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

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
      const usuarioActualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body, {
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
