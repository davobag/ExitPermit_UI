import type { UnitDetailType } from "../types/unit"

// mock data — بعداً از API میگیریم
export const mockUnitDetails: Record<string, UnitDetailType> = {
  "1": {
    id: "1",
    name: "شرکت آلفا تجارت",
    monthlyQuota: 20,
    isActive: true,
    owner: {
      id: "u1",
      firstName: "علی",
      lastName: "محمدی",
      mobile: "09121234567",
      nationalCode: "0012345678",
    },
    representatives: [
      {
        id: "r1",
        firstName: "رضا",
        lastName: "کریمی",
        mobile: "09351234567",
        nationalCode: "0087654321",
        role: "PrimaryRepresentative",
        roleDescript: "نماینده سطح یک",
        isActive:true
      },
      {
        id: "r2",
        firstName: "سارا ",
        lastName: "احمدی",
        mobile: "09181234567",
        nationalCode: "0045678901",
        role: "PrimaryRepresentative",
        roleDescript: "نماینده سطح یک",
        isActive:true
      },
    ],
  },
  "2": {
    id: "2",
    name: "کارخانه بتا صنعت",
    monthlyQuota: null,
    isActive: true,
    owner: null,
    representatives: [],
  },
  "3": {
    id: "3",
    name: "شرکت گاما لجستیک",
    monthlyQuota: 15,
    isActive: false,
    owner: null,
    representatives: [],
  },
};
