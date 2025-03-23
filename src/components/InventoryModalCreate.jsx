import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import useWindowWidth from "./hooks/useWindowWidth";
import { saveEmployee } from "../api/EmployeeService";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

function InventoryModalCreate({
  showModalCreate,
  setShowModalCreate,
  CreateForm,
}) {
  const windowWidth = useWindowWidth();
  const [formValues, setFormValues] = useState(null);

  const { isPending, mutate } = useMutation({
    mutationFn: saveEmployee,
    onSuccess: () => {
      setShowModalCreate(false);
    },
  });

  const handleAddEmployee = () => {
    mutate(formValues);
  };

  const handleCloseModalCreate = () => setShowModalCreate(false);

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
        <Modal.Title className="text-primary">Agregar </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreateForm setFormValues={setFormValues} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleCloseModalCreate}>
          Cancelar
        </Button>
        <Button
          variant="success"
          onClick={handleAddEmployee}
          disabled={isPending}
        >
          {isPending ? "Agregando..." : "Agregar"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

InventoryModalCreate.PropTypes = {
  showModalCreate: PropTypes.bool,
  setShowModalCreate: PropTypes.bool.isRequired,
};

export default InventoryModalCreate;
