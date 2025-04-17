import InventoryManagement from "../../components/InventoryManagement";
import NavigationBar from "../../components/NavigationBar";
import BuildingTableColumns from "../../components/columns/BuildingTableColumns";
import BuildingView from "../../components/views/BuildingView";
import BuildingForm from "../../components/forms/BuildingForm";
import {
  saveBuilding,
  findAll,
  findById,
  updateBuilding,
  deleteBuilding,
} from "../../api/infrastructure/buildingService";

function BuildingsInventory() {
  const tableColumns = BuildingTableColumns();

  return (
    <>
      <NavigationBar />
      <h1 className="text-center text-primary mt-3">Inventario de Edificios</h1>
      <InventoryManagement
        titleInventory="Edificio"
        createRecord={saveBuilding}
        findAll={findAll}
        findById={findById}
        updateById={updateBuilding}
        deleteById={deleteBuilding}
        tableColumns={tableColumns}
        CreateModal={({ onSubmit }) => (
          <BuildingForm mode="create" onSubmit={onSubmit} />
        )}
        ViewModal={BuildingView}
        UpdateModal={({ readData, onSubmit }) => (
          <BuildingForm mode="update" readData={readData} onSubmit={onSubmit} />
        )}
      />
    </>
  );
}

export default BuildingsInventory;
