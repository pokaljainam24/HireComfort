
import api from "./axios";

import type {
  ApplicantEducationType,
  ApplicantEducationForm,
} from "../types/applicantEducation";

// =====================================
// CREATE APPLICANT EDUCATION
// POST /api/applicants/applicant-education
// =====================================

export const createApplicantEducationApi = async (
  data: ApplicantEducationForm
): Promise<ApplicantEducationType> => {
  try {
    const response = await api.post(
      "/applicants/applicant-education",
      data
    );

    return response.data.data;
  } catch (error) {
    console.error(
      "Create Applicant Education API Error:",
      error
    );

    throw error;
  }
};


// =====================================
// GET ALL APPLICANT EDUCATION
// GET /api/applicants/applicant-education
// =====================================

export const getApplicantEducationApi = async (): Promise<
  ApplicantEducationType[]
> => {
  try {
    const response = await api.get(
      "/applicants/applicant-education"
    );

    return response.data.data;
  } catch (error) {
    console.error(
      "Get Applicant Education API Error:",
      error
    );

    throw error;
  }
};


// =====================================
// GET EDUCATION BY APPLICANT ID
// GET /api/applicants/applicant-education/applicant/:applicantId
// =====================================

export const getApplicantEducationByApplicantIdApi =
  async (
    applicantId: string
  ): Promise<ApplicantEducationType[]> => {
    try {
      const response = await api.get(
        `/applicants/applicant-education/applicant/${applicantId}`
      );

      return response.data.data;
    } catch (error) {
      console.error(
        "Get Applicant Education By Applicant ID API Error:",
        error
      );

      throw error;
    }
  };


// =====================================
// GET EDUCATION BY ID
// GET /api/applicants/applicant-education/:id
// =====================================

export const getApplicantEducationByIdApi = async (
  id: string
): Promise<ApplicantEducationType> => {
  try {
    const response = await api.get(
      `/applicants/applicant-education/${id}`
    );

    return response.data.data;
  } catch (error) {
    console.error(
      "Get Applicant Education By ID API Error:",
      error
    );

    throw error;
  }
};


// =====================================
// UPDATE APPLICANT EDUCATION
// PATCH /api/applicants/applicant-education/:id
// =====================================

export const updateApplicantEducationApi = async (
  id: string,
  data: Partial<ApplicantEducationForm>
): Promise<ApplicantEducationType> => {
  try {
    const response = await api.patch(
      `/applicants/applicant-education/${id}`,
      data
    );

    return response.data.data;
  } catch (error) {
    console.error(
      "Update Applicant Education API Error:",
      error
    );

    throw error;
  }
};


// =====================================
// DELETE APPLICANT EDUCATION
// DELETE /api/applicants/applicant-education/:id
// =====================================

export const deleteApplicantEducationApi = async (
  id: string
) => {
  try {
    const response = await api.delete(
      `/applicants/applicant-education/${id}`
    );

    return response.data;
  } catch (error) {
    console.error(
      "Delete Applicant Education API Error:",
      error
    );

    throw error;
  }
};


// =====================================
// UPDATE EDUCATION ACTIVE STATUS
// PATCH /api/applicants/applicant-education/:id/active
// =====================================

export const updateEducationActiveApi = async (
  id: string,
  isActive: boolean
): Promise<ApplicantEducationType> => {
  try {
    const response = await api.patch(
      `/applicants/applicant-education/${id}/active`,
      {
        isActive,
      }
    );

    return response.data.data;
  } catch (error) {
    console.error(
      "Update Education Active API Error:",
      error
    );

    throw error;
  }
};

