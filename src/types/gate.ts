export interface Gate {
  id: string;
  name: string;
  startTime: string; // HH:mm
  endTime: string;   // HH:mm
  isActive: boolean;
}

export interface NewGateForm {
  name: string;
  startTime: string;
  endTime: string;
}
