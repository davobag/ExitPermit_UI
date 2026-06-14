export interface ZoneSettings {
  defaultMonthlyQuota: number;
  permitValidityHours: number | null;
  permitValidUntilEndOfDay: boolean;
}

export interface ZoneAdmin {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  isActive: boolean;
}

export interface NewZoneAdminForm {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}
