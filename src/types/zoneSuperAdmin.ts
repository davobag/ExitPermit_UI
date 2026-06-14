export interface Zone {
  id: string;
  name: string;
  logoUrl: string | null;
  defaultMonthlyQuota: number;
  unitsCount: number;
  issuedPermitsCount: number;
  isActive: boolean;
}

export interface NewZoneForm {
  name: string;
   logoUrl: string | null; 
  defaultMonthlyQuota: number;
}
