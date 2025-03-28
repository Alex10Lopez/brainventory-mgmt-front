import { Form } from "react-bootstrap";

const RoomTableColumns = () => {
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
      header: "Nombre de la oficina",
      accessorFn: (row) =>
        `${row.roomType.typeName}${row.name ? ` - ${row.name}` : ""}`,
    },
    {
      header: "Capacidad maxima",
      accessorFn: (row) => `${row.capacityMax ? row.capacityMax : "-"}`,
    },
    {
      header: "Edificio",
      accessorKey: "building.name",
    },
    { header: "Nivel de piso", accessorKey: "floorLabel" },
    {
      header: "Departamentos",
      cell: ({ row }) => {
        const departments = row.original.departments;
        if (!departments || departments.length === 0) {
          return "-";
        }
        return (
          <ul style={{ margin: 0, paddingLeft: "20px" }}>
            {departments.map((dept, index) => (
              <li key={index}>{dept.name}</li>
            ))}
          </ul>
        );
      },
    },
  ];
};

export default RoomTableColumns;
