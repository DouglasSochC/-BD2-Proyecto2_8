'use client'
// components/Carrito.js
import React, { useState, useEffect } from 'react';
import { handleAxios, handleAxiosMultipart, handleAxiosError, handleAxiosMsg } from '@/helpers/axiosConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Carrito = () => {
  const [items, setItems] = useState([]);
  const [direccionEnvio, setDireccionEnvio] = useState('123 Calle Falsa, Springfield');
  const [metodoPago, setMetodoPago] = useState('Efectivo');
  const [detallesPago, setDetallesPago] = useState('');
  const [total, setTotal] = useState(0.00); // Estado para el total
  const usuarioId = "667cbe44696b207f66f38e04"; // TODO: cambiar por el usuario real

  // Función para obtener el pedido del carrito
  const obtenerPedido = async () => {
    try {
      const response = await handleAxios().get(`/pedido/carrito/${usuarioId}`);
      const data = response.data.data;
      console.log("data: ", data);
      setItems(data.pedido.libros); // Ajusta según la estructura real de tus datos
      setTotal(data.pedido.total || 0.00); // Ajusta según los datos reales que regresen y establece 0.00 si no hay valor
      setDireccionEnvio(data.direccionEnvio); // Ajusta según los datos reales que regresen
    } catch (error) {
      handleAxiosError(error);
    }
  };

  useEffect(() => {
    obtenerPedido();
  }, []);

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
  const handleCheckout = async (e) => {
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

    try {
      const response = await handleAxios().post('/api/pedido', pedido);
      console.log('Pedido realizado:', response.data);
      // Redirigir al usuario a una página de confirmación o estado del pedido
    } catch (error) {
      handleAxiosError(error);
    }
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
                <small className="text-muted">Cantidad: {item.precio}</small>
              </div>
              <div className="d-flex align-items-center">
                <span className="text-muted me-3">${(item.cantidad * item.precio).toFixed(2)}</span>
                <button className="btn btn-danger btn-sm" onClick={() => handleEliminar(item._id)}>
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
