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
                to="/human-resourcer-menu"
                className="text-primary"
              >
                Recursos Humanos
              </Nav.Link>

              <NavDropdown
                title={<span className="text-primary">Configuración</span>}
                id="setupDropdown"
              >
                <NavDropdown.Item as={NavLink} to="/action3">
                  Action
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={NavLink} to="/action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown
                title={<span className="text-primary">Cuenta</span>}
                id="accountDropdown"
              >
                <NavDropdown.Item as={NavLink} to="/action3">
                  Action
                </NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item as={NavLink} to="/action4">
                  Cerrar sesión
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavigationBar;
