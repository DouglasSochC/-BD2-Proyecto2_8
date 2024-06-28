"use client";

import React, { useState, useEffect } from 'react';
// Axios
import { handleAxios, handleAxiosError } from '@/helpers/axiosConfig';
// DataTable
import DataTable from 'react-data-table-component';

const Historial = () => {

  const [items, setItems] = useState([]);

  const obtenerCompras = async () => {
    try {
      const response = await handleAxios().get(`/compra`);
      setItems(response.data);
    } catch (error) {
      handleAxiosError(error);
    }
  }

  useEffect(() => {
    obtenerCompras();
  }, []);

  const columnas = [
    {
      name: 'Usuario',
      selector: row => row.usuario.nombre,
      sortable: true,
      wrap: true,
    },
    {
      name: 'Direccion Envio',
      selector: row => row.direccionEnvio,
      sortable: true,
      wrap: true,
    },
    {
      name: 'Metodo Pago',
      selector: row => row.metodoPago,
      wrap: true,
    },
    {
      name: 'Total',
      selector: row => row.total,
      wrap: true,
    },
    {
      name: 'Estado',
      selector: row => row.estado,
      wrap: true,
    },
    {
      name: 'Creacion de Orden',
      selector: row => row.createdAt,
      wrap: true,
    },
    {
      name: 'Libros',
      cell: row => (
        <>
          {row.libros.map((libro, index) => (
            <p key={index}>
              {libro.libro.titulo} - {libro.cantidad}
            </p>
          ))}
        </>
      )
    },
  ];

  return (
    <DataTable
      title="Historial"
      columns={columnas}
      data={items}
      pagination
    />
  );
}

export default Historial;