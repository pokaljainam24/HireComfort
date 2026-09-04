import axios from "axios";

import type {
  EmailCredential,
  EmailCredentialForm,
} from "@/types/emailCredential";

const API_URL = "http://localhost:5000/api/email-credentials";

// =====================================
// Get All
// =====================================

export const getEmailCredentials = async (): Promise<EmailCredential[]> => {
  const response = await axios.get(API_URL);

  return response.data.emailCredentials;
};

// =====================================
// Get By ID
// =====================================

export const getEmailCredentialById = async (
  id: string,
): Promise<EmailCredential> => {
  const response = await axios.get(`${API_URL}/${id}`);

  return response.data.emailCredential;
};

// =====================================
// Create
// =====================================

export const createEmailCredential = async (
  form: EmailCredentialForm,
): Promise<EmailCredential> => {
  const response = await axios.post(API_URL, form);

  return response.data.emailCredential;
};

// =====================================
// Update
// =====================================

export const updateEmailCredential = async (
  id: string,
  form: EmailCredentialForm,
): Promise<EmailCredential> => {
  const response = await axios.patch(`${API_URL}/${id}`, form);

  return response.data.emailCredential;
};

// =====================================
// Delete
// =====================================

export const deleteEmailCredential = async (
  id: string,
): Promise<EmailCredential> => {
  const response = await axios.delete(`${API_URL}/${id}`);

  return response.data.emailCredential;
};
