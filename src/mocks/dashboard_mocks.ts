// TODO: حذف بعد از اتصال به API
import type {
  DashboardMetrics,
  TrendPoint,
  PermitStatusBreakdown,
  GateTraffic,
  UnitQuotaAlert,
} from "../types/dashboard";

export const MOCK_METRICS: DashboardMetrics = {
  todayCount: 24,
  todayChangePct: 12,
  weekCount: 158,
  weekDailyAvg: 22,
  monthCount: 682,
  monthChangePct: 8,
  unitsNearQuota: 3,
  totalActiveUnits: 24,
};

export const MOCK_TREND_7D: TrendPoint[] = [
  { label: "شنبه", count: 18 },
  { label: "یکشنبه", count: 22 },
  { label: "دوشنبه", count: 19 },
  { label: "سه‌شنبه", count: 26 },
  { label: "چهارشنبه", count: 24 },
  { label: "پنجشنبه", count: 15 },
  { label: "جمعه", count: 24 },
];

export const MOCK_TREND_30D: TrendPoint[] = Array.from(
  { length: 30 },
  (_, i) => ({
    label: String(i + 1),
    count: 15 + Math.floor((i * 7) % 20),
  }),
);

export const MOCK_STATUS_BREAKDOWN: PermitStatusBreakdown = {
  confirmed: 58,
  pending: 28,
  cancelledOrExpired: 14,
};

export const MOCK_GATE_TRAFFIC: GateTraffic[] = [
  { gateName: "درب شمالی", count: 34 },
  { gateName: "درب جنوبی", count: 21 },
  { gateName: "درب شرقی", count: 9 },
];

export const MOCK_QUOTA_ALERTS: UnitQuotaAlert[] = [
  { unitName: "کارخانه بتا صنعت", used: 28, total: 30 },
  { unitName: "شرکت آلفا تجارت", used: 18, total: 20 },
  { unitName: "شرکت نورد گرم فلز", used: 11, total: 15 },
  { unitName: "شرکت رباط مخزن", used: 7, total: 15 },
];
