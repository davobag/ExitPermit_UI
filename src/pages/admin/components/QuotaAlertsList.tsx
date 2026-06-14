import type { UnitQuotaAlert } from "../../../types/dashboard";
import { toPersianDigits } from "../../../utils/numbers";

interface QuotaAlertsListProps {
  alerts: UnitQuotaAlert[];
}

function barColor(pct: number) {
  if (pct >= 90) return "#E24B4A";
  if (pct >= 60) return "#BA7517";
  return "#378ADD";
}

export default function QuotaAlertsList({ alerts }: QuotaAlertsListProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4">
      <p className="text-sm font-medium text-gray-900 mb-4">واحدهای نزدیک سقف ماهانه</p>

      <div className="flex flex-col gap-3">
        {alerts.map((a) => {
          const pct = Math.round((a.used / a.total) * 100);
          return (
            <div key={a.unitName}>
              <div className="flex items-center justify-between text-sm text-gray-800 mb-1">
                <span>{a.unitName}</span>
                <span className="text-xs text-gray-400 font-mono" dir="ltr">
                  {toPersianDigits(`${a.used} / ${a.total}`)}
                </span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${pct}%`, background: barColor(pct) }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
