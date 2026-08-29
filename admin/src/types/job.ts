export type Category = {
  _id: string;
  name: string;
  description?: string;
  icon?: string;
  isActive?: boolean;
};

export type SubCategory = {
  _id: string;
  name: string;
  description?: string;
  icon?: string;
  categoryId: string;
  isActive?: boolean;
};

export type CategoryFormState = {
  name: string;
  description: string;
  icon?: string;
};

export type SubCategoryFormState = CategoryFormState & {
  categoryName?: string;
};
