
import api from "./axios";

import type {
  ApplicantProjectType,
  ApplicantProjectForm,
} from "../types/applicantProject.ts";

/**
 * Create applicant project
 */
export const createApplicantProjectApi = async (
  data: ApplicantProjectForm
): Promise<ApplicantProjectType> => {
  const response = await api.post(
    "/applicants/applicant-projects",
    data
  );

  return response.data.data;
};

/**
 * Get all applicant projects
 */
export const getAllApplicantProjectsApi = async (): Promise<
  ApplicantProjectType[]
> => {
  const response = await api.get(
    "/applicants/applicant-projects"
  );

  return response.data.data;
};

/**
 * Get projects by applicant ID
 */
export const getApplicantProjectsByApplicantIdApi = async (
  applicantId: string
): Promise<ApplicantProjectType[]> => {
  const response = await api.get(
    `/applicants/applicant-projects/applicant/${applicantId}`
  );

  return response.data.data;
};

/**
 * Get project by ID
 */
export const getApplicantProjectByIdApi = async (
  id: string
): Promise<ApplicantProjectType> => {
  const response = await api.get(
    `/applicants/applicant-projects/${id}`
  );

  return response.data.data;
};

/**
 * Update applicant project
 */
export const updateApplicantProjectApi = async (
  id: string,
  data: Partial<ApplicantProjectForm>
): Promise<ApplicantProjectType> => {
  const response = await api.patch(
    `/applicants/applicant-projects/${id}`,
    data
  );

  return response.data.data;
};

/**
 * Delete applicant project
 */
export const deleteApplicantProjectApi = async (
  id: string
) => {
  const response = await api.delete(
    `/applicants/applicant-projects/${id}`
  );

  return response.data;
};
