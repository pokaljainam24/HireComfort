import http from "./http";
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


// =====================================
// APPLICANT PROFILE
// =====================================

export const applicantProfileApi = {
  get: async (
    id: string
  ): Promise<ApplicantProfileType> => {

    const { data } = await http.get<{
      success: boolean;
      data: ApplicantProfileType;
    }>(
      "/applicants/" + id
    );

    return data.data;
  },

  update: async (
    id: string,
    payload: Partial<ApplicantProfileType>
  ): Promise<ApplicantProfileType> => {

    const { data } = await http.patch<{
      success: boolean;
      message: string;
      data: ApplicantProfileType;
    }>(
      "/applicants/" + id,
      payload
    );

    return data.data;
  },

  updatePassword: async (
    id: string,
    payload: {
      currentPassword: string;
      password: string;
      confirmPassword: string;
    }
  ): Promise<{
    message: string;
    applicant: ApplicantProfileType;
  }> => {

    const { data } = await http.patch<{
      message: string;
      applicant: ApplicantProfileType;
    }>(
      "/applicants/" + id + "/update-password",
      payload
    );

    return data;
  },
};



















