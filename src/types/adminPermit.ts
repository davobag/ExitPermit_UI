export interface AdminPermit {
  id: string;
  plate: [string, string, string];
  vehicleTypeId: number;
  unit: string;
  guard: string;
  gate: string;
  cargo: string;
  issuedAt: string;       // HH:mm
  issuedDate: string;     // YYYY-MM-DD
  exitedAt: string | null; // HH:mm یا null اگر هنوز خارج نشده
  status: "Issued" | "Confirmed" | "Cancelled" | "Expired";
}

export interface PermitFilters {
  fromDate: string;
  toDate: string;
  unit: string;
  guard: string;
  status: string;
  plate: [string, string, string] | null;
}
