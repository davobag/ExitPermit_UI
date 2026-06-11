import type { ExitPermit } from "../../../types/exitPermit";
import type { Quota } from "../../../types/representative";
import { VEHICLE_TYPES } from "../../../types/vehicleType";

interface PermitsTabProps {
  permits: ExitPermit[];
  quota: Quota;
}

const STATUS_CONFIG = {
  Issued:    { label: "در انتظار",  color: "#378ADD", dot: "#378ADD" },
  Confirmed: { label: "تایید شده", color: "#1D9E75", dot: "#1D9E75" },
  Cancelled: { label: "لغو شده",   color: "#E24B4A", dot: "#E24B4A" },
  Expired:   { label: "منقضی شده", color: "#BA7517", dot: "#BA7517" },
};

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

export default function PermitsTab({ permits, quota }: PermitsTabProps) {
  const pct = Math.round((quota.used / quota.total) * 100);
  const barColor = pct >= 90 ? "bg-red-500" : pct >= 60 ? "bg-amber-500" : "bg-blue-500";

  // از آخر به اول
  const sorted = [...permits].reverse();

  return (
    <div className="pb-4">
      {/* سقف ماهانه */}
      <div className="mx-4 mt-4 mb-4 bg-gray-50 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs text-gray-500">سقف ماهانه</span>
          <span className="text-xs text-gray-500">
            <span className="font-medium text-gray-900">{quota.used}</span> از{" "}
            <span className="font-medium text-gray-900">{quota.total}</span> برگه
          </span>
        </div>
        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div className={`h-full rounded-full ${barColor}`} style={{ width: `${pct}%` }} />
        </div>
        <p className="text-xs text-gray-400 mt-1.5">{quota.total - quota.used} برگه باقی‌مانده</p>
      </div>

      {/* لیست */}
      <p className="text-xs text-gray-400 px-4 mb-2">آخرین برگه‌های صادره</p>
      <div className="flex flex-col gap-2.5 px-4">
        {sorted.length === 0 ? (
          <div className="text-center py-8 text-sm text-gray-400">برگه‌ای صادر نشده</div>
        ) : (
          sorted.map((p) => {
            const vt = VEHICLE_TYPES[p.vehicleTypeId];
            const st = STATUS_CONFIG[p.status];
            return (
              <div
                key={p.id}
                className="rounded-xl border border-gray-100 p-3.5 bg-white"
                style={{ borderRight: `3px solid ${vt?.dot}` }}
              >
                <div className="flex items-start justify-between mb-2.5">
                  <span
                    className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                    style={{ background: vt?.bg, color: vt?.color }}
                  >
                    {vt?.label}
                  </span>
                  <span className="text-xs text-gray-400">{p.id}</span>
                </div>
                <PlateBox plate={p.plate} />
                <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-gray-100">
                  <span className="text-xs text-gray-400">{p.issuedAt}</span>
                  <span className="text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: st.dot }} />
                    <span style={{ color: st.color }}>{st.label}</span>
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
