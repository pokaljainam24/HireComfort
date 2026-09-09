import type { JobCategory } from "../types/jobCategory.ts";
import { createCrudApi } from "./crudApi";

export const jobCategoryApi = createCrudApi<JobCategory>("/job-categories");
