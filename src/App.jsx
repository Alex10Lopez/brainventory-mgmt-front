import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminRegister from "./pages/AdminRegister";
import EmployeeLogin from "./pages/EmployeeLogin";
import Error404 from "./pages/Error404";
import EmployeesInventory from "./pages/inventories/EmployeesInventory";
import BuildingsInventory from "./pages/inventories/BuildingsInventory";
import "./App.css";
import HumanResourcesMenu from "./pages/HumanResourcesMenu";
import InfrastructureMenu from "./pages/infrastructureMenu";
import AssetsMenu from "./pages/AssetsMenu";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/assets-menu" element={<AssetsMenu />} />

            <Route
              path="/infrastructure-menu"
              element={<InfrastructureMenu />}
            />

            <Route
              path="/human-resourcer-menu"
              element={<HumanResourcesMenu />}
            />

            <Route path="/admin-register" element={<AdminRegister />} />
            <Route path="/employee-login" element={<EmployeeLogin />} />

            <Route path="/devices-inventory" element={<EmployeeLogin />} />
            <Route path="/peripherals-inventory" element={<EmployeeLogin />} />
            <Route path="/software-inventory" element={<EmployeeLogin />} />
            <Route
              path="/software-license-inventory"
              element={<EmployeeLogin />}
            />
            <Route
              path="/buildings-inventory"
              element={<BuildingsInventory />}
            />
            <Route path="/rooms-inventory" element={<EmployeeLogin />} />
            <Route path="/departments-inventory" element={<EmployeeLogin />} />
            <Route path="/job-roles-inventory" element={<EmployeeLogin />} />
            <Route
              path="/employees-inventory"
              element={<EmployeesInventory />}
            />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
