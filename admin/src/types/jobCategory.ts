export interface JobCategory {
  _id: string;

  name: string;
  description: string;
  icon: string;

  isActive: boolean;
  isDisplay: boolean;

  createdAt: string;
  createdBy: string;

  updatedAt: string;
  updatedBy: string | null;

  deleteAt: string | null;
  deleteBy: string | null;
}

export interface JobCategoryForm {
  name: string;
  description: string;
  icon: string;
}
