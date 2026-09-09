import http from "./http";
import { CompanyProfile } from "@/types/companyProfile";

export const companyProfileApi = {
  get: async (): Promise<CompanyProfile> => {
    const { data } = await http.get<CompanyProfile>("/recruiter/company-profile");
    return data;
  },
  update: async (payload: Partial<CompanyProfile>): Promise<CompanyProfile> => {
    const { data } = await http.put<CompanyProfile>("/recruiter/company-profile", payload);
    return data;
  },
};
