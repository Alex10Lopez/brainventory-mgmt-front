import PropTypes from "prop-types";
import { NavDropdown } from "react-bootstrap";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useEffect } from "react";

function TableFilterDropdown({
  data,
  columns,
  searchValue,
  columnFilters,
  setColumnFilters,
  selectedFilter,
  setSelectedFilter,
}) {
  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
  });

  useEffect(() => {
    if (selectedFilter && searchValue) {
      setColumnFilters([{ id: selectedFilter, value: searchValue }]);
    } else {
      setColumnFilters([]);
    }
  }, [searchValue, selectedFilter, setColumnFilters]);

  return (
    <NavDropdown
      title={
        <>
          <span className="text-dark">Filtrar por: </span>
          <span className="text-primary">
            {selectedFilter
              ? columns.find((col) => col.accessorKey === selectedFilter)
                  ?.header
              : "Selecciona una opción"}
          </span>
        </>
      }
      id="filterDropdown"
    >
      {table.getHeaderGroups().map((headerGroup) =>
        headerGroup.headers
          .filter((header) => header.id !== "select")
          .map((header) => (
            <NavDropdown.Item
              key={header.id}
              onClick={() => setSelectedFilter(header.id)}
            >
              {flexRender(header.column.columnDef.header, header.getContext())}
            </NavDropdown.Item>
          ))
      )}
    </NavDropdown>
  );
}

TableFilterDropdown.propTypes = {
  data: PropTypes.arrayOf(
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
  ).isRequired,
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
  searchValue: PropTypes.string,
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
};

export default TableFilterDropdown;
