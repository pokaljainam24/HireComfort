const API_URL = "http://localhost:5000/api/admin";

export interface AdminUser {
  id: string;
  username: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: AdminUser;
}

export const loginAdmin = async (
  username: string,
  password: string,
): Promise<LoginResponse> => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Invalid username or password");
  }

  return data;
};

// =====================================================
// CHANGE ADMIN PASSWORD
// =====================================================

export const changeAdminPassword = async (
  currentPassword: string,
  newPassword: string,
): Promise<{ message: string }> => {
  const token = sessionStorage.getItem("admin_panel_auth_token");

  const response = await fetch(`${API_URL}/change-password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      currentPassword,
      newPassword,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to change password");
  }

  return data;
};