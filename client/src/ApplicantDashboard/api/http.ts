import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const http = axios.create({
  baseURL: API_BASE_URL,
});

const TOKEN_KEY = "applicant_panel_token";

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

http.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Central place other modules can subscribe to for a forced logout on 401
let onUnauthorized: (() => void) | null = null;
export function setOnUnauthorized(fn: () => void) {
  onUnauthorized = fn;
}

http.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error?.response?.status === 401) {
      clearToken();
      onUnauthorized?.();
    }
    return Promise.reject(error);
  }
);

export default http;