import api from "./axios";

export interface CategoryData {
  _id: string;
  name: string;
  code?: string;
  status?: string;
  icon?: string;
  [key: string]: any;
}

export interface SubCategoryData {
  _id: string;
  name: string;
  categoryId?: string | { _id: string; name: string };
  code?: string;
  status?: string;
  icon?: string;
  [key: string]: any;
}

export const fetchJobCategories = async (): Promise<CategoryData[]> => {
  try {
    const response = await api.get("/job-categories");
    return response.data?.jobCategories || response.data?.categories || [];
  } catch (error) {
    console.error("Error fetching job categories:", error);
    return [];
  }
};

export const fetchJobSubCategories = async (categoryId?: string): Promise<SubCategoryData[]> => {
  try {
    const response = await api.get("/job-sub-categories");
    const list: SubCategoryData[] = response.data?.jobSubCategories || response.data?.subCategories || [];
    if (categoryId && categoryId !== "all") {
      return list.filter((sub) => {
        if (!sub.categoryId) return false;
        if (typeof sub.categoryId === "string") return sub.categoryId === categoryId;
        return sub.categoryId._id === categoryId;
      });
    }
    return list;
  } catch (error) {
    console.error("Error fetching job sub-categories:", error);
    return [];
  }
};
