'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link'
import { crearSession } from '@/helpers/session';
import { Row, Col, Button, Form, InputGroup, Container } from 'react-bootstrap';
import { faEnvelope, faUser, faMapLocation, faHashtag, faMoneyBill, faUnlockAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { handleAxiosError, handleSwal, handleAxios } from '@/helpers/axiosConfig';

const MySwal = handleSwal();

const SignUp = () => {

  const router = useRouter();
  const handleSignUp = async (e) => {

    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const res = await handleAxios().post('/usuario/register', formData);
      MySwal.fire({
        title: 'Hecho',
        text: "Usuario registrado exitosamente",
        icon: 'success'
      }).then(() => {
        if (res.status === 201) {
          console.log(res);
          crearSession(res.data.data.usuario);
          router.push("/");
        }
      });
    } catch (error) {
      handleAxiosError(error);
    }
  };

  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <p className="text-center">
            <br /><br />
          </p>
          <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(/signin.svg)` }}>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-4 w-100 fmxw-700">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Creación de cuenta</h3>
                </div>
                <Form className="mt-4" onSubmit={handleSignUp}>
                  <Row>
                    <Col md={6}>
                      <Form.Group id="nombre" className="mb-4">
                        <Form.Label>Nombre</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={faUser} />
                          </InputGroup.Text>
                          <Form.Control autoFocus required id="nombre" name="nombre" type="text" placeholder="Juan" autoComplete='off' />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group id="apellido" className="mb-4">
                        <Form.Label>Apellido</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={faUser} />
                          </InputGroup.Text>
                          <Form.Control required id="apellido" name="apellido" type="text" placeholder="Perez" autoComplete='off' />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group id="edad" className="mb-4">
                        <Form.Label>Edad</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={faHashtag} />
                          </InputGroup.Text>
                          <Form.Control required id="edad" name="edad" type="number" placeholder="18" autoComplete='off' />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group id="direccionEnvio" className="mb-4">
                        <Form.Label>Dirección de Envío</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={faMapLocation} />
                          </InputGroup.Text>
                          <Form.Control required id="direccionEnvio" name="direccionEnvio" type="text" placeholder="Calle Falsa 123" autoComplete='off' />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group id="metodoPago" className="mb-4">
                        <Form.Label>Método de Pago</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={faMoneyBill} />
                          </InputGroup.Text>
                          <Form.Control required id="metodoPago" name="metodoPago" type="text" placeholder="Efectivo" autoComplete='off' />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group id="email" className="mb-4">
                        <Form.Label>Correo Electrónico</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={faEnvelope} />
                          </InputGroup.Text>
                          <Form.Control required type="email" id="correoElectronico" name="correoElectronico" placeholder="example@company.com" autoComplete='off' />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group id="password" className="mb-4">
                        <Form.Label>Contraseña</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={faUnlockAlt} />
                          </InputGroup.Text>
                          <Form.Control required id="contrasena" name="contrasena" type="password" placeholder="Contraseña" autoComplete='off' />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group id="confirmPassword" className="mb-4">
                        <Form.Label>Confirmar Contraseña</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={faUnlockAlt} />
                          </InputGroup.Text>
                          <Form.Control required id="confContrasena" name="confContrasena" type="password" placeholder="Confirmar contraseña" autoComplete='off' />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button variant="primary" type="submit" className="w-100">
                    Crear cuenta
                  </Button>
                </Form>

                <div className="mt-3 mb-4 text-center"></div>
                <div className="d-flex justify-content-center my-4"></div>
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    ¿Ya tienes una cuenta?
                    <Link href="login" className="fw-bold">
                      &nbsp;Iniciar sesión
                    </Link>
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default SignUp;
