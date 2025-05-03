import { Form } from "react-bootstrap";

const BuildingTableColumns = () => {
  return [
    {
      id: "select",
      header: ({ table }) => {
        return (
          <Form.Check
            type="checkbox"
            {...{
              checked: table.getIsAllRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
              indeterminate: table.getIsSomeRowsSelected() ? "true" : "false",
            }}
          />
        );
      },
      cell: ({ row }) => {
        return (
          <Form.Check
            type="checkbox"
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              onChange: row.getToggleSelectedHandler(),
              indeterminate: row.getIsSomeSelected() ? "true" : "false",
            }}
          />
        );
      },
    },
    {
      id: "id",
      header: "ID",
      accessorKey: "id",
      sortingFn: (rowA, rowB) => {
        const idA = rowA.original.id;
        const idB = rowB.original.id;
        return idA - idB;
      },
      filterFn: (row, columnId, filterValue) => {
        const idString = String(row.original.id);
        return idString.includes(filterValue);
      },
      cell: ({ getValue }) => String(getValue()),
    },
    {
      id: "name",
      header: "Nombre del edificio",
      accessorKey: "name",
    },
    {
      id: "numberOfFloors",
      header: "Numero de pisos",
      accessorKey: "numberOfFloors",
    },
    {
      id: "description",
      header: "Descripción",
      accessorKey: "description",
    },
  ];
};

export default BuildingTableColumns;
