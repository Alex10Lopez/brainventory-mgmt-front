import electronicDevices from "../../images/electronic_devices.jpg";
import peripherals from "../../images/peripherals.jpeg";
import software from "../../images/software.jpg";
import softwareLicense from "../../images/software_license.jpg";
import buildings from "../../images/buildings.jpg";
import offices from "../../images/offices.jpg";
import departments from "../../images/departments.jpg";
import employees from "../../images/employees.jpg";
import jobRoles from "../../images/job_roles.jpg";

export const assetsMenu = [
  {
    id: 1,
    img: electronicDevices,
    title: "Dispositivos electrónicos",
    text: "Accede a la información detallada sobre los dispositivos electrónicos, incluyendo opciones para agregar, editar o eliminar registros.",
    buttonText: "Gestionar dispositivos",
    link: "/it-devices-inventory",
  },
  {
    id: 2,
    img: peripherals,
    title: "Periféricos",
    text: "Consulta los detalles de los periféricos asociados a los dispositivos electrónicos, y realiza acciones como agregar, editar o eliminar.",
    buttonText: "Gestionar periféricos",
    link: "/peripherals-inventory",
  },
  {
    id: 3,
    img: software,
    title: "Software",
    text: "Revisa el software instalado en los dispositivos electrónicos. Puedes agregar nuevos programas, editar configuraciones o eliminar los existentes.",
    buttonText: "Gestionar software",
    link: "/software-inventory",
  },
  {
    id: 4,
    img: softwareLicense,
    title: "Licencias de software",
    text: "Accede a la información sobre las licencias de software, con opciones para agregar, modificar o eliminar licencias.",
    buttonText: "Gestionar licencias",
    link: "/software-license-inventory",
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
  {
    id: 3,
    img: departments,
    title: "Departamentos",
    text: "Consulta la información sobre los departamentos de la empresa, con opciones para agregar nuevos departamentos, editar o eliminar los existentes.",
    buttonText: "Gestionar departamentos",
    link: "/departments-inventory",
  },
];

export const humanResourcesMenu = [
  {
    id: 1,
    img: jobRoles,
    title: "Puestos de trabajo",
    text: "Revisa la lista de puestos de trabajo de la empresa. Puedes agregar, editar o eliminar datos de los puestos asignados a los empleados.",
    buttonText: "Gestionar puestos",
    link: "/job-roles-inventory",
  },
  {
    id: 2,
    img: employees,
    title: "Empleados",
    text: "Revisa la lista de empleados de la empresa. Puedes agregar, editar o eliminar datos de los empleados registrados.",
    buttonText: "Gestionar empleados",
    link: "/employees-inventory",
  },
];
