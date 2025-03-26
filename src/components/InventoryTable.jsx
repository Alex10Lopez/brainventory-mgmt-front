import PropTypes from "prop-types";
import { Table } from "react-bootstrap";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import InventoryPagination from "./InventoryPagination";
import { useContext, useEffect } from "react";
import { inventoryContext } from "./InventoryManagement";

function InventoryTable() {
  const {
    inventoryData,
    tableColumns,
    sorting,
    searchValue,
    columnFilters,
    selectedFilter,
    setSelectedRows,
  } = useContext(inventoryContext);

  const table = useReactTable({
    data: inventoryData.data,
    columns: tableColumns,
    state: {
      sorting,
      globalFilter: selectedFilter ? "" : searchValue,
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const currentPageIndex = table.getState().pagination.pageIndex;
  const totalPages = table.getPageCount();

  useEffect(() => {
    table.resetRowSelection();
  }, [inventoryData]);

  useEffect(() => {
    const selectedIds = table
      .getSelectedRowModel()
      .rows.map((row) => row.original.id);

    setSelectedRows(selectedIds);
  }, [table.getSelectedRowModel().rows]);

  return (
    <>
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

      <InventoryPagination
        currentPageIndex={currentPageIndex}
        totalPages={totalPages}
        onPreviousPage={() => table.previousPage()}
        onNextPage={() => table.nextPage()}
        onPageChange={(pageIndex) => table.setPageIndex(pageIndex)}
      />
    </>
  );
}

/*InventoryTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  tableColumns: PropTypes.arrayOf(PropTypes.object).isRequired,
  sorting: PropTypes.array.isRequired,
  searchValue: PropTypes.string.isRequired,
  columnFilters: PropTypes.array.isRequired,
  selectedFilter: PropTypes.string,
};*/

export default InventoryTable;
