'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link'
import Cookies from 'js-cookie';
import { Row, Col, Button, Form, InputGroup, Container } from 'react-bootstrap';
import { faEnvelope, faUnlockAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';

// const MySwal = withReactContent(Swal);

const Login = () => {

  const router = useRouter();
  const handleIniciarSesion = async (e) => {

    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData.entries());
    console.log(data);

    if (data.email === 'admin@email.com') {
      Cookies.set('auth', JSON.stringify({ username: 'admin', isAdmin: true }), { expires: 1/24 });
    } else if (data.email === 'usuario@email.com') {
      Cookies.set('auth', JSON.stringify({ username: 'usuario', isAdmin: false }), { expires: 1/24 });
    }

    router.push('/dashboard_admin');

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
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">

        <Container>
          <p className="text-center">
            <br /><br />
          </p>
          <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(/signin.svg)` }}>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">

                  <br />
                  <h3 className="mb-0">Inicio de Sesión</h3>
                </div>
                <Form className="mt-4" onSubmit={handleIniciarSesion}>
                  <Form.Group className="mb-4">
                    <Form.Label>Correo electronico</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control id="email" name="email" autoFocus required type="email" placeholder="example@company.com" />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group className="mb-4">
                      <Form.Label>Contraseña</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control id="password" name="password" required type="password" placeholder="Contraseña" />
                      </InputGroup>
                    </Form.Group>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    Iniciar Sesión
                  </Button>
                </Form>
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    ¿No tienes una cuenta?
                    <Link href="signup" className="fw-bold">
                      &nbsp;Crear cuenta
                    </Link>
                    <br /><br />
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

export default Login;
