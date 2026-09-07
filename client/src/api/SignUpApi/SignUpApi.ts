import api from "../axios";

// =====================================
// SIGNUP
// =====================================

export const signupApi = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  password: string;
  confirmPassword: string;
  accountType: "applicant" | "recruiter";
  username: string;
  companyName?: string;
}) => {
  try {
    const response = await api.post("/auth/signup", data);

    return response.data;
  } catch (error) {
    console.error("Signup API Error:", error);
    throw error;
  }
};


export const loginApi = async (data: {
  username: string;
  password: string;
  loginAs: "applicant" | "recruiter";
}) => {
  try {
    const response = await api.post("/auth/login", data);

    return response.data;
  } catch (error) {
    console.error("Login API Error:", error);
    throw error;
  }
};