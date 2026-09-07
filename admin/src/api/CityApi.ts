import axios from "axios";

import type { City, CityForm } from "@/types/city";

const API_URL = "http://localhost:5000/api/cities";

// =====================================
// Get All
// =====================================

export const getCities = async (): Promise<City[]> => {
  const response = await axios.get(API_URL);

  return response.data.cities;
};

// =====================================
// Get By ID
// =====================================

export const getCityById = async (
  id: number,
): Promise<City> => {
  const response = await axios.get(`${API_URL}/${id}`);

  return response.data.city;
};

// =====================================
// Get By State ID
// =====================================

export const getCitiesByStateId = async (
  stateId: number,
): Promise<City[]> => {
  const response = await axios.get(
    `${API_URL}/state/${stateId}`,
  );

  return response.data.cities;
};

// =====================================
// Create
// =====================================

export const createCity = async (
  form: CityForm,
): Promise<City> => {
  const response = await axios.post(API_URL, form);

  return response.data.city;
};

// =====================================
// Update
// =====================================

export const updateCity = async (
  id: number,
  form: CityForm,
): Promise<City> => {
  const response = await axios.patch(`${API_URL}/${id}`, form);

  return response.data.city;
};

// =====================================
// Delete
// =====================================

export const deleteCity = async (
  id: number,
): Promise<City> => {
  const response = await axios.delete(`${API_URL}/${id}`);

  return response.data.city;
};