import { Form } from "react-bootstrap";

const ITDevicesColumns = () => {
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
      header: "ID",
      accessorFn: (row) => String(row.idITDevice),
    },
    {
      header: "Dispositivo",
      accessorFn: (row) => row.hardwareDetails.hardwareName.name,
    },
    {
      header: "Marca",
      accessorFn: (row) => row.hardwareDetails.hardwareBrand.brand,
    },
    {
      header: "Modelo",
      accessorFn: (row) =>
        `${row.hardwareDetails.hardwareLine.lineName} ${row.hardwareDetails.hardwareSerie.serie}`,
    },
    {
      header: "Número de serie",
      accessorFn: (row) => row.hardwareDetails.serialNumber,
    },
  ];
};

export default ITDevicesColumns;
