'use client';

import { Row, Col, Button, Form, Card, Image } from 'react-bootstrap';
import { handleAxiosError, handleSwal, handleAxiosMsg, handleAxios } from '@/helpers/axiosConfig';
import { obtenerDatosUsuario } from "@/helpers/session";
import { crearSession } from '@/helpers/session';

function PerfilUsuario() {

  const usuario = obtenerDatosUsuario();

  const handleGuardarCambios = async (e) => {

    e.preventDefault();

    try {

      // Se obtienen los valores del formulario
      const formData = new FormData(e.currentTarget);

      // En el caso que se valide la contrasena
      if (formData.get('contrasena') != "") {
        // Se realiza la comparacion entre la contraseña y la confirmacion de la contraseña
        if (formData.get('contrasena') !== formData.get('confContrasena')) {
          handleSwal().fire({
            title: 'Aviso',
            text: "Las contraseñas no coinciden",
            icon: 'warning'
          });
          return;
        }
      }
      // Se elimina el dato de la confirmacion de la contrasena
      formData.delete('confContrasena');

      // Se envia la peticion al servidor y se obtiene el mensaje
      const res = await handleAxios().patch('/usuario/update-profile/' + usuario._id, formData);
      handleAxiosMsg("Usuario actualizado correctamente").then(() => {
        crearSession(res.data.data.usuario);
        window.location.reload();
      });

    } catch (error) {
      handleAxiosError(error);
    }
  }

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Perfil de Usuario</h5>
        <Form onSubmit={handleGuardarCambios}>
          <Row className="justify-content-center">
            <Image src={usuario && usuario.urlImagen ? usuario.urlImagen : '/user_icon.png'} rounded style={{ width: '200px', height: 'auto', aspectRatio: '1/1' }} />
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Correo Electronico</Form.Label>
                <Form.Control required type="email" id="correoElectronico" name="correoElectronico" placeholder="example@company.com" autoComplete='off' defaultValue={usuario ? usuario.correoElectronico : ''} disabled />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control autoFocus required id="nombre" name="nombre" type="text" placeholder="Juan" autoComplete='off' defaultValue={usuario ? usuario.nombre : ''} />
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group id="lastName">
                <Form.Label>Apellido</Form.Label>
                <Form.Control required id="apellido" name="apellido" type="text" placeholder="Perez" autoComplete='off' defaultValue={usuario ? usuario.apellido : ''} />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="birthday">
                <Form.Label>Edad</Form.Label>
                <Form.Control required id="edad" name="edad" type="number" placeholder="18" autoComplete='off' defaultValue={usuario ? usuario.edad : ''} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="gender">
                <Form.Label>Direccion de Envio</Form.Label>
                <Form.Control required id="direccionEnvio" name="direccionEnvio" type="text" placeholder="Calle Falsa 123" autoComplete='off' defaultValue={usuario ? usuario.direccionEnvio : ''} />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="emal">
                <Form.Label>Metodo de Pago</Form.Label>
                <Form.Control required id="metodoPago" name="metodoPago" type="text" placeholder="Efectivo" autoComplete='off' defaultValue={usuario ? usuario.metodoPago : ''} />
              </Form.Group>
            </Col>
          </Row>
          <h5 className="my-4">Cambio de contraseña</h5>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="emal">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control id="contrasena" name="contrasena" type="password" placeholder="Contraseña" autoComplete='off' />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="emal">
                <Form.Label>Confirmar Contraseña</Form.Label>
                <Form.Control id="confContrasena" name="confContrasena" type="password" placeholder="Confirmar contraseña" autoComplete='off' />
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