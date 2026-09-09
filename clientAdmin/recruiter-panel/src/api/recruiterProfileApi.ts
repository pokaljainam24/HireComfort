import http from "./http";
import { RecruiterProfile } from "@/types/recruiterProfile";

export const recruiterProfileApi = {
  get: async (): Promise<RecruiterProfile> => {
    const { data } = await http.get<RecruiterProfile>("/recruiter/profile");
    return data;
  },
  update: async (payload: Partial<RecruiterProfile>): Promise<RecruiterProfile> => {
    const { data } = await http.put<RecruiterProfile>("/recruiter/profile", payload);
    return data;
  },
};
