import type { Job } from "../types/job.ts";
import { createCrudApi } from "./crudApi";

// Scoped to the logged-in recruiter on the server side (via the JWT).
export const jobApi = createCrudApi<Job>("/recruiter/jobs");
