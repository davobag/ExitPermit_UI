// TODO: حذف بعد از اتصال به API
import type { Zone } from "../types/zoneSuperAdmin";

export const MOCK_ZONES: Zone[] = [
  { id: "1", name: "شهرک صنعتی آلفا",  logoUrl: null, defaultMonthlyQuota: 20, unitsCount: 12, issuedPermitsCount: 682, isActive: true  },
  { id: "2", name: "شهرک صنعتی بتا",   logoUrl: null, defaultMonthlyQuota: 15, unitsCount: 8,  issuedPermitsCount: 341, isActive: true  },
  { id: "3", name: "شهرک صنعتی سیمرغ", logoUrl: null, defaultMonthlyQuota: 25, unitsCount: 5,  issuedPermitsCount: 120, isActive: false },
];
