import type { Job } from "../types/job.ts";
import http from "./http.ts";

const API_URL = "http://localhost:5000/api/job_master";

export interface GetJobsQuery {
    page?: number;
    limit?: number;
    search?: string;
    categoryId?: string;
    jobType?: string;
    sort?: "newest" | "oldest";
}

export interface JobsResponse {
    jobs: Job[];
    totalJobs: number;
    totalPages: number;
    currentPage: number;
    limit: number;
}

export const jobApi = {
    getAll: async (params?: GetJobsQuery): Promise<JobsResponse> => {
        const response = await http.get(API_URL, { params });
        // Handle backward compatibility if response.data only returns { jobs }
        if (Array.isArray(response.data.jobs) && response.data.totalJobs === undefined) {
            return {
                jobs: response.data.jobs,
                totalJobs: response.data.jobs.length,
                totalPages: 1,
                currentPage: 1,
                limit: response.data.jobs.length,
            };
        }
        return response.data;
    },
    getAllJobsByRecruiter: async (params?: GetJobsQuery): Promise<JobsResponse> => {
        const response = await http.get(`${API_URL}/recruiter`, { params });       
        return response.data;
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
