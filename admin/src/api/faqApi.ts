import axios from "axios";

import type { Faq, FaqForm } from "@/types/faq";

const API_URL = "http://localhost:5000/api/faqs";

// Get FAQs
export const getFaqs = async (): Promise<Faq[]> => {
  const response = await axios.get(API_URL);

  return response.data.faqs;
};

// Get FAQ by ID
export const getFaqById = async (id: string): Promise<Faq> => {
  const response = await axios.get(`${API_URL}/${id}`);

  return response.data.faq;
};

// Create FAQ
export const createFaq = async (form: FaqForm): Promise<Faq> => {
  const response = await axios.post(API_URL, form);

  return response.data.faq;
};

// Update FAQ
export const updateFaq = async (id: string, form: FaqForm): Promise<Faq> => {
  const response = await axios.patch(`${API_URL}/${id}`, form);

  return response.data.faq;
};

// Delete FAQ
export const deleteFaq = async (id: string): Promise<Faq> => {
  const response = await axios.delete(`${API_URL}/${id}`);

  return response.data.faq;
};
