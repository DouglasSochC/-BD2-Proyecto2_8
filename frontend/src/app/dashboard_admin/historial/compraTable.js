import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';


const CompraTable = ({ compras, onOpenDialog }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>NO</TableCell>
            <TableCell>DESCRIPCIÓN DE COMPRA</TableCell>
            <TableCell>ACCIÓN</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {compras.map((compra, index) => (
            <TableRow key={compra.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{compra.nombre}</TableCell>
              <TableCell>
                <IconButton onClick={() => onOpenDialog(compra)}>
                    ver
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CompraTable;
