import type { Representative } from "../../types/unit";
import { representativeRoles } from "../../mocks/roles";
import { useState } from "react";

interface Props {
  onClose: () => void;
  onAdd: (rep: Omit<Representative, "id">) => void;
}

export default function AddRepModal({ onClose, onAdd }: Props) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    nationalCode: "",
    role: "",
    roleDescript: "",
    isActive: true,
  });

  function handleSubmit() {
    if (!form.firstName || !form.lastName || !form.nationalCode || !form.mobile) return;
    onAdd(form);
  }

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-96 shadow-lg" dir="rtl">
        <h2 className="text-base font-semibold text-gray-800 mb-5">افزودن نماینده</h2>

        <div className="mb-4">
          <label className="text-sm text-gray-600 block mb-1.5">نام</label>
          <input
            type="text"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            placeholder="مثلاً: رضا"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="mb-4">
          <label className="text-sm text-gray-600 block mb-1.5">نام خانوادگی</label>
          <input
            type="text"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            placeholder="مثلاً: کریمی"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="mb-4">
          <label className="text-sm text-gray-600 block mb-1.5">کد ملی</label>
          <input
            type="text"
            value={form.nationalCode}
            onChange={(e) => setForm({ ...form, nationalCode: e.target.value })}
            placeholder="مثلاً: 0012345678"
            maxLength={10}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="mb-4">
          <label className="text-sm text-gray-600 block mb-1.5">شماره موبایل</label>
          <input
            type="text"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            placeholder="مثلاً: 09351234567"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="mb-6">
          <label className="text-sm text-gray-600 block mb-1.5">سطح دسترسی</label>
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
          >
            {representativeRoles.map((role) => (
              <option key={role.value} value={role.value}>{role.label}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-lg transition-colors"
          >
            ثبت نماینده
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm py-2 rounded-lg transition-colors"
          >
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
}