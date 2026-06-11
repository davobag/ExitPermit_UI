import { useState } from "react";
import { X } from "lucide-react";
import type { Vehicle } from "../types/representative";
import { VEHICLE_TYPES } from "../types/vehicleType";

interface VehicleModalProps {
  vehicles: Vehicle[];
  onSelect: (vehicle: Vehicle) => void;
  onClose: () => void;
}

function PlateBox({ plate }: { plate: [string, string, string] }) {
  return (
    <div className="flex items-center border-2 border-gray-700 rounded overflow-hidden bg-white h-7 w-fit">
      <div
        className="bg-[#1a3a8f] text-white text-[8px] px-1 h-full flex items-center justify-center"
        style={{ writingMode: "vertical-rl", letterSpacing: 1 }}
      >
        ایران
      </div>
      <div className="flex items-center px-1.5 gap-1 text-xs font-semibold text-gray-900">
        <span>{plate[0]}</span>
        <div className="w-px h-4 bg-gray-300" />
        <span>{plate[1]}</span>
        <div className="w-px h-4 bg-gray-300" />
        <span>{plate[2]}</span>
      </div>
    </div>
  );
}

export default function VehicleModal({ vehicles, onSelect, onClose }: VehicleModalProps) {
  const [search, setSearch] = useState("");

  const filtered = vehicles.filter((v) => {
    const q = search.trim();
    if (!q) return true;
    return (
      v.plate.join("").includes(q) ||
      v.name.includes(q) ||
      VEHICLE_TYPES[v.vehicleTypeId]?.label.includes(q)
    );
  });

  return (
    <div
      className="fixed inset-0 bg-black/30 z-50 flex items-end justify-center"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-t-2xl w-full max-w-lg flex flex-col max-h-[75vh]" dir="rtl">
        {/* handle */}
        <div className="w-9 h-1 bg-gray-200 rounded-full mx-auto mt-3" />

        {/* header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <span className="text-sm font-medium text-gray-900">انتخاب خودرو</span>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* search */}
        <div className="px-4 py-2.5 border-b border-gray-100">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجو پلاک یا نام خودرو..."
            className="w-full py-2 px-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400"
            autoFocus
          />
        </div>

        {/* list */}
        <div className="overflow-y-auto flex-1 py-1">
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-sm text-gray-400">خودرویی یافت نشد</div>
          ) : (
            filtered.map((v) => {
              const vt = VEHICLE_TYPES[v.vehicleTypeId];
              return (
                <div
                  key={v.id}
                  onClick={() => onSelect(v)}
                  className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer"
                >
                  <PlateBox plate={v.plate} />
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">{v.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{vt?.label}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
