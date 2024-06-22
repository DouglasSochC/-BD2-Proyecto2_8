'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { Card, Row, Col, Button, Form, InputGroup } from 'react-bootstrap';
import FeatherIcon from 'feather-icons-react';

// const MySwal = withReactContent(Swal);

const Login = () => {

  const handleIniciarSesion = async (e) => {

    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData.entries());

    console.log(data);
    // Cookies.set('auth', JSON.stringify({ username: 'Hola', isAdmin: true }));
    // router.push('/dashboard_admin');

    // try {
    //   const res = await axiosInstance.post('/login', formData);
    //   MySwal.fire({
    //     title: 'Hecho',
    //     text: res.data.message,
    //     icon: 'success'
    //   }).then(() => {
    //     if (res.status === 200) {
    //       login(res.data.user);
    //       router.push("/");
    //     }
    //   });

    // } catch (error) {
    //   handleAxiosError(error);
    // }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-content text-center">
        <Card className="borderless">
          <Row className="align-items-center text-center">
            <Col>
              <Card.Body className="card-body">
                <h4 className="mb-3 f-w-400">Inicio de Sesión</h4>
                <Form onSubmit={handleIniciarSesion}>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>
                      <FeatherIcon icon="mail" />
                    </InputGroup.Text>
                    <Form.Control id="email" name="email" type="email" placeholder="Correo electronico" />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>
                      <FeatherIcon icon="lock" />
                    </InputGroup.Text>
                    <Form.Control id="password" name="password" type="password" placeholder="Contraseña" />
                  </InputGroup>
                  <Button type="submit" className="btn btn-block btn-primary mb-4">Iniciar Sesión</Button>
                </Form>
                <p className="mb-0 text-muted">
                  ¿No tienes una cuenta?{' '}
                  {/* <NavLink to="/auth/signup-1" className="f-w-400">
                                    Signup
                                </NavLink> */}
                </p>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default Login;
