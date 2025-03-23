import NavigationBar from "../components/NavigationBar";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Pagination from "react-bootstrap/Pagination";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";

import { useEffect, useState, useRef } from "react";

import data from "../data/employees.json";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import { useForm, useWatch } from "react-hook-form";

function TestInventory() {
  const headerRef = useRef();
  const cellRefs = useRef(new Map());

  const columns = [
    {
      id: "select",
      header: ({ table }) => {
        return (
          <Form.Check
            ref={headerRef}
            type="checkbox"
            {...{
              checked: table.getIsAllRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        );
      },
      cell: ({ row }) => {
        return (
          <Form.Check
            ref={cellRefs}
            type="checkbox"
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        );
      },
    },
    { header: "ID", accessorKey: "id" },
    { header: "Nombre", accessorKey: "name" },
    { header: "Apellido", accessorKey: "last_name" },
    {
      header: "Fecha de nacimiento",
      accessorKey: "date_of_birth",
      cell: (info) => {
        return dayjs(info.getValue()).format("DD/MM/YYYY");
      },
      sortingFn: (rowA, rowB, columnId) => {
        const dateA = dayjs(rowA.getValue(columnId), "DD/MM/YYYY").format(
          "YYYY-MM-DD"
        );
        const dateB = dayjs(rowB.getValue(columnId), "DD/MM/YYYY").format(
          "YYYY-MM-DD"
        );
        return dateA > dateB ? 1 : dateA < dateB ? -1 : 0;
      },
    },
    { header: "Sexo", accessorKey: "gender" },
    { header: "Nacionalidad", accessorKey: "nationality" },
    { header: "Domicilio", accessorKey: "address" },
    { header: "Puesto de trabajo", accessorKey: "job_rol" },
    { header: "Número de telefono", accessorKey: "phone" },
    { header: "Correo electrónico", accessorKey: "email" },
  ];

  const {
    register,
    formState: { errors },
    control,
  } = useForm();

  const searchValue = useWatch({ control, name: "search", defaultValue: "" });

  const [showCrudButtons, setShowCrudButtons] = useState(true);
  const [isSmallerScreen, setIsSmallerScreen] = useState(window.innerWidth);

  const [sortingTable, setSortingTable] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [rowSelection, setRowSelection] = useState({});

  const [alert, setAlert] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting: sortingTable,
      globalFilter: selectedFilter ? "" : searchValue,
      columnFilters,
      rowSelection,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSortingTable,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
  });

  useEffect(() => {
    const handleResize = () => {
      setIsSmallerScreen(window.innerWidth);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [isSmallerScreen]);

  useEffect(
    () => setShowCrudButtons(isSmallerScreen >= 768),
    [isSmallerScreen]
  );

  useEffect(() => {
    if (selectedFilter && searchValue) {
      setColumnFilters([{ id: selectedFilter, value: searchValue }]);
    } else {
      setColumnFilters([]);
    }
  }, [searchValue, selectedFilter]);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [alert]);

  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.indeterminate = table.getIsSomeRowsSelected();
    }
  }, [table.getIsSomeRowsSelected()]);

  useEffect(() => {
    if (cellRefs.current instanceof Map) {
      cellRefs.current.forEach((ref, rowId) => {
        if (ref) {
          const row = table.getRow(rowId);
          ref.indeterminate = row.getIsSomeSelected();
        }
      });
    }
  }, [table.getRow, table.getRowModel]);

  const handleClearFilters = () => {
    setColumnFilters([]);
    setSelectedFilter(null);
    /*reset({
      search: "",
    });*/
  };

  const handleClearSorting = () => setSortingTable([]);

  const handleReadUpdateRow = () => {
    const selectedRows = table.getSelectedRowModel().rows;

    if (selectedRows.length === 0)
      return setAlert({
        type: "danger",
        message: "Seleccione una fila a editar",
      });

    if (selectedRows.length > 1)
      return setAlert({
        type: "danger",
        message: "Solo puede seleccionar una fila",
      });
  };

  const handleDeleteRows = () => {
    const selectedRows = table.getSelectedRowModel().rows;

    if (selectedRows.length === 0)
      return setAlert({
        type: "danger",
        message: "Seleccione una o más filas a eliminar",
      });

    setAlert({
      type: "success",
      message: "Filas eliminadas",
    });
  };

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const sortColumn = sortingTable.length > 0 ? sortingTable[0].id : "";
  const sortDirection =
    sortingTable.length > 0 ? (sortingTable[0].desc ? "Desc ↓" : "Asc ↑") : "";
  const sortColumnHeader =
    columns.find((col) => col.accessorKey === sortColumn)?.header || "";

  const currentPageIndex = table.getState().pagination.pageIndex;
  const endPage = table.getPageCount();

  return (
    <>
      <NavigationBar />
      <Container
        fluid
        className="inventory-container d-flex flex-column justify-content-center mt-3"
      >
        <Navbar className="inventory-navbar bg-body-tertiary w-100">
          <Container
            fluid
            className="actions-container d-flex flex-column p-2 w-100"
          >
            <Container
              fluid
              className={`filter-search-container d-flex ${
                isSmallerScreen < 992 ? "flex-column" : "flex-row"
              } p-0 w-100`}
            >
              <Nav
                className={`filter-search-nav d-flex p-0 ${
                  isSmallerScreen < 576 ? "flex-column w-100" : "flex-row w-50"
                }`}
              >
                <NavDropdown
                  title={
                    <>
                      <span className="text-dark">Ordenar por: </span>
                      <span className="text-primary">
                        {sortColumnHeader
                          ? `${sortColumnHeader} (${sortDirection})`
                          : "Seleccionar una opción"}
                      </span>
                    </>
                  }
                  id="sortDropdown"
                >
                  {table.getHeaderGroups().map((headerGroup) =>
                    headerGroup.headers
                      .filter((header) => header.id !== "select") // Excluye la columna de checkboxes
                      .map((header) => (
                        <NavDropdown.Item
                          key={header.id}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </NavDropdown.Item>
                      ))
                  )}
                </NavDropdown>
                <NavDropdown
                  title={
                    <>
                      <span className="text-dark">Filtrar por: </span>
                      <span className="text-primary">
                        {selectedFilter
                          ? columns.find(
                              (col) => col.accessorKey === selectedFilter
                            )?.header
                          : "Selecciona una opción"}
                      </span>
                    </>
                  }
                  id="filterDropdown"
                >
                  {table.getHeaderGroups().map((headerGroup) =>
                    headerGroup.headers
                      .filter((header) => header.id !== "select") // Excluye la columna de checkboxes
                      .map((header) => (
                        <NavDropdown.Item
                          key={header.id}
                          onClick={() => setSelectedFilter(header.id)}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </NavDropdown.Item>
                      ))
                  )}
                </NavDropdown>
              </Nav>

              <Container
                fluid
                className={`d-flex ${isSmallerScreen < 992 ? "w-100" : "w-50"}`}
              >
                <Form.Control
                  type="search"
                  placeholder="Buscar"
                  className="me-2"
                  aria-label="Search"
                  {...register("search")}
                />
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
                  isSmallerScreen < 768 ? "flex-column" : "flex-row"
                }  p-0 my-3 w-100`}
              >
                <Container
                  fluid
                  className={`filter-buttons-container d-flex ${
                    isSmallerScreen < 768
                      ? "flex-column w-100"
                      : "flex-row justify-content-start w-25"
                  } p-0`}
                >
                  {isSmallerScreen < 768 ? (
                    <>
                      <Container
                        fluid
                        className="d-flex flex-row my-2 p-0 w-100`"
                      >
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
                  )}
                </Container>

                {isSmallerScreen < 768 && (
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
                    isSmallerScreen < 768
                      ? "flex-column w-100"
                      : "flex-row justify-content-end w-75"
                  } p-0`}
                >
                  {isSmallerScreen < 768 ? (
                    <>
                      <Container
                        fluid
                        className="d-flex flex-row my-3 p-0 w-100`"
                      >
                        <Button
                          variant="success"
                          className="px-1 mx-1 w-50"
                          onClick={handleShowModal}
                        >
                          Crear registro
                        </Button>
                        <Button
                          variant="info"
                          className="px-1 mx-1 w-50"
                          onClick={handleReadUpdateRow}
                        >
                          Ver registro
                        </Button>
                      </Container>
                      <Container fluid className="d-flex flex-row p-0 w-100`">
                        <Button
                          variant="primary"
                          className="px-1 mx-1 w-50"
                          onClick={handleReadUpdateRow}
                        >
                          Editar registro
                        </Button>
                        <Button
                          variant="danger"
                          className="px-1 mx-1 w-50"
                          onClick={handleDeleteRows}
                        >
                          Eliminar registros
                        </Button>
                      </Container>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="success"
                        className="px-1 px-xl-3 me-md-1 me-lg-2"
                        onClick={handleShowModal}
                      >
                        Crear registro
                      </Button>
                      <Button
                        variant="info"
                        className="px-1 px-xl-3 mx-md-1 mx-lg-2"
                        onClick={handleReadUpdateRow}
                      >
                        Ver registro
                      </Button>
                      <Button
                        variant="primary"
                        className="px-1 px-xl-3 mx-md-1 mx-lg-2"
                        onClick={handleReadUpdateRow}
                      >
                        Editar registro
                      </Button>
                      <Button
                        variant="danger"
                        className="px-1 px-xl-3 ms-md-1 ms-lg-2"
                        onClick={handleDeleteRows}
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

        {alert && (
          <Alert
            variant={alert.type}
            onClose={() => setAlert(null)}
            dismissible
          >
            {alert.message}
          </Alert>
        )}

        <Table className="inventory-table" striped responsive>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>

        <Pagination className="table-pagination d-flex flex-row justify-content-center mt-3 w-100">
          <Pagination.Prev
            onClick={() => table.previousPage()}
            disabled={currentPageIndex === 0}
          >
            {"Anterior"}
          </Pagination.Prev>

          <Pagination.Item
            onClick={() => table.setPageIndex(0)}
            active={currentPageIndex === 0}
          >
            {"1"}
          </Pagination.Item>

          {currentPageIndex === 0 || currentPageIndex === endPage - 1 ? (
            <Pagination.Ellipsis />
          ) : currentPageIndex > 1 && currentPageIndex < endPage - 2 ? (
            <>
              <Pagination.Ellipsis />
              <Pagination.Item active>{currentPageIndex + 1}</Pagination.Item>
              <Pagination.Ellipsis />
            </>
          ) : currentPageIndex === 1 ? (
            currentPageIndex === endPage - 2 ? (
              <>
                <Pagination.Item active>{currentPageIndex + 1}</Pagination.Item>
              </>
            ) : (
              <>
                <Pagination.Item active>{currentPageIndex + 1}</Pagination.Item>
                <Pagination.Ellipsis />
              </>
            )
          ) : (
            <>
              <Pagination.Ellipsis />
              <Pagination.Item active>{currentPageIndex + 1}</Pagination.Item>
            </>
          )}

          <Pagination.Item
            onClick={() => table.setPageIndex(endPage - 1)}
            active={currentPageIndex === endPage - 1}
          >
            {endPage}
          </Pagination.Item>

          <Pagination.Next
            onClick={() => table.nextPage()}
            disabled={currentPageIndex === endPage - 1}
          >
            {"Siguiente"}
          </Pagination.Next>
        </Pagination>
      </Container>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        dialogClassName={
          isSmallerScreen < 768
            ? "modal-90w"
            : isSmallerScreen < 1200
            ? "modal-85w"
            : "modal-80w"
        }
        centered
        className="form-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Empleado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="form-modal">
            <Container
              fluid
              className={`fields-container d-flex ${
                isSmallerScreen < 576
                  ? "flex-column"
                  : "flex-row justify-content-between"
              } px-0 w-100`}
            >
              <Form.Group
                className={`form-group-1 mb-3 ${
                  isSmallerScreen >= 576 && "pe-2"
                } w-100`}
                controlId="form-control-id-1"
              >
                <Form.Label>Foto</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Ingresa tu foto"
                  {...register("photo", {
                    required: {
                      value: true,
                      message: "Por favor ingresa tu foto.",
                    },
                  })}
                />
                {errors.name && (
                  <Alert key="danger" variant="danger" className="mt-2 p-2">
                    {errors.photo.message}
                  </Alert>
                )}
              </Form.Group>

              <Container
                className={`form-group-1 mb-3 ${
                  isSmallerScreen >= 576 && "pe-2"
                } w-100`}
                controlId="form-control-id-1"
              ></Container>
            </Container>

            <Container
              fluid
              className={`fields-container d-flex ${
                isSmallerScreen < 576
                  ? "flex-column"
                  : "flex-row justify-content-between"
              } px-0 w-100`}
            >
              <Form.Group
                className={`form-group-1 mb-3 ${
                  isSmallerScreen >= 576 && "pe-2"
                } w-100`}
                controlId="form-control-id-1"
              >
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa tu nombre"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Por favor ingresa tu nombre.",
                    },
                    minLength: {
                      value: 3,
                      message: "El nombre debe tener al menos 3 caracteres.",
                    },
                    maxLength: {
                      value: 50,
                      message: "El nombre no debe exceder los 50 caracteres.",
                    },
                    pattern: {
                      value: /^[A-Za-zÁáÉéÍíÓóÚúÑñüÜ\s-]{3,50}$/,
                      message: "El formato del nombre no es válido.",
                    },
                  })}
                />
                {errors.name && (
                  <Alert key="danger" variant="danger" className="mt-2 p-2">
                    {errors.name.message}
                  </Alert>
                )}
              </Form.Group>

              <Form.Group
                className={`form-group-1 mb-3 ${
                  isSmallerScreen >= 576 && "ps-2"
                } w-100`}
              >
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa tu apellido"
                  {...register("lastname", {
                    required: {
                      value: true,
                      message: "Por favor ingresa tu apellido.",
                    },
                    minLength: {
                      value: 3,
                      message: "El apellido debe tener al menos 3 caracteres.",
                    },
                    maxLength: {
                      value: 50,
                      message: "El apellido no debe exceder los 50 caracteres.",
                    },
                    pattern: {
                      value: /^[A-Za-zÁáÉéÍíÓóÚúÑñüÜ\s-]{3,50}$/,
                      message: "El formato del apellido no es válido.",
                    },
                  })}
                />
                {errors.lastname && (
                  <Alert key="danger" variant="danger" className="mt-2 p-2">
                    {errors.lastname.message}
                  </Alert>
                )}
              </Form.Group>
            </Container>

            <Container
              fluid
              className={`fields-container d-flex ${
                isSmallerScreen < 576
                  ? "flex-column"
                  : "flex-row justify-content-between"
              } px-0 w-100`}
            >
              <Form.Group
                className={`form-group-1 mb-3 ${
                  isSmallerScreen >= 576 && "pe-2"
                } w-100`}
              >
                <Form.Label>Fecha de nacimiento</Form.Label>
                <Form.Control
                  type="date"
                  {...register("dateOfBirth", {
                    required: {
                      value: true,
                      message: "Por favor ingresa tu fecha de nacimiento.",
                    },
                    validate: (value) => {
                      const valueDate = new Date(value);
                      const currentDate = new Date();

                      const age =
                        currentDate.getFullYear() - valueDate.getFullYear();

                      if (age < 18 || age > 100)
                        return "La fecha de nacimiento no es válida.";
                    },
                  })}
                />
                {errors.dateOfBirth && (
                  <Alert key="danger" variant="danger" className="mt-2 p-2">
                    {errors.dateOfBirth.message}
                  </Alert>
                )}
              </Form.Group>

              <Form.Group
                className={`form-group-1 mb-3 ${
                  isSmallerScreen >= 576 && "ps-2"
                } w-100`}
              >
                <Form.Label>Sexo</Form.Label>
                <Form.Select
                  {...register("sex", {
                    required: {
                      value: true,
                      message: "Por favor ingresa tu sexo.",
                    },
                  })}
                  defaultValue="Selecciona tu sexo"
                >
                  <option disabled value="">
                    Selecciona tu sexo
                  </option>
                  <option value="male">Masculino</option>
                  <option value="female">Femenino</option>
                </Form.Select>
                {errors.sex && (
                  <Alert key="danger" variant="danger" className="mt-2 p-2">
                    {errors.sex.message}
                  </Alert>
                )}
              </Form.Group>
            </Container>

            <Container
              fluid
              className={`fields-container d-flex ${
                isSmallerScreen < 576
                  ? "flex-column"
                  : "flex-row justify-content-between"
              } px-0 w-100`}
            >
              <Form.Group
                className={`form-group-1 mb-3 ${
                  isSmallerScreen >= 576 && "pe-2"
                } w-100`}
              >
                <Form.Label>Domicilio</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa tu domicilio"
                  {...register("address", {
                    required: {
                      value: true,
                      message: "Por favor ingresa tu domicilio.",
                    },
                    minLength: {
                      value: 8,
                      message: "El domicilio debe tener al menos 8 caracteres.",
                    },
                    maxLength: {
                      value: 254,
                      message:
                        "El domicilio no debe exceder los 254 caracteres.",
                    },
                  })}
                />
                {errors.address && (
                  <Alert key="danger" variant="danger" className="mt-2 p-2">
                    {errors.address.message}
                  </Alert>
                )}
              </Form.Group>

              <Form.Group
                className={`form-group-1 mb-3 ${
                  isSmallerScreen >= 576 && "ps-2"
                } w-100`}
              >
                <Form.Label>Número de teléfono</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Ingresa tu número de teléfono"
                  {...register("phoneNumber", {
                    required: {
                      value: true,
                      message: "Por favor ingresa tu número de teléfono.",
                    },
                    minLength: {
                      value: 3,
                      message:
                        "El número de teléfono debe tener al menos 3 digitos.",
                    },
                    maxLength: {
                      value: 50,
                      message:
                        "El número de teléfono no debe exceder los 50 digitos.",
                    },
                    pattern: {
                      value:
                        /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                      message:
                        "El formato del número de teléfono no es válido.",
                    },
                  })}
                />
                {errors.phoneNumber && (
                  <Alert key="danger" variant="danger" className="mt-2 p-2">
                    {errors.phoneNumber.message}
                  </Alert>
                )}
              </Form.Group>
            </Container>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="success">Guardar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TestInventory;
