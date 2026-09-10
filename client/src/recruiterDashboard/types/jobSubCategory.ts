export interface JobSubCategory {
  _id: string;
  categoryId: string;
  name: string;
  description: string;
  icon: string;
}

export interface JobSubCategoryForm {
  categoryId: string;
  name: string;
  description: string;
  icon: File | null;
}