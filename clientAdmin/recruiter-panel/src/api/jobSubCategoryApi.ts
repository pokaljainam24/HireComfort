import { createCrudApi } from "./crudApi";
import { JobSubCategory } from "@/types/jobSubCategory";

export const jobSubCategoryApi = createCrudApi<JobSubCategory>("/job-sub-categories");
