'use client'

// React
import { useState, useEffect } from "react";
// Axios
import { handleAxios, handleAxiosMultipart, handleAxiosError, handleAxiosMsg } from '@/helpers/axiosConfig';
// Bootstrap
import { Col, Row, Form, Modal, Button } from 'react-bootstrap';
// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
// DataTable
import DataTable from 'react-data-table-component';
// Select
import Select from 'react-select'

function Libro() {

  // Modal de insercion
  const [showInsercion, setShowInsercion] = useState(false);
  const handleCloseInsercion = () => {
    setShowInsercion(false);
  }
  const handleShowInsercion = (e) => {
    e.target.blur(); // Quita el foco del elemento
    setShowInsercion(true); // Activa el modal
  }

  // Modal de actualizacion
  const [showActualizacion, setShowActualizacion] = useState(false);
  const [libro, setLibro] = useState({});
  const handleCloseActualizacion = () => {
    setLibro({});
    setShowActualizacion(false);
  }
  const handleShowActualizacion = (libro) => {
    setLibro(libro);
    setShowActualizacion(true); // Activa el modal
  }

  // Obtencion de los autores
  const [autores, setAutores] = useState([]);
  const obtenerAutores = async () => {
    try {
      const response = await handleAxios().get('/autor');
      const data = response.data.data.autores;

      // Se formatea la respuesta para que sea compatible con el componente Select
      const autoreFormateados = data.map(author => ({
        label: author.nombre,
        value: author._id
      }));
      setAutores(autoreFormateados);
    } catch (error) {
      handleAxiosError(error);
    }
  }

  // Obtencion de los libros
  const [libros, setLibros] = useState([]);
  const obtenerLibros = async () => {
    try {
      const response = await handleAxios().get('/libro');
      const data = response.data;
      setLibros(data);
    } catch (error) {
      handleAxiosError(error);
    }
  }

  // Manejador para guardar un libro
  const handleGuardarLibro = async (e) => {

    e.preventDefault();
    e.target.blur(); // Quita el foco del boton

    try {

      // Se obtienen los valores del formulario
      const formData = new FormData(e.currentTarget);
      // Se envia la peticion al servidor y se obtiene el mensaje
      const res = await handleAxiosMultipart().post('/libro', formData);
      handleAxiosMsg("Libro creado correctamente").then(() => {
        // Cierra el modal despues de guardar
        handleCloseInsercion();
        // Se vuelve a obtener la lista de libros
        obtenerLibros();
      });

    } catch (error) {
      handleAxiosError(error);
    }

  }

  // Manejador para eliminar un libro
  const handleEliminarLibro = async (id) => {
    try {
      const res = await handleAxios().delete(`/libro/${id}`);
      handleAxiosMsg("Libro eliminado correctamente").then(() => {
        obtenerLibros();
      });
    } catch (error) {
      handleAxiosError(error);
    }
  }

  // Manejador para actualizar un libro
  const handleActualizarLibro = async (e) => {
    e.preventDefault();
    e.target.blur(); // Quita el foco del boton

    try {
      // Se obtienen los valores del formulario
      const formData = new FormData(e.currentTarget);
      // Se envia la peticion al servidor y se obtiene el mensaje
      const res = await handleAxiosMultipart().put(`/libro/${libro._id}`, formData);
      handleAxiosMsg("Libro actualizado correctamente").then(() => {
        // Cierra el modal despues de guardar
        handleCloseActualizacion();
        // Se vuelve a obtener la lista de libros
        obtenerLibros();
      });

    } catch (error) {
      handleAxiosError(error);
    }
  }

  useEffect(() => {
    obtenerLibros();
    obtenerAutores();
  }, []);

  const generos = [
    { value: 'Aventuras', label: 'Aventuras' },
    { value: 'Ciencia Ficcion', label: 'Ciencia Ficcion' },
    { value: 'Policiaca', label: 'Policiaca' },
    { value: 'Terror y Misterio', label: 'Terror y Misterio' },
    { value: 'Romantica', label: 'Romantica' },
    { value: 'Humor', label: 'Humor' },
    { value: 'Poesia', label: 'Poesia' }
  ]

  const columnas = [
    {
      name: 'Titulo',
      selector: row => row.titulo,
      sortable: true,
      wrap: true,
    },
    {
      name: 'Descripcion',
      selector: row => row.descripcion,
      wrap: true,
    },
    {
      name: 'Autor',
      selector: row => row.autor.nombre,
      sortable: true,
      wrap: true,
    },
    {
      name: 'Acciones',
      cell: row => (
        <>
          <Button variant="warning" onClick={() => handleShowActualizacion(row)}>
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          &nbsp;
          <Button variant="danger" onClick={() => handleEliminarLibro(row._id)}>
            <FontAwesomeIcon icon={faTrashCan} />
          </Button>
        </>
      )
    },
  ];

  return (
    <>
      <Row className="gx-3 gy-4">
        <Button onClick={handleShowInsercion} ariant="primary" className="w-100" > Agregar nuevo libro </Button>
        <Col xs={12} xl={12} className="order-1 order-xl-0">
          <DataTable
            title="Libros"
            columns={columnas}
            data={libros}
            pagination
          />
        </Col>
      </Row>

      {/* Modal que se encarga de la insercion */}
      <Modal size="lg" show={showInsercion} onHide={handleCloseInsercion}>
        <Form onSubmit={handleGuardarLibro}>
          <Modal.Header closeButton>
            <Modal.Title>Creación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="titulo">Titulo</Form.Label>
                  <Form.Control
                    id="titulo"
                    name="titulo"
                    type="text"
                    placeholder="Titulo"
                    autoComplete='off'
                    autoFocus
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="autor">Autor</Form.Label>
                  <Select id="autor" name="autor" options={autores} required placeholder="Autor" />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={12} className="mb-3">
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="descripcion">Descripcion</Form.Label>
                  <Form.Control
                    id="descripcion"
                    name="descripcion"
                    as="textarea"
                    rows={3}
                    placeholder="Descripcion"
                    autoComplete='off'
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6} className="mb-3">
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="genero">Genero</Form.Label>
                  <Select id="genero" name="genero" options={generos} required placeholder="Genero Literario" />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="fechaPublicacion">Fecha de Publicacion</Form.Label>
                  <Form.Control
                    id="fechaPublicacion"
                    name="fechaPublicacion"
                    type="date"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6} className="mb-3">
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="cantidadDisponible">Cantidad Disponible</Form.Label>
                  <Form.Control
                    id="cantidadDisponible"
                    name="cantidadDisponible"
                    type="number"
                    placeholder="Cantidad Disponible"
                    autoComplete='off'
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="precio">Precio</Form.Label>
                  <Form.Control
                    id="precio"
                    name="precio"
                    type="number"
                    placeholder="Precio"
                    autoComplete='off'
                    step="0.01"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={12} className="mb-3">
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="imagen">Imagen</Form.Label>
                  <Form.Control
                    type="file"
                    id="imagen"
                    name="imagen"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseInsercion}>
              Cerrar
            </Button>
            <Button type="submit" variant="primary">
              Guardar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Modal que se encarga de la actualizacion */}
      <Modal size="lg" show={showActualizacion} onHide={handleCloseActualizacion}>
        <Form onSubmit={handleActualizarLibro}>
          <Modal.Header closeButton>
            <Modal.Title>Actualizacion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="titulo">Titulo</Form.Label>
                  <Form.Control
                    id="titulo"
                    name="titulo"
                    type="text"
                    placeholder="Titulo"
                    autoComplete='off'
                    defaultValue={libro.titulo ? libro.titulo : ''}
                    autoFocus
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="autor">Autor</Form.Label>
                  <Select
                    id="autor"
                    name="autor"
                    options={autores}
                    placeholder="Autor"
                    defaultValue={libro.autor ? { label: libro.autor.nombre, value: libro.autor._id } : null}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={12} className="mb-3">
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="descripcion">Descripcion</Form.Label>
                  <Form.Control
                    id="descripcion"
                    name="descripcion"
                    as="textarea"
                    rows={3}
                    placeholder="Descripcion"
                    autoComplete='off'
                    defaultValue={libro.descripcion ? libro.descripcion : ''}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6} className="mb-3">
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="genero">Genero</Form.Label>
                  <Select
                    id="genero"
                    name="genero"
                    options={generos}
                    placeholder="Genero Literario"
                    defaultValue={libro.genero ? { label: libro.genero, value: libro.genero } : null}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="fechaPublicacion">Fecha de Publicacion</Form.Label>
                  <Form.Control
                    id="fechaPublicacion"
                    name="fechaPublicacion"
                    type="date"
                    defaultValue={libro.fechaPublicacion ? libro.fechaPublicacion : ''}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6} className="mb-3">
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="cantidadDisponible">Cantidad Disponible</Form.Label>
                  <Form.Control
                    id="cantidadDisponible"
                    name="cantidadDisponible"
                    type="number"
                    placeholder="Cantidad Disponible"
                    autoComplete='off'
                    defaultValue={libro.cantidadDisponible ? libro.cantidadDisponible : ''}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="precio">Precio</Form.Label>
                  <Form.Control
                    id="precio"
                    name="precio"
                    type="number"
                    placeholder="Precio"
                    autoComplete='off'
                    step="0.01"
                    defaultValue={libro.precio ? libro.precio : ''}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={12} className="mb-3">
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="imagen">Imagen</Form.Label>
                  <Form.Control
                    type="file"
                    id="imagen"
                    name="imagen"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseActualizacion}>
              Cerrar
            </Button>
            <Button type="submit" variant="primary">
              Actualizar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default Libro;