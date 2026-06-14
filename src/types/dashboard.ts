export interface DashboardMetrics {
  todayCount: number;
  todayChangePct: number;
  weekCount: number;
  weekDailyAvg: number;
  monthCount: number;
  monthChangePct: number;
  unitsNearQuota: number;
  totalActiveUnits: number;
}

export interface TrendPoint {
  label: string;
  count: number;
}

export interface PermitStatusBreakdown {
  confirmed: number;
  pending: number;
  cancelledOrExpired: number;
}

export interface GateTraffic {
  gateName: string;
  count: number;
}

export interface UnitQuotaAlert {
  unitName: string;
  used: number;
  total: number;
}
