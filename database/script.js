// Conectar a la base de datos (MongoDB creará la base de datos si no existe)
db = connect('mongodb://localhost:27017/BookStore');

// Crear colección de autores
db.createCollection("autores", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["nombre", "biografia", "foto"],
            properties: {
                nombre: {
                    bsonType: "string",
                    description: "Debe ser una cadena y es requerido"
                },
                biografia: {
                    bsonType: "string",
                    description: "Debe ser una cadena y es requerido"
                },
                foto: {
                    bsonType: "string",
                    description: "Debe ser una URL y es requerido"
                },
                libros: {
                    bsonType: "array",
                    items: {
                        bsonType: "objectId",
                        description: "Debe ser un ObjectId"
                    }
                }
            }
        }
    }
});

// Crear colección de libros
db.createCollection("libros", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["titulo", "autor", "descripcion", "genero", "fechaPublicacion", "cantidadDisponible", "precio", "imagen"],
            properties: {
                titulo: {
                    bsonType: "string",
                    description: "Debe ser una cadena y es requerido"
                },
                autor: {
                    bsonType: "objectId",
                    description: "Debe ser un ObjectId y es requerido"
                },
                descripcion: {
                    bsonType: "string",
                    description: "Debe ser una cadena y es requerido"
                },
                genero: {
                    bsonType: "string",
                    description: "Debe ser una cadena y es requerido"
                },
                fechaPublicacion: {
                    bsonType: "date",
                    description: "Debe ser una fecha y es requerido"
                },
                disponibilidad: {
                    bsonType: "bool",
                    description: "Debe ser un booleano"
                },
                cantidadDisponible: {
                    bsonType: "int",
                    description: "Debe ser un entero y es requerido"
                },
                precio: {
                    bsonType: "double",
                    description: "Debe ser un número decimal y es requerido"
                },
                imagen: {
                    bsonType: "string",
                    description: "Debe ser una URL y es requerido"
                },
                puntuacionMedia: {
                    bsonType: "double",
                    description: "Debe ser un número decimal"
                },
                resenas: {
                    bsonType: "array",
                    items: {
                        bsonType: "object",
                        properties: {
                            usuario: {
                                bsonType: "objectId",
                                description: "Debe ser un ObjectId"
                            },
                            puntuacion: {
                                bsonType: "int",
                                description: "Debe ser un entero entre 1 y 5"
                            },
                            comentario: {
                                bsonType: "string",
                                description: "Debe ser una cadena"
                            },
                            fecha: {
                                bsonType: "date",
                                description: "Debe ser una fecha"
                            }
                        }
                    }
                }
            }
        }
    }
});

// Crear colección de usuarios
db.createCollection("usuarios", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["nombre", "apellido", "edad", "correoElectronico", "contrasena", "rol"],
            properties: {
                nombre: {
                    bsonType: "string",
                    description: "Debe ser una cadena y es requerido"
                },
                apellido: {
                    bsonType: "string",
                    description: "Debe ser una cadena y es requerido"
                },
                edad: {
                    bsonType: "int",
                    description: "Debe ser un entero y es requerido"
                },
                correoElectronico: {
                    bsonType: "string",
                    description: "Debe ser una cadena y es requerido"
                },
                contrasena: {
                    bsonType: "string",
                    description: "Debe ser una cadena y es requerido"
                },
                rol: {
                    bsonType: "string",
                    enum: ["Administrador", "Cliente"],
                    description: "Debe ser 'Administrador' o 'Cliente'"
                },
                direccionEnvio: {
                    bsonType: "string",
                    description: "Debe ser una cadena"
                },
                metodoPago: {
                    bsonType: "string",
                    description: "Debe ser una cadena"
                }
            }
        }
    }
});

// Crear colección de pedidos
db.createCollection("pedidos", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["usuario", "libros", "total", "estado", "direccionEnvio", "metodoPago"],
            properties: {
                usuario: {
                    bsonType: "objectId",
                    description: "Debe ser un ObjectId y es requerido"
                },
                libros: {
                    bsonType: "array",
                    description: "Debe ser un array y es requerido",
                    items: {
                        bsonType: "object",
                        required: ["libro", "cantidad", "precio"],
                        properties: {
                            libro: {
                                bsonType: "objectId",
                                description: "Debe ser un ObjectId y es requerido"
                            },
                            cantidad: {
                                bsonType: "int",
                                description: "Debe ser un entero y es requerido"
                            },
                            precio: {
                                bsonType: "double",
                                description: "Debe ser un número decimal y es requerido"
                            }
                        }
                    }
                },
                total: {
                    bsonType: "double",
                    description: "Debe ser un número decimal y es requerido"
                },
                estado: {
                    bsonType: "string",
                    enum: ["En proceso", "Enviado", "Entregado"],
                    description: "Debe ser uno de los estados definidos y es requerido"
                },
                direccionEnvio: {
                    bsonType: "string",
                    description: "Debe ser una cadena y es requerido"
                },
                metodoPago: {
                    bsonType: "string",
                    description: "Debe ser una cadena y es requerido"
                },
                fechaPedido: {
                    bsonType: "date",
                    description: "Debe ser una fecha y es requerido"
                }
            }
        }
    }
});

// Crear índices
db.autores.createIndex({ nombre: 1 });
db.libros.createIndex({ titulo: 1, autor: 1 });
db.usuarios.createIndex({ correoElectronico: 1 }, { unique: true });
db.pedidos.createIndex({ usuario: 1, fechaPedido: -1 });

// Mensaje de éxito
print("Base de datos, colecciones e índices creados exitosamente.");
