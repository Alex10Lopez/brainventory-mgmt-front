import PropTypes from "prop-types";
import { NavDropdown } from "react-bootstrap";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

function TableSortDropdown({ data, columns, sorting, setSorting }) {
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
  });

  const sortColumn =
    table.getState().sorting.length > 0 ? table.getState().sorting[0].id : "";

  const sortDirection =
    table.getState().sorting.length > 0
      ? table.getState().sorting[0].desc
        ? "Desc ↓"
        : "Asc ↑"
      : "";

  const sortColumnHeader =
    columns.find((col) => col.accessorKey === sortColumn)?.header || "";

  return (
    <NavDropdown
      title={
        <>
          <span className="text-dark">Ordenar por: </span>
          <span className="text-primary">
            {sortColumnHeader
              ? `${sortColumnHeader} (${sortDirection})`
              : "Selecciona una opción"}
          </span>
        </>
      }
      id="sortDropdown"
    >
      {table.getHeaderGroups().map((headerGroup) =>
        headerGroup.headers
          .filter((header) => header.id !== "select")
          .map((header) => (
            <NavDropdown.Item
              key={header.id}
              onClick={header.column.getToggleSortingHandler()}
            >
              {flexRender(header.column.columnDef.header, header.getContext())}
            </NavDropdown.Item>
          ))
      )}
    </NavDropdown>
  );
}

TableSortDropdown.propTypes = {
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
};

export default TableSortDropdown;
