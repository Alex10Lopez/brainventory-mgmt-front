import { Container } from "react-bootstrap";

const InventoryViewSection = ({ windowWidth, leftContent, rightContent }) => {
  return (
    <Container
      fluid
      className={`details-section d-flex ${
        windowWidth < 576 ? "flex-column" : "flex-row justify-content-between"
      } px-0 w-100`}
    >
      <div
        className={`detail-column mb-3 ${windowWidth >= 576 && "pe-2"} w-100`}
      >
        {leftContent}
      </div>

      <div
        className={`detail-column mb-3 ${windowWidth >= 576 && "ps-2"} w-100`}
      >
        {rightContent}
      </div>
    </Container>
  );
};

export default InventoryViewSection;
