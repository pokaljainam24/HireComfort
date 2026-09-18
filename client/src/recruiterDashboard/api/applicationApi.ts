
import type {
  Application,
  ApplicationResponse,
  ApplicationStatus,
} from "../types/application.ts";
import http from "./http";

export function formatApplication(raw: any): Application {
  if (!raw) return raw;

  const applicant =
    typeof raw.applicantId === "object"
      ? raw.applicantId
      : {};

  const job =
    typeof raw.jobId === "object"
      ? raw.jobId
      : {};

  const firstName =
    applicant?.firstName ||
    applicant?.fullName ||
    "";

  const lastName =
    applicant?.lastName || "";

  const candidateName =
    (firstName + " " + lastName).trim() ||
    applicant?.name ||
    "N/A";

  const candidateEmail =
    applicant?.email ||
    applicant?.companyEmail ||
    raw.candidateEmail ||
    "—";

  const candidatePhone =
    applicant?.mobileNumber ||
    applicant?.contactNumber ||
    applicant?.phone ||
    raw.candidatePhone ||
    "—";

  const jobTitle =
    job?.title ||
    raw.jobTitle ||
    "N/A";

  const rawStatus = (
    raw.applicationStatus ||
    raw.status ||
    "Viewed"
  )
    .toString()
    .trim();

  const capitalizedStatus =
    rawStatus.charAt(0).toUpperCase() +
    rawStatus.slice(1);

  return {
    ...raw,

    _id: raw._id,

    jobId: raw.jobId,

    jobTitle,

    candidateName,
    candidateEmail,
    candidatePhone,

    resumeUrl:
      raw.resumeUrl ||
      raw.resume ||
      "",

    coverLetter:
      raw.coverLetter ||
      raw.notes ||
      "",

    applicationStatus:
      capitalizedStatus as ApplicationStatus,

    rejectedAtRound:
      typeof raw.rejectedAtRound === "number"
        ? raw.rejectedAtRound
        : null,

    appliedAt:
      raw.appliedAt ||
      raw.applicationDate ||
      raw.createdAt ||
      "",
  };
}

// Applications across every job posted by the logged-in recruiter.
export const applicationApi = {
  getAll: async (): Promise<Application[]> => {
    const response =
      await http.get<ApplicationResponse>(
        "/job_application_master"
      );

    const list =
      response.data.jobApplications || [];

    return list.map(formatApplication);
  },

  getOne: async (
    id: string
  ): Promise<Application> => {
    const { data } =
      await http.get<ApplicationResponse>(
        `/job_application_master/${id}`
      );

    const raw =
      data.jobApplication ||
      data.jobApplications ||
      data;

    return formatApplication(raw);
  },

 updateStatus: async (
  id: string,
  status: ApplicationStatus,
  rejectedAtRound: number | null = null
): Promise<Application> => {
  const { data } = await http.patch<ApplicationResponse>(
    `/job_application_master/${id}`,
    {
      applicationStatus: status,
      rejectedAtRound,
    }
  );

  const raw =
    data.jobApplication ||
    data.jobApplications ||
    data;

  return formatApplication(raw);
},
};

