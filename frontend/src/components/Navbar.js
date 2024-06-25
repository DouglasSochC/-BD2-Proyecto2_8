import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { Row, Col, Nav, Image, Navbar, Dropdown, Container, ListGroup } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

export default function NavbarComponent() {

  const router = useRouter();

  const [notifications, setNotifications] = useState([
    {
      "id": 1,
      "read": false,
      "image": null,
      "sender": "Jose Leos",
      "time": "a few moments ago",
      "link": "#",
      "message": `Added you to an event "Project stand-up" tomorrow at 12:30 AM.`
    },
    {
      "id": 2,
      "read": false,
      "image": null,
      "sender": "Neil Sims",
      "time": "2 hrs ago",
      "link": "#",
      "message": `You've been assigned a task for "Awesome new project".`
    }]);

  const Notification = (props) => {
    const { link, sender, image, time, message, read = false } = props;
    const readClassName = read ? "" : "text-danger";

    return (
      <ListGroup.Item action href={link} className="border-bottom border-light">
        <Row className="align-items-center">
          <Col className="col-auto">
            <Image src={image} className="user-avatar lg-avatar rounded-circle" />
          </Col>
          <Col className="ps-0 ms--2">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4 className="h6 mb-0 text-small">{sender}</h4>
              </div>
              <div className="text-end">
                <small className={readClassName}>{time}</small>
              </div>
            </div>
            <p className="font-small mt-1 mb-0">{message}</p>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  };

  return (
    <Navbar variant="dark" expanded className="ps-0 pe-2 pb-0">
      <Container fluid className="px-0">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex align-items-center">
          </div>
          <Nav className="align-items-center">
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle as={Nav.Link} className="text-dark icon-notifications me-lg-3">
                <span className="icon icon-sm">
                  <FontAwesomeIcon icon={faCartShopping} className="bell-shake" />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dashboard-dropdown notifications-dropdown dropdown-menu-lg dropdown-menu-center mt-2 py-0">
                <ListGroup className="list-group-flush">
                  <Nav.Link href="#" className="text-center text-primary fw-bold border-bottom border-light py-3">
                    Carrito
                  </Nav.Link>
                  {notifications.map(n => <Notification key={`notification-${n.id}`} {...n} />)}
                  <Dropdown.Item className="text-center text-primary fw-bold py-3">
                    Ver detalle
                  </Dropdown.Item>
                </ListGroup>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
                <div className="media d-flex align-items-center">
                  <Image src="/user_icon.png" className="user-avatar md-avatar rounded-circle" />
                  <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                    <span className="mb-0 font-small fw-bold">Bonnie Green</span>
                  </div>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="user-dropdown dropdown-menu-right mt-3">
                <Dropdown.Item className="fw-bold" onClick={() => router.push('perfil_usuario')} >
                  <FontAwesomeIcon icon={faUserCircle} className="me-2" /> Mi Perfil
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className="fw-bold">
                  <FontAwesomeIcon icon={faSignOutAlt} className="text-danger me-2" /> Cerrar Sesión
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};
