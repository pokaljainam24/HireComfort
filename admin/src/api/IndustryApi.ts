import axios from "axios";

import type {
  Industry,
  IndustryForm,
} from "@/types/Industry";

const API_URL =
  "http://localhost:5000/api/industries";

// =====================================
// Get All Industries
// =====================================

export const getIndustries =
  async (): Promise<Industry[]> => {
    const response =
      await axios.get(API_URL);

    return response.data.industries;
  };

// =====================================
// Get Industry By ID
// =====================================

export const getIndustryById =
  async (
    id: number,
  ): Promise<Industry> => {
    const response =
      await axios.get(
        `${API_URL}/${id}`,
      );

    return response.data.industry;
  };

// =====================================
// Create Industry
// =====================================

export const createIndustry =
  async (
    form: IndustryForm,
  ): Promise<Industry> => {
    const response =
      await axios.post(
        API_URL,
        form,
      );

    return response.data.industry;
  };

// =====================================
// Update Industry
// =====================================

export const updateIndustry =
  async (
    id: number,
    form: IndustryForm,
  ): Promise<Industry> => {
    const response =
      await axios.put(
        `${API_URL}/${id}`,
        form,
      );

    return response.data.industry;
  };

// =====================================
// Delete Industry
// =====================================

export const deleteIndustry =
  async (
    id: number,
  ): Promise<Industry> => {
    const response =
      await axios.delete(
        `${API_URL}/${id}`,
      );

    return response.data.industry;
  };