
import api from "./axios";

import type {
  ApplicantExperienceType,
  ApplicantExperienceForm,
} from "../types/applicantExperience.ts";

/**
 * Create applicant experience
 */
export const createApplicantExperienceApi = async (
  data: ApplicantExperienceForm
): Promise<ApplicantExperienceType> => {
  const response = await api.post(
    "/applicants/applicant-experience",
    data
  );

  return response.data.data;
};

/**
 * Get all applicant experiences
 */
export const getAllApplicantExperienceApi = async (): Promise<
  ApplicantExperienceType[]
> => {
  const response = await api.get(
    "/applicants/applicant-experience"
  );

  return response.data.data;
};

/**
 * Get experiences by applicant ID
 */
export const getApplicantExperienceByApplicantIdApi = async (
  applicantId: string
): Promise<ApplicantExperienceType[]> => {
  const response = await api.get(
    `/applicants/applicant-experience/applicant/${applicantId}`
  );

  return response.data.data;
};

/**
 * Get experience by ID
 */
export const getApplicantExperienceByIdApi = async (
  id: string
): Promise<ApplicantExperienceType> => {
  const response = await api.get(
    `/applicants/applicant-experience/${id}`
  );

  return response.data.data;
};

/**
 * Update applicant experience
 */
export const updateApplicantExperienceApi = async (
  id: string,
  data: Partial<ApplicantExperienceForm>
): Promise<ApplicantExperienceType> => {
  const response = await api.patch(
    `/applicants/applicant-experience/${id}`,
    data
  );

  return response.data.data;
};

/**
 * Delete applicant experience
 */
export const deleteApplicantExperienceApi = async (
  id: string
) => {
  const response = await api.delete(
    `/applicants/applicant-experience/${id}`
  );

  return response.data;
};
