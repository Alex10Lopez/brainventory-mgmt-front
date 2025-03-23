import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";

import TableSortDropdown from "./TableSortDropdown";
import TableFilterDropdown from "./TableFilterDropdown";
import TableFilterButtons from "./TableFilterButtons";
import TableSearchForm from "./TableSearchForm";
import useWindowWidth from "./hooks/useWindowWidth";

function InventoryNavbar({
  data,
  columns,
  sorting,
  setSorting,
  searchValue,
  setSearchValue,
  columnFilters,
  setColumnFilters,
  selectedFilter,
  setSelectedFilter,
  setShowModalCreate,
  setShowModalRead,
}) {
  const windowWidth = useWindowWidth();
  const [showCrudButtons, setShowCrudButtons] = useState(true);

  useEffect(() => {
    setShowCrudButtons(windowWidth >= 768);
  }, [windowWidth]);

  const handleShowModalCreate = () => setShowModalCreate(true);
  const handleShowModalRead = () => setShowModalRead(true);

  return (
    <>
      <Navbar className="inventory-navbar bg-body-tertiary w-100">
        <Container
          fluid
          className="actions-container d-flex flex-column p-2 w-100"
        >
          <Container
            fluid
            className={`filter-search-container d-flex ${
              windowWidth < 992 ? "flex-column" : "flex-row"
            } p-0 w-100`}
          >
            <Nav
              className={`filter-search-nav d-flex p-0 ${
                windowWidth < 576 ? "flex-column w-100" : "flex-row w-50"
              }`}
            >
              <TableSortDropdown
                data={data}
                columns={columns}
                sorting={sorting}
                setSorting={setSorting}
              />
              <TableFilterDropdown
                data={data}
                columns={columns}
                searchValue={searchValue}
                columnFilters={columnFilters}
                setColumnFilters={setColumnFilters}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
              />
            </Nav>

            <Container
              fluid
              className={`d-flex ${windowWidth < 992 ? "w-100" : "w-50"} px-0`}
            >
              <TableSearchForm setSearchValue={setSearchValue} />
              <Button disabled variant="outline-primary">
                Buscar
              </Button>
            </Container>
          </Container>

          <Container
            fluid
            className="actions-buttons-container d-flex flex-column p-0 w-100"
          >
            <Nav
              className={`actions-nav d-flex ${
                windowWidth < 768 ? "flex-column" : "flex-row"
              }  p-0 my-3 w-100`}
            >
              <Container
                fluid
                className={`filter-buttons-container d-flex ${
                  windowWidth < 768
                    ? "flex-column w-100"
                    : "flex-row justify-content-start w-25"
                } p-0`}
              >
                <TableFilterButtons
                  setSorting={setSorting}
                  setColumnFilters={setColumnFilters}
                  setSelectedFilter={setSelectedFilter}
                />
              </Container>

              {windowWidth < 768 && (
                <Button
                  variant="primary"
                  onClick={() => setShowCrudButtons(!showCrudButtons)}
                  className="d-md-none toggle-button"
                >
                  {showCrudButtons ? "Ocultar acciones" : "Mostrar acciones"}
                </Button>
              )}

              <Container
                fluid
                className={`crud-buttons-container d-flex ${
                  showCrudButtons ? "" : "d-none"
                } ${
                  windowWidth < 768
                    ? "flex-column w-100"
                    : "flex-row justify-content-end w-75"
                } p-0`}
              >
                {windowWidth < 768 ? (
                  <>
                    <Container
                      fluid
                      className="d-flex flex-row my-3 p-0 w-100`"
                    >
                      <Button
                        variant="success"
                        className="px-1 mx-1 w-50"
                        onClick={handleShowModalCreate}
                      >
                        Crear registro
                      </Button>
                      <Button
                        variant="info"
                        className="px-1 mx-1 w-50"
                        onClick={handleShowModalRead}
                      >
                        Ver registro
                      </Button>
                    </Container>
                    <Container fluid className="d-flex flex-row p-0 w-100`">
                      <Button variant="primary" className="px-1 mx-1 w-50">
                        Editar registro
                      </Button>
                      <Button variant="danger" className="px-1 mx-1 w-50">
                        Eliminar registros
                      </Button>
                    </Container>
                  </>
                ) : (
                  <>
                    <Button
                      variant="success"
                      className="px-1 px-xl-3 me-md-1 me-lg-2"
                      onClick={handleShowModalCreate}
                    >
                      Crear registro
                    </Button>
                    <Button
                      variant="info"
                      className="px-1 px-xl-3 mx-md-1 mx-lg-2"
                      onClick={handleShowModalRead}
                    >
                      Ver registro
                    </Button>
                    <Button
                      variant="primary"
                      className="px-1 px-xl-3 mx-md-1 mx-lg-2"
                    >
                      Editar registro
                    </Button>
                    <Button
                      variant="danger"
                      className="px-1 px-xl-3 ms-md-1 ms-lg-2"
                    >
                      Eliminar registros
                    </Button>
                  </>
                )}
              </Container>
            </Nav>
          </Container>
        </Container>
      </Navbar>
    </>
  );
}

InventoryNavbar.propTypes = {
  /*data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
      date_of_birth: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
      nationality: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      job_rol: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })
  ).isRequired,*/
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      header: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
        .isRequired,
      accessorKey: PropTypes.string,
      accessorFn: PropTypes.func,
      cell: PropTypes.func,
      sortingFn: PropTypes.func,
    })
  ).isRequired,
  sorting: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      desc: PropTypes.bool.isRequired,
    })
  ),
  setSorting: PropTypes.func.isRequired,
  searchValue: PropTypes.string,
  setSearchValue: PropTypes.func.isRequired,
  columnFilters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.any,
      operator: PropTypes.string,
    })
  ),
  setColumnFilters: PropTypes.func.isRequired,
  selectedFilter: PropTypes.string,
  setSelectedFilter: PropTypes.func.isRequired,
  setShowModalCreate: PropTypes.func.isRequired,
  setShowModalRead: PropTypes.func.isRequired,
};

export default InventoryNavbar;
