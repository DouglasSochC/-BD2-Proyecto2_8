'use client';

import { Row, Col, Button, Form, Card } from 'react-bootstrap';
import { handleAxiosError, handleSwal, handleAxios } from '@/helpers/axiosConfig';
import { obtenerDatosUsuario } from "@/helpers/session";

function PerfilUsuario() {

  const handleSubmit = async (e) => {
    
  }

  const usuario = obtenerDatosUsuario();

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Perfil de Usuario</h5>
        <Form>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Correo Electronico</Form.Label>
                <Form.Control required type="email" id="correoElectronico" name="correoElectronico" placeholder="example@company.com" autoComplete='off' value={usuario.correoElectronico} disabled />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control autoFocus required id="nombre" name="nombre" type="text" placeholder="Juan" autoComplete='off' value={usuario.nombre} />
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group id="lastName">
                <Form.Label>Apellido</Form.Label>
                <Form.Control required id="apellido" name="apellido" type="text" placeholder="Perez" autoComplete='off' value={usuario.apellido} />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="birthday">
                <Form.Label>Edad</Form.Label>
                <Form.Control required id="edad" name="edad" type="number" placeholder="18" autoComplete='off' value={usuario.edad} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="gender">
                <Form.Label>Direccion de Envio</Form.Label>
                <Form.Control required id="direccionEnvio" name="direccionEnvio" type="text" placeholder="Calle Falsa 123" autoComplete='off' value={usuario.direccionEnvio} />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="emal">
                <Form.Label>Metodo de Pago</Form.Label>
                <Form.Control required id="metodoPago" name="metodoPago" type="text" placeholder="Efectivo" autoComplete='off' value={usuario.metodoPago} />
              </Form.Group>
            </Col>
          </Row>
          <h5 className="my-4">Cambio de contraseña</h5>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="emal">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control required id="contrasena" name="contrasena" type="password" placeholder="Contraseña" autoComplete='off' />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="emal">
                <Form.Label>Confirmar Contraseña</Form.Label>
                <Form.Control required id="confContrasena" name="confContrasena" type="password" placeholder="Confirmar contraseña" autoComplete='off' />
              </Form.Group>
            </Col>
          </Row>
          <div className="mt-3">
            <Button variant="primary" type="submit">Guardar cambios</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default PerfilUsuario;