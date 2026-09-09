import type { RecruiterProfileType } from "../types/recruiterProfile.ts";
import http from "./http";

export const recruiterProfileApi = {
  get: async (): Promise<RecruiterProfileType> => {
    const { data } = await http.get<RecruiterProfileType>("/recruiter/profile");
    return data;
  },
  update: async (payload: Partial<RecruiterProfileType>): Promise<RecruiterProfileType> => {
    const { data } = await http.put<RecruiterProfileType>("/recruiter/profile", payload);
    return data;
  },
};
