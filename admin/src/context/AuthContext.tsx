import React, { createContext, useContext, useState } from "react";
import { loginAdmin } from "@/api/adminApi";

interface AuthUser {
  id: string;
  username: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const USER_STORAGE_KEY = "admin_panel_auth_user";
const TOKEN_STORAGE_KEY = "admin_panel_auth_token";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  // =====================================================
  // GET USER FROM SESSION STORAGE
  // =====================================================

  const [user, setUser] = useState<AuthUser | null>(() => {
    const rawUser = sessionStorage.getItem(USER_STORAGE_KEY);

    if (!rawUser) {
      return null;
    }

    try {
      return JSON.parse(rawUser);
    } catch {
      sessionStorage.removeItem(USER_STORAGE_KEY);
      return null;
    }
  });

  // =====================================================
  // GET TOKEN FROM SESSION STORAGE
  // =====================================================

  const [token, setToken] = useState<string | null>(() => {
    return sessionStorage.getItem(TOKEN_STORAGE_KEY);
  });

  // =====================================================
  // LOGIN
  // =====================================================

  const login = async (
    username: string,
    password: string,
  ): Promise<boolean> => {
    try {
      const data = await loginAdmin(username, password);

      // =====================================================
      // SAVE LOGIN DATA IN SESSION STORAGE
      // =====================================================

      sessionStorage.setItem(TOKEN_STORAGE_KEY, data.token);

      sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data.user));

      // =====================================================
      // UPDATE STATE
      // =====================================================

      setToken(data.token);
      setUser(data.user);

      return true;
    } catch (error) {
      console.error("Login error:", error);

      return false;
    }
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const logout = () => {
    sessionStorage.removeItem(USER_STORAGE_KEY);
    sessionStorage.removeItem(TOKEN_STORAGE_KEY);

    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// =====================================================
// USE AUTH
// =====================================================

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
