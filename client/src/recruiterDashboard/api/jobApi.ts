import type { Job } from "../types/job.ts";
import http from "./http.ts";

const API_URL = "http://localhost:5000/api/job_master";

export const jobApi = {
    getAll: async (): Promise<Job[]> => {
        const response = await http.get(API_URL);
        return response.data.jobs;
    },
    getOne: async (id: string): Promise<Job> => {
        const response = await http.get(`${API_URL}/${id}`);
        return response.data.jobMaster;
    },
    create: async (form: Partial<Job>): Promise<Job> => {
        // Use the new recruiter-specific endpoint you added
        const response = await http.post(`${API_URL}/recruiter`, form);
        return response.data.jobMaster;
    },
    update: async (id: string, form: Partial<Job>): Promise<Job> => {
        const response = await http.patch(`${API_URL}/${id}`, form);
        return response.data.jobMaster;
    },
    remove: async (id: string): Promise<void> => {
        await http.delete(`${API_URL}/${id}`);
    },
    delete: async (id: string): Promise<Job> => {
        const response = await http.delete(`${API_URL}/${id}`);
        return response.data.jobMaster;
    }
};
