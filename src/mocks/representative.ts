// TODO: حذف بعد از اتصال به API
import type { Vehicle, Cargo, Gate, Quota } from "../types/representative";
import type { ExitPermit } from "../types/exitPermit";

export const MOCK_VEHICLES: Vehicle[] = [
  { id: "v1", name: "پژو ۴۰۵",          vehicleTypeId: 1, plate: ["۶۷", "ه",   "۲۲۱۱۰"] },
  { id: "v2", name: "کامیون بنز",        vehicleTypeId: 3, plate: ["۸۸", "الف", "۱۱۲۳۴"] },
  { id: "v3", name: "وانت نیسان",        vehicleTypeId: 2, plate: ["۴۵", "ج",   "۹۸۷۶۵"] },
  { id: "v4", name: "تویوتا هایلوکس",   vehicleTypeId: 2, plate: ["۲۳", "د",   "۵۵۵۴۴"] },
  { id: "v5", name: "مرسدس اکتروس",     vehicleTypeId: 4, plate: ["۳۱", "و",   "۷۷۸۸۹"] },
];

export const MOCK_CARGOS: Cargo[] = [
  { id: "c1", name: "قطعات فلزی",            code: "C-001" },
  { id: "c2", name: "مواد اولیه پلاستیک",    code: "C-002" },
  { id: "c3", name: "محصولات بسته‌بندی",     code: "C-003" },
];

export const MOCK_GATES: Gate[] = [
  { id: "g1", name: "درب خروج شمالی" },
  { id: "g2", name: "درب خروج جنوبی" },
];

export const MOCK_QUOTA: Quota = {
  used: 18,
  total: 30,
};

export const MOCK_REP_PERMITS: ExitPermit[] = [
  { id: "P-۱۴۰۵-۰۱۸", vehicleTypeId: 1, plate: ["۶۷", "ه",   "۲۲۱۱۰"], workshopName: "شرکت آلفا تجارت", issuedAt: "۱۰:۳۵", status: "Confirmed" },
  { id: "P-۱۴۰۵-۰۱۷", vehicleTypeId: 3, plate: ["۸۸", "الف", "۱۱۲۳۴"], workshopName: "شرکت آلفا تجارت", issuedAt: "۰۹:۱۵", status: "Issued"     },
  { id: "P-۱۴۰۵-۰۱۶", vehicleTypeId: 2, plate: ["۴۵", "ج",   "۹۸۷۶۵"], workshopName: "شرکت آلفا تجارت", issuedAt: "۰۸:۰۰", status: "Cancelled"  },
  { id: "P-۱۴۰۵-۰۱۵", vehicleTypeId: 1, plate: ["۶۷", "ه",   "۲۲۱۱۰"], workshopName: "شرکت آلفا تجارت", issuedAt: "۰۷:۳۰", status: "Confirmed" },
  { id: "P-۱۴۰۵-۰۱۴", vehicleTypeId: 4, plate: ["۳۱", "و",   "۷۷۸۸۹"], workshopName: "شرکت آلفا تجارت", issuedAt: "۰۶:۴۵", status: "Expired"   },
];
