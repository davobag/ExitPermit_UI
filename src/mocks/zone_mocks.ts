// TODO: حذف بعد از اتصال به API
import type { ZoneSettings, ZoneAdmin } from "../types/zone";

export const MOCK_ZONE_SETTINGS: ZoneSettings = {
  defaultMonthlyQuota: 20,
  permitValidityHours: 24,
  permitValidUntilEndOfDay: false,
};

export const MOCK_ZONE_ADMINS: ZoneAdmin[] = [
  { id: "1", firstName: "سارا", lastName: "محمدی", phoneNumber: "09121110001", isActive: true  },
  { id: "2", firstName: "پویا", lastName: "اکبری",  phoneNumber: "09121110002", isActive: true  },
  { id: "3", firstName: "نگار", lastName: "یوسفی",  phoneNumber: "09121110003", isActive: false },
];
