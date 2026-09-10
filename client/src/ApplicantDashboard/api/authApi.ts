import http from "../api/http";

// NOTE: adjust these paths to match the recruiter auth routes on your
// server (the ones you'll add alongside the existing JWT + bcrypt admin
// auth). This mirrors the admin panel's authApi 1:1.
export interface LoginResponse {
  token: string;
  recruiter: { id: string; fullName: string; email: string };
}

export const authApi = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const { data } = await http.post<LoginResponse>("/applicant/auth/login", { email, password });
    return data;
  },
  me: async (): Promise<{ id: string; fullName: string; email: string }> => {
    const { data } = await http.get<{ id: string; fullName: string; email: string }>("/applicant/auth/me");
    return data;
  },
  changePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
    await http.post("/applicant/auth/change-password", { currentPassword, newPassword });
  },
};
