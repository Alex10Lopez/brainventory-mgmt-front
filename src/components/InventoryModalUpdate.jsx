import PropTypes from "prop-types";
import { Alert, Button, Modal, Spinner } from "react-bootstrap";
import useWindowWidth from "./hooks/useWindowWidth";
import { useContext } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { inventoryContext } from "./InventoryManagement";

function InventoryModalUpdate() {
  const {
    findById,
    updateById,
    queryClient,
    UpdateModal,
    showModalUpdate,
    setShowModalUpdate,
    selectedRows,
  } = useContext(inventoryContext);

  const windowWidth = useWindowWidth();

  const selectedId = selectedRows[0];

  const {
    isPending,
    isError,
    data: readData,
    error,
  } = useQuery({
    queryKey: ["updateData", selectedId],
    queryFn: () => findById(selectedId),
    enabled: !!selectedId && showModalUpdate,
  });

  const {
    isPending: isPendingMutation,
    isError: isErrorMutation,
    error: errorMutuation,
    mutate,
  } = useMutation({
    mutationFn: (data) => updateById(data, selectedId),
    onSuccess: async () => {
      await queryClient.invalidateQueries(["inventoryData"]);
      setShowModalUpdate(false);
    },
    onError: (error) => {
      setErrorMessage("Error al guardar el registro: " + error.message);
    },
  });

  const handleCloseModalUpdate = () => setShowModalUpdate(false);

  const handleUpdate = (data) => {
    mutate(data);
  };

  return (
    <Modal
      show={showModalUpdate}
      onHide={handleCloseModalUpdate}
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
        <Modal.Title className="text-primary">Actualizar </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {readData && (
          <UpdateModal readData={readData.data} onSubmit={handleUpdate} />
        )}

        {isPending && (
          <div className="d-flex justify-content-center align-items-center vh-100">
            <Alert variant="info" className="text-center" dismissible>
              <Spinner animation="border" size="sm" className="me-2" />{" "}
              Cargando...
            </Alert>
          </div>
        )}

        {isError && (
          <div className="d-flex justify-content-center align-items-center vh-100">
            <Alert variant="danger" className="text-center">
              Error:{" "}
              {error?.message || "Ocurrió un error al mostrar los datos."}
            </Alert>
          </div>
        )}

        {isPendingMutation && (
          <div className="d-flex justify-content-center align-items-center vh-100">
            <Alert variant="info" className="text-center" dismissible>
              <Spinner animation="border" size="sm" className="me-2" />{" "}
              Cargando...
            </Alert>
          </div>
        )}

        {isErrorMutation && (
          <div className="d-flex justify-content-center align-items-center vh-100">
            <Alert variant="danger" className="text-center">
              Error:{" "}
              {errorMutuation?.message ||
                "Ocurrió un error al actualizar registro."}
            </Alert>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleCloseModalUpdate}>
          Cancelar
        </Button>
        <Button
          variant="success"
          type="submit"
          form="update-form"
          disabled={isPending}
        >
          {isPending ? "Actualizando..." : "Actualizar"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

/*InventoryModalUpdate.propTypes = {
  showModalUpdate: PropTypes.bool,
  setShowModalUpdate: PropTypes.func.isRequired,
  UpdateModal: PropTypes.elementType.isRequired,
  selectedRows: PropTypes.array.isRequired,
};*/

export default InventoryModalUpdate;
