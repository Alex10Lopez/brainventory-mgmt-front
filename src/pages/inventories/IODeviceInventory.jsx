import InventoryManagement from "../../components/InventoryManagement";
import NavigationBar from "../../components/NavigationBar";
import IODevicesColumns from "../../components/columns/IODevicesColumns";
import IODeviceCreateForm from "../../components/forms/createForm/IODeviceCreateForm";
import IODeviceUpdateForm from "../../components/forms/updateForm/IODeviceUpdateForm";
import IODeviceView from "../../components/views/IODeviceView";
import {
  saveIODevice,
  findAll,
  findById,
  updateIODevice,
  deleteIODevice,
} from "../../api/assets/ioDeviceService";

function IODeviceInventory() {
  const tableColumns = IODevicesColumns();

  return (
    <>
      <NavigationBar />
      <h1 className="text-center text-primary mt-3">
        Inventario de Dispositivos de Entrada / Salida
      </h1>
      <InventoryManagement
        titleInventory="Dispositivo E/S"
        createRecord={saveIODevice}
        findAll={findAll}
        findById={findById}
        updateById={updateIODevice}
        deleteById={deleteIODevice}
        tableColumns={tableColumns}
        CreateModal={IODeviceCreateForm}
        ViewModal={IODeviceView}
        UpdateModal={IODeviceUpdateForm}
      />
    </>
  );
}

export default IODeviceInventory;
