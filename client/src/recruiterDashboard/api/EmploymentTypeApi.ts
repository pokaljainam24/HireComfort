import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

const http = axios.create({
  baseURL: API_BASE_URL,
});

export const getEmploymentTypes = async () => {
  try {
    const response = await http.get(
      "/employment-types"
    );

    console.log(
      "Employment Types API Response:",
      response.data
    );

    // YOUR BACKEND RETURNS:
    // {
    //   employmentTypes: [...]
    // }

    return response.data.employmentTypes || [];

  } catch (error) {
    console.error(
      "Error fetching employment types:",
      error
    );

    return [];
  }
};