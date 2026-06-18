import { createContext, useContext, useState, ReactNode } from "react";
import type { User } from "../types/user";
import apiClient from "../api/apiClient";
import { ENDPOINTS } from "../api/endpoints";
import { setAuthToken } from "../api/apiClient";

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const [user, setUser] = useState<User | null>(null);

  // LOGIN
  const login = async (phoneNumber: string, password: string) => {
    const res = await apiClient.post(ENDPOINTS.auth.login, {
      phoneNumber,
      password,
    });

    setAccessToken(res.data.accessToken);
    setAuthToken(res.data.accessToken);
    setUser(res.data.user);
  };

  //LOGOUT
  const logout = () => {
    setAccessToken(null);
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        login,
        logout,
        isAuthenticated: !!accessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
