import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { mockUnitDetails } from "../../mocks/unitDetails";
import type { Owner, Representative, UnitDetailType } from "../../types/unit";
import { representativeRoles } from "../../mocks/roles";
import AddRepModal from "../../components/units/AddRepModal";
import EditRepModal from "../../components/units/EditRepModal";

export default function UnitDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [unit, setUnit] = useState<UnitDetailType | null>(
    id ? (mockUnitDetails[id] ?? null) : null,
  );

  // state های modal
  const [showOwnerModal, setShowOwnerModal] = useState(false);
  // const [showRepModal, setShowRepModal] = useState(false);
  const [editingRep, setEditingRep] = useState<Representative | null>(null);
  const [newOwner, setNewOwner] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    nationalCode: "",
  });
 
  const [showAddRepModal, setShowAddRepModal] = useState(false);

  if (!unit)
    return <div className="text-center py-20 text-gray-400">واحد پیدا نشد</div>;

  function handleAddOwner() {
    if (
      !newOwner.firstName ||
      !newOwner.lastName ||
      !newOwner.mobile ||
      !newOwner.nationalCode ||
      !unit
    )
      return;

    setUnit({
      ...unit,
      owner: { id: unit.owner?.id ?? Date.now().toString(), ...newOwner },
    });
    setNewOwner({ firstName: "", lastName: "", mobile: "", nationalCode: "" });
    setShowOwnerModal(false);
  }

  function handleAddRep(rep: Omit<Representative, "id">) {
    if (!unit) return;
    setUnit({
      ...unit,
      representatives: [
        ...unit.representatives,
        { id: Date.now().toString(), ...rep },
      ],
    });
    setShowAddRepModal(false);
  }

  function handleEditRep(updated: Representative) {
    if (!unit) return;
    setUnit({
      ...unit,
      representatives: unit.representatives.map((r) =>
        r.id === updated.id ? updated : r,
      ),
    });
    setEditingRep(null);
  }
  function handleRemoveRep(repId: string) {
    if (!unit) return;
    setUnit({
      ...unit,
      representatives: unit.representatives.filter((r) => r.id !== repId),
    });
  }

  return (
    <div dir="rtl">
      {/* هدر */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate("/admin/units")}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          ← بازگشت
        </button>
        <div>
          <h1 className="text-lg font-semibold text-gray-800">{unit.name}</h1>
          <p className="text-sm text-gray-400 mt-0.5">مدیریت واحد</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {/* اطلاعات واحد */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">
            اطلاعات واحد
          </h2>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-400">نام واحد</span>
              <p className="text-gray-800 mt-1 font-medium">{unit.name}</p>
            </div>
            <div>
              <span className="text-gray-400">سقف ماهانه</span>
              <p className="text-gray-800 mt-1 font-medium">
                {unit.monthlyQuota ?? "پیش‌فرض Zone"}
              </p>
            </div>
            <div>
              <span className="text-gray-400">وضعیت</span>
              <p className="mt-1">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    unit.isActive
                      ? "bg-green-50 text-green-600"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {unit.isActive ? "فعال" : "غیرفعال"}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* مالک */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-700">مالک واحد</h2>
            {!unit.owner && (
              <button
                onClick={() => setShowOwnerModal(true)}
                className="text-xs text-blue-500 hover:text-blue-700 border border-blue-200 px-3 py-1 rounded-lg transition-colors"
              >
                + افزودن مالک
              </button>
            )}
          </div>
          {unit.owner ? (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 text-sm font-medium flex items-center justify-center">
                {unit.owner.lastName.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {unit.owner.lastName}
                </p>
                <p className="text-xs text-gray-400">{unit.owner.mobile}</p>
              </div>
              <span className="mr-auto text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded-full">
                Owner
              </span>
              <button
                onClick={() => {
                  setNewOwner({
                    firstName: unit.owner!.firstName,
                    lastName: unit.owner!.lastName,
                    mobile: unit.owner!.mobile,
                    nationalCode: unit.owner!.nationalCode,
                  });
                  setShowOwnerModal(true);
                }}
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Pencil size={14} />
              </button>
            </div>
          ) : (
            <p className="text-sm text-gray-400">مالکی ثبت نشده</p>
          )}
        </div>

        {/* نمایندگان */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-700">
              نمایندگان
              <span className="text-gray-400 font-normal mr-2">
                ({unit.representatives.length} نفر)
              </span>
            </h2>
            <button
              onClick={() => setShowAddRepModal(true)}
              className="text-xs text-blue-500 hover:text-blue-700 border border-blue-200 px-3 py-1 rounded-lg transition-colors"
            >
              + افزودن نماینده
            </button>
          </div>

          {unit.representatives.length === 0 ? (
            <p className="text-sm text-gray-400">نماینده‌ای ثبت نشده</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400 text-center border-b border-gray-100">
                  <th className="pb-2 font-medium">نام</th>
                  <th className="pb-2 font-medium">نام خانوادگی</th>
                  <th className="pb-2 font-medium">سطح دسترسی</th>
                  <th className="pb-2 font-medium">وضعیت</th>
                  <th className="pb-2 font-medium">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {unit.representatives.map((rep) => (
                  <tr key={rep.id}>
                    <td className="py-3 text-gray-800">{rep.firstName}</td>
                    <td className="py-3 text-gray-800">{rep.lastName}</td>
                    <td className="py-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          rep.role === "PrimaryRepresentative"
                            ? "bg-purple-50 text-purple-600"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {rep.role === "PrimaryRepresentative"
                          ? "نماینده ارشد"
                          : "نماینده عادی"}
                      </span>
                    </td>
                    <td className="py-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          rep.isActive
                            ? "bg-green-50 text-green-600"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {rep.isActive ? "فعال" : "غیرفعال"}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-3 justify-end">
                        <div className="flex items-center gap-2 justify-end">
                          <button
                            onClick={() => setEditingRep(rep)}
                            className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Pencil size={14} />
                          </button>

                          <button
                            onClick={() => handleRemoveRep(rep.id)}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showAddRepModal && (
        <AddRepModal
          onClose={() => setShowAddRepModal(false)}
          onAdd={handleAddRep}
        />
      )}

      {editingRep && (
        <EditRepModal
          rep={editingRep}
          onClose={() => setEditingRep(null)}
          onSave={handleEditRep}
        />
      )}
    </div>
  );
}
