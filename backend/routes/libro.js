const express = require('express');
const libros = require('../controllers/libroController');
const router = express.Router();

// ruta para crear un libro
router.post('/', libros.create);

module.exports = router;



