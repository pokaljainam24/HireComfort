import type { JobSubCategory, JobSubCategoryForm } from "../types/jobSubCategory.ts";
import { createCrudApi } from "./crudApi";
import http from "./http.ts";

export const jobSubCategoryApi = createCrudApi<JobSubCategory>("/job-sub-categories");



const API_URL = "http://localhost:5000/api/job-sub-categories";

// =====================================
// GET ALL JOB SUB CATEGORIES
// =====================================

export const getJobSubCategories = async (): Promise<JobSubCategory[]> => {
    const response = await http.get(API_URL);

    return response.data.jobSubCategories;
};

// =====================================
// GET JOB SUB CATEGORY BY ID
// =====================================

export const getJobSubCategoryById = async (
    id: string,
): Promise<JobSubCategory> => {
    const response = await http.get(`${API_URL}/${id}`);

    return response.data.jobSubCategory;
};

// =====================================
// CREATE JOB SUB CATEGORY
// =====================================

export const createJobSubCategory = async (
    form: JobSubCategoryForm,
): Promise<JobSubCategory> => {
    const formData = new FormData();

    formData.append("categoryId", form.categoryId);
    formData.append("name", form.name);
    formData.append("description", form.description);

    if (form.icon) {
        formData.append("icon", form.icon);
    }

    const response = await http.post(API_URL, formData);

    return response.data.jobSubCategory;
};

// =====================================
// UPDATE JOB SUB CATEGORY
// =====================================

export const updateJobSubCategory = async (
    id: string,
    form: JobSubCategoryForm,
): Promise<JobSubCategory> => {
    const formData = new FormData();

    formData.append("categoryId", form.categoryId);
    formData.append("name", form.name);
    formData.append("description", form.description);

    // New icon selected only then upload it
    if (form.icon) {
        formData.append("icon", form.icon);
    }

    const response = await http.patch(`${API_URL}/${id}`, formData);

    return response.data.jobSubCategory;
};

// =====================================
// DELETE JOB SUB CATEGORY
// =====================================

export const deleteJobSubCategory = async (
    id: string,
): Promise<JobSubCategory> => {
    const response = await http.delete(`${API_URL}/${id}`);

    return response.data.jobSubCategory;
};
