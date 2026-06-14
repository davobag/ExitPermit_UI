// TODO: حذف بعد از اتصال به API
import type { Gate } from "../types/gate";

export const MOCK_GATES: Gate[] = [
  { id: "1", name: "درب خروج شمالی", startTime: "08:00", endTime: "20:00", isActive: true  },
  { id: "2", name: "درب خروج جنوبی", startTime: "06:00", endTime: "22:00", isActive: true  },
  { id: "3", name: "درب خروج شرقی",  startTime: "08:00", endTime: "16:00", isActive: false },
];
