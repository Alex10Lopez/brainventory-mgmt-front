import PropTypes from "prop-types";
import { Alert, Button, Modal, Spinner } from "react-bootstrap";
import useWindowWidth from "./hooks/useWindowWidth";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { inventoryContext } from "./InventoryManagement";

function InventoryModalView() {
  const {
    titleInventory,
    findById,
    ViewModal,
    showModalView,
    setShowModalView,
    selectedRows,
  } = useContext(inventoryContext);

  const windowWidth = useWindowWidth();

  const [storedSelectedId, setStoredSelectedId] = useState(null);

  useEffect(() => {
    if (selectedRows[0]) {
      setStoredSelectedId(selectedRows[0]);
    }
  }, [selectedRows]);

  const selectedId = storedSelectedId;

  const {
    isPending,
    isError,
    data: readData,
    error,
  } = useQuery({
    queryKey: ["readData", selectedId],
    queryFn: () => findById(selectedId),
    enabled: !!selectedId && showModalView,
  });

  const handleCloseModalView = () => {
    setShowModalView(false);
  };

  return (
    <Modal
      show={showModalView}
      onHide={handleCloseModalView}
      dialogClassName={
        windowWidth < 768
          ? "modal-90w"
          : windowWidth < 1200
          ? "modal-85w"
          : "modal-80w"
      }
      centered
      className="view-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-primary">
          Información de {titleInventory}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {readData && <ViewModal readData={readData.data} />}

        {isPending && (
          <div className="d-flex justify-content-center align-items-center">
            <Alert variant="info" className="text-center">
              <Spinner animation="border" size="sm" className="me-2" />{" "}
              Cargando...
            </Alert>
          </div>
        )}

        {isError && (
          <div className="d-flex justify-content-center align-items-center">
            <Alert variant="danger" className="text-center" dismissible>
              Error: {error?.message || "Ocurrió un error al ver información."}
            </Alert>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleCloseModalView}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

/*InventoryModalView.propTypes = {
  showModalView: PropTypes.bool,
  setShowModalView: PropTypes.func.isRequired,
};*/

export default InventoryModalView;
