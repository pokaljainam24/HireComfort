export type JobStatus = "open" | "closed" | "draft";
export type JobType = "Full Time" | "Part Time" | "Contract" | "Internship" | "Freelance";

export interface Job {
  _id: string;
  title: string;
  categoryId: string;
  recruiterId: string;
  subCategoryId: string;
  jobType: JobType;
  countryId: string;
  stateId: string;
  cityId: string;
  exp: number;
  salaryRange: number;
  skills: string[];
  description: string;
  deadline: string;
  nop: number;
  qualification: string;
  city?: number;
  state?: number;
  country?: number;
  lastAppliedDate?: string;
  interviewType?: string;
  status: JobStatus;
  applicationCount?: number;
  createdAt?: string;
}
