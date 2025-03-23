import PropTypes from "prop-types";

import { Container } from "react-bootstrap";
import InventoryNavbar from "./InventoryNavbar";
import InventoryTable from "./InventoryTable";
import { useState } from "react";

function InventoryManagement({ data, columns, CreateForm }) {
  const [sorting, setSorting] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [columnFilters, setColumnFilters] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalRead, setShowModalRead] = useState(false);

  return (
    <>
      <Container
        fluid
        className="inventory-container d-flex flex-column justify-content-center mt-3"
      >
        <InventoryNavbar
          data={data}
          columns={columns}
          sorting={sorting}
          setSorting={setSorting}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          setShowModalCreate={setShowModalCreate}
          setShowModalRead={setShowModalRead}
        />
        <InventoryTable
          data={data}
          columns={columns}
          sorting={sorting}
          searchValue={searchValue}
          columnFilters={columnFilters}
          selectedFilter={selectedFilter}
          showModalCreate={showModalCreate}
          setShowModalCreate={setShowModalCreate}
          showModalRead={showModalRead}
          setShowModalRead={setShowModalRead}
          CreateForm={CreateForm}
        />
      </Container>
    </>
  );
}

InventoryManagement.propTypes = {
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
  showModalCreate: PropTypes.bool,
  setShowModalCreate: PropTypes.func.isRequired,
  showModalRead: PropTypes.bool,
  setShowModalRead: PropTypes.func.isRequired,
};

export default InventoryManagement;
