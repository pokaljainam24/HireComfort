export interface EmploymentType {
  EmploymentTypeId: number;
  EmploymentName: string;
  EmploymentType: string;

  // Status
  isActive: boolean;
  isDisplay: boolean;

  // Audit
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string | null;

  // Soft delete
  deleteAt: Date | null;
  deleteBy: string | null;
}
export interface EmploymentTypeForm {
  EmploymentName: string;
  EmploymentType: string;
}