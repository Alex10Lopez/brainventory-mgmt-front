import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";

function NavigationBar() {
  return (
    <>
      <Navbar expand="md" className="navbar-menu bg-body-tertiary">
        <Container fluid className="container-nav">
          <Navbar.Brand as={NavLink} to="/">
            Assets Brainventory
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="ms-auto my-2 my-lg-0">
              <Nav.Link as={NavLink} to="/assets-menu" className="text-primary">
                Activos
              </Nav.Link>

              <Nav.Link
                as={NavLink}
                to="/infrastructure-menu"
                className="text-primary"
              >
                Infraestructura
              </Nav.Link>

              <Nav.Link
                as={NavLink}
                to="/human-resources-menu"
                className="text-primary"
              >
                Recursos Humanos
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavigationBar;
