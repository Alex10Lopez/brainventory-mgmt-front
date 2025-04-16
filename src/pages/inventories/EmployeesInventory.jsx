import InventoryManagement from "../../components/InventoryManagement";
import NavigationBar from "../../components/NavigationBar";
import EmployeeTableColumns from "../../components/columns/EmployeeTableColumns";
import EmployeeForm from "../../components/forms/EmployeeForm";
import EmployeeView from "../../components/views/EmployeeView";
import {
  saveEmployee,
  findAll,
  findById,
  updateEmployee,
  deleteEmployee,
} from "../../api/humanResources/employeeService";

function EmployeesInventory() {
  const tableColumns = EmployeeTableColumns();

  return (
    <>
      <NavigationBar />
      <h1 className="text-center text-primary mt-3">Inventario de Empleados</h1>
      <InventoryManagement
        titleInventory="Empleado"
        createRecord={saveEmployee}
        findAll={findAll}
        findById={findById}
        updateById={updateEmployee}
        deleteById={deleteEmployee}
        tableColumns={tableColumns}
        CreateModal={({ onSubmit }) => (
          <EmployeeForm mode="create" onSubmit={onSubmit} />
        )}
        ViewModal={EmployeeView}
        UpdateModal={({ readData, onSubmit }) => (
          <EmployeeForm mode="update" readData={readData} onSubmit={onSubmit} />
        )}
      />
    </>
  );
}

export default EmployeesInventory;
