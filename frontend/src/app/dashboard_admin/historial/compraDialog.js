import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem } from '@mui/material';
import { handleAxiosError,  handleAxios } from '@/helpers/axiosConfig';

const estados = ['En proceso', 'Enviado', 'Entregado'];

const CompraDialog = ({ compra, onClose, onUpdateEstado }) => {
  const [state, setState] = React.useState(compra.estado);

  const handleChangeEstado = (event) => {
    setState(event.target.value);
  };

  const handleSave = async () => {
    onUpdateEstado(compra.id, state);
    try {
      const formData = {estado:state}
      const response = await handleAxios().patch('/compra/1', formData); //TODO: cambiar endpoint por la compraid
      console.log(response);
    } catch (error) {
      handleAxiosError(error);
    }
    onClose();
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Detalle de la Compra</DialogTitle>
      <DialogContent>
        <TextField
          label="Nombre del libro"
          value={compra.nombre}
          fullWidth
          margin="dense"
          disabled
        />
        <TextField
          label="Estado"
          select
          value={state}
          onChange={handleChangeEstado}
          fullWidth
          margin="dense"
        >
          {estados.map((estado) => (
            <MenuItem key={estado} value={estado}>
              {estado}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Dirección de Envío"
          value={compra.direccionEnvio}
          fullWidth
          margin="dense"
          disabled
        />
        <TextField
          label="Método de Pago"
          value={compra.metodoPago}
          fullWidth
          margin="dense"
          disabled
        />
        <TextField
          label="Fecha de Compra"
          value={compra.fechaCompra.toLocaleDateString()}
          fullWidth
          margin="dense"
          disabled
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSave} color="primary">Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CompraDialog;
