import InventoryManagement from "../../components/InventoryManagement";
import NavigationBar from "../../components/NavigationBar";
import ITDevicesColumns from "../../components/columns/ITDevicesColumns";
import ITDeviceCreateForm from "../../components/forms/createForm/ITDeviceCreateForm";
import ITDeviceUpdateForm from "../../components/forms/updateForm/ITDeviceUpdateForm";
import ITDeviceForm from "../../components/forms/ITDeviceForm";
import ITDeviceView from "../../components/views/ITDeviceView";
import {
  saveITDevice,
  findAll,
  findById,
  updateITDevice,
  deleteITDevice,
} from "../../api/assets/itDeviceService";

function ITDeviceInventory() {
  const tableColumns = ITDevicesColumns();

  return (
    <>
      <NavigationBar />
      <h1 className="text-center text-primary mt-3">
        Inventario de Dispositivos de Tecnologías de la Información
      </h1>
      <InventoryManagement
        titleInventory="Dispositivo TI"
        createRecord={saveITDevice}
        findAll={findAll}
        findById={findById}
        updateById={updateITDevice}
        deleteById={deleteITDevice}
        tableColumns={tableColumns}
        CreateModal={({ onSubmit }) => (
          <ITDeviceForm mode="create" onSubmit={onSubmit} />
        )}
        ViewModal={ITDeviceView}
        UpdateModal={ITDeviceUpdateForm}
      />
    </>
  );
}

export default ITDeviceInventory;
