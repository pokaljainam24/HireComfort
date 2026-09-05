import axios from "axios";

import type {
  Industry,
  IndustryForm,
} from "../types/Industry.js";

const API_URL =
  "http://localhost:5000/api/industries";

export const getIndustries =
  async (): Promise<Industry[]> => {
    const response =
      await axios.get(API_URL);

    return response.data.industries;
  };

export const getIndustryById =
  async (id: number): Promise<Industry> => {
    const response =
      await axios.get(
        `${API_URL}/${id}`,
      );

    return response.data.industry;
  };

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