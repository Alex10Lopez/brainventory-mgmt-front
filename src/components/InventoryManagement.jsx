import PropTypes from "prop-types";

import { Alert, Spinner, Container } from "react-bootstrap";
import InventoryNavbar from "./InventoryNavbar";
import InventoryTable from "./InventoryTable";
import InventoryModalCreate from "./InventoryModalCreate";
import InventoryModalView from "./InventoryModalView";
import InventoryModalUpdate from "./InventoryModalUpdate";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";

export const inventoryContext = createContext();

function InventoryManagement({
  createRecord,
  findAll,
  findById,
  updateById,
  deleteById,
  tableColumns,
  CreateModal,
  ViewModal,
  UpdateModal,
}) {
  const queryClient = useQueryClient();

  const {
    isPending: isPendingQuery,
    isError: isErrorQuery,
    data: inventoryData,
    error,
  } = useQuery({
    queryKey: ["inventoryData"],
    queryFn: findAll,
  });

  const [sorting, setSorting] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [columnFilters, setColumnFilters] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalView, setShowModalView] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const [deletedIds, setDeletedIds] = useState([]);
  const [showNoSelectionAlert, setShowNoSelectionAlert] = useState(false);
  const [showSingleSelectionAlert, setShowSingleSelectionAlert] =
    useState(false);

  const {
    isPending: isPendingMutuation,
    isError: isErrorMutation,
    error: errorMutuation,
    mutate: deleteMutation,
  } = useMutation({
    mutationFn: deleteById,
    onSuccess: () => {
      queryClient.invalidateQueries(["inventoryData"]);
    },
  });

  const handleDeleteSelected = async () => {
    if (selectedRows.length === 0) {
      setShowNoSelectionAlert(true);
      return;
    }

    await Promise.all(selectedRows.map((id) => deleteMutation(id)));

    await queryClient.invalidateQueries(["inventoryData"]);

    setDeletedIds(selectedRows);
    setSelectedRows([]);
  };

  useEffect(() => {
    if (deletedIds.length > 0) {
      const timer = setTimeout(() => setDeletedIds([]), 3000);
      return () => clearTimeout(timer);
    }
  }, [deletedIds]);

  useEffect(() => {
    if (showNoSelectionAlert) {
      const timer = setTimeout(() => setShowNoSelectionAlert(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showNoSelectionAlert]);

  useEffect(() => {
    if (showSingleSelectionAlert) {
      const timer = setTimeout(() => setShowSingleSelectionAlert(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showSingleSelectionAlert]);

  if (isPendingQuery) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Alert variant="info" className="text-center">
          <Spinner animation="border" size="sm" className="me-2" /> Cargando...
        </Alert>
      </div>
    );
  }

  if (isErrorQuery) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Alert variant="danger" className="text-center" dismissible>
          Error: {error?.message || "Ocurrió un error al mostrar datos"}
        </Alert>
      </div>
    );
  }

  if (isPendingMutuation) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Alert variant="info" className="text-center">
          <Spinner animation="border" size="sm" className="me-2" />{" "}
          Eliminando...
        </Alert>
      </div>
    );
  }

  if (isErrorMutation) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Alert variant="danger" className="text-center" dismissible>
          Error:{" "}
          {errorMutuation?.message ||
            "Ocurrió un error al eliminar los registros"}
        </Alert>
      </div>
    );
  }

  return (
    <inventoryContext.Provider
      value={{
        inventoryData,
        createRecord,
        findAll,
        findById,
        updateById,
        deleteById,
        queryClient,
        tableColumns,
        CreateModal,
        ViewModal,
        UpdateModal,
        sorting,
        setSorting,
        searchValue,
        setSearchValue,
        columnFilters,
        setColumnFilters,
        selectedFilter,
        setSelectedFilter,
        showModalCreate,
        setShowModalCreate,
        showModalView,
        setShowModalView,
        showModalUpdate,
        setShowModalUpdate,
        selectedRows,
        setSelectedRows,
        handleDeleteSelected,
        setShowSingleSelectionAlert,
      }}
    >
      <Container
        fluid
        className="inventory-container d-flex flex-column justify-content-center mt-3"
      >
        <InventoryNavbar />

        {deletedIds.length > 0 && (
          <Alert
            variant="success"
            onClose={() => setDeletedIds([])}
            dismissible
          >
            Se ha eliminado los registros con el ID: {deletedIds.join(", ")}
          </Alert>
        )}

        {showNoSelectionAlert && (
          <Alert
            variant="warning"
            onClose={() => setShowNoSelectionAlert(false)}
            dismissible
          >
            Selecciona uno o más registros, por favor.
          </Alert>
        )}

        {showSingleSelectionAlert && (
          <Alert
            variant="warning"
            onClose={() => setShowSingleSelectionAlert(false)}
            dismissible
          >
            Selecciona un solo registro para ver.
          </Alert>
        )}

        <InventoryTable />

        <InventoryModalCreate />

        <InventoryModalView />

        <InventoryModalUpdate />
      </Container>
    </inventoryContext.Provider>
  );
}

/*InventoryManagement.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  CreateModal: PropTypes.elementType.isRequired,
};*/

export default InventoryManagement;
