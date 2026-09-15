import axios from "axios";
import type { CompanyType } from "../../recruiterDashboard/types/companyType.ts";

const API_URL = "http://localhost:5000/api/company-types";

// Get all Company Types
export const getCompanyTypes = async (): Promise<CompanyType[]> => {
  const response = await axios.get(API_URL);

  return response.data.companyTypes;
};

// Get Company Type by ID
export const getCompanyTypeById = async (
  id: string
): Promise<CompanyType> => {
  const response = await axios.get(`${API_URL}/${id}`);

  return response.data.companyType;
};

// Create Company Type
export const createCompanyType = async (data: {
  companyTypeId: string;
  code: string;
  name: string;
  description?: string;
}): Promise<CompanyType> => {
  const response = await axios.post(API_URL, data);

  return response.data.companyType;
};

// Update Company Type
export const updateCompanyType = async (
  id: string,
  data: {
    companyTypeId?: string;
    code?: string;
    name?: string;
    description?: string;
    isActive?: boolean;
    isDisplay?: boolean;
  }
): Promise<CompanyType> => {
  const response = await axios.put(`${API_URL}/${id}`, data);

  return response.data.companyType;
};

// Delete Company Type
export const deleteCompanyType = async (
  id: string
): Promise<CompanyType> => {
  const response = await axios.delete(`${API_URL}/${id}`);

  return response.data.companyType;
};