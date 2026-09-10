
export interface ApplicantExperienceType {
  _id: string;
  applicantId: string;

  companyName: string;
  role: string;
  startDate: Date;
  endDate?: Date | null;
  description?: string;

  isActive: boolean;
  isDisplay: boolean;

  createdAt: Date;
  createdBy?: string;

  updatedAt: Date;
  updatedBy?: string;

  deleteAt?: Date | null;
  deleteBy?: string | null;
}

export interface ApplicantExperienceForm {
  applicantId: string;

  companyName: string;
  role: string;
  startDate: Date;
  endDate?: Date | null;
  description?: string;
}
