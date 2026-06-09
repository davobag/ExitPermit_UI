export interface Owner {
  id: string;
  firstName: string;
  lastName: string;
  mobile: string;
  nationalCode: string;
}

export interface Representative {
  id: string;
  firstName: string;
  lastName: string;
  mobile: string;
  nationalCode: string;
  role: "PrimaryRepresentative" | "Representative";
  roleDescript: string;
  isActive:boolean
}

export interface UnitDetailType  {
  id: string;
  name: string;
  monthlyQuota: number | null;
  isActive: boolean;
  owner: Owner | null;
  representatives: Representative[];
}