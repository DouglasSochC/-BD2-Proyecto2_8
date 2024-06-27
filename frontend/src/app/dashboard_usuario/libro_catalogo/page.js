'use client'

import React from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, Dropdown } from 'react-bootstrap';

const products = [
  { id: 1, title: "Libro 1", description: "Product Description", price: 22.2 },
  { id: 2, title: "Libro 2", description: "Product Description", price: 22.2 },
  { id: 3, title: "Libro 3", description: "Product Description", price: 22.2 }
];

const Catalogo = () => {
  return (
    <Container>
      <h1 className="text-center my-4">Catalogo</h1>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search"
          aria-label="Search"
          aria-describedby="basic-addon2"
        />
        <Button variant="outline-secondary">
          <i className="bi bi-search"></i> {/* Icono de Bootstrap */}
        </Button>
      </InputGroup>

      <Row>
        <Col md={3}>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Selected Item
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Form.Control type="text" placeholder="Search here..." />
              <Dropdown.Item>Genero</Dropdown.Item>
              <Dropdown.Item>Precio</Dropdown.Item>
              <Dropdown.Item>Puntuacion</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col md={9}>
          <Row>
            {products.map(product => (
              <Col key={product.id} sm={4}>
                <Card className="mb-4">
                  <Card.Img variant="top" src="https://via.placeholder.com/150" />
                  <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <Card.Text className="text-danger">${product.price.toFixed(2)}</Card.Text>
                    <Button variant="primary" className="me-2">Add To Cart</Button>
                    <Button variant="secondary">Ver</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li className="page-item disabled">
                <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">&laquo;</a>
              </li>
              <li className="page-item"><a className="page-link" href="#">1</a></li>
              <li className="page-item"><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
              <li className="page-item"><a className="page-link" href="#">4</a></li>
              <li className="page-item"><a className="page-link" href="#">5</a></li>
              <li className="page-item">
                <a className="page-link" href="#">&raquo;</a>
              </li>
            </ul>
          </nav>
        </Col>
      </Row>
    </Container>
  );
}

export default Catalogo;
