import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import NavigationBar from "./NavigationBar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function InventoryMenu({ title, inventoryCards }) {
  const [isSmallerScreen, setIsSmallerScreen] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallerScreen(window.innerWidth);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [isSmallerScreen]);

  return (
    <>
      <NavigationBar />
      <h1 className="text-center text-primary mt-3">{title}</h1>
      <Container
        fluid
        className={`container-main-menu d-flex flex-column justify-content-center align-items-center ${
          isSmallerScreen < 576 ? "w-100" : "w-75"
        } mt-3`}
      >
        <Row
          xs={1}
          sm={2}
          md={2}
          lg={4}
          className="justify-content-center row-cards g-4"
        >
          {inventoryCards.map((card) => (
            <Col key={card.id}>
              <Card className="card-inventory bg-body-tertiary d-flex flex-column h-100">
                <Card.Img
                  variant="top"
                  src={card.img}
                  className="card-img-inventory d-none d-sm-block"
                  alt={card.title}
                />
                <Card.Body className="card-body-inventory d-flex flex-column">
                  <Card.Title>{card.title}</Card.Title>
                  <Card.Text>{card.text}</Card.Text>
                  <Link to={card.link} className="mt-auto">
                    <Button
                      variant="primary"
                      className="w-100"
                      aria-label={card.buttonText}
                    >
                      {card.buttonText}
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default InventoryMenu;
