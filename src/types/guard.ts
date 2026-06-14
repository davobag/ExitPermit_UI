export interface Guard {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  isActive: boolean;
}

export interface NewGuardForm {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}
