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
          </TableRow>
        </TableHead>
        <TableBody>
          {compras.map((compra, index) => (
            <TableRow key={compra.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{compra.nombre}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CompraTable;
