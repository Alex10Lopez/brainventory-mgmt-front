import PropTypes from "prop-types";
import { Button, Container } from "react-bootstrap";
import useWindowWidth from "./hooks/useWindowWidth";
import { useContext } from "react";
import { inventoryContext } from "./InventoryManagement";

function TableFilterButtons() {
  const { setSorting, setColumnFilters, setSelectedFilter } =
    useContext(inventoryContext);

  const windowWidth = useWindowWidth();

  const handleClearSorting = () => setSorting([]);

  const handleClearFilters = () => {
    setColumnFilters([]);
    setSelectedFilter(null);
  };

  return windowWidth < 768 ? (
    <>
      <Container fluid className="d-flex flex-row my-2 p-0 w-100`">
        <Button
          variant="danger"
          className="px-1 me-1 mb-2 w-50"
          onClick={() => handleClearSorting()}
        >
          Restablecer orden
        </Button>
        <Button
          variant="warning"
          className="px-1 ms-1 mb-2 w-50"
          onClick={() => handleClearFilters()}
        >
          Borrar filtros
        </Button>
      </Container>
    </>
  ) : (
    <>
      <Button
        variant="danger"
        className="px-1 px-xl-3 me-md-1 me-xl-2"
        onClick={() => handleClearSorting()}
      >
        Restablecer orden
      </Button>
      <Button
        variant="warning"
        className="px-1 px-xl-3 ms-md-1 ms-xl-2"
        onClick={() => handleClearFilters()}
      >
        Borrar filtros
      </Button>
    </>
  );
}

/*TableFilterButtons.propTypes = {
  setSorting: PropTypes.func.isRequired,
  setColumnFilters: PropTypes.func.isRequired,
  setSelectedFilter: PropTypes.func.isRequired,
};*/

export default TableFilterButtons;
