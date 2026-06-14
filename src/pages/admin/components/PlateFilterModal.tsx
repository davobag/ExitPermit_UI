import { useState } from "react";
import { Filter } from "lucide-react";

interface PlateFilterModalProps {
  initialPlate: [string, string, string] | null;
  onApply: (plate: [string, string, string] | null) => void;
  onClose: () => void;
}

export default function PlateFilterModal({ initialPlate, onApply, onClose }: PlateFilterModalProps) {
  const [plate, setPlate] = useState<[string, string, string]>(initialPlate ?? ["", "", ""]);

  const update = (idx: 0 | 1 | 2, val: string) => {
    const next: [string, string, string] = [...plate] as [string, string, string];
    next[idx] = val;
    setPlate(next);
  };

  const handleApply = () => {
    if (!plate[0] && !plate[1] && !plate[2]) {
      onApply(null);
    } else {
      onApply(plate);
    }
  };

  const handleClear = () => {
    setPlate(["", "", ""]);
    onApply(null);
  };

  return (
    <div
      className="fixed inset-0 bg-black/20 flex items-center justify-center z-50"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-xl p-6 w-full max-w-xs shadow-lg" dir="rtl">
        <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Filter className="w-4 h-4" />
          فیلتر بر اساس پلاک
        </h2>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <input
            type="text"
            maxLength={2}
            value={plate[0]}
            onChange={(e) => update(0, e.target.value)}
            placeholder="۱۲"
            className="border border-gray-200 rounded-lg px-2 py-2 text-sm font-semibold font-mono text-center focus:outline-none focus:border-blue-400"
            autoFocus
          />
          <input
            type="text"
            maxLength={2}
            value={plate[1]}
            onChange={(e) => update(1, e.target.value)}
            placeholder="ب"
            className="border border-gray-200 rounded-lg px-2 py-2 text-sm font-semibold font-mono text-center focus:outline-none focus:border-blue-400"
          />
          <input
            type="text"
            maxLength={5}
            value={plate[2]}
            onChange={(e) => update(2, e.target.value)}
            placeholder="۳۴۵۶۷"
            className="border border-gray-200 rounded-lg px-2 py-2 text-sm font-semibold font-mono text-center focus:outline-none focus:border-blue-400"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleClear}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm py-2 rounded-lg transition-colors"
          >
            حذف فیلتر
          </button>
          <button
            onClick={handleApply}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-lg transition-colors"
          >
            اعمال فیلتر
          </button>
        </div>
      </div>
    </div>
  );
}
