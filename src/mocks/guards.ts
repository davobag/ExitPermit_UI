// TODO: حذف بعد از اتصال به API
import type { Guard } from "../types/guard";

export const MOCK_GUARDS: Guard[] = [
  { id: "1", firstName: "علی",   lastName: "رضایی",  phoneNumber: "09121234567", isActive: true  },
  { id: "2", firstName: "محمد",  lastName: "کریمی",  phoneNumber: "09127654321", isActive: true  },
  { id: "3", firstName: "حسین",  lastName: "احمدی",  phoneNumber: "09351112233", isActive: false },
  { id: "4", firstName: "رضا",   lastName: "موسوی",  phoneNumber: "09198887766", isActive: true  },
  { id: "5", firstName: "سجاد",  lastName: "نوری",   phoneNumber: "09112223344", isActive: true  },
  { id: "6", firstName: "مهدی",  lastName: "صادقی",  phoneNumber: "09334445566", isActive: false },
  { id: "7", firstName: "امیر",  lastName: "قاسمی",  phoneNumber: "09155556677", isActive: true  },
];
