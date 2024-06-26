"use client";

import React, { useState, useEffect } from 'react';
// Axios
import { handleAxios, handleAxiosMultipart, handleAxiosError, handleAxiosMsg } from '@/helpers/axiosConfig';
// Bootstrap
import CompraTable from './compraTable';
import CompraDialog from './compraDialog';
// Bootstrap
import { Col, Row, Form, Modal, Table, Button } from 'react-bootstrap';



const Historial = () => {
    
     // Obtencion de los compras
  const [compras, setCompras] = useState([]);
  const obtenerCompras = async () => {
    try {
      const response = await handleAxios().get('/compra');
      const data = response.data.data;
  console.log("comrpas", compras, data);

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

    // data: {
    //  compras
    //}

    useEffect(() => {
        obtenerCompras();
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