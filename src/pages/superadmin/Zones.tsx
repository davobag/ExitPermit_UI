import { useState } from "react";
import { Plus, MapPin, Pencil, Building2, FileText } from "lucide-react";
import type { Zone, NewZoneForm } from "../../types/zoneSuperAdmin";
import { MOCK_ZONES } from "../../mocks/zonesSuperAdmin_mock";
import { toPersianDigits } from "../../utils/numbers";
import ZoneFormModal from "./components/ZoneFormModal";

export default function Zones() {
  const [zones, setZones] = useState<Zone[]>(MOCK_ZONES);
  const [editTarget, setEditTarget] = useState<Zone | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const toggleActive = (id: string) => {
    setZones((prev) =>
      prev.map((z) => (z.id === id ? { ...z, isActive: !z.isActive } : z)),
    );
  };

  const handleAdd = (form: NewZoneForm) => {
    const zone: Zone = {
      id: Date.now().toString(),
      ...form,
      unitsCount: 0,
      issuedPermitsCount: 0,
      isActive: true,
    };
    setZones((prev) => [...prev, zone]);
    setShowAddModal(false);
  };

  const handleEditSave = (form: NewZoneForm) => {
    if (!editTarget) return;
    setZones((prev) =>
      prev.map((z) => (z.id === editTarget.id ? { ...z, ...form } : z)),
    );
    setEditTarget(null);
  };

  return (
    <div dir="rtl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-semibold text-gray-800">زون‌ها</h1>
          <p className="text-sm text-gray-400 mt-0.5">مدیریت زون‌های سازمانی</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          افزودن زون جدید
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {zones.map((z) => (
          <div
            key={z.id}
            className="bg-white border border-gray-100 rounded-xl p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-2.5">
                {z.logoUrl ? (
                  <img
                    src={z.logoUrl}
                    alt={`لوگوی ${z.name}`}
                    className="w-9 h-9 rounded-lg object-cover border border-gray-100 flex-shrink-0"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-[18px] h-[18px]" />
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-gray-800 mb-0.5">
                    {z.name}
                  </p>
                  <span className="text-xs text-gray-400">
                    سقف پیش‌فرض:{" "}
                    {toPersianDigits(String(z.defaultMonthlyQuota))} برگه
                  </span>
                </div>
              </div>

              <button
                onClick={() => toggleActive(z.id)}
                className={`relative w-9 h-5 rounded-full transition-colors flex-shrink-0 ${
                  z.isActive ? "bg-green-500" : "bg-gray-200"
                }`}
                aria-label={z.isActive ? "غیرفعال کردن" : "فعال کردن"}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${
                    z.isActive ? "right-0.5" : "right-4"
                  }`}
                />
              </button>
            </div>

            <div className="flex gap-2 mb-3">
              <div className="flex-1 bg-gray-50 rounded-lg p-2.5 text-center">
                <div className="flex items-center justify-center gap-1.5 text-gray-400 mb-1">
                  <Building2 className="w-3.5 h-3.5" />
                  <span className="text-[11px]">واحدها</span>
                </div>
                <p className="text-base font-medium text-gray-900">
                  {toPersianDigits(String(z.unitsCount))}
                </p>
              </div>
              <div className="flex-1 bg-gray-50 rounded-lg p-2.5 text-center">
                <div className="flex items-center justify-center gap-1.5 text-gray-400 mb-1">
                  <FileText className="w-3.5 h-3.5" />
                  <span className="text-[11px]">برگه صادره</span>
                </div>
                <p className="text-base font-medium text-gray-900">
                  {toPersianDigits(String(z.issuedPermitsCount))}
                </p>
              </div>
            </div>

            <span
              className={`inline-block text-[11px] px-2 py-0.5 rounded-full mb-3 ${
                z.isActive
                  ? "bg-green-50 text-green-600"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {z.isActive ? "فعال" : "غیرفعال"}
            </span>

            <button
              onClick={() => setEditTarget(z)}
              className="w-full h-8 flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 text-gray-500 text-xs hover:border-blue-300 hover:text-blue-500 transition-colors"
            >
              <Pencil className="w-3.5 h-3.5" />
              ویرایش
            </button>
          </div>
        ))}

        {/* کارت افزودن */}
        <button
          onClick={() => setShowAddModal(true)}
          className="border border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-blue-400 hover:text-blue-500 transition-colors min-h-[180px]"
        >
          <Plus className="w-6 h-6" />
          <span className="text-sm">افزودن زون جدید</span>
        </button>
      </div>

      {/* افزودن */}
      {showAddModal && (
        <ZoneFormModal
          onSave={handleAdd}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {/* ویرایش */}
      {editTarget && (
        <ZoneFormModal
          zone={editTarget}
          onSave={handleEditSave}
          onClose={() => setEditTarget(null)}
        />
      )}
    </div>
  );
}
