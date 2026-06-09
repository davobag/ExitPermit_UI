// TODO: حذف این فایل بعد از اتصال به API
import type { ExitPermit } from "../types/exitPermit";

export const MOCK_PERMITS: ExitPermit[] = [
  { id: "P-۱۴۰۵-۰۰۱", vehicleTypeId: 1, plate: ["۱۲", "ب", "۳۴۵۶۷"],   workshopName: "شرکت آلفا تجارت",     issuedAt: "۰۸:۳۲", status: "Issued" },
  { id: "P-۱۴۰۵-۰۰۲", vehicleTypeId: 3, plate: ["۸۸", "الف", "۱۱۲۳۴"], workshopName: "کارخانه پارس فولاد",  issuedAt: "۰۸:۵۵", status: "Issued" },
  { id: "P-۱۴۰۵-۰۰۳", vehicleTypeId: 2, plate: ["۴۵", "ج", "۹۸۷۶۵"],   workshopName: "انبار مرکزی بتا",     issuedAt: "۰۹:۱۰", status: "Issued" },
  { id: "P-۱۴۰۵-۰۰۴", vehicleTypeId: 4, plate: ["۲۳", "د", "۵۵۵۴۴"],   workshopName: "شرکت حمل‌ونقل رضا",  issuedAt: "۰۹:۴۵", status: "Issued" },
  { id: "P-۱۴۰۵-۰۰۵", vehicleTypeId: 1, plate: ["۶۷", "ه", "۲۲۱۱۰"],   workshopName: "شرکت آلفا تجارت",     issuedAt: "۱۰:۰۰", status: "Issued" },
  { id: "P-۱۴۰۵-۰۰۶", vehicleTypeId: 2, plate: ["۳۱", "و", "۷۷۸۸۹"],   workshopName: "کارگاه صنعتی سیمرغ", issuedAt: "۱۰:۲۲", status: "Issued" },
];
