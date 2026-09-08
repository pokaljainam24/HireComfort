
import api from "../axios";

// =====================================
// VISITOR TRACKING
// =====================================

export const trackVisitorApi = async () => {
  try {
    const response = await api.post("/visitor/track");

    return response.data;
  } catch (error) {
    console.error("Visitor Tracking API Error:", error);
    throw error;
  }
};
