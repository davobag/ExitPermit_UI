import { useState } from "react";
import type { ZoneSettings } from "../../../types/zone";

interface ZoneSettingsPanelProps {
  settings: ZoneSettings;
  onSave: (settings: ZoneSettings) => void;
}

export default function ZoneSettingsPanel({ settings, onSave }: ZoneSettingsPanelProps) {
  const [form, setForm] = useState<ZoneSettings>(settings);

  const handleSave = () => onSave(form);

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5">
      <p className="text-sm font-medium text-gray-900 mb-4">تنظیمات کلی زون</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* سقف ماهانه پیش‌فرض */}
        <div>
          <label className="block text-xs text-gray-500 mb-1.5">
            سقف ماهانه پیش‌فرض (به ازای هر واحد)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={0}
              value={form.defaultMonthlyQuota}
              onChange={(e) =>
                setForm((f) => ({ ...f, defaultMonthlyQuota: Number(e.target.value) }))
              }
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
            />
            <span className="text-xs text-gray-400 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
              برگه
            </span>
          </div>
          <p className="text-[11px] text-gray-400 mt-1.5">
            واحدهایی که سقف اختصاصی ندارند، از این مقدار استفاده می‌کنند
          </p>
        </div>

        {/* اعتبار برگه */}
        <div>
          <label className="block text-xs text-gray-500 mb-1.5">اعتبار برگه خروج</label>
          <div className={`flex items-center gap-2 ${form.permitValidUntilEndOfDay ? "opacity-40" : ""}`}>
            <input
              type="number"
              min={1}
              disabled={form.permitValidUntilEndOfDay}
              value={form.permitValidityHours ?? ""}
              onChange={(e) =>
                setForm((f) => ({ ...f, permitValidityHours: Number(e.target.value) }))
              }
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 disabled:cursor-not-allowed"
            />
            <span className="text-xs text-gray-400 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
              ساعت
            </span>
          </div>
          <p className="text-[11px] text-gray-400 mt-1.5">
            مدت زمان اعتبار برگه از لحظه صدور تا انقضای خودکار
          </p>

          <div className="flex items-center gap-2 mt-2.5 pt-2.5 border-t border-gray-100">
            <input
              type="checkbox"
              id="eodCheckbox"
              checked={form.permitValidUntilEndOfDay}
              onChange={(e) =>
                setForm((f) => ({ ...f, permitValidUntilEndOfDay: e.target.checked }))
              }
              className="w-4 h-4 accent-blue-500 cursor-pointer"
            />
            <label htmlFor="eodCheckbox" className="text-xs text-gray-700 cursor-pointer select-none">
              معتبر تا پایان همان روز (ساعت ۲۴:۰۰) — صرف‌نظر از ساعت صدور
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 py-2 rounded-lg transition-colors"
        >
          ذخیره تنظیمات
        </button>
      </div>
    </div>
  );
}
