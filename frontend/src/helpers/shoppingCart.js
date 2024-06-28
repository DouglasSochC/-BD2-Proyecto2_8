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
  carrito[index].cantidad += cantidad;
  localStorage.setItem("cp" + usuario._id, JSON.stringify(carrito));
};

// Obtener todos los productos
export const obtenerProductosCarrito = () => {
  return JSON.parse(localStorage.getItem("cp" + usuario._id));
};