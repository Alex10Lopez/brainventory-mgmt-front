import { Form } from "react-bootstrap";

const IODevicesColumns = () => {
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
      header: "Dispositivo",
      accessorFn: (row) => row.hardwareDetails?.hardwareName.name,
    },
    {
      id: "brand",
      header: "Marca",
      accessorFn: (row) => row.hardwareDetails?.hardwareBrand.brand,
    },
    {
      id: "serie",
      header: "Modelo",
      accessorFn: (row) =>
        `${row.hardwareDetails?.hardwareLine.lineName} ${row.hardwareDetails?.hardwareSerie.serie}`,
    },
    {
      id: "serialNumber",
      header: "Número de serie",
      accessorFn: (row) => row.hardwareDetails?.serialNumber,
    },
  ];
};

export default IODevicesColumns;
