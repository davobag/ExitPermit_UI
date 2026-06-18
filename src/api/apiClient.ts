import axios from "axios";
import { ENDPOINTS } from "./endpoints";


let accessToken: string | null = null;

export function setAuthToken(token: string | null) {
  accessToken = token;
}

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor — token رو اضافه می‌کنه
apiClient.interceptors.request.use((config) => {
  const token = null; /* بعداً از AuthContext می‌گیریم */
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor — خطاها رو مدیریت می‌کنه
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // token منقضی شده → بعداً refresh اضافه می‌کنیم
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default apiClient;
