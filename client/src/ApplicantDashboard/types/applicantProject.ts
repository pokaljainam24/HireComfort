
export interface ApplicantProjectType {
  _id: string;
  applicantId: string;

  title: string;
  description?: string;
  startDate: Date;
  endDate?: Date | null;
  link?: string;

  isActive: boolean;
  isDisplay: boolean;

  createdAt: Date;
  createdBy?: string;

  updatedAt: Date;
  updatedBy?: string;

  deleteAt?: Date | null;
  deleteBy?: string | null;
}

export interface ApplicantProjectForm {
  applicantId: string;

  title: string;
  description?: string;
  startDate: Date;
  endDate?: Date | null;
  link?: string;
}