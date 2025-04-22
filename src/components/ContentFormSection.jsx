import { Card, Container } from "react-bootstrap";

const ContentFormSection = ({
  contentHeader,
  contentBody,
  contentFooter,
  windowWidth,
}) => {
  return (
    <Container
      fluid
      className="inventory-container d-flex flex-column justify-content-center align-items-center mt-3"
    >
      <Card
        className={`bg-body-tertiary ${windowWidth < 768 ? "w-75" : "w-50"}`}
      >
        <Card.Header>{contentHeader}</Card.Header>
        <Card.Body>{contentBody}</Card.Body>
        <Card.Footer className="d-flex justify-content-center">
          {contentFooter}
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default ContentFormSection;
