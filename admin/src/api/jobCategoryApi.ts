import axios from "axios";

const API_URL = "http://localhost:5000/api/job-categories";

// =====================================
// TYPE
// =====================================

export interface JobCategory {
  _id: string;
  name: string;
  description: string;
  icon: string;

  isActive: boolean;
  isDisplay: boolean;

  createdAt: string;
  createdBy: string;

  updatedAt: string;
  updatedBy: string | null;

  deleteAt: string | null;
  deleteBy: string | null;
}

// =====================================
// GET ALL
// =====================================

export const getJobCategories = async (): Promise<JobCategory[]> => {
  const response = await axios.get(API_URL);

  return response.data.jobCategories;
};

// =====================================
// GET BY ID
// =====================================

export const getJobCategoryById = async (id: string): Promise<JobCategory> => {
  const response = await axios.get(`${API_URL}/${id}`);

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

  const response = await axios.post(API_URL, formData);

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

  const response = await axios.patch(`${API_URL}/${id}`, formData);

  return response.data.jobCategory;
};

// =====================================
// DELETE
// =====================================

export const deleteJobCategory = async (id: string): Promise<JobCategory> => {
  const response = await axios.delete(`${API_URL}/${id}`);

  return response.data.jobCategory;
};
