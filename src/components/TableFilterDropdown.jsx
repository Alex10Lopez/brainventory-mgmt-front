import PropTypes from "prop-types";
import { NavDropdown } from "react-bootstrap";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useContext, useEffect } from "react";
import { inventoryContext } from "./InventoryManagement";

function TableFilterDropdown() {
  const {
    inventoryData,
    tableColumns,
    searchValue,
    columnFilters,
    setColumnFilters,
    selectedFilter,
    setSelectedFilter,
  } = useContext(inventoryContext);

  const table = useReactTable({
    data: inventoryData.data,
    columns: tableColumns,
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
              ? tableColumns.find((col) => col.accessorKey === selectedFilter)
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

/*TableFilterDropdown.propTypes = {
  inventoryData: PropTypes.arrayOf(PropTypes.object).isRequired,
  tableColumns: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchValue: PropTypes.string.isRequired,
  columnFilters: PropTypes.array.isRequired,
  setColumnFilters: PropTypes.func.isRequired,
  selectedFilter: PropTypes.string,
  setSelectedFilter: PropTypes.func.isRequired,
};*/

export default TableFilterDropdown;
