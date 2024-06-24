const express = require('express');
const libros = require('../controllers/libroController');
const router = express.Router();

// Ruta para crear un libro
router.post('/', libros.create);

// Ruta para obtener todos los libros
router.get('/', libros.findAll);

// Ruta para agregar una reseña a un libro
router.post('/:id/resenas', libros.agregarResena);

module.exports = router;



