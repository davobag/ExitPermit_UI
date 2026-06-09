export interface ExitPermit {
  id: string;
  vehicleTypeId: number;
  plate: [string, string, string]; // [عدد اول, حرف, عدد دوم]
  workshopName: string;
  issuedAt: string; // HH:mm
  status: "Issued" | "Confirmed" | "Cancelled" | "Expired";
}
