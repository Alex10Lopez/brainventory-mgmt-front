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
import InventoryModalCreate from "./InventoryModalCreate";
import InventoryModalRead from "./InventoryModalRead";

function InventoryTable({
  data,
  columns,
  sorting,
  searchValue,
  columnFilters,
  selectedFilter,
  showModalCreate,
  setShowModalCreate,
  showModalRead,
  setShowModalRead,
  CreateForm,
}) {
  const table = useReactTable({
    data,
    columns,
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

      <InventoryModalCreate
        showModalCreate={showModalCreate}
        setShowModalCreate={setShowModalCreate}
        CreateForm={CreateForm}
      />

      <InventoryModalRead
        showModalRead={showModalRead}
        setShowModalRead={setShowModalRead}
      />
    </>
  );
}

InventoryTable.propTypes = {
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
  searchValue: PropTypes.string,
  columnFilters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.any,
      operator: PropTypes.string,
    })
  ),
  selectedFilter: PropTypes.string,
  showModalCreate: PropTypes.bool,
  setShowModalCreate: PropTypes.func.isRequired,
  showModalRead: PropTypes.bool,
  setShowModalRead: PropTypes.func.isRequired,
};

export default InventoryTable;
