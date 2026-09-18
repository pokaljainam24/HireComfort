export type ApplicationStatus =
  | "Viewed"
  | "Shortlisted"
  | "Interview"
  | "Hired"
  | "Rejected"
  | `Round ${number}`;

export interface JobMasterInfo {
  _id: string;
  title?: string;
  noOfRounds: number;
}

export interface Application {
  _id: string;

  jobId: string | JobMasterInfo;

  applicantId?: string | unknown;
  recruiterId?: string | unknown;
  companyId?: string | unknown;

  jobTitle?: string;

  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;

  resume?: string;
  resumeUrl?: string;

  coverLetter?: string;
  notes?: string;

  applicationStatus: ApplicationStatus;
  rejectedAtRound?: number | null;

  appliedAt: string;
  applicationDate?: string;

  rating?: number;
  expectedsalary?: number;
  noticeperiod?: string;

  isActive?: boolean;
  isDisplay?: boolean;
}

export interface ApplicationResponse {
  jobApplications?: Application[];
  jobApplication?: Application;
}