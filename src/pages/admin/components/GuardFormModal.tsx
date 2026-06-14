import { useState } from "react";
import type { Guard, NewGuardForm } from "../../../types/guard"

interface GuardFormModalProps {
  guard?: Guard | null;
  onSave: (form: NewGuardForm) => void;
  onClose: () => void;
}

export default function GuardFormModal({ guard, onSave, onClose }: GuardFormModalProps) {
  const [form, setForm] = useState<NewGuardForm>({
    firstName: guard?.firstName ?? "",
    lastName: guard?.lastName ?? "",
    phoneNumber: guard?.phoneNumber ?? "",
  });

  const isValid = form.firstName.trim() && form.lastName.trim() && form.phoneNumber.trim();

  const handleSave = () => {
    if (!isValid) return;
    onSave(form);
  };

  return (
    <div
      className="fixed inset-0 bg-black/20 flex items-center justify-center z-50"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-xl p-6 w-96 shadow-lg" dir="rtl">
        <h2 className="text-base font-semibold text-gray-800 mb-5">
          {guard ? "ویرایش نگهبان" : "افزودن نگهبان جدید"}
        </h2>

        <div className="mb-4">
          <label className="text-sm text-gray-600 block mb-1.5">نام</label>
          <input
            type="text"
            value={form.firstName}
            onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
            placeholder="مثلاً: علی"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
            autoFocus
          />
        </div>

        <div className="mb-4">
          <label className="text-sm text-gray-600 block mb-1.5">نام خانوادگی</label>
          <input
            type="text"
            value={form.lastName}
            onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
            placeholder="مثلاً: رضایی"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
          />
        </div>

        <div className="mb-6">
          <label className="text-sm text-gray-600 block mb-1.5">شماره موبایل</label>
          <input
            type="text"
            value={form.phoneNumber}
            onChange={(e) => setForm((f) => ({ ...f, phoneNumber: e.target.value }))}
            placeholder="09xxxxxxxxx"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 font-mono"
            dir="ltr"
          />
          <p className="text-xs text-gray-400 mt-1.5">
            برای ورود نگهبان با کد یکبارمصرف (OTP) استفاده می‌شود
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={!isValid}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm py-2 rounded-lg transition-colors"
          >
            {guard ? "ذخیره تغییرات" : "ثبت نگهبان"}
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
