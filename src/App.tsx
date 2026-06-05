import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import AdminLayout from "./layouts/AdminLayout"
import Dashboard from "./pages/admin/Dashboard"
import Units from "./pages/admin/Units"
import UnitDetail from "./pages/admin/UnitDetail"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
        <Route path="/admin/units" element={<AdminLayout><Units /></AdminLayout>} />
        <Route path="/admin/units/:id" element={<AdminLayout><UnitDetail /></AdminLayout>} />
      </Routes>
    </BrowserRouter>
  )
}
export default App