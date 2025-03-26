import InventoryManagement from "../../components/InventoryManagement";
import NavigationBar from "../../components/NavigationBar";
import EmployeeTableColumns from "../../components/columns/EmployeeTableColumns";
import EmployeeCreateForm from "../../components/forms/createForm/EmployeeCreateForm";
import EmployeeUpdateForm from "../../components/forms/updateForm/EmployeeUpdateForm";
import EmployeeView from "../../components/views/EmployeeView";
import {
  saveEmployee,
  findAll,
  findById,
  updateEmployee,
  deleteEmployee,
} from "../../api/employeeService";

function EmployeesInventory() {
  const tableColumns = EmployeeTableColumns();

  return (
    <>
      <NavigationBar />
      <h1 className="text-center text-primary mt-3">Inventario de Empleados</h1>
      <InventoryManagement
        createRecord={saveEmployee}
        findAll={findAll}
        findById={findById}
        updateById={updateEmployee}
        deleteById={deleteEmployee}
        tableColumns={tableColumns}
        CreateModal={EmployeeCreateForm}
        ViewModal={EmployeeView}
        UpdateModal={EmployeeUpdateForm}
      />
    </>
  );
}

export default EmployeesInventory;
