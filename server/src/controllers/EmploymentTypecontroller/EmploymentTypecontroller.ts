import type { Request, Response } from "express";

import {
  createEmploymentTypeService,
  getEmploymentTypesService,
  getEmploymentTypeByIdService,
  updateEmploymentTypeService,
  deleteEmploymentTypeService,
} from "../../services/EmploymentTypeService/EmploymentTypeService.js";

// =====================================
// Create
// =====================================

export const createEmploymentType = async (
  req: Request,
  res: Response,
) => {
  try {
    const employmentType =
      await createEmploymentTypeService({
        ...req.body,
        createdBy: "admin",
      });

    return res.status(201).json({
      message: "Employment type created successfully",
      employmentType,
    });
  } catch (error) {
    console.error(
      "Error creating employment type:",
      error,
    );

    return res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Error creating employment type",
    });
  }
};

// =====================================
// Get All
// =====================================

export const getEmploymentTypes = async (
  req: Request,
  res: Response,
) => {
  try {
    const employmentTypes =
      await getEmploymentTypesService();

    return res.status(200).json({
      employmentTypes,
    });
  } catch (error) {
    console.error(
      "Error getting employment types:",
      error,
    );

    return res.status(500).json({
      message: "Error getting employment types",
    });
  }
};

// =====================================
// Get By ID
// =====================================

export const getEmploymentType = async (
  req: Request,
  res: Response,
) => {
  try {
    const employmentTypeId = req.params.id;

    if (typeof employmentTypeId !== "string") {
      return res.status(400).json({
        message: "Invalid employment type ID",
      });
    }

    const employmentType =
      await getEmploymentTypeByIdService(
        employmentTypeId,
      );

    if (!employmentType) {
      return res.status(404).json({
        message: "Employment type not found",
      });
    }

    return res.status(200).json({
      employmentType,
    });
  } catch (error) {
    console.error(
      "Error getting employment type:",
      error,
    );

    return res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Error getting employment type",
    });
  }
};

// =====================================
// Update
// =====================================

export const updateEmploymentType = async (
  req: Request,
  res: Response,
) => {
  try {
    const employmentTypeId = req.params.id;

    if (typeof employmentTypeId !== "string") {
      return res.status(400).json({
        message: "Invalid employment type ID",
      });
    }

    const employmentType =
      await updateEmploymentTypeService(
        employmentTypeId,
        {
          ...req.body,
          updatedBy: "admin",
        },
      );

    if (!employmentType) {
      return res.status(404).json({
        message: "Employment type not found",
      });
    }

    return res.status(200).json({
      message: "Employment type updated successfully",
      employmentType,
    });
  } catch (error) {
    console.error(
      "Error updating employment type:",
      error,
    );

    return res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Error updating employment type",
    });
  }
};

// =====================================
// Delete
// =====================================

export const deleteEmploymentType = async (
  req: Request,
  res: Response,
) => {
  try {
    const employmentTypeId = req.params.id;

    if (typeof employmentTypeId !== "string") {
      return res.status(400).json({
        message: "Invalid employment type ID",
      });
    }

    const employmentType =
      await deleteEmploymentTypeService(
        employmentTypeId,
        "admin",
      );

    if (!employmentType) {
      return res.status(404).json({
        message: "Employment type not found",
      });
    }

    return res.status(200).json({
      message: "Employment type deleted successfully",
      employmentType,
    });
  } catch (error) {
    console.error(
      "Error deleting employment type:",
      error,
    );

    return res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Error deleting employment type",
    });
  }
};