import { EmailTemplate, EmailTemplateForm } from "@/types/emailTemplate.js";

import axios from "axios";

const API_URL = "http://localhost:5000/api/email-templates";

// =====================================
// Get All
// =====================================

export const getEmailTemplates = async (): Promise<EmailTemplate[]> => {
  const response = await axios.get(API_URL);

  return response.data.emailTemplates;
};

// =====================================
// Get By ID
// =====================================

export const getEmailTemplateById = async (
  id: string,
): Promise<EmailTemplate> => {
  const response = await axios.get(`${API_URL}/${id}`);

  return response.data.emailTemplate;
};

// =====================================
// Create
// =====================================

export const createEmailTemplate = async (
  form: EmailTemplateForm,
): Promise<EmailTemplate> => {
  const response = await axios.post(API_URL, form);

  return response.data.emailTemplate;
};

// =====================================
// Update
// =====================================

export const updateEmailTemplate = async (
  id: string,
  form: EmailTemplateForm,
): Promise<EmailTemplate> => {
  const response = await axios.put(`${API_URL}/${id}`, form);

  return response.data.emailTemplate;
};

// =====================================
// Delete
// =====================================

export const deleteEmailTemplate = async (
  id: string,
): Promise<EmailTemplate> => {
  const response = await axios.delete(`${API_URL}/${id}`);

  return response.data.emailTemplate;
};
