export type UserRole = "SuperAdmin" | "ZoneAdmin" | "Representative" | "Guard";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  gateId?: string;
  gateName?: string;
  unitId?: string;
}
