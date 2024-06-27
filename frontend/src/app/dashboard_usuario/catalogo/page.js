'use client'

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap';
import { handleAxios, handleAxiosError } from '@/helpers/axiosConfig';
import ReactPaginate from 'react-paginate';
import { useRouter } from 'next/navigation';

const CatalogoLibros = () => {

    const router = useRouter();
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const itemsPerPage = 3;

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    }

    const handleImageError = (event) => {
        event.target.src = 'https://via.placeholder.com/150';
    }

    useEffect(() => {
            
            const obtenerLibros = async () => {
                try {
                    const response = await handleAxios().get('/libro', { params: { titulo: search } });
                    const libros = response.data.data.libros;
                    const offset = currentPage * itemsPerPage;
                    setCurrentItems(libros.slice(offset, offset + itemsPerPage));
                    setPageCount(Math.ceil(libros.length / itemsPerPage));
    
                } catch (error) {
                    handleAxiosError(error);
                }
            }
    
            obtenerLibros();
        },[search, currentPage]);
    
    const handleVerLibro = (id) => {
        router.push("/dashboard_usuario/libro/?id=" + id);
    }

    return (
        <Container>
            <h1 className="text-center my-4">Catalogo Libros</h1>
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
                        {currentItems.map(libro => (
                            <Col key={libro.id} xs={12} md={4}>
                                <Card className="mb-4">
                                    <Card.Img variant="top" src={libro.imagen} onError={handleImageError}  style={{ width: 'auto', height: '350px', }}/>
                                    <Card.Body>
                                        <Card.Title>{libro.titulo}</Card.Title>
                                        <Card.Text>
                                            {libro.descripcion}
                                        </Card.Text>
                                        <Button variant="primary" onClick={() => handleVerLibro(libro.id)}>Ver</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default CatalogoLibros;