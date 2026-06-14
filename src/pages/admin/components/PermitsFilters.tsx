import { Filter } from "lucide-react";

interface PermitsFiltersProps {
  fromDate: string;
  toDate: string;
  unit: string;
  guard: string;
  status: string;
  plateActive: boolean;
  plateLabel: string;
  units: string[];
  guards: string[];
  onFromDateChange: (v: string) => void;
  onToDateChange: (v: string) => void;
  onUnitChange: (v: string) => void;
  onGuardChange: (v: string) => void;
  onStatusChange: (v: string) => void;
  onPlateClick: () => void;
}

export default function PermitsFilters({
  fromDate,
  toDate,
  unit,
  guard,
  status,
  plateActive,
  plateLabel,
  units,
  guards,
  onFromDateChange,
  onToDateChange,
  onUnitChange,
  onGuardChange,
  onStatusChange,
  onPlateClick,
}: PermitsFiltersProps) {
  return (
    <div className="bg-gray-50 rounded-xl p-3 flex flex-col gap-2.5 mb-4">
      {/* ردیف اول: بازه تاریخ */}
      <div className="flex items-center gap-2 flex-wrap">
        <label className="text-xs text-gray-400 whitespace-nowrap">بازه تاریخ صدور:</label>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => onFromDateChange(e.target.value)}
          className="text-xs font-mono border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-blue-400"
          dir="ltr"
          style={{ maxWidth: 150 }}
        />
        <span className="text-xs text-gray-400">تا</span>
        <input
          type="date"
          value={toDate}
          onChange={(e) => onToDateChange(e.target.value)}
          className="text-xs font-mono border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-blue-400"
          dir="ltr"
          style={{ maxWidth: 150 }}
        />
      </div>

      {/* ردیف دوم: واحد، نگهبان، وضعیت، پلاک */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <select
          value={unit}
          onChange={(e) => onUnitChange(e.target.value)}
          className="text-sm border border-gray-200 rounded-lg px-2 py-2 focus:outline-none focus:border-blue-400 bg-white"
        >
          <option value="">همه واحدها</option>
          {units.map((u) => <option key={u} value={u}>{u}</option>)}
        </select>

        <select
          value={guard}
          onChange={(e) => onGuardChange(e.target.value)}
          className="text-sm border border-gray-200 rounded-lg px-2 py-2 focus:outline-none focus:border-blue-400 bg-white"
        >
          <option value="">همه نگهبانان</option>
          {guards.map((g) => <option key={g} value={g}>{g}</option>)}
        </select>

        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="text-sm border border-gray-200 rounded-lg px-2 py-2 focus:outline-none focus:border-blue-400 bg-white"
        >
          <option value="">همه وضعیت‌ها</option>
          <option value="Issued">در انتظار</option>
          <option value="Confirmed">تایید شده</option>
          <option value="Cancelled">لغو شده</option>
          <option value="Expired">منقضی شده</option>
        </select>

        <button
          onClick={onPlateClick}
          className={`flex items-center justify-center gap-1.5 text-sm rounded-lg px-3 py-2 border transition-colors ${
            plateActive
              ? "bg-blue-50 border-blue-200 text-blue-600"
              : "bg-white border-gray-200 text-gray-500"
          }`}
        >
          <Filter className="w-4 h-4" />
          {plateLabel}
        </button>
      </div>
    </div>
  );
}
