import { createCrudApi } from "./crudApi";
import { Job } from "@/types/job";

// Scoped to the logged-in recruiter on the server side (via the JWT).
export const jobApi = createCrudApi<Job>("/recruiter/jobs");
