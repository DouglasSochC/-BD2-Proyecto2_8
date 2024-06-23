const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

exports.protect = async (req, res, next) => {
  try {
    // 1) Obtener el token y comprobar si existe
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        status: 'fail',
        message: 'No estás logueado. Por favor, inicia sesión para obtener acceso.'
      });
    }

    // 2) Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3) Comprobar si el usuario aún existe
    const usuarioActual = await Usuario.findById(decoded.id);
    if (!usuarioActual) {
      return res.status(401).json({
        status: 'fail',
        message: 'El usuario perteneciente a este token ya no existe.'
      });
    }

    // OTORGAR ACCESO A LA RUTA PROTEGIDA
    req.usuario = usuarioActual;
    next();
  } catch (error) {
    res.status(401).json({
      status: 'fail',
      message: 'Token inválido o expirado'
    });
  }
};