import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { hasAccessToRoute } from "./helpers/permissions";

function NavigationBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/login");
  };

  return (
    <Navbar expand="md" className="navbar-menu" bg="primary">
      <Container fluid className="container-nav">
        <Navbar.Brand as={NavLink} className="text-light" to="/">
          Assets Brainventory
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="ms-auto my-2 my-lg-0 align-items-center">
            {hasAccessToRoute("/assets-menu") && (
              <Nav.Link as={NavLink} to="/assets-menu" className="text-light">
                Activos
              </Nav.Link>
            )}

            {hasAccessToRoute("/infrastructure-menu") && (
              <Nav.Link
                as={NavLink}
                to="/infrastructure-menu"
                className="text-light"
              >
                Infraestructura
              </Nav.Link>
            )}

            {hasAccessToRoute("/human-resources-menu") && (
              <Nav.Link
                as={NavLink}
                to="/human-resources-menu"
                className="text-light"
              >
                Recursos Humanos
              </Nav.Link>
            )}

            <Button
              variant="light text-danger"
              className="ms-2"
              onClick={handleLogout}
            >
              Cerrar Sesión
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
