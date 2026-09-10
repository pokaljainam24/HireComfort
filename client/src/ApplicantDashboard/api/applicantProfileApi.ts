
import api from "../api/axios.ts";

import type {
  ApplicantProfileType,
  ApplicantForm,
} from "../types/applicantProfile.ts";

// =====================================
// APPLICANT MASTER
// =====================================


// =====================================
// CREATE APPLICANT
// POST /api/applicants
// =====================================

export const createApplicantApi = async (
  data: ApplicantForm
) => {
  try {
    const response = await api.post(
      "/applicants",
      data
    );

    return response.data;
  } catch (error) {
    console.error(
      "Create Applicant API Error:",
      error
    );

    throw error;
  }
};


// =====================================
// GET ALL APPLICANTS
// GET /api/applicants?page=1&limit=10
// =====================================

export const getApplicantsApi = async (
  page: number = 1,
  limit: number = 10
): Promise<ApplicantProfileType[]> => {
  try {
    const response = await api.get("/applicants", {
      params: {
        page,
        limit,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error("Get Applicants API Error:", error);
    throw error;
  }
};


// =====================================
// GET APPLICANT BY ID
// GET /api/applicants/:id
// =====================================

export const getApplicantByIdApi = async (
  id: string
): Promise<ApplicantProfileType> => {
  try {
    const response = await api.get(
      `/applicants/${id}`
    );

    return response.data.data;
  } catch (error) {
    console.error(
      "Get Applicant By ID API Error:",
      error
    );

    throw error;
  }
};


// =====================================
// GET APPLICANT BY USERNAME
// GET /api/applicants/username/:username
// =====================================

export const getApplicantByUsernameApi = async (
  username: string
): Promise<ApplicantProfileType> => {
  try {
    const response = await api.get(
      `/applicants/username/${username}`
    );

    return response.data.data;
  } catch (error) {
    console.error(
      "Get Applicant By Username API Error:",
      error
    );

    throw error;
  }
};


// =====================================
// UPDATE APPLICANT
// PATCH /api/applicants/:id
// =====================================

export const updateApplicantApi = async (
  id: string,
  data: Partial<ApplicantForm>
): Promise<ApplicantProfileType> => {
  try {
    const response = await api.patch(
      `/applicants/${id}`,
      data
    );

    return response.data.data;
  } catch (error) {
    console.error(
      "Update Applicant API Error:",
      error
    );

    throw error;
  }
};


// =====================================
// DELETE APPLICANT
// DELETE /api/applicants/:id
// =====================================

export const deleteApplicantApi = async (
  id: string,
  deleteBy: string
) => {
  try {
    const response = await api.delete(
      `/applicants/${id}`,
      {
        data: {
          deleteBy,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Delete Applicant API Error:",
      error
    );

    throw error;
  }
};




















