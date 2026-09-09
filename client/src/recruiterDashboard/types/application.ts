export type ApplicationStatus = "applied" | "shortlisted" | "interview" | "rejected" | "hired";

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
