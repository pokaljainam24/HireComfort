import React, { createContext, useContext, useEffect, useState } from "react";
import { clearToken, getToken, setOnUnauthorized, setToken } from "../api/http.ts";
import { authApi } from "../api/authApi.ts";

interface AuthUser {
  id: string;
  fullName: string;
  email: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; message?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    clearToken();
    setUser(null);
  };

  useEffect(() => {
    setOnUnauthorized(() => logout());

    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }

    authApi
      .me()
      .then((applicant) => setUser(applicant))
      .catch(() => clearToken())
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await authApi.login(email, password);
      setToken(res.token);
      setUser(res.applicant);
      return { ok: true };
    } catch (err: any) {
      const message = err?.response?.data?.message || "Login failed. Please try again.";
      return { ok: false, message };
    }
  };

   

  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
