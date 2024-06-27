'use client'
// components/Carrito.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Carrito = () => {

  // Datos simulados para el ejemplo
  const [items, setItems] = useState([
    { id: 1, name: 'Libro 1', price: 29.99, quantity: 1 },
    { id: 2, name: 'Libro 2', price: 19.99, quantity: 2 },
  ]);

  // Estado para los detalles del checkout
  const [direccionEnvio, setDireccionEnvio] = useState('123 Calle Falsa, Springfield');
  const [metodoPago, setMetodoPago] = useState('Efectivo');
  const [detallesPago, setDetallesPago] = useState('');

  // Calcular el total
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Manejar la eliminación de un producto
  const handleEliminar = (id) => {
    const nuevosItems = items.filter(item => item.id !== id);
    setItems(nuevosItems);
  };

  // Manejar el cambio de método de pago
  const handleMetodoPagoChange = (e) => {
    setMetodoPago(e.target.value);
    setDetallesPago(''); // Restablecer los detalles del pago
  };

  // Manejar el envío del formulario de checkout
  const handleCheckout = (e) => {
    e.preventDefault();
    const pedido = {
      items,
      total,
      direccionEnvio,
      metodoPago,
      detallesPago,
      estado: 'En proceso',
      fechaPedido: new Date()
    };
    console.log('Pedido realizado:', pedido);
    // Aquí podrías hacer una llamada a tu backend para guardar el pedido
    // y luego redirigir al usuario a una página de confirmación o estado del pedido
    router.push('/confirmacion');
  };

  return (
    <div className="container">
      <h1>Carrito de Compras</h1>
      {items.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <ul className="list-group mb-3">
          {items.map(item => (
            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h6 className="my-0">{item.name}</h6>
                <small className="text-muted">Cantidad: {item.quantity}</small>
              </div>
              <div className="d-flex align-items-center">
                <span className="text-muted me-3">${(item.price * item.quantity).toFixed(2)}</span>
                <button className="btn btn-danger btn-sm" onClick={() => handleEliminar(item.id)}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <h4>Total: ${total.toFixed(2)}</h4>
      <form onSubmit={handleCheckout}>
        <div className="mb-3">
          <label htmlFor="direccionEnvio" className="form-label">Dirección de Envío</label>
          <input
            type="text"
            className="form-control"
            id="direccionEnvio"
            value={direccionEnvio}
            onChange={(e) => setDireccionEnvio(e.target.value)}
            placeholder="Ingresa tu dirección de envío"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="metodoPago" className="form-label">Método de Pago</label>
          <select
            className="form-select"
            id="metodoPago"
            value={metodoPago}
            onChange={handleMetodoPagoChange}
            required
          >
            <option value="Efectivo">Efectivo</option>
            <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
          </select>
        </div>
        {metodoPago === 'Tarjeta de Crédito' && (
          <div className="mb-3">
            <label htmlFor="detallesPago" className="form-label">Número de Tarjeta</label>
            <input
              type="text"
              className="form-control"
              id="detallesPago"
              value={detallesPago}
              onChange={(e) => setDetallesPago(e.target.value)}
              placeholder="Ingresa el número de tu tarjeta de crédito"
              required
            />
          </div>
        )}
        {metodoPago === 'Efectivo' && (
          <div className="mb-3">
            <label htmlFor="detallesPago" className="form-label">Monto en Efectivo</label>
            <input
              type="number"
              className="form-control"
              id="detallesPago"
              value={detallesPago}
              onChange={(e) => setDetallesPago(e.target.value)}
              placeholder="Ingresa el monto a pagar en efectivo"
              required
            />
          </div>
        )}
        <button type="submit" className="btn btn-primary">Confirmar Pedido</button>
      </form>
    </div>
  );
};

export default Carrito;
