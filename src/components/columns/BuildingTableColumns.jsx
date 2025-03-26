import { Form } from "react-bootstrap";
import {
  SexEnum,
  PermissionsEnum,
  StatusEnum,
} from "../../data/enums/employeeEnums";

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
      header: "ID",
      accessorFn: (row) => String(row.id),
    },
    {
      header: "Nombre del edificio",
      accessorKey: "name",
    },
    { header: "Numero de pisos", accessorKey: "numberOfFloors" },
    { header: "Descripción", accessorKey: "description" },
  ];
};

export default BuildingTableColumns;
