import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminRegister from "./pages/AdminRegister";
import EmployeeLogin from "./pages/EmployeeLogin";
import Error404 from "./pages/Error404";
import TestInventory from "./pages/TestInventory";
import EmployeesInventory from "./pages/EmployeesInventory";
import ITDevicesInventory from "./pages/ITDevicesInventory";
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

            <Route path="/devices-inventory" element={<ITDevicesInventory />} />
            <Route path="/peripherals-inventory" element={<TestInventory />} />
            <Route path="/software-inventory" element={<TestInventory />} />
            <Route
              path="/software-license-inventory"
              element={<TestInventory />}
            />
            <Route path="/buildings-inventory" element={<TestInventory />} />
            <Route path="/rooms-inventory" element={<TestInventory />} />
            <Route path="/departments-inventory" element={<TestInventory />} />
            <Route path="/job-roles-inventory" element={<TestInventory />} />
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
