"use client";

import React, { useState, useEffect } from 'react';
// Axios
import { handleAxios,  handleAxiosError} from '@/helpers/axiosConfig';
// Bootstrap
import CompraTable from './compraTable';
import CompraDialog from './compraDialog';
import { obtenerDatosUsuario } from '@/helpers/session';
// Bootstrap

/*const compras1 = [
    {
      usuario: 1,
      libros: [
        {
          libro: 20,
          cantidad: 2,
          precio: 15.99
        },
        {
          libro: 30,
          cantidad: 1,
          precio: 12.99
        }
      ],
      total: 39.97,
      estado: 'En proceso',
      direccionEnvio: '123 Main St',
      metodoPago: 'Tarjeta de crédito',
      fechaCompra: '2020/05/16'
    },
  ]*/

const Historial = () => {

  // Obtencion del usuario
  const usuario = obtenerDatosUsuario();
    
     // Obtencion de los compras
  const [compras, setCompras] = useState([]);
  const obtenerCompras = async () => {
    try {
      const response = await handleAxios().get(`/compra/usuario/${usuario._id}`); //TODO: cambiar endpoint por el usuario http://localhost:5000/api/compra/${compra._id}
      const data = response.data;
  

      setCompras(data);
    } catch (error) {
      handleAxiosError(error);
    }
  }


    const [selectedCompra, setSelectedCompra] = useState(null);

    const handleOpenDialog = (compra) => {
        setSelectedCompra(compra);
    };

    const handleCloseDialog = () => {
        setSelectedCompra(null);
    };

    const handleUpdateEstado = (id, nuevoEstado) => {
        setSelectedCompra((prevCompra) => ({
            ...prevCompra,
            estado: nuevoEstado
        }));
        // Aquí deberías actualizar el estado en tu base de datos también
    };

    useEffect(() => {
        obtenerCompras();
        //setCompras(compras1)
      }, []);

    return (
        <div>
            <div>
                <h1>HISTORIAL</h1>
                <CompraTable compras={compras} onOpenDialog={handleOpenDialog} />
                {selectedCompra && (
                    <CompraDialog
                        compra={selectedCompra}
                        onClose={handleCloseDialog}
                        onUpdateEstado={handleUpdateEstado}
                    />
                )}
            </div>

        </div>
    );
}

export default Historial;