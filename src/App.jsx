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
import EmployeeProfile from "./pages/EmployeeProfile";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<EmployeeProfile />} />

            <Route
              path="/assets-menu"
              element={
                <ProtectedRoute path="/assets-menu">
                  <AssetsMenu />
                </ProtectedRoute>
              }
            />

            <Route
              path="/infrastructure-menu"
              element={
                <ProtectedRoute path="/infrastructure-menu">
                  <InfrastructureMenu />
                </ProtectedRoute>
              }
            />

            <Route
              path="/human-resources-menu"
              element={
                <ProtectedRoute path="/human-resources-menu">
                  <HumanResourcesMenu />
                </ProtectedRoute>
              }
            />

            <Route path="/register" element={<GlobalAdminRegister />} />
            <Route path="/login" element={<EmployeeLogin />} />

            <Route
              path="/it-devices-inventory"
              element={
                <ProtectedRoute path="/it-devices-inventory">
                  <ITDeviceInventory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/io-devices-inventory"
              element={
                <ProtectedRoute path="/io-devices-inventory">
                  <IODeviceInventory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/buildings-inventory"
              element={
                <ProtectedRoute path="/buildings-inventory">
                  <BuildingsInventory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/rooms-inventory"
              element={
                <ProtectedRoute path="/rooms-inventory">
                  <RoomsInventory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employees-inventory"
              element={
                <ProtectedRoute path="/employees-inventory">
                  <EmployeesInventory />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
