'use client'

// React
import React, { useEffect } from 'react';
// Bootstrap
import { Card, Row, Col, ListGroup, Accordion, ListGroupItem, Form, Button } from 'react-bootstrap';
import { StarFill, StarHalf, Star } from 'react-bootstrap-icons';
// Axios
import { handleAxios, handleAxiosError } from '@/helpers/axiosConfig';
// Next
import { useSearchParams } from 'next/navigation';

const BookDetail = () => {

  const searchParams = useSearchParams();

  const book = {
    title: "Libro 1",
    author: "Autor 1",
    description: "Descripcion",
    genre: "Genero",
    availability: "Disponibilidad",
    rating: 4.5,
    comments: ["Comentario 1", "Comentario 2", "Comentario 3", "Comentario 4"],
    userReview: {
      user: "Usuario 1",
      review: "libro interesante",
      rating: 3
    }
  };

  useEffect(() => {

    const id = searchParams.get('id');
    if (id != null) {
      const obtenerLibro = async () => {
        try {
          const responseLibros = await handleAxios().get('/libro', {
            params: {
              libro: id
            }
          });
          // setLibros(responseLibros.data);
        } catch (error) {
          handleAxiosError(error);
        }
      }
      obtenerLibro();
    }

  }, []);

  const renderStars = (rating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<StarFill key={i} />);
      } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
        stars.push(<StarHalf key={i} />);
      } else {
        stars.push(<Star key={i} />);
      }
    }
    return stars;
  };

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col md={3}>
            <Card.Img variant="top" src='https://via.placeholder.com/150' /> {/* Reemplaza con la URL de la imagen */}
          </Col>
          <Col md={9}>
            <Card.Title>{book.title}</Card.Title>
            <Card.Text>Autor: {book.author}</Card.Text>
            <Card.Text>Descripcion: {book.description}</Card.Text>
            <Card.Text>Genero: {book.genre}</Card.Text>
            <Card.Text>Disponibilidad: {book.availability}</Card.Text>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={3} className="text-center">
            <h4>{book.rating}</h4>
            <div>{renderStars(book.rating)}</div>
          </Col>
          <Col md={9}>
            <h5>Reseñas</h5>
            <ListGroup variant="flush">
              <Accordion defaultActiveKey="0">
                {book.comments.map((comment, index) => (
                  <Accordion.Item eventKey={index} key={index}>
                    <Accordion.Header>{comment}</Accordion.Header>
                    {/* <Accordion.Body>
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
                </Accordion.Body> */}
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

export default BookDetail;
