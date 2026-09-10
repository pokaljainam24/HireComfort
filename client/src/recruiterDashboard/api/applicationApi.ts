import type { Application, ApplicationResponse, ApplicationStatus } from "../types/application.ts";
import http from "./http";

export function formatApplication(raw: any): Application {
  if (!raw) return raw;
  const applicant = typeof raw.applicantId === "object" ? raw.applicantId : {};
  const job = typeof raw.jobId === "object" ? raw.jobId : {};

  const firstName = applicant?.firstName || applicant?.fullName || "";
  const lastName = applicant?.lastName || "";
  const candidateName = (firstName + " " + lastName).trim() || applicant?.name || "N/A";
  const candidateEmail = applicant?.email || applicant?.companyEmail || raw.candidateEmail || "—";
  const candidatePhone = applicant?.mobileNumber || applicant?.contactNumber || applicant?.phone || raw.candidatePhone || "—";

  const jobTitle = job?.title || raw.jobTitle || "N/A";
  const rawStatus = (raw.applicationStatus || raw.status || "applied").toString().toLowerCase();

  return {
    ...raw,
    _id: raw._id,
    jobId: typeof raw.jobId === "object" ? raw.jobId?._id : raw.jobId,
    jobTitle,
    candidateName,
    candidateEmail,
    candidatePhone,
    resumeUrl: raw.resumeUrl || raw.resume || "",
    coverLetter: raw.coverLetter || raw.notes || "",
    status: rawStatus as ApplicationStatus,
    appliedAt: raw.appliedAt || raw.applicationDate || raw.createdAt || "",
  };
}

// Applications across every job posted by the logged-in recruiter.
export const applicationApi = {
  getAll: async (): Promise<Application[]> => {
    const response = await http.get<ApplicationResponse>("/job_application_master");
    const list = response.data.jobApplications || [];
    return list.map(formatApplication);
  },
  getOne: async (id: string): Promise<Application> => {
    const { data } = await http.get<ApplicationResponse>(`/job_application_master/${id}`);
    const raw = data.jobApplications || data;
    return formatApplication(raw);
  },
  updateStatus: async (id: string, status: ApplicationStatus): Promise<Application> => {
    const { data } = await http.patch<ApplicationResponse>(`/job_application_master/${id}`, { applicationStatus: status });
    const raw = data.jobApplications || data;
    return formatApplication(raw);
  },
};
