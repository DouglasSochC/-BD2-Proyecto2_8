'use client'

// React
import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
// Bootstrap
import { Container, Row, Col, Card, Button, Form, InputGroup, ListGroup } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
// Axios
import { handleAxios, handleAxiosError } from '@/helpers/axiosConfig';
// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
// Helpers
import { crearCarrito, agregarProductoCarrito, obtenerProductosCarrito } from '@/helpers/shoppingCart';
import { MyContext } from '@/helpers/changeShoppingCart';

const LibroCatalogo = () => {

  const { actualizarShoppingCart, setActualizarShoppingCart } = useContext(MyContext);
  const router = useRouter();
  const [tipoFiltro, setTipoFiltro] = useState("titulo");
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

  const handleVerLibro = (id) => {
    router.push("/dashboard_usuario/libro/?id=" + id);
  }

  const handleAgregarProducto = (producto) => {
    agregarProductoCarrito(producto);
    setActualizarShoppingCart(actualizarShoppingCart + 1);
  }

  useEffect(() => {

    const obtenerLibros = async () => {
      try {
        const response = await handleAxios().get('/libro', { params: { titulo: search } });
        const libros = response.data;
        const offset = currentPage * itemsPerPage;
        setCurrentItems(libros.slice(offset, offset + itemsPerPage));
        setPageCount(Math.ceil(libros.length / itemsPerPage));
      } catch (error) {
        handleAxiosError(error);
      }
    }

    obtenerLibros();
  }, [search, currentPage]);

  return (
    <Container>
      <h1 className="text-center my-4">Catalogo de Libros</h1>
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
        <Col md={2}>
          <b>Filtrar según:</b><br /><br />
          <ListGroup>
            <ListGroup.Item action onClick={() => setTipoFiltro("titulo")}>
              Titulo
            </ListGroup.Item>
            <ListGroup.Item action onClick={() => setTipoFiltro("genero")}>
              Genero
            </ListGroup.Item>
            <ListGroup.Item action onClick={() => setTipoFiltro("precio")}>
              Precio
            </ListGroup.Item>
            <ListGroup.Item action onClick={() => setTipoFiltro("puntuacionMedia")}>
              Puntuacion
            </ListGroup.Item>
            <ListGroup.Item action onClick={() => setTipoFiltro("autor")}>
              Autor
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={10}>
          <Row>
            {currentItems.map(libro => (
              <Col key={libro._id} sm={4}>
                <Card className="mb-4">
                  <Card.Img variant="top" src={libro.imagen} onError={handleImageError} style={{ width: 'auto', height: '350px', }} />
                  <Card.Body>
                    <Card.Title>{libro.titulo}</Card.Title>
                    <Card.Text>{libro.descripcion.slice(0, 100)}...</Card.Text>
                    <Card.Text className="text-danger">${libro.precio.toFixed(2)}</Card.Text>
                    <Button variant="primary" onClick={() => handleAgregarProducto({ id_libro: libro._id, image: libro.imagen, nombre_libro: libro.titulo, nombre_autor: libro.autor.nombre, cantidad: 1, precio: libro.precio })} className="me-2"><FontAwesomeIcon icon={faCartShopping} /></Button>
                    <Button variant="secondary" onClick={() => handleVerLibro(libro._id)}>Ver</Button>
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

export default LibroCatalogo;
