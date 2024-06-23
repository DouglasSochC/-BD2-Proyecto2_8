const express = require('express');
const autores = require('../controllers/autorController');
const router = express.Router();


// ruta para crear un autor
router.post('/', autores.create);

// Ruta para obtener todos los auotres registrados
router.get('/', autores.findAll);

//Ruta para obtener un solo autor
router.get('/:nombre', autores.findOne);

// router
//   .route('/')
//   .post(autorController.crearAutor)
//   .get(autorController.obtenerAutores);

// router
//   .route('/:id')
//   .get(autorController.obtenerAutor);

// Añade aquí más rutas como PUT y DELETE

module.exports = router;