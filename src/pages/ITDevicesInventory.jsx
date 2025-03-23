import InventoryManagement from "../components/InventoryManagement ";
import NavigationBar from "../components/NavigationBar";

import data from "../data/it-devices.json";
import ITDevicesColumns from "../components/columns/ITDevicesColumns";
import EmployeeForm from "../components/forms/EmployeeForm";

function ITDevicesInventory() {
  const columns = ITDevicesColumns();

  return (
    <>
      <NavigationBar />
      <h1 className="text-center text-primary mt-3">
        Inventario de Dispositivos TI
      </h1>
      <InventoryManagement
        data={data}
        columns={columns}
        CreateForm={EmployeeForm}
      />
    </>
  );
}

export default ITDevicesInventory;
