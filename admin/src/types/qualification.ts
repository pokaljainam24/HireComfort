export interface Qualification {
  _id: string;

  qualificationTest: string;

  // Status
  isActive: boolean;
  isDisplay: boolean;

  // Audit
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string | null;

  // Soft Delete
  deleteAt: string | null;
  deleteBy: string | null;
}

export interface QualificationForm {
  qualificationTest: string;
}
