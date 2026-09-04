// types/jobSubCategory.ts

export interface JobSubCategory {
  _id: string;
  categoryId: string;
  name: string;
  description: string;
  icon: string;

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

export interface JobSubCategoryForm {
  categoryId: string;
  name: string;
  description: string;
  icon: File | null;
}
