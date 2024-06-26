'use client'

// React
import { useState, useEffect } from "react";
// Axios
import { handleAxios, handleAxiosError, handleAxiosMsg } from '@/helpers/axiosConfig';
// Bootstrap
import { Col, Row, Form, Modal, Table, Button } from 'react-bootstrap';
// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function Autor() {

  // Modal de insercion
  const [showInsercion, setShowInsercion] = useState(false);
  const handleCloseInsercion = () => {
    setShowInsercion(false);
  }
  const handleShowInsercion = (e) => {
    e.target.blur(); // Quita el foco del elemento
    setShowInsercion(true); // Activa el modal
  }

  // Obtencion de los autores
  const [autores, setAutores] = useState([]);
  const obtenerAutores = async () => {
    try {
      const response = await handleAxios().get('/autor');
      const data = response.data.data.autores;
      setAutores(data);
    } catch (error) {
      handleAxiosError(error);
    }
  }

  // Manejador para guardar un autor
  const handleGuardarAutor = async (e) => {

    e.preventDefault();
    e.target.blur(); // Quita el foco del boton

    try {

      // Se obtienen los valores del formulario
      const formData = new FormData(e.currentTarget);

      formData.set('foto', 'modificar_ruta');

      // Se envia la peticion al servidor y se obtiene el mensaje
      const res = await handleAxios().post('/autor', formData);
      handleAxiosMsg("Autor creado correctamente").then(() => {
        // Cierra el modal despues de guardar
        handleCloseInsercion();
        // Se vuelve a obtener la lista de autores
        obtenerAutores();
      });

    } catch (error) {
      handleAxiosError(error);
    }

  }

  // Manejador para eliminar un autor
  const handleEliminarAutor = async (id) => {
    try {
      const res = await handleAxios().delete(`/autor/${id}`);
      handleAxiosMsg(res.data.message).then(() => {
        obtenerAutores();
      });
    } catch (error) {
      handleAxiosError(error);
    }
  }

  useEffect(() => {
    obtenerAutores();
  }, []);

  return (
    <>
      <Row className="gx-3 gy-4">
        <Button onClick={handleShowInsercion} ariant="primary" className="w-100" > Agregar nuevo autor </Button>
        <Col xs={12} xl={12} className="order-1 order-xl-0">
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Biografia</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {autores.map((autor, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{autor.nombre}</td>
                  <td>{autor.biografia}</td>
                  <td>
                    <Button variant="danger" onClick={() => handleEliminarAutor(autor._id)}>
                      <FontAwesomeIcon icon={faTrashCan} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Modal que se encarga de la insercion */}
      <Modal show={showInsercion} onHide={handleCloseInsercion}>
        <Form onSubmit={handleGuardarAutor}>
          <Modal.Header closeButton>
            <Modal.Title>Creación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="nombre">Nombre</Form.Label>
              <Form.Control
                id="nombre"
                name="nombre"
                type="text"
                placeholder="Nombre"
                autoComplete='off'
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="biografia">Biografia</Form.Label>
              <Form.Control
                id="biografia"
                name="biografia"
                as="textarea"
                rows={3}
                placeholder="Biografia"
                autoComplete='off'
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="imagen">Imagen</Form.Label>
              <Form.Control
                type="file"
                id="foto"
                name="foto"
              // onChange={handleImagenChange}
              />
            </Form.Group>
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
    </>
  );
}

export default Autor;