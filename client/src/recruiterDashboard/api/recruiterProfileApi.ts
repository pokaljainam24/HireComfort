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
  updatePassword: async (
    id: string,
    payload: { currentPassword: string; password: string; confirmPassword: string }
  ): Promise<{ message: string; recruiter: RecruiterProfileType }> => {
    const { data } = await http.patch<{ message: string; recruiter: RecruiterProfileType }>(
      "/recruiters/" + id + "/update-password",
      payload
    );
    return data;
  },
};

