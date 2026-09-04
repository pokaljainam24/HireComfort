import { Qualification, QualificationForm } from "@/types/qualification.js";

import axios from "axios";

const API_URL = "http://localhost:5000/api/qualifications";

// =====================================
// Get All
// =====================================

export const getQualifications = async (): Promise<Qualification[]> => {
  const response = await axios.get(API_URL);

  return response.data.qualifications;
};

// =====================================
// Get By ID
// =====================================

export const getQualificationById = async (
  id: string,
): Promise<Qualification> => {
  const response = await axios.get(`${API_URL}/${id}`);

  return response.data.qualification;
};

// =====================================
// Create
// =====================================

export const createQualification = async (
  form: QualificationForm,
): Promise<Qualification> => {
  const response = await axios.post(API_URL, form);

  return response.data.qualification;
};

// =====================================
// Update
// =====================================

export const updateQualification = async (
  id: string,
  form: QualificationForm,
): Promise<Qualification> => {
  const response = await axios.patch(`${API_URL}/${id}`, form);

  return response.data.qualification;
};

// =====================================
// Delete
// =====================================

export const deleteQualification = async (
  id: string,
): Promise<Qualification> => {
  const response = await axios.delete(`${API_URL}/${id}`);

  return response.data.qualification;
};
