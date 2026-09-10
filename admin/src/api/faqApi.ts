import axios from "axios";

import type {
  Faq,
  FaqForm,
} from "@/types/faq";

const API_URL =
  "http://localhost:5000/api/faqs";

// =====================================
// AUTH HEADERS
// =====================================

const getAuthHeaders = () => {
  const token =
    sessionStorage.getItem(
      "admin_panel_auth_token",
    );

  if (!token) {
    throw new Error(
      "Authentication token not found",
    );
  }

  return {
    Authorization: `Bearer ${token}`,
  };
};

// =====================================
// GET FAQs
// =====================================

export const getFaqs = async (): Promise<Faq[]> => {
  const response = await axios.get(
    API_URL,
    {
      headers: getAuthHeaders(),
    },
  );

  return response.data.faqs;
};

// =====================================
// GET FAQ BY ID
// =====================================

export const getFaqById = async (
  id: string,
): Promise<Faq> => {
  const response = await axios.get(
    `${API_URL}/${id}`,
    {
      headers: getAuthHeaders(),
    },
  );

  return response.data.faq;
};

// =====================================
// CREATE FAQ
// =====================================

export const createFaq = async (
  form: FaqForm,
): Promise<Faq> => {
  const response = await axios.post(
    API_URL,
    form,
    {
      headers: getAuthHeaders(),
    },
  );

  return response.data.faq;
};

// =====================================
// UPDATE FAQ
// =====================================

export const updateFaq = async (
  id: string,
  form: FaqForm,
): Promise<Faq> => {
  const response = await axios.patch(
    `${API_URL}/${id}`,
    form,
    {
      headers: getAuthHeaders(),
    },
  );

  return response.data.faq;
};

// =====================================
// DELETE FAQ
// =====================================

export const deleteFaq = async (
  id: string,
): Promise<Faq> => {
  const response = await axios.delete(
    `${API_URL}/${id}`,
    {
      headers: getAuthHeaders(),
    },
  );

  return response.data.faq;
};