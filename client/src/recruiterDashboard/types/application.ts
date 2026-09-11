export type ApplicationStatus = "Applied" | "Shortlisted" | "Interview" | "Hired" | "Rejected";

export interface Application {
  _id: string;
  jobId: string;
  jobTitle: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  resumeUrl: string;
  coverLetter?: string;
  status: ApplicationStatus;
  appliedAt: string;
}


export interface ApplicationResponse {
  jobApplications?: Application[];
  jobApplication?: Application;
}