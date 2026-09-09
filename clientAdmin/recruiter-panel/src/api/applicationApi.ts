import http from "./http";
import { Application, ApplicationStatus } from "@/types/application";

// Applications across every job posted by the logged-in recruiter.
export const applicationApi = {
  getAll: async (): Promise<Application[]> => {
    const { data } = await http.get<Application[]>("/recruiter/applications");
    return data;
  },
  getOne: async (id: string): Promise<Application> => {
    const { data } = await http.get<Application>(`/recruiter/applications/${id}`);
    return data;
  },
  updateStatus: async (id: string, status: ApplicationStatus): Promise<Application> => {
    const { data } = await http.put<Application>(`/recruiter/applications/${id}/status`, { status });
    return data;
  },
};
