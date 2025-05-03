import PropTypes from "prop-types";
import { NavDropdown } from "react-bootstrap";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useContext } from "react";
import { inventoryContext } from "./InventoryManagement";

function TableSortDropdown() {
  const { inventoryData, tableColumns, sorting, setSorting } =
    useContext(inventoryContext);

  const table = useReactTable({
    data: inventoryData.data,
    columns: tableColumns,
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
    tableColumns.find(
      (col) => col.accessorKey === sortColumn || col.id === sortColumn
    )?.header || "";

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

/*TableSortDropdown.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  tableColumns: PropTypes.arrayOf(PropTypes.object).isRequired,
  sorting: PropTypes.array.isRequired,
  setSorting: PropTypes.func.isRequired,
};*/

export default TableSortDropdown;
