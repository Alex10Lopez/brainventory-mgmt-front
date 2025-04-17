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
      header: "ID",
      accessorFn: (row) => String(row.id),
    },
    {
      header: "Nombre completo",
      accessorFn: (row) => `${row.name} ${row.lastname}`,
    },
    { header: "Fecha de nacimiento", accessorKey: "dateOfBirth" },
    {
      header: "Sexo",
      accessorKey: "sex",
      cell: ({ row }) => {
        const sex = row.getValue("sex");
        return SexEnum[sex];
      },
    },
    { header: "Nacionalidad", accessorKey: "nationality" },
    {
      header: "Privilegios",
      accessorKey: "permissions",
      cell: ({ row }) => {
        const permissions = row.getValue("permissions");

        return PermissionsEnum[permissions];
      },
    },
    {
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
      header: "Estado",
      accessorKey: "status",
      cell: ({ row }) => {
        const status = row.getValue("status");

        return StatusEnum[status];
      },
    },
    {
      header: "Salario (USD)",
      accessorKey: "salary",
      accessorFn: (row) => {
        const salary = parseFloat(row.salary);
        return salary.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });
      },
    },
    {
      header: "Teléfono",
      accessorFn: (row) => row.contacts?.[0]?.phoneNumber,
    },
    {
      header: "Correo electrónico",
      accessorFn: (row) => row.contacts?.[0]?.email,
    },
    {
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
