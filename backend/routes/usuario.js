const express = require('express');
const usuarios = require('../controllers/usuarioController');
const { protect } = require('../middleware/auth');
const router = express.Router();

// Rutas públicas
router.post('/register', usuarios.register);
router.post('/login', usuarios.login);

// Rutas protegidas
router.get('/profile', protect, usuarios.getProfile);
router.patch('/update-profile', protect, usuarios.updateProfile);

module.exports = router;