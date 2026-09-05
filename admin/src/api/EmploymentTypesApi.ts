import axios from "axios";

import type {
    EmploymentType,
    EmploymentTypeForm,
} from "@/types/EmploymentTypes";

const API_URL =
    "http://localhost:5000/api/employment-types";

// =====================================
// Get All Employment Types
// =====================================

export const getEmploymentTypes =
    async (): Promise<EmploymentType[]> => {
        const response =
            await axios.get(API_URL);

        return response.data.employmentTypes;
    };

// =====================================
// Get Employment Type By ID
// =====================================

export const getEmploymentTypeById =
    async (
        id: number,
    ): Promise<EmploymentType> => {
        const response =
            await axios.get(
                `${API_URL}/${id}`,
            );

        return response.data.employmentType;
    };

// =====================================
// Create Employment Type
// =====================================

export const createEmploymentType =
    async (
        form: EmploymentTypeForm,
    ): Promise<EmploymentType> => {
        const response =
            await axios.post(
                API_URL,
                form,
            );

        return response.data.employmentType;
    };

// =====================================
// Update Employment Type
// =====================================

export const updateEmploymentType =
    async (
        id: number,
        form: EmploymentTypeForm,
    ): Promise<EmploymentType> => {
        const response =
            await axios.put(
                `${API_URL}/${id}`,
                form,
            );

        return response.data.employmentType;
    };

// =====================================
// Delete Employment Type
// =====================================

export const deleteEmploymentType =
    async (
        id: number,
    ): Promise<EmploymentType> => {
        const response =
            await axios.delete(
                `${API_URL}/${id}`,
            );

        return response.data.employmentType;
    };

