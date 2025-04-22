import { Alert, Button, Modal, Spinner } from "react-bootstrap";
import useWindowWidth from "./hooks/useWindowWidth";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { inventoryContext } from "./InventoryManagement";

function InventoryModalUpdate() {
  const {
    titleInventory,
    findById,
    updateById,
    queryClient,
    UpdateModal,
    showModalUpdate,
    setShowModalUpdate,
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
    queryKey: ["updateData", selectedId],
    queryFn: () => findById(selectedId),
    enabled: !!selectedId && showModalUpdate,
    refetchOnWindowFocus: false,
  });

  const {
    isPending: isPendingMutation,
    isError: isErrorMutation,
    error: errorMutuation,
    mutate,
    reset,
  } = useMutation({
    mutationFn: (data) => updateById(data, selectedId),
    onSuccess: async () => {
      await queryClient.invalidateQueries(["inventoryData"]);
      setShowModalUpdate(false);
    },
  });

  const handleCloseModalUpdate = () => {
    setShowModalUpdate(false);
    reset();
  };

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
        <Modal.Title className="text-primary">
          Actualizar {titleInventory}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {readData && (
          <UpdateModal readData={readData.data} onSubmit={handleUpdate} />
        )}

        {isPending && (
          <div className="d-flex justify-content-center align-items-center">
            <Alert variant="info" className="text-center" dismissible>
              <Spinner animation="border" size="sm" className="me-2" />{" "}
              Cargando...
            </Alert>
          </div>
        )}

        {isError && (
          <div className="d-flex justify-content-center align-items-center">
            <Alert variant="danger" className="text-center">
              Error:{" "}
              {error?.message || "Ocurrió un error al mostrar los datos."}
            </Alert>
          </div>
        )}

        {isErrorMutation && (
          <div className="d-flex justify-content-center align-items-center">
            <Alert variant="danger" className="text-center" dismissible>
              Error: {error?.message || "Ocurrió un error al guardar registro."}
              {/*<br />*/}
              {/*error?.response && (
                <>
                  Respuesta del servidor: {JSON.stringify(error.response.data)}
                </>
              )*/}
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
          disabled={isPendingMutation}
        >
          {isPendingMutation ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Actualizando...
            </>
          ) : (
            "Actualizar"
          )}
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
