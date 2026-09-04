import type { Request, Response } from "express";

import {
  createQualificationService,
  getQualificationService,
  getQualificationByIdService,
  updateQualificationService,
  deleteQualificationService,
} from "../../services/QualificationServices/qualificationServices.js";

// =====================================
// Create Qualification
// =====================================

export const createQualification = async (req: Request, res: Response) => {
  try {
    const qualification = await createQualificationService({
      ...req.body,
      createdBy: "admin",
    });

    return res.status(201).json({
      message: "Qualification created successfully",
      qualification,
    });
  } catch (error) {
    console.error("Error creating qualification:", error);

    return res.status(500).json({
      message: "Error creating qualification",
    });
  }
};

// =====================================
// Get All Qualification
// =====================================

export const getQualifications = async (req: Request, res: Response) => {
  try {
    const qualifications = await getQualificationService();

    return res.status(200).json({
      qualifications,
    });
  } catch (error) {
    console.error("Error getting qualifications:", error);

    return res.status(500).json({
      message: "Error getting qualifications",
    });
  }
};

// =====================================
// Get Qualification By ID
// =====================================

export const getQualification = async (req: Request, res: Response) => {
  try {
    const qualificationId = req.params.id;

    if (typeof qualificationId !== "string") {
      return res.status(400).json({
        message: "Invalid qualification ID",
      });
    }

    const qualification = await getQualificationByIdService(qualificationId);

    if (!qualification) {
      return res.status(404).json({
        message: "Qualification not found",
      });
    }

    return res.status(200).json({
      qualification,
    });
  } catch (error) {
    console.error("Error getting qualification:", error);

    return res.status(500).json({
      message: "Error getting qualification",
    });
  }
};

// =====================================
// Update Qualification
// =====================================

export const updateQualification = async (req: Request, res: Response) => {
  try {
    const qualificationId = req.params.id;

    if (typeof qualificationId !== "string") {
      return res.status(400).json({
        message: "Invalid qualification ID",
      });
    }

    const qualification = await updateQualificationService(qualificationId, {
      ...req.body,
      updatedBy: "admin",
    });

    if (!qualification) {
      return res.status(404).json({
        message: "Qualification not found",
      });
    }

    return res.status(200).json({
      message: "Qualification updated successfully",
      qualification,
    });
  } catch (error) {
    console.error("Error updating qualification:", error);

    return res.status(500).json({
      message: "Error updating qualification",
    });
  }
};

// =====================================
// Delete Qualification
// =====================================

export const deleteQualification = async (req: Request, res: Response) => {
  try {
    const qualificationId = req.params.id;

    if (typeof qualificationId !== "string") {
      return res.status(400).json({
        message: "Invalid qualification ID",
      });
    }

    const deleteBy = "admin";

    const qualification = await deleteQualificationService(
      qualificationId,
      deleteBy,
    );

    if (!qualification) {
      return res.status(404).json({
        message: "Qualification not found",
      });
    }

    return res.status(200).json({
      message: "Qualification deleted successfully",
      qualification,
    });
  } catch (error) {
    console.error("Error deleting qualification:", error);

    return res.status(500).json({
      message: "Error deleting qualification",
    });
  }
};
