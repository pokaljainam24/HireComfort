import axios from "axios";

import type { State, StateForm } from "@/types/state";

const API_URL = "http://localhost:5000/api/states";

// =====================================
// Get All
// =====================================

export const getStates = async (): Promise<State[]> => {
  const response = await axios.get(API_URL);

  return response.data.states;
};

// =====================================
// Get By ID
// =====================================

export const getStateById = async (
  id: number,
): Promise<State> => {
  const response = await axios.get(`${API_URL}/${id}`);

  return response.data.state;
};

// =====================================
// Get By Country ID
// =====================================

export const getStatesByCountryId = async (
  countryId: number,
): Promise<State[]> => {
  const response = await axios.get(
    `${API_URL}/country/${countryId}`,
  );

  return response.data.states;
};

// =====================================
// Create
// =====================================

export const createState = async (
  form: StateForm,
): Promise<State> => {
  const response = await axios.post(API_URL, form);

  return response.data.state;
};

// =====================================
// Update
// =====================================

export const updateState = async (
  id: number,
  form: StateForm,
): Promise<State> => {
  const response = await axios.patch(`${API_URL}/${id}`, form);

  return response.data.state;
};

// =====================================
// Delete
// =====================================

export const deleteState = async (
  id: number,
): Promise<State> => {
  const response = await axios.delete(`${API_URL}/${id}`);

  return response.data.state;
};