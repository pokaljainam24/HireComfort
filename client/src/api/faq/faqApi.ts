import api from "../axios";

// =====================================
// GET ALL FAQS
// =====================================

export const getFaqsApi = async () => {
  const response = await api.get("/faqs");

  return response.data;
};

// =====================================
// GET FAQ BY ID
// =====================================

export const getFaqByIdApi = async (id: string) => {
  const response = await api.get(`/faqs/${id}`);

  return response.data;
};

// =====================================
// CREATE FAQ
// =====================================

export const createFaqApi = async (data: any) => {
  const response = await api.post("/faqs", data);

  return response.data;
};

// =====================================
// UPDATE FAQ
// =====================================

export const updateFaqApi = async (id: string, data: any) => {
  const response = await api.put(`/faqs/${id}`, data);

  return response.data;
};

// =====================================
// DELETE FAQ
// =====================================

export const deleteFaqApi = async (id: string) => {
  const response = await api.delete(`/faqs/${id}`);

  return response.data;
};
