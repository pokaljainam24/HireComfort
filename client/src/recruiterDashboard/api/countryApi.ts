import type { Country } from "../types/country.ts";
import http from "./http.ts";

interface CountryForm { }

const API_URL = "http://localhost:5000/api/countries";

// =====================================
// Get All
// =====================================

export const getCountries = async (): Promise<Country[]> => {
    const response = await http.get(API_URL);

    return response.data.countries;
};

// =====================================
// Get By ID
// =====================================

export const getCountryById = async (
    id: number,
): Promise<Country> => {
    const response = await http.get(`${API_URL}/${id}`);

    return response.data.country;
};

// =====================================
// Create
// =====================================

export const createCountry = async (
    form: CountryForm,
): Promise<Country> => {
    const response = await http.post(API_URL, form);

    return response.data.country;
};

// =====================================
// Update
// =====================================

export const updateCountry = async (
    id: number,
    form: CountryForm,
): Promise<Country> => {
    const response = await http.patch(`${API_URL}/${id}`, form);

    return response.data.country;
};

// =====================================
// Delete
// =====================================

export const deleteCountry = async (
    id: number,
): Promise<Country> => {
    const response = await http.delete(`${API_URL}/${id}`);

    return response.data.country;
};