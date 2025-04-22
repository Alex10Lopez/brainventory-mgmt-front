import InventoryManagement from "../../components/InventoryManagement";
import NavigationBar from "../../components/NavigationBar";
import IODevicesColumns from "../../components/columns/IODevicesColumns";
import IODeviceView from "../../components/views/IODeviceView";
import {
  saveIODevice,
  findAll,
  findById,
  updateIODevice,
  deleteIODevice,
} from "../../api/assets/ioDeviceService";
import IODeviceForm from "../../components/forms/IODeviceForm";

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
        CreateModal={({ onSubmit }) => (
          <IODeviceForm mode="create" onSubmit={onSubmit} />
        )}
        ViewModal={IODeviceView}
        UpdateModal={({ readData, onSubmit }) => (
          <IODeviceForm mode="update" readData={readData} onSubmit={onSubmit} />
        )}
      />
    </>
  );
}

export default IODeviceInventory;
