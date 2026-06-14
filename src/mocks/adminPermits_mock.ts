// TODO: حذف بعد از اتصال به API
import type { AdminPermit } from "../types/adminPermit";

const UNITS = ["شرکت آلفا تجارت", "کارخانه بتا صنعت", "شرکت گاما لجستیک"];
const GUARDS = ["علی رضایی", "محمد کریمی"];
const GATES = ["درب شمالی", "درب جنوبی"];
const CARGOS = ["قطعات فلزی", "مواد اولیه پلاستیک", "محصولات بسته‌بندی"];
const STATUSES: AdminPermit["status"][] = ["Issued", "Confirmed", "Cancelled", "Expired"];
const PLATE_NUMS: [string, string, string][] = [
  ["۶۷", "ه",   "۲۲۱۱۰"],
  ["۸۸", "الف", "۱۱۲۳۴"],
  ["۴۵", "ج",   "۹۸۷۶۵"],
  ["۲۳", "د",   "۵۵۵۴۴"],
  ["۳۱", "و",   "۷۷۸۸۹"],
];

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export const MOCK_ADMIN_PERMITS: AdminPermit[] = Array.from({ length: 23 }, (_, idx) => {
  const i = idx + 1;
  const status = STATUSES[i % STATUSES.length];
  return {
    id: `P-۱۴۰۵-${(700 + i).toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)])}`,
    plate: PLATE_NUMS[i % PLATE_NUMS.length],
    vehicleTypeId: (i % 4) + 1,
    unit: UNITS[i % UNITS.length],
    guard: GUARDS[i % GUARDS.length],
    gate: GATES[i % GATES.length],
    cargo: CARGOS[i % CARGOS.length],
    issuedAt: `${pad(7 + (i % 10))}:${pad((i * 7) % 60)}`,
    issuedDate: `1405-03-${pad((i % 28) + 1)}`,
    exitedAt: status === "Confirmed" ? `${pad(8 + (i % 10))}:${pad((i * 11) % 60)}` : null,
    status,
  };
});
