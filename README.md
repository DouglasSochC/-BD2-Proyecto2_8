# BookStore

_Este es un proyecto universitario del curso de Sistemas de Base de Datos 2, en el cual se busca desarrollar una plataforma eficiente y segura para la venta de libros, utilizando MongoDB como base de datos, que permita a los usuarios comprar libros de manera fácil y a los administradores gestionar el catálogo de libros, autores y pedidos de forma efectiva._

## 🚀 Comenzando

### 📋 Requerimientos

* [Node 20.9.0](https://nodejs.org/en/download/package-manager)
```console
node -v
```

### ⚙️ Ejecucion

#### Base de datos

Desde la carpeta del backend se ejecuta el siguiente comando:

```console
npm run script
```

##### Backend

* Para desarrollo

    ```console
    npm run dev
    ```

##### Frontend

* Para desarrollo

    ```console
    npm run dev
    ```

## 📖 Documentacion

### Modelos utilizadas en MongoDB

#### Modelo de Usuarios

Este modelo está diseñado para capturar detalles clave de cada usuario, incluyendo su nombre, apellido, edad, correo electrónico, contraseña, rol, información de perfil, historial de compras, dirección de envío, método de pago preferido, saldo y detalles de contacto. Cada campo está configurado con validaciones para asegurar la integridad de los datos y se utilizan opciones adicionales como valores por defecto y referencias a otros modelos cuando es necesario. Además, se habilitan los campos automáticos de timestamps para mantener un registro de cuándo se creó y modificó cada registro de usuario. Este modelo es ideal para aplicaciones que requieren gestionar perfiles de usuarios con múltiples funcionalidades y necesidades de datos variadas.

![](https://i.ibb.co/RgTmm7p/Imagen-de-Whats-App-2024-06-27-a-las-20-59-57-8376a87b.jpg)

#### Modelo de Autores

Define la estructura de datos para almacenar información de autores de libros en una base de datos MongoDB utilizando Mongoose. Cada documento en esta colección representa un autor y contiene detalles esenciales como el nombre del autor, su biografía y la URL de una foto. Además, se incluye una referencia a los libros escritos por el autor, permitiendo establecer una relación entre autores y sus obras.

![](https://i.ibb.co/Sch8757/Imagen-de-Whats-App-2024-06-27-a-las-21-00-23-6b1e8c68.jpg)

#### Modelo de Compras

Define la estructura de datos para almacenar información sobre compras realizadas por usuarios en una aplicación de gestión de libros, utilizando MongoDB con Mongoose. Cada documento en esta colección representa una compra y contiene los siguientes campos:

![](https://i.ibb.co/x1tFbQC/Imagen-de-Whats-App-2024-06-27-a-las-21-00-36-83fdcd16.jpg)

#### Modelo de Libros

El modelo libroSchema define la estructura para almacenar información detallada de libros en una base de datos MongoDB usando Mongoose. Cada registro incluye campos como título, autor, descripción, género, fecha de publicación, disponibilidad, cantidad disponible, precio, imagen de portada, puntuación media basada en reseñas de usuarios, y las propias reseñas con datos como el usuario, puntuación, comentario y fecha. Este esquema facilita la gestión completa de libros en una aplicación, permitiendo la organización y consulta eficiente de datos relacionados con la biblioteca virtual.

![](https://i.ibb.co/F7HLsBQ/Imagen-de-Whats-App-2024-06-27-a-las-21-00-58-71a16010.jpg)

### Endpoints empleados en Backend

#### Endpoint para Libros

![](https://i.ibb.co/Nj7tg4Q/image.png)

| Endpoint             | Tipo de Petición | Descripción |
| --                    | -- | -- |
| /api/libro    | POST  | Crea un libro nuevo |
| /api/libro    | GET   | Obtiene todos los libros |
| /api/libro/{id}| POST | Agrega una reseña de un libro |
| /api/libro/{id}| PUT  | Actualiza un libro por ID |
| /api/libro/{id}| DELETE| Elimina un libro por ID |

#### Endpoint para Autores

![](https://i.ibb.co/x8tVWQT/image.png)

| Endpoint             | Tipo de Petición | Descripción |
| --                    | -- | -- |
| /api/autor    | POST  | Crea un autor nuevo |
| /api/autor    | GET   | Obtiene todos los autores, con filtrado opcional por nombre |
| /api/autor/{id}| GET | Obtiene un autor por ID |
| /api/autor/{id}| DELETE| Elimina un autor por ID |

#### Endpoint para Compras

![](https://i.ibb.co/92WG3Yz/image.png)

| Endpoint             | Tipo de Petición | Descripción |
| --                    | -- | -- |
| /api/compras    | POST  | Realiza una nueva compra |
| /api/compras    | GET   | Obtener todas las compras |
| /api/compras/usuario/{usuarioid}| GET | Obtener compras de un usuario en específico |
| /api/compras/{compraid}| PATCH| Actualiza el estado de una compra |

#### Endpoint para Pedidos

![](https://i.ibb.co/CWJgPwf/image.png)

| Endpoint             | Tipo de Petición | Descripción |
| --                    | -- | -- |
| /api/pedido/carrito    | POST  | Agregar libro al carrito |
| /api/pedido/carrito/{usuarioid}    | PUT   | Actualizar carrito |
| /api/pedido/carrito/{usuarioid}| GET | Obtener carrito del usuario |
| /api/pedido/checkout/{compraid}| POST | Proceder al checkout |

#### Endpoint para Reportes

![](https://i.ibb.co/Db6kTLD/image.png)

| Endpoint             | Tipo de Petición | Descripción |
| --                    | -- | -- |
| /api/reporte/top-libros| GET | Obtener el top de libros más vendidos |

#### Endpoint para Usuarios

![](https://i.ibb.co/0ZTNSnb/image.png)

| Endpoint             | Tipo de Petición | Descripción |
| --                    | -- | -- |
| /api/usuario/register    | POST  | Registrar un nuevo usuario |
| /api/usuario/login    | POST  | Iniciar sesión |
| /api/usuario/profile/{id}| GET | Obtener perfil del usuario |
| /api/usuario/update-profile/{id}| PATCH | Actualizar perfil del usuario |
| /api/usuario| GET | Obtener lista de usuarios |