import { Form } from "react-bootstrap";
import {
  SexEnum,
  PermissionsEnum,
  StatusEnum,
} from "../../data/enums/employeeEnums";

const EmployeeTableColumns = () => {
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
      id: "fullname",
      header: "Nombre completo",
      accessorFn: (row) => `${row.name} ${row.lastname}`,
    },
    {
      id: "dateOfBirth",
      header: "Fecha de nacimiento",
      accessorKey: "dateOfBirth",
      sortingFn: "datetime",
    },
    {
      id: "sex",
      header: "Sexo",
      accessorKey: "sex",
      cell: ({ row }) => {
        const sex = row.getValue("sex");
        return SexEnum[sex];
      },
    },
    {
      id: "nationality",
      header: "Nacionalidad",
      accessorKey: "nationality",
    },
    {
      id: "permissions",
      header: "Privilegios",
      accessorKey: "permissions",
      cell: ({ row }) => {
        const permissions = row.getValue("permissions");

        return PermissionsEnum[permissions];
      },
    },
    {
      id: "jobRoles",
      header: "Puestos de trabajo",
      accessorKey: "jobRoles",
      cell: ({ row }) => {
        const jobRoles = row.original.jobRoles;
        if (!jobRoles || jobRoles.length === 0) {
          return "-";
        }
        return (
          <ul style={{ margin: 0, paddingLeft: "20px" }}>
            {jobRoles.map((jobRole, index) => (
              <li key={index}>{jobRole.name}</li>
            ))}
          </ul>
        );
      },
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        const status = row.getValue("status");

        return StatusEnum[status];
      },
    },
    {
      id: "salary",
      header: "Salario (USD)",
      accessorKey: "salary",
      cell: ({ getValue }) => {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(getValue());
      },
    },
    {
      id: "phoneNumber",
      header: "Teléfono",
      accessorFn: (row) => row.contacts?.[0]?.phoneNumber,
    },
    {
      id: "email",
      header: "Correo electrónico",
      accessorFn: (row) => row.contacts?.[0]?.email,
    },
    {
      id: "loginDate",
      header: "Inicio de sesión",
      accessorKey: "loginDate",
      cell: ({ row }) => {
        const loginDate = row.getValue("loginDate");
        return loginDate || "-";
      },
    },
  ];
};

export default EmployeeTableColumns;
