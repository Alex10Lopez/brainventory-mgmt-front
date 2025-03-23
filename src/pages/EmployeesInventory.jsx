import InventoryManagement from "../components/InventoryManagement ";
import NavigationBar from "../components/NavigationBar";
import { useQuery } from "@tanstack/react-query";
import { findAll } from "../api/EmployeeService";
import EmployeeColumns from "../components/columns/EmployeeColumns";
import EmployeeForm from "../components/forms/EmployeeForm";

function EmployeesInventory() {
  const columns = EmployeeColumns();

  const {
    isPending,
    isError,
    data: employees,
    error,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: findAll,
  });

  if (isPending) return <span>Cargando...</span>;
  if (isError) return <span>Error: {error.message}</span>;

  return (
    <>
      <NavigationBar />
      <h1 className="text-center text-primary mt-3">Inventario de Empleados</h1>
      <InventoryManagement
        data={employees.data}
        columns={columns}
        CreateForm={EmployeeForm}
      />
    </>
  );
}

export default EmployeesInventory;
