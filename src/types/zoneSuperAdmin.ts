export interface Zone {
  id: string;
  name: string;
  description?: string;
  logoUrl: string | null;
  defaultMonthlyQuota: number;
  permitExpiryHours:number;
  unitsCount: number;
  issuedPermitsCount: number;
  isActive: boolean;
}

export interface NewZoneForm {
  name: string;
  description?: string;
  logoUrl: string | null;
  defaultMonthlyQuota: number;
  permitExpiryHours: number;
  isActive: boolean;
}
