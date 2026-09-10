import axios from "axios";

import type {
  JobSubCategory,
  JobSubCategoryForm,
} from "@/types/jobSubCategory";

const API_URL =
  "http://localhost:5000/api/job-sub-categories";

// =====================================
// AUTH HEADER
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
    Authorization: `Bearer ${token} `,
  };
};

// =====================================
// GET ALL JOB SUB CATEGORIES
// =====================================

export const getJobSubCategories =
  async (): Promise<
    JobSubCategory[]
  > => {
    const response =
      await axios.get(
        API_URL,
        {
          headers:
            getAuthHeaders(),
        },
      );

    return response.data
      .jobSubCategories;
  };

// =====================================
// GET BY ID
// =====================================

export const getJobSubCategoryById =
  async (
    id: string,
  ): Promise<JobSubCategory> => {
    const response =
      await axios.get(
        `${API_URL}/${id}`,
        {
          headers:
            getAuthHeaders(),
        },
      );

    return response.data
      .jobSubCategory;
  };

// =====================================
// CREATE
// =====================================

export const createJobSubCategory =
  async (
    form: JobSubCategoryForm,
  ): Promise<JobSubCategory> => {
    const formData =
      new FormData();

    formData.append(
      "categoryId",
      form.categoryId,
    );

    formData.append(
      "name",
      form.name,
    );

    formData.append(
      "description",
      form.description,
    );

    if (form.icon) {
      formData.append(
        "icon",
        form.icon,
      );
    }

    const response =
      await axios.post(
        API_URL,
        formData,
        {
          headers:
            getAuthHeaders(),
        },
      );

    return response.data
      .jobSubCategory;
  };

// =====================================
// UPDATE
// =====================================

export const updateJobSubCategory =
  async (
    id: string,
    form: JobSubCategoryForm,
  ): Promise<JobSubCategory> => {
    const formData =
      new FormData();

    formData.append(
      "categoryId",
      form.categoryId,
    );

    formData.append(
      "name",
      form.name,
    );

    formData.append(
      "description",
      form.description,
    );

    // New icon only
    if (form.icon) {
      formData.append(
        "icon",
        form.icon,
      );
    }

    const response =
      await axios.patch(
        `${API_URL}/${id}`,
        formData,
        {
          headers:
            getAuthHeaders(),
        },
      );

    return response.data
      .jobSubCategory;
  };

// =====================================
// DELETE
// =====================================

export const deleteJobSubCategory =
  async (
    id: string,
  ): Promise<JobSubCategory> => {
    const response =
      await axios.delete(
        `${API_URL}/${id}`,
        {
          headers:
            getAuthHeaders(),
        },
      );

    return response.data
      .jobSubCategory;
  };
