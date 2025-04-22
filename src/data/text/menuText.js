import itDevices from "../../images/electronic_devices.jpg";
import peripherals from "../../images/peripherals.jpeg";
import buildings from "../../images/buildings.jpg";
import offices from "../../images/offices.jpg";
import employees from "../../images/employees.jpg";

export const assetsMenu = [
  {
    id: 1,
    img: itDevices,
    title: "Dispositivos de Tecnologías de la Información",
    text: "Accede a la información detallada sobre los dispositivos electrónicos, incluyendo opciones para agregar, editar o eliminar registros.",
    buttonText: "Gestionar dispositivos TI",
    link: "/it-devices-inventory",
  },
  {
    id: 2,
    img: peripherals,
    title: "Dispositivos de Entrada/Salida",
    text: "Consulta los detalles de los periféricos asociados a los dispositivos electrónicos, y realiza acciones como agregar, editar o eliminar.",
    buttonText: "Gestionar periféricos E/S",
    link: "/io-devices-inventory",
  },
];

export const infraestructureMenu = [
  {
    id: 1,
    img: buildings,
    title: "Edificios",
    text: "Gestiona la información de los edificios de la empresa, incluyendo ubicación y características..",
    buttonText: "Gestionar edificios",
    link: "/buildings-inventory",
  },
  {
    id: 2,
    img: offices,
    title: "Oficinas",
    text: "Visualiza los detalles de las oficinas de la empresa. Agrega, edita o elimina información sobre las distintas ubicaciones de la organización.",
    buttonText: "Gestionar oficinas",
    link: "/rooms-inventory",
  },
];

export const humanResourcesMenu = [
  {
    id: 1,
    img: employees,
    title: "Empleados",
    text: "Revisa la lista de empleados de la empresa. Puedes agregar, editar o eliminar datos de los empleados registrados.",
    buttonText: "Gestionar empleados",
    link: "/employees-inventory",
  },
];
