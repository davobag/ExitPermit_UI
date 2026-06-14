import { FileText, Calendar, CalendarDays, AlertTriangle } from "lucide-react";
import {
  MOCK_METRICS,
  MOCK_TREND_7D,
  MOCK_TREND_30D,
  MOCK_STATUS_BREAKDOWN,
  MOCK_GATE_TRAFFIC,
  MOCK_QUOTA_ALERTS,
} from "../../mocks/dashboard_mocks";
import { toPersianDigits } from "../../utils/numbers";

import MetricCard from "./components/MetricCard";
import TrendChart from "./components/TrendChart";
import StatusChart from "./components/StatusChart";
import GateTrafficChart from "./components/GateTrafficChart";
import QuotaAlertsList from "./components/QuotaAlertsList";

export default function Dashboard() {
  const m = MOCK_METRICS;

  return (
    <div dir="rtl">
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-gray-800">داشبورد</h1>
        <p className="text-sm text-gray-400 mt-0.5">نمای کلی فعالیت سیستم</p>
      </div>

      {/* کارت‌های آماری */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <MetricCard
          icon={<FileText className="w-4 h-4" />}
          label="برگه امروز"
          value={toPersianDigits(String(m.todayCount))}
          sub={`+${toPersianDigits(String(m.todayChangePct))}٪ نسبت به دیروز`}
          subPositive
        />
        <MetricCard
          icon={<Calendar className="w-4 h-4" />}
          label="برگه این هفته"
          value={toPersianDigits(String(m.weekCount))}
          sub={`میانگین روزانه ${toPersianDigits(String(m.weekDailyAvg))}`}
        />
        <MetricCard
          icon={<CalendarDays className="w-4 h-4" />}
          label="برگه این ماه"
          value={toPersianDigits(String(m.monthCount))}
          sub={`+${toPersianDigits(String(m.monthChangePct))}٪ نسبت به ماه قبل`}
          subPositive
        />
        <MetricCard
          icon={<AlertTriangle className="w-4 h-4" />}
          label="واحدهای نزدیک سقف"
          value={toPersianDigits(String(m.unitsNearQuota))}
          sub={`از ${toPersianDigits(String(m.totalActiveUnits))} واحد فعال`}
        />
      </div>

      {/* روند + وضعیت */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-3 mb-3">
        <TrendChart data7d={MOCK_TREND_7D} data30d={MOCK_TREND_30D} />
        <StatusChart data={MOCK_STATUS_BREAKDOWN} />
      </div>

      {/* ترافیک درب‌ها + هشدار سقف */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <GateTrafficChart data={MOCK_GATE_TRAFFIC} />
        <QuotaAlertsList alerts={MOCK_QUOTA_ALERTS} />
      </div>
    </div>
  );
}
