'use client'

// React
import React, { useState, useEffect } from 'react';
// Boostrap
import { Row, Col, Button, Form, Card } from 'react-bootstrap';
// Axios
import { handleAxios, handleAxiosError, handleAxiosMsg } from '@/helpers/axiosConfig';
// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
// Helpers
import { obtenerDatosUsuario } from "@/helpers/session";
import { obtenerProductosCarrito, eliminarProductoCarrito, eliminarCarrito, sumarProductoCarrito } from "@/helpers/shoppingCart";
// DataTable
import DataTable from 'react-data-table-component';

const Carrito = () => {

  const usuario = obtenerDatosUsuario();
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(obtenerProductosCarrito());
  }, []);

  // Realizar orden
  const handleRealizarOrden = async (e) => {

    e.preventDefault();

    try {

      // Se crea un formulario vacio
      const formData = new FormData();
      formData.set('usuario', usuario._id);
      formData.set('direccionEnvio', usuario.direccionEnvio);
      formData.set('metodoPago', usuario.metodoPago);

      // Se formatea los datos de los libros a una nueva variable
      let librosAux = [];
      for (let item of items) {
        librosAux.push({ libro: item.id_libro, cantidad: item.cantidad, precio: item.precio });
      }
      formData.set('libros', JSON.stringify(librosAux));

      // Se envia la peticion al servidor y se obtiene el mensaje
      await handleAxios().post('/compra', formData);
      handleAxiosMsg("Autor creado correctamente").then(() => {
        window.location.reload();
        eliminarCarrito();
      });

    } catch (error) {
      handleAxiosError(error);
    }
  }

  // Handle para eliminar un producto del carrito
  const handleEliminarProductoCarrito = (id_libro) => {
    eliminarProductoCarrito(id_libro);
    setItems(obtenerProductosCarrito());
  }

  // Agregar una unidad de un producto
  const handleModificarCantidad = (id_libro, cantidad) => {
    sumarProductoCarrito(id_libro, cantidad);
    setItems(obtenerProductosCarrito());
  }

  const columnas = [
    {
      name: 'Nombre',
      selector: row => row.nombre_libro,
      sortable: true,
      wrap: true,
    },
    {
      name: 'Cantidad',
      selector: row => row.cantidad,
      wrap: true,
    },
    {
      name: 'Precio',
      selector: row => row.precio,
      wrap: true,
    },
    {
      name: 'Total',
      selector: row => (row.cantidad * row.precio),
      wrap: true,
    },
    {
      name: 'Acciones',
      cell: row => (
        <>
          <Button variant="danger" onClick={() => handleEliminarProductoCarrito(row.id_libro)}>
            <FontAwesomeIcon icon={faTrashCan} />
          </Button>
          <Button variant="success" onClick={() => handleModificarCantidad(row.id_libro, -1)}>
            <FontAwesomeIcon icon={faMinus} />
          </Button>
          <Button variant="success" onClick={() => handleModificarCantidad(row.id_libro, 1)}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </>
      )
    },
  ];

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Carrito de compras</h5>
        <Form onSubmit={handleRealizarOrden}>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Correo Electronico</Form.Label>
                <Form.Control required type="email" id="correoElectronico" name="correoElectronico" placeholder="example@company.com" autoComplete='off' defaultValue={usuario ? usuario.correoElectronico : ''} disabled />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Nombre completo</Form.Label>
                <Form.Control autoFocus required id="nombre" name="nombre" type="text" placeholder="Juan" autoComplete='off' defaultValue={usuario ? usuario.nombre + usuario.apellido : ''} disabled />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="gender">
                <Form.Label>Direccion de Envio</Form.Label>
                <Form.Control required id="direccionEnvio" name="direccionEnvio" type="text" placeholder="Calle Falsa 123" autoComplete='off' defaultValue={usuario ? usuario.direccionEnvio : ''} disabled />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="emal">
                <Form.Label>Metodo de Pago</Form.Label>
                <Form.Control required id="metodoPago" name="metodoPago" type="text" placeholder="Efectivo" autoComplete='off' defaultValue={usuario ? usuario.metodoPago : ''} disabled />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <DataTable
              title="Autores"
              columns={columnas}
              data={items}
              pagination
            />
          </Row>
          <div className="mt-3">
            <Button variant="primary" type="submit">Realizar orden</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Carrito;
