import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import useWindowWidth from "./hooks/useWindowWidth";

function InventoryModalRead({ showModalRead, setShowModalRead }) {
  const windowWidth = useWindowWidth();

  const handleCloseModalRead = () => setShowModalRead(false);

  return (
    <Modal
      show={showModalRead}
      onHide={handleCloseModalRead}
      dialogClassName={
        windowWidth < 768
          ? "modal-90w"
          : windowWidth < 1200
          ? "modal-85w"
          : "modal-80w"
      }
      centered
      className="form-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-primary">Ver </Modal.Title>
      </Modal.Header>
      <Modal.Body></Modal.Body>
      <Modal.Footer>
        <Button variant="danger">Eliminar</Button>
      </Modal.Footer>
    </Modal>
  );
}

InventoryModalRead.PropTypes = {
  showModalRead: PropTypes.bool,
  setShowModalRead: PropTypes.bool.isRequired,
};

export default InventoryModalRead;
