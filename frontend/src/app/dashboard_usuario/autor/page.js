'use client'

// React
import React, { useEffect, useState } from 'react';
// Bootstrap
import { Container, Row, Col, Accordion, Image } from 'react-bootstrap';
// Axios
import { handleAxios, handleAxiosError } from '@/helpers/axiosConfig';
// Next
import { useSearchParams } from 'next/navigation';

const Autor = () => {

  const searchParams = useSearchParams()

  const [autor, setAutor] = useState(null);
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    const id = searchParams.get('id');
    if (id != null) {
      const obtenerAutor = async () => {
        try {
          const responseAutor = await handleAxios().get('/autor/' + id);
          const data = responseAutor.data.data.autor;
          setAutor(data);
          const responseLibros = await handleAxios().get('/libro', {
            params: {
              autor: data._id
            }
          });
          setLibros(responseLibros.data);
        } catch (error) {
          handleAxiosError(error);
        }
      }
      obtenerAutor();
    }
  }, []);

  return (
    <Container>
      <Row className="my-4">
        <Col xs={12} md={3}>
          <Image src={autor ? autor.foto : 'https://via.placeholder.com/150'} style={{ width: 'auto', height: '300px', aspectRatio: '3/4' }} />
        </Col>
        <Col xs={12} md={9}>
          <h1>{autor ? autor.nombre : ''}</h1>
          <p>{autor ? autor.biografia : ''}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Accordion defaultActiveKey="0">
            {libros.map((libro, index) => (
              <Accordion.Item eventKey={index} key={index}>
                <Accordion.Header>{libro.titulo}</Accordion.Header>
                <Accordion.Body>
                  <Row className="my-4">
                    <Col xs={12} md={3}>
                      <Image src={libro ? libro.imagen : 'https://via.placeholder.com/150'} style={{ width: 'auto', height: '300px', aspectRatio: '3/4' }} />
                    </Col>
                    <Col xs={12} md={9}>
                      <b>Fecha de publicación: </b>{libro.fechaPublicacion}<br />
                      <b>Genero: </b>{libro.genero}<br />
                      <b>Precio: </b>{libro.precio}<br />
                      <b>Cantidad disponible: </b>{libro.cantidadDisponible}<br />
                      <b>Descripcion: </b>{libro.descripcion}
                    </Col>
                  </Row>
                  {libro.detalles}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

export default Autor;
