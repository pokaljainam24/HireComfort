export interface Industry {
  IndustryId: number;
  IndustryName: string;

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

export interface IndustryForm {
  IndustryName: string;
}