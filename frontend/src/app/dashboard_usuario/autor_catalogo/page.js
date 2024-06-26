'use client'
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap';
import { handleAxios, handleAxiosError } from '@/helpers/axiosConfig';
import ReactPaginate from 'react-paginate';

const AutorCatalogo = () => {

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 3;

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleImageError = (event) => {
    event.target.src = 'https://via.placeholder.com/150';
  };

  useEffect(() => {

    const obtenerAutores = async () => {
      try {
        const response = await handleAxios().get('/autor/' + search);
        const autores = response.data.data.autores;
        const offset = currentPage * itemsPerPage;
        setCurrentItems(autores.slice(offset, offset + itemsPerPage));
        setPageCount(Math.ceil(autores.length / itemsPerPage));

      } catch (error) {
        handleAxiosError(error);
      }
    }

    obtenerAutores();
  }, [search, currentPage]);

  return (
    <Container>
      <h1 className="text-center my-4">Catalogo Autores</h1>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Buscar"
          aria-label="Search"
          aria-describedby="basic-addon2"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="outline-secondary">
          <i className="bi bi-search"></i>
        </Button>
      </InputGroup>

      <Row>
        <Col>
          <Row>
            {currentItems.map(autor => (
              <Col key={autor._id} sm={4}>
                <Card className="mb-4">
                  <Card.Img variant="top" src={autor.foto} onError={handleImageError} style={{ width: 'auto', height: '350px', }} />
                  <Card.Body>
                    <Card.Title>{autor.nombre}</Card.Title>
                    <Card.Text>{autor.biografia.slice(0, 100)}...</Card.Text>
                    <Button variant="primary">Ver</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <ReactPaginate
            previousLabel={"<<"}
            nextLabel={">>"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default AutorCatalogo;
