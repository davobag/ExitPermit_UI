// TODO: حذف این فایل بعد از اتصال به API — اطلاعات از JWT میاد
import type { User } from "../types/user";

export const MOCK_GUARD_USER: User = {
  id: "guard-001",
  firstName: "علی",
  lastName: "رضایی",
  role: "Guard",
  gateId: "gate-002",
  gateName: "دروازه شمالی",
};
