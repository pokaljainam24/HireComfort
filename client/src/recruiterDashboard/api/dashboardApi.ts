import type { AnalyticsData } from "../types/dashboardAnalytics.ts";
import http from "./http.ts";

const API_URL = "http://localhost:5000/api/recruiters/analytics";

export const dashboardApi = {
    getAnalytics: async (): Promise<AnalyticsData> => {
        const response = await http.get(API_URL);
        return response.data.analytics;
    }
};
