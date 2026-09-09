import { createCrudApi } from "./crudApi";
import { JobCategory } from "@/types/jobCategory";

export const jobCategoryApi = createCrudApi<JobCategory>("/job-categories");
