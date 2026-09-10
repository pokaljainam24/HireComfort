import type { RecruiterProfileType, RecruiterResponse } from "../types/recruiterProfile.ts";
import http from "./http";



export const recruiterProfileApi = {
  get: async (id: string): Promise<RecruiterProfileType> => {
    const { data: { recruiter } } = await http.get<RecruiterResponse>("/recruiters/" + id);
    return recruiter;
  },
  update: async (id: string, payload: Partial<RecruiterProfileType>): Promise<RecruiterProfileType> => {
    const { data: { recruiter } } = await http.patch<RecruiterResponse>("/recruiters/" + id, payload);
    return recruiter;
  },
};
