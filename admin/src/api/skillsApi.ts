import { Skills, SkillsForm } from "@/types/skills.js";

import axios from "axios";

const API_URL = "http://localhost:5000/api/skills";

// =====================================
// Get All
// =====================================

export const getSkills = async (): Promise<Skills[]> => {
  const response = await axios.get(API_URL);

  return response.data.skills;
};

// =====================================
// Get By ID
// =====================================

export const getSkillById = async (id: string): Promise<Skills> => {
  const response = await axios.get(`${API_URL}/${id}`);

  return response.data.skills;
};

// =====================================
// Create
// =====================================

export const createSkill = async (form: SkillsForm): Promise<Skills> => {
  const response = await axios.post(API_URL, form);

  return response.data.skills;
};

// =====================================
// Update
// =====================================

export const updateSkill = async (
  id: string,
  form: SkillsForm,
): Promise<Skills> => {
  const response = await axios.patch(`${API_URL}/${id}`, form);

  return response.data.skills;
};

// =====================================
// Delete
// =====================================

export const deleteSkill = async (id: string): Promise<Skills> => {
  const response = await axios.delete(`${API_URL}/${id}`);

  return response.data.skills;
};
