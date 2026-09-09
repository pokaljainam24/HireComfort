export type JobStatus = "open" | "closed" | "draft";
export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship" | "Remote";

export interface Job {
  _id: string;
  title: string;
  categoryId: string;
  subCategoryId: string;
  jobType: JobType;
  countryId: string;
  stateId: string;
  cityId: string;
  minExperience: number;
  maxExperience: number;
  minSalary: number;
  maxSalary: number;
  skills: string[];
  description: string;
  deadline: string;
  status: JobStatus;
  applicationCount?: number;
  createdAt?: string;
}
