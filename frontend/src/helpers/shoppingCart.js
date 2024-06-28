import { obtenerDatosUsuario } from '@/helpers/session';
const usuario = obtenerDatosUsuario();

// Crear variable en el almacenamiento local para el carrito
export const crearCarrito = () => {
  localStorage.setItem("cp" + usuario._id, JSON.stringify([]));
};

// Agregar nuevo producto en el carrito
export const agregarProductoCarrito = (producto) => {

  // Verifica si el carrito ya existe
  if (!localStorage.getItem("cp" + usuario._id)) {
    crearCarrito();
  }

  // Busca si el producto ya está en el carrito
  const carrito = JSON.parse(localStorage.getItem("cp" + usuario._id));
  const index = carrito.findIndex((p) => p.id_libro === producto.id_libro);

  // Si el producto ya está en el carrito, aumenta la cantidad
  if (index !== -1) {
    carrito[index].cantidad += producto.cantidad;
    localStorage.setItem("cp" + usuario._id, JSON.stringify(carrito));
    return;
  }

  // Si el producto no esta en el carrito, agrega como un nuevo registro
  carrito.push(producto);
  localStorage.setItem("cp" + usuario._id, JSON.stringify(carrito));
};

// Se suma la cantidad N de un producto en el carrito
export const sumarProductoCarrito = (id_libro, cantidad) => {
  const carrito = JSON.parse(localStorage.getItem("cp" + usuario._id));
  const index = carrito.findIndex((p) => p.id_libro === id_libro);

  // Se verifica si la suma del producto da 0
  if (carrito[index].cantidad + cantidad <= 0) {
    return;
  }
  carrito[index].cantidad += cantidad;
  localStorage.setItem("cp" + usuario._id, JSON.stringify(carrito));
};

// Eliminar un producto del carrito
export const eliminarProductoCarrito = (id_libro) => {
  const carrito = JSON.parse(localStorage.getItem("cp" + usuario._id));
  const index = carrito.findIndex((p) => p.id_libro === id_libro);
  carrito.splice(index, 1);
  localStorage.setItem("cp" + usuario._id, JSON.stringify(carrito));
};

// Eliminar el carrito
export const eliminarCarrito = () => {
  localStorage.removeItem("cp" + usuario._id);
};

// Obtener todos los productos
export const obtenerProductosCarrito = () => {
  // Verifica si el carrito ya existe
  if (!localStorage.getItem("cp" + usuario._id)) {
    return [];
  }

  return JSON.parse(localStorage.getItem("cp" + usuario._id));
};