import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Units from "./pages/admin/Units";
import UnitDetail from "./pages/admin/UnitDetail";
import GuardDashboard from "./pages/guard/GuardDashboard";
import RepDashboard from "./pages/representative/RepDashboard";
import MobileLayout from "./layouts/MobileLayout";
import Guards from "./pages/admin/Guards";
import Gates from "./pages/admin/Gates";
import Zone from "./pages/admin/Zone";
import Permits from "./pages/admin/Permits";
import SuperAdminLayout from "./layouts/SuperAdminLayout";
import Zones from "./pages/superadmin/Zones";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/units"
          element={
            <AdminLayout>
              <Units />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/units/:id"
          element={
            <AdminLayout>
              <UnitDetail />
            </AdminLayout>
          }
        />
        <Route path="/guard" element={<GuardDashboard></GuardDashboard>} />
        <Route
          path="/rep"
          element={
            <MobileLayout>
              <RepDashboard />
            </MobileLayout>
          }
        />
        <Route
          path="/admin/guards"
          element={
            <AdminLayout>
              <Guards />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/gates"
          element={
            <AdminLayout>
              <Gates />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/zone"
          element={
            <AdminLayout>
              <Zone />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/permits"
          element={
            <AdminLayout>
              <Permits />
            </AdminLayout>
          }
        />
        {/* <Route path="/superadmin/zones" element={
  <ProtectedRoute roles={["SuperAdmin"]}>
    <SuperAdminLayout><Zones /></SuperAdminLayout>
  </ProtectedRoute>
} /> */}
        <Route
          path="/superadmin/zones"
          element={
            <SuperAdminLayout>
              <Zones />
            </SuperAdminLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
