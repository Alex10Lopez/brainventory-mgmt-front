import { Form, Container } from "react-bootstrap";

const InventoryFormSection = ({
  leftContent,
  rightContent,
  leftError,
  rightError,
  windowWidth,
}) => {
  return (
    <Container
      fluid
      className={`fields-container d-flex ${
        windowWidth < 576 ? "flex-column" : "flex-row justify-content-between"
      } px-0 w-100`}
    >
      <Form.Group
        className={`form-section mb-3 ${
          windowWidth >= 576 ? "pe-2" : ""
        } w-100`}
      >
        {leftContent}
        {leftError && (
          <Form.Control.Feedback type="invalid" className="d-block">
            {leftError}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Form.Group
        className={`form-section mb-3 ${
          windowWidth >= 576 ? "ps-2" : ""
        } w-100`}
      >
        {rightContent}
        {rightError && (
          <Form.Control.Feedback type="invalid" className="d-block">
            {rightError}
          </Form.Control.Feedback>
        )}
      </Form.Group>
    </Container>
  );
};

export default InventoryFormSection;
