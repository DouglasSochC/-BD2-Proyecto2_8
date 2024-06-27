'use client'

// React
import React, { useEffect, useState } from 'react';
// Bootstrap
import { Card, Row, Col, ListGroup, Accordion, Form, Button } from 'react-bootstrap';
// ReactStars
import { Rating } from 'react-simple-star-rating'
// Axios
import { handleAxios, handleAxiosError } from '@/helpers/axiosConfig';
// Next
import { useSearchParams } from 'next/navigation';
// Session
import { obtenerDatosUsuario } from "@/helpers/session";

const Libro = () => {

  const searchParams = useSearchParams();
  const [libro, setLibro] = useState(null);
  const [puntuacion, setPuntuacion] = useState(0);
  const [resenas, setResenas] = useState([]);

  const handleHacerResena = async (e) => {

    e.preventDefault();

    try {
      const formData = new FormData();
      const id = searchParams.get('id');
      const comentario = e.target[0].value;
      const usuario = obtenerDatosUsuario();
      formData.append('comentario', comentario);
      formData.append('puntuacion', puntuacion);
      formData.append('usuario', usuario._id);
      const response = await handleAxios().post(`/libro/${id}/resenas`, formData);
      const libroAux = response.data.data.libro;
      setLibro({ ...libro, puntuacionMedia: libroAux.puntuacionMedia });
      setResenas(libroAux.resenas);

      // Se limpia el formulario
      e.target[0].value = '';
      setPuntuacion(0);
    }
    catch (error) {
      handleAxiosError(error);
    }

  }

  useEffect(() => {

    const id = searchParams.get('id');
    if (id != null) {
      const obtenerLibro = async () => {
        try {
          const response = await handleAxios().get('/libro/' + id);
          setLibro(response.data);
          setResenas(response.data.resenas);
        } catch (error) {
          handleAxiosError(error);
        }
      }
      obtenerLibro();
    }

  }, []);

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col md={3}>
            <Card.Img variant="top" src={libro ? libro.imagen : 'https://via.placeholder.com/150'} /> {/* Reemplaza con la URL de la imagen */}
            <Rating
              initialValue={libro ? libro.puntuacionMedia : 0}
              readonly
              size={50}
              showTooltip={true}
              tooltipDefaultText="Sin puntuación"
            />
          </Col>
          <Col md={9}>
            <Card.Title>{libro ? libro.titulo : ''}</Card.Title>
            <Card.Text><b>Autor:</b> {libro ? libro.autor.nombre : ''}</Card.Text>
            <Card.Text><b>Genero: </b>{libro ? libro.genero : ''}</Card.Text>
            <Card.Text><b>Cantidad disponible: </b>{libro ? libro.cantidadDisponible : ''}</Card.Text>
            <Card.Text><b>Descripcion: </b>{libro ? libro.descripcion : ''}</Card.Text>

            <b>Agregar Reseña: </b>
            <Form onSubmit={handleHacerResena}>
              <Form.Group>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
              <Form.Group>
                <Rating
                  size={25}
                  initialValue={puntuacion}
                  onClick={(value) => setPuntuacion(value)}
                />
              </Form.Group>
              <br />
              <Button variant="primary" type="submit">
                Enviar
              </Button>
            </Form>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={12}>
            <h5>Reseñas</h5>
            <ListGroup variant="flush">
              <Accordion defaultActiveKey="0">
                {resenas.map((resena, index) => (
                  <Accordion.Item eventKey={index} key={index}>
                    <Accordion.Header>{index + 1} - Comentario de '{resena.usuarioNombre}'</Accordion.Header>
                    <Accordion.Body>
                      <Row className="my-4">
                        <Col xs={12} md={12}>
                          <b>Fecha de publicación: </b>{resena.fecha}<br />
                          <b>Puntuación: </b><Rating
                            size={20}
                            initialValue={resena.puntuacion}
                          /><br />
                          <b>Comentario: </b>{resena.comentario}<br />
                        </Col>
                      </Row>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </ListGroup>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Libro;
