import type { ExitPermit } from "./exitPermit";

export interface Vehicle {
  id: string;
  name: string;
  vehicleTypeId: number;
  plate: [string, string, string];
}

export interface Cargo {
  id: string;
  name: string;
  code: string;
}

export interface Gate {
  id: string;
  name: string;
}

export interface Quota {
  used: number;
  total: number;
}

export interface NewPermitForm {
  vehicleId: string | null;
  plate: [string, string, string];
  cargoId: string;
  gateId: string;
  description: string;
}

export type PermitStatus = ExitPermit["status"];
