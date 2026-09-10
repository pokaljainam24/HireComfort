import axios from "axios";

import type {
  CmsSection,
  CmsSectionForm,
} from "@/types/cms";

const API_URL =
  "http://localhost:5000/api/cms";

// =====================================
// AUTH HEADER
// =====================================

const getAuthHeaders = () => {
  const token = sessionStorage.getItem("admin_panel_auth_token");

  if (!token) {
    throw new Error("Authentication token not found");
  }

  return {
    Authorization: `Bearer ${token}`,
  };
};

// =====================================
// Get CMS
// =====================================

export const getCms =
  async (): Promise<CmsSection[]> => {
    const response = await axios.get(
      API_URL,
      {
        headers: getAuthHeaders(),
      },
    );

    return response.data.cms;
  };

// =====================================
// Get CMS By ID
// =====================================

export const getCmsById = async (
  id: string,
): Promise<CmsSection> => {
  const response = await axios.get(
    `${API_URL}/${id}`,
    {
      headers: getAuthHeaders(),
    },
  );

  return response.data.cms;
};

// =====================================
// Create CMS
// =====================================

export const createCms = async (
  form: CmsSectionForm,
): Promise<CmsSection> => {
  const response = await axios.post(
    API_URL,
    form,
    {
      headers: getAuthHeaders(),
    },
  );

  return response.data.cms;
};

// =====================================
// Update CMS
// =====================================

export const updateCms = async (
  id: string,
  form: CmsSectionForm,
): Promise<CmsSection> => {
  const response = await axios.patch(
    `${API_URL}/${id}`,
    form,
    {
      headers: getAuthHeaders(),
    },
  );

  return response.data.cms;
};

// =====================================
// Delete CMS
// =====================================

export const deleteCms = async (
  id: string,
): Promise<CmsSection> => {
  const response = await axios.delete(
    `${API_URL}/${id}`,
    {
      headers: getAuthHeaders(),
    },
  );

  return response.data.cms;
};
