import axios from "axios";

import type { JobCategory } from "@/types/jobCategory";

const API_URL = "http://localhost:5000/api/job-categories";

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
// GET ALL
// =====================================

export const getJobCategories = async (): Promise<JobCategory[]> => {
  const response = await axios.get(API_URL, {
    headers: getAuthHeaders(),
  });

  return response.data.jobCategories;
};

// =====================================
// GET BY ID
// =====================================

export const getJobCategoryById = async (
  id: string,
): Promise<JobCategory> => {
  const response = await axios.get(`${API_URL}/${id}`, {
    headers: getAuthHeaders(),
  });

  return response.data.jobCategory;
};

// =====================================
// CREATE
// =====================================

export const createJobCategory = async (
  name: string,
  description: string,
  icon: File,
): Promise<JobCategory> => {
  const formData = new FormData();

  formData.append("name", name);
  formData.append("description", description);
  formData.append("icon", icon);

  const response = await axios.post(API_URL, formData, {
    headers: getAuthHeaders(),
  });

  return response.data.jobCategory;
};

// =====================================
// UPDATE
// =====================================

export const updateJobCategory = async (
  id: string,
  name: string,
  description: string,
  icon?: File,
): Promise<JobCategory> => {
  const formData = new FormData();

  formData.append("name", name);
  formData.append("description", description);

  if (icon) {
    formData.append("icon", icon);
  }

  const response = await axios.patch(
    `${API_URL}/${id}`,
    formData,
    {
      headers: getAuthHeaders(),
    },
  );

  return response.data.jobCategory;
};

// =====================================
// DELETE
// =====================================

export const deleteJobCategory = async (
  id: string,
): Promise<JobCategory> => {
  const response = await axios.delete(
    `${API_URL}/${id}`,
    {
      headers: getAuthHeaders(),
    },
  );

  return response.data.jobCategory;
};