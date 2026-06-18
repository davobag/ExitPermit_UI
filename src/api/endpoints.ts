const BASE = import.meta.env.VITE_API_URL;

export const ENDPOINTS = {
  auth: {
    login: `${BASE}/auth/login`,
    refresh: `${BASE}/auth/refresh`,
    logout: `${BASE}/auth/logout`,
  },
   zones: {
    list: `${BASE}/zones`,
  },
} as const;
