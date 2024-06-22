// Conectar a la base de datos (MongoDB creará la base de datos si no existe)
db = connect('mongodb://localhost:27017/BookStore');

// Crear colecciones
db.createCollection("autores");
db.createCollection("libros");
db.createCollection("usuarios");

// Mensaje de éxito
print("Base de datos y colecciones creadas exitosamente.")