import { useState } from "react";
import type { Zone, NewZoneForm } from "../../../types/zoneSuperAdmin";
import { Image as ImageIcon } from "lucide-react";

interface ZoneFormModalProps {
  zone?: Zone | null;
  onSave: (form: NewZoneForm) => void;
  onClose: () => void;
}

export default function ZoneFormModal({
  zone,
  onSave,
  onClose,
}: ZoneFormModalProps) {
  const [form, setForm] = useState<NewZoneForm>({
    name: zone?.name ?? "",
    logoUrl: zone?.logoUrl ?? null,
    defaultMonthlyQuota: zone?.defaultMonthlyQuota ?? 20,
  });

  const isValid = form.name.trim() && form.defaultMonthlyQuota >= 0;

  const handleSave = () => {
    if (!isValid) return;
    onSave(form);
  };

  return (
    <div
      className="fixed inset-0 bg-black/20 flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-xl p-6 w-96 shadow-lg" dir="rtl">
        <h2 className="text-base font-semibold text-gray-800 mb-5">
          {zone ? "ویرایش زون" : "افزودن زون جدید"}
        </h2>

        <div className="mb-4">
          <label className="text-sm text-gray-600 block mb-1.5">نام زون</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="مثلاً: شهرک صنعتی البرز"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
            autoFocus
          />
        </div>
        <div className="mb-4">
          <label className="text-sm text-gray-600 block mb-1.5">
            آدرس لوگو (URL)
          </label>
          <div className="flex items-center gap-3">
            {form.logoUrl ? (
              <img
                src={form.logoUrl}
                alt="لوگوی زون"
                className="w-10 h-10 rounded-lg object-cover border border-gray-200 flex-shrink-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center flex-shrink-0">
                <ImageIcon className="w-4 h-4 text-gray-300" />
              </div>
            )}
            <input
              type="text"
              value={form.logoUrl ?? ""}
              onChange={(e) =>
                setForm((f) => ({ ...f, logoUrl: e.target.value || null }))
              }
              placeholder="https://example.com/logo.png"
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 font-mono"
              dir="ltr"
            />
          </div>
          <p className="text-[11px] text-gray-400 mt-1.5">
            آدرس فایل لوگو که قبلاً آپلود شده — آپلود فایل در فاز بعد اضافه
            می‌شود
          </p>
        </div>

        <div className="mb-6">
          <label className="text-sm text-gray-600 block mb-1.5">
            سقف ماهانه پیش‌فرض (به ازای هر واحد)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={0}
              value={form.defaultMonthlyQuota}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  defaultMonthlyQuota: Number(e.target.value),
                }))
              }
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
            />
            <span className="text-xs text-gray-400 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
              برگه
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={!isValid}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm py-2 rounded-lg transition-colors"
          >
            {zone ? "ذخیره تغییرات" : "ثبت زون"}
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
