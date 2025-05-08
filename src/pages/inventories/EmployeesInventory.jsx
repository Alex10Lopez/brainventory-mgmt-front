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
import getFieldFromJwt from "../../components/helpers/getFieldFromJwt";

function EmployeesInventory() {
  const tableColumns = EmployeeTableColumns();
  const email = getFieldFromJwt("sub");

  return (
    <>
      <NavigationBar />
      <h1 className="text-center text-primary mt-3">Inventario de Empleados</h1>
      <InventoryManagement
        titleInventory="Empleado"
        createRecord={saveEmployee}
        findAll={() => findAll(email)}
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
