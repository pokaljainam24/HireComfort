import type { CompanyProfileType } from "../types/companyProfile.ts";
import http from "./http";

export const companyProfileApi = {
  get: async (): Promise<CompanyProfileType> => {
    const { data } = await http.get<CompanyProfileType>("/recruiter/company-profile");
    return data;
  },
  update: async (payload: Partial<CompanyProfileType>): Promise<CompanyProfileType> => {
    const { data } = await http.put<CompanyProfileType>("/recruiter/company-profile", payload);
    return data;
  },
};
