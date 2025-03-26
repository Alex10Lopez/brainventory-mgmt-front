import InventoryManagement from "../../components/InventoryManagement";
import NavigationBar from "../../components/NavigationBar";
import BuildingTableColumns from "../../components/columns/BuildingTableColumns";
import BuildingCreateForm from "../../components/forms/createForm/BuildingCreateForm";
import BuildingUpdateForm from "../../components/forms/updateForm/BuildingUpdateForm";
import BuildingView from "../../components/views/BuildingView";
import {
  saveBuilding,
  findAll,
  findById,
  updateBuilding,
  deleteBuilding,
} from "../../api/buildingService";

function BuildingsInventory() {
  const tableColumns = BuildingTableColumns();

  return (
    <>
      <NavigationBar />
      <h1 className="text-center text-primary mt-3">Inventario de Edificios</h1>
      <InventoryManagement
        createRecord={saveBuilding}
        findAll={findAll}
        findById={findById}
        updateById={updateBuilding}
        deleteById={deleteBuilding}
        tableColumns={tableColumns}
        CreateModal={BuildingCreateForm}
        ViewModal={BuildingView}
        UpdateModal={BuildingUpdateForm}
      />
    </>
  );
}

export default BuildingsInventory;
