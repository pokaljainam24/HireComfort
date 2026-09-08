import axios from "axios";

const API_URL = "http://localhost:5000/api/visitor";

// =====================================
// Get Visitor Count
// =====================================

export const getVisitorCount = async (): Promise<number> => {
  const response = await axios.get(`${API_URL}/count`);

  return response.data.count;
};