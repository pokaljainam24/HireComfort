import type { CompanyProfileType } from "../types/companyProfile.ts";
import http from "./http";

export const companyProfileApi = {
  get: async (recruiterId: string): Promise<CompanyProfileType | null> => {
    try {
      const { data } = await http.get<{ company: CompanyProfileType }>("/companies/recruiter/" + recruiterId);
      const c: any = data.company;
      if (!c) return null;
      return {
        ...c,
        countryId: c.country !== undefined && c.country !== null ? String(c.country) : c.countryId || "",
        stateId: c.state !== undefined && c.state !== null ? String(c.state) : c.stateId || "",
        cityId: c.city !== undefined && c.city !== null ? String(c.city) : c.cityId || "",
        aboutCompany: c.aboutCompany || c.about || "",
        companyType: c.companyType || c.industry || "",
        numberOfEmployee: c.numberOfEmployee || c.companySize || "",
      };
    } catch {
      return null;
    }
  },
  save: async (recruiterId: string, companyId: string | undefined, payload: Partial<CompanyProfileType>): Promise<CompanyProfileType> => {
    const body = {
      ...payload,
      recruiterId,
      country: Number(payload.countryId) || 0,
      state: Number(payload.stateId) || 0,
      city: Number(payload.cityId) || 0,
    };
    if (companyId) {
      const { data } = await http.patch<{ company: CompanyProfileType }>("/companies/" + companyId, body);
      return data.company;
    } else {
      const { data } = await http.post<{ company: CompanyProfileType }>("/companies", body);
      return data.company;
    }
  },
};
