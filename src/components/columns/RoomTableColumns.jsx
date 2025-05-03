import { Form } from "react-bootstrap";
import { RoomTypesEnum } from "../../data/enums/roomEnums";

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
      header: "Nombre de la sala/espacio",
      accessorFn: (row) => {
        const roomType = row.roomType;
        const roomName = row.name;
        const roomNumber = row.number;
        const roomTypeLabel = RoomTypesEnum[roomType] || roomType;

        let result = roomTypeLabel;
        if (roomName) result += ` - ${roomName}`;
        if (roomNumber) result += ` - ${roomNumber}`;

        return result;
      },
      cell: ({ row }) => {
        const roomType = row.original.roomType;
        const roomName = row.original.name;
        const roomNumber = row.original.number;
        const roomTypeLabel = RoomTypesEnum[roomType] || roomType;

        let result = roomTypeLabel;
        if (roomName) result += ` - ${roomName}`;
        if (roomNumber) result += ` - ${roomNumber}`;

        return result;
      },
    },
    {
      id: "capacityMax",
      header: "Capacidad maxima",
      accessorFn: (row) => `${row.capacityMax ? row.capacityMax : "-"}`,
    },
    {
      id: "building",
      header: "Edificio",
      accessorKey: "building.name",
    },
    {
      id: "floorLabel",
      header: "Nivel de piso",
      accessorKey: "floorLabel",
    },
    {
      id: "departments",
      header: "Departamentos",
      accessorKey: "departments",
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
