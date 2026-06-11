import { Search } from "lucide-react";

interface PlateInputProps {
  value: [string, string, string];
  onChange: (plate: [string, string, string]) => void;
  onSearchClick: () => void;
}

export default function PlateInput({ value, onChange, onSearchClick }: PlateInputProps) {
  const update = (idx: 0 | 1 | 2, val: string) => {
    const next: [string, string, string] = [...value] as [string, string, string];
    next[idx] = val;
    onChange(next);
  };

  return (
    <div className="flex gap-2 items-center">
      <div className="grid grid-cols-3 gap-1.5 flex-1">
        <input
          type="text"
          maxLength={2}
          value={value[0]}
          onChange={(e) => update(0, e.target.value)}
          placeholder="۱۲"
          className="w-full py-2 px-2 border border-gray-200 rounded-lg text-sm font-semibold text-center outline-none focus:border-blue-400"
        />
        <input
          type="text"
          maxLength={2}
          value={value[1]}
          onChange={(e) => update(1, e.target.value)}
          placeholder="ب"
          className="w-full py-2 px-2 border border-gray-200 rounded-lg text-sm font-semibold text-center outline-none focus:border-blue-400"
        />
        <input
          type="text"
          maxLength={5}
          value={value[2]}
          onChange={(e) => update(2, e.target.value)}
          placeholder="۳۴۵۶۷"
          className="w-full py-2 px-2 border border-gray-200 rounded-lg text-sm font-semibold text-center outline-none focus:border-blue-400"
        />
      </div>
      <button
        type="button"
        onClick={onSearchClick}
        className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50 transition-colors flex-shrink-0"
        aria-label="جستجو از لیست خودروها"
      >
        <Search className="w-4 h-4" />
      </button>
    </div>
  );
}
