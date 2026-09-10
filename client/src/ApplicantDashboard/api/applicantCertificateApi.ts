
import api from "./axios";

import type {
  ApplicantCertificateType,
  ApplicantCertificateForm,
} from "../types/applicantCertificate.ts";

/**
 * Create applicant certificate
 */
export const createApplicantCertificateApi = async (
  data: ApplicantCertificateForm
): Promise<ApplicantCertificateType> => {
  const response = await api.post(
    "/applicants/applicant-certificates",
    data
  );

  return response.data.data;
};

/**
 * Get all applicant certificates
 */
export const getAllApplicantCertificatesApi = async (): Promise<
  ApplicantCertificateType[]
> => {
  const response = await api.get(
    "/applicants/applicant-certificates"
  );

  return response.data.data;
};

/**
 * Get certificates by applicant ID
 */
export const getApplicantCertificatesByApplicantIdApi = async (
  applicantId: string
): Promise<ApplicantCertificateType[]> => {
  const response = await api.get(
    `/applicants/applicant-certificates/applicant/${applicantId}`
  );

  return response.data.data;
};

/**
 * Get certificate by ID
 */
export const getApplicantCertificateByIdApi = async (
  id: string
): Promise<ApplicantCertificateType> => {
  const response = await api.get(
    `/applicants/applicant-certificates/${id}`
  );

  return response.data.data;
};

/**
 * Update applicant certificate
 */
export const updateApplicantCertificateApi = async (
  id: string,
  data: Partial<ApplicantCertificateForm>
): Promise<ApplicantCertificateType> => {
  const response = await api.patch(
    `/applicants/applicant-certificates/${id}`,
    data
  );

  return response.data.data;
};

/**
 * Delete applicant certificate
 */
export const deleteApplicantCertificateApi = async (
  id: string
) => {
  const response = await api.delete(
    `/applicants/applicant-certificates/${id}`
  );

  return response.data;
};
