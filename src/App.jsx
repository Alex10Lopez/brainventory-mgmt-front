import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalAdminRegister from "./pages/GlobalAdminRegister";
import EmployeeLogin from "./pages/EmployeeLogin";
import Error404 from "./pages/Error404";
import EmployeesInventory from "./pages/inventories/EmployeesInventory";
import BuildingsInventory from "./pages/inventories/BuildingsInventory";
import RoomsInventory from "./pages/inventories/RoomsInventory";
import ITDeviceInventory from "./pages/inventories/ITDeviceInventory";
import IODeviceInventory from "./pages/inventories/IODeviceInventory";
import "./App.css";
import HumanResourcesMenu from "./pages/HumanResourcesMenu";
import InfrastructureMenu from "./pages/infrastructureMenu";
import AssetsMenu from "./pages/AssetsMenu";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProfileForm from "./components/forms/ProfileForm";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProfileForm />} />

            <Route path="/assets-menu" element={<AssetsMenu />} />

            <Route
              path="/infrastructure-menu"
              element={<InfrastructureMenu />}
            />

            <Route
              path="/human-resources-menu"
              element={<HumanResourcesMenu />}
            />

            <Route path="/register" element={<GlobalAdminRegister />} />
            <Route path="/login" element={<EmployeeLogin />} />

            <Route
              path="/it-devices-inventory"
              element={<ITDeviceInventory />}
            />
            <Route
              path="/io-devices-inventory"
              element={<IODeviceInventory />}
            />
            <Route
              path="/buildings-inventory"
              element={<BuildingsInventory />}
            />
            <Route path="/rooms-inventory" element={<RoomsInventory />} />
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
