import axios from "axios";

import type {
  Skills,
  CreateSkillsRequest,
  UpdateSkillsRequest,
} from "../../recruiterDashboard/types/skills.ts";

const API_URL = "http://localhost:5000/api/skills";

// =====================================
// Get All Skills
// =====================================

export const getSkills = async (): Promise<Skills[]> => {
  const response = await axios.get(API_URL);

  return response.data.skills;
};

// =====================================
// Get Skill By ID
// =====================================

export const getSkillById = async (
  id: string,
): Promise<Skills> => {
  const response = await axios.get(
    `${API_URL}/${id}`,
  );

  return response.data.skills;
};

// =====================================
// Create Skills
// =====================================

export const createSkills = async (
  data: CreateSkillsRequest,
): Promise<Skills> => {
  const response = await axios.post(
    API_URL,
    data,
  );

  return response.data.skills;
};

// =====================================
// Update Skills
// =====================================

export const updateSkills = async (
  id: string,
  data: UpdateSkillsRequest,
): Promise<Skills> => {
  const response = await axios.patch(
    `${API_URL}/${id}`,
    data,
  );

  return response.data.skills;
};

// =====================================
// Delete Skills
// =====================================

export const deleteSkills = async (
  id: string,
): Promise<Skills> => {
  const response = await axios.delete(
    `${API_URL}/${id}`,
  );

  return response.data.skills;
};