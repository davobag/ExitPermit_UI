import { useState } from "react";
import { Plus, DoorOpen, Pencil, Trash2, Clock } from "lucide-react";
import type { Gate, NewGateForm } from "../../types/gate";
import { MOCK_GATES } from "../../mocks/gates";
import { toPersianDigits } from "../../utils/numbers";
import ConfirmModal from "../../components/shared/ConfirmModal";
import GateFormModal from "./components/GateFormModal";

export default function Gates() {
  const [gates, setGates] = useState<Gate[]>(MOCK_GATES);
  const [editTarget, setEditTarget] = useState<Gate | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Gate | null>(null);

  const toggleActive = (id: string) => {
    setGates((prev) =>
      prev.map((g) => (g.id === id ? { ...g, isActive: !g.isActive } : g))
    );
  };

  const handleAdd = (form: NewGateForm) => {
    const gate: Gate = { id: Date.now().toString(), ...form, isActive: true };
    setGates((prev) => [...prev, gate]);
    setShowAddModal(false);
  };

  const handleEditSave = (form: NewGateForm) => {
    if (!editTarget) return;
    setGates((prev) =>
      prev.map((g) => (g.id === editTarget.id ? { ...g, ...form } : g))
    );
    setEditTarget(null);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setGates((prev) => prev.filter((g) => g.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <div dir="rtl">
      {/* هدر صفحه */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-semibold text-gray-800">درب‌های خروج</h1>
          <p className="text-sm text-gray-400 mt-0.5">مدیریت درب‌های خروج و ساعات کاری</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          افزودن درب خروج
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {gates.map((g) => (
          <div key={g.id} className="bg-white border border-gray-100 rounded-xl p-4">
            <div className="flex items-start justify-between mb-2.5">
              <div className="flex items-start gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <DoorOpen className="w-[18px] h-[18px]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800 mb-0.5">{g.name}</p>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full ${
                      g.isActive ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {g.isActive ? "فعال" : "غیرفعال"}
                  </span>
                </div>
              </div>

              {/* toggle */}
              <button
                onClick={() => toggleActive(g.id)}
                className={`relative w-9 h-5 rounded-full transition-colors flex-shrink-0 ${
                  g.isActive ? "bg-green-500" : "bg-gray-200"
                }`}
                aria-label={g.isActive ? "غیرفعال کردن" : "فعال کردن"}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${
                    g.isActive ? "right-0.5" : "right-4"
                  }`}
                />
              </button>
            </div>

            {/* ساعات کاری */}
            <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 rounded-lg px-2.5 py-2 mb-3">
              <Clock className="w-3.5 h-3.5" />
              ساعات کاری:
              <span className="font-mono font-medium text-gray-800" dir="ltr">
                {toPersianDigits(g.startTime)} — {toPersianDigits(g.endTime)}
              </span>
            </div>

            {/* عملیات */}
            <div className="flex gap-1.5">
              <button
                onClick={() => setEditTarget(g)}
                className="flex-1 h-8 flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 text-gray-500 text-xs hover:border-blue-300 hover:text-blue-500 transition-colors"
              >
                <Pencil className="w-3.5 h-3.5" />
                ویرایش
              </button>
              <button
                onClick={() => setDeleteTarget(g)}
                className="flex-1 h-8 flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 text-gray-500 text-xs hover:border-red-300 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                حذف
              </button>
            </div>
          </div>
        ))}

        {/* کارت افزودن */}
        <button
          onClick={() => setShowAddModal(true)}
          className="border border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-blue-400 hover:text-blue-500 transition-colors min-h-[150px]"
        >
          <Plus className="w-6 h-6" />
          <span className="text-sm">افزودن درب خروج جدید</span>
        </button>
      </div>

      {/* افزودن */}
      {showAddModal && (
        <GateFormModal onSave={handleAdd} onClose={() => setShowAddModal(false)} />
      )}

      {/* ویرایش */}
      {editTarget && (
        <GateFormModal
          gate={editTarget}
          onSave={handleEditSave}
          onClose={() => setEditTarget(null)}
        />
      )}

      {/* حذف */}
      {deleteTarget && (
        <ConfirmModal
          title="حذف درب خروج"
          message={`آیا از حذف «${deleteTarget.name}» مطمئن هستید؟`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
