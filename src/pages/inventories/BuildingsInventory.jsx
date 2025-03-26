import InventoryManagement from "../../components/InventoryManagement";
import NavigationBar from "../../components/NavigationBar";
import BuildingTableColumns from "../../components/columns/BuildingTableColumns";
import EmployeeCreateForm from "../../components/forms/createForm/EmployeeCreateForm";
import EmployeeUpdateForm from "../../components/forms/updateForm/EmployeeUpdateForm";
import EmployeeView from "../../components/views/EmployeeView";
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
        CreateModal={EmployeeCreateForm}
        ViewModal={EmployeeView}
        UpdateModal={EmployeeUpdateForm}
      />
    </>
  );
}

export default BuildingsInventory;
