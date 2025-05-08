import PropTypes from "prop-types";
import { Alert, Button, Modal, Spinner } from "react-bootstrap";
import useWindowWidth from "./hooks/useWindowWidth";
import { useMutation } from "@tanstack/react-query";
import { useContext, useEffect, useRef, useState } from "react";
import { inventoryContext } from "./InventoryManagement";

function InventoryModalCreate() {
  const {
    titleInventory,
    createRecord,
    queryClient,
    CreateModal,
    showModalCreate,
    setShowModalCreate,
  } = useContext(inventoryContext);

  const windowWidth = useWindowWidth();

  const {
    isPending: isPendingMutation,
    isError: isErrorMutation,
    error,
    mutate,
    reset,
  } = useMutation({
    mutationFn: createRecord,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["dataTable"]);
      setShowModalCreate(false);
    },
  });

  const handleCloseModalCreate = () => {
    setShowModalCreate(false);
    reset();
  };

  const handleCreate = (data) => {
    mutate(data);
  };

  return (
    <Modal
      show={showModalCreate}
      onHide={handleCloseModalCreate}
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
        <Modal.Title className="text-primary">
          Agregar {titleInventory}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreateModal onSubmit={handleCreate} />
        {isErrorMutation && (
          <div className="d-flex justify-content-center align-items-center">
            <Alert variant="danger" className="text-center" dismissible>
              Error: {error?.message || "Ocurrió un error al guardar registro."}
              <br />
              {error?.response && (
                <>
                  Respuesta del servidor: {JSON.stringify(error.response.data)}
                </>
              )}
            </Alert>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleCloseModalCreate}>
          Cerrar
        </Button>
        <Button
          variant="success"
          type="submit"
          form="create-form"
          disabled={isPendingMutation}
        >
          {isPendingMutation ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Guardando...
            </>
          ) : (
            "Guardar"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

/*InventoryModalCreate.propTypes = {
  showModalCreate: PropTypes.bool,
  setShowModalCreate: PropTypes.func.isRequired,
  ReadModal: PropTypes.elementType.isRequired,
  selectedRows: PropTypes.array.isRequired,
};*/

export default InventoryModalCreate;
