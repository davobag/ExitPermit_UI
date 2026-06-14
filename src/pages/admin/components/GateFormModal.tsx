import { useState } from "react";
import type { Gate, NewGateForm } from "../../../types/gate";

interface GateFormModalProps {
  gate?: Gate | null;
  onSave: (form: NewGateForm) => void;
  onClose: () => void;
}

export default function GateFormModal({ gate, onSave, onClose }: GateFormModalProps) {
  const [form, setForm] = useState<NewGateForm>({
    name: gate?.name ?? "",
    startTime: gate?.startTime ?? "08:00",
    endTime: gate?.endTime ?? "18:00",
  });

  const isValid = form.name.trim() && form.startTime && form.endTime;

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
          {gate ? "ویرایش درب خروج" : "افزودن درب خروج جدید"}
        </h2>

        <div className="mb-4">
          <label className="text-sm text-gray-600 block mb-1.5">نام درب خروج</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="مثلاً: درب خروج شمالی"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
            autoFocus
          />
        </div>

        <div className="mb-6">
          <label className="text-sm text-gray-600 block mb-1.5">ساعات کاری</label>
          <div className="flex items-center gap-2">
            <input
              type="time"
              value={form.startTime}
              onChange={(e) => setForm((f) => ({ ...f, startTime: e.target.value }))}
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono text-center focus:outline-none focus:border-blue-400"
              dir="ltr"
            />
            <span className="text-xs text-gray-400">تا</span>
            <input
              type="time"
              value={form.endTime}
              onChange={(e) => setForm((f) => ({ ...f, endTime: e.target.value }))}
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono text-center focus:outline-none focus:border-blue-400"
              dir="ltr"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={!isValid}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm py-2 rounded-lg transition-colors"
          >
            {gate ? "ذخیره تغییرات" : "ثبت درب خروج"}
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
