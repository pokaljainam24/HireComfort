import axios from "axios";
import type { Qualification } from "../../recruiterDashboard/types/qualification.ts";

const API_URL = "http://localhost:5000/api/qualifications";

// =====================================
// Get All Qualifications
// =====================================

export const getQualifications =
  async (): Promise<Qualification[]> => {
    const response = await axios.get(API_URL);

    return response.data.qualifications;
  };

// =====================================
// Get Qualification By ID
// =====================================

export const getQualificationById = async (
  id: string,
): Promise<Qualification> => {
  const response = await axios.get(
    `${API_URL}/${id}`,
  );

  return response.data.qualification;
};

// =====================================
// Create Qualification
// =====================================

export const createQualification = async (data: {
  qualificationId: string;
  code: string;
  name: string;
  degreeLevel: string;
  specializationAllowed: boolean;
}): Promise<Qualification> => {
  const response = await axios.post(
    API_URL,
    data,
  );

  return response.data.qualification;
};

// =====================================
// Update Qualification
// =====================================

export const updateQualification = async (
  id: string,
  data: {
    qualificationId?: string;
    code?: string;
    name?: string;
    degreeLevel?: string;
    specializationAllowed?: boolean;
    isActive?: boolean;
    isDisplay?: boolean;
  },
): Promise<Qualification> => {
  const response = await axios.patch(
    `${API_URL}/${id}`,
    data,
  );

  return response.data.qualification;
};

// =====================================
// Delete Qualification
// =====================================

export const deleteQualification = async (
  id: string,
): Promise<Qualification> => {
  const response = await axios.delete(
    `${API_URL}/${id}`,
  );

  return response.data.qualification;
};