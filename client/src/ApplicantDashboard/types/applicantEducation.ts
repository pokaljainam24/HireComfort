
export interface ApplicantEducationType {
  _id: string;

  applicantId: string;

  education: string;
  passingYear: number;
  percentageOrCGPA: number;

  isActive: boolean;

  createdAt: Date;
  createdBy?: string;

  updatedAt: Date;
  updatedBy?: string;

  deleteAt?: Date | null;
  deleteBy?: string | null;
}

export interface ApplicantEducationForm {
  applicantId: string;

  education: string;
  passingYear: number;
  percentageOrCGPA: number;

  isActive?: boolean;

  createdBy?: string;
  updatedBy?: string;
}
