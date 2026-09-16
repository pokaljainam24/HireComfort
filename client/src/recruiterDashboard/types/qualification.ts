export interface Qualification {
  _id: string;

  qualificationId: string;
  code: string;
  name: string;
  degreeLevel: string;
  specializationAllowed: boolean;

  // Status
  isActive: boolean;
  isDisplay: boolean;

  // Audit
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string | null;

  // Soft Delete
  deleteAt?: string | null;
  deleteBy?: string | null;
}