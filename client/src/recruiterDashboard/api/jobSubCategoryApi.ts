import type { JobSubCategory } from "../types/jobSubCategory.ts";
import { createCrudApi } from "./crudApi";

export const jobSubCategoryApi = createCrudApi<JobSubCategory>("/job-sub-categories");
