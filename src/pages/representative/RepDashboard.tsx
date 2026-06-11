import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, CirclePlus, Package, Car, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import type { ExitPermit } from "../../types/exitPermit";
import type { Vehicle, Cargo, Quota } from "../../types/representative";
import { MOCK_VEHICLES, MOCK_CARGOS, MOCK_GATES, MOCK_QUOTA, MOCK_REP_PERMITS } from "../../mocks/representative";

import PermitsTab  from "./tabs/PermitsTab";
import NewPermitTab from "./tabs/NewPermitTab";
import CargoTab    from "./tabs/CargoTab";
import VehicleTab  from "./tabs/VehicleTab";

type Tab = "permits" | "new" | "cargo" | "vehicle";

export default function RepDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<Tab>("permits");
  const [permits, setPermits]     = useState<ExitPermit[]>(MOCK_REP_PERMITS);
  const [vehicles, setVehicles]   = useState<Vehicle[]>(MOCK_VEHICLES);
  const [cargos, setCargos]       = useState<Cargo[]>(MOCK_CARGOS);
  const [quota]                   = useState<Quota>(MOCK_QUOTA);
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const initials = user ? user.firstName[0] + user.lastName[0] : "؟";
  const fullName = user ? `${user.firstName} ${user.lastName}` : "";

  const NAV_ITEMS: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "permits", label: "برگه‌ها",  icon: <FileText  className="w-5 h-5" /> },
    { key: "new",     label: "صدور",     icon: <CirclePlus className="w-5 h-5" /> },
    { key: "cargo",   label: "کالا",     icon: <Package   className="w-5 h-5" /> },
    { key: "vehicle", label: "خودرو",    icon: <Car       className="w-5 h-5" /> },
  ];

  return (
    <div className="flex flex-col h-screen max-w-lg mx-auto bg-white" dir="rtl">

      {/* هدر */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-800 text-sm font-medium flex items-center justify-center flex-shrink-0">
            {initials}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{fullName}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-[10px] text-gray-400">واحد:</span>
              <span className="text-xs text-blue-500 font-medium">{user?.unitId ?? "شرکت آلفا تجارت"}</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowLogout(true)}
          className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-500 hover:bg-red-50 transition-colors"
          aria-label="خروج از حساب"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>

      {/* محتوا */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "permits"  && <PermitsTab permits={permits} quota={quota} />}
        {activeTab === "new"      && (
          <NewPermitTab
            vehicles={vehicles}
            cargos={cargos}
            gates={MOCK_GATES}
            onIssued={() => setActiveTab("permits")}
          />
        )}
        {activeTab === "cargo"    && <CargoTab   cargos={cargos}   onChange={setCargos}   />}
        {activeTab === "vehicle"  && <VehicleTab vehicles={vehicles} onChange={setVehicles} />}
      </div>

      {/* bottom nav */}
      <div className="flex border-t border-gray-100 flex-shrink-0">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveTab(item.key)}
            className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 text-[10px] transition-colors ${
              activeTab === item.key
                ? item.key === "new" ? "text-emerald-600" : "text-blue-500"
                : "text-gray-400"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>

      {/* Logout Sheet */}
      {showLogout && (
        <div
          className="fixed inset-0 bg-black/30 z-50 flex items-end justify-center"
          onClick={() => setShowLogout(false)}
        >
          <div
            className="bg-white rounded-t-2xl p-6 w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-9 h-1 bg-gray-200 rounded-full mx-auto mb-5" />
            <h3 className="text-base font-medium text-gray-900 text-center mb-2">خروج از حساب</h3>
            <p className="text-sm text-gray-500 text-center mb-5">آیا مطمئن هستید؟</p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowLogout(false)}
                className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-600 bg-gray-50"
              >
                انصراف
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-2.5 rounded-lg bg-red-500 text-white text-sm font-medium"
              >
                بله، خروج
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
