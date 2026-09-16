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

export const createQualification = async (
  req: Request,
  res: Response,
) => {
  try {
    const {
      qualificationId,
      code,
      name,
      degreeLevel,
      specializationAllowed,
    } = req.body;

    // ==============================
    // Required Field Validation
    // ==============================

    if (!qualificationId?.trim()) {
      return res.status(400).json({
        message: "Qualification ID is required",
      });
    }

    if (!code?.trim()) {
      return res.status(400).json({
        message: "Qualification code is required",
      });
    }

    if (!name?.trim()) {
      return res.status(400).json({
        message: "Qualification name is required",
      });
    }

    if (!degreeLevel?.trim()) {
      return res.status(400).json({
        message: "Degree level is required",
      });
    }

    // ==============================
    // Create
    // ==============================

    const qualification =
      await createQualificationService({
        qualificationId: qualificationId.trim(),
        code: code.trim().toUpperCase(),
        name: name.trim(),
        degreeLevel: degreeLevel.trim(),
        specializationAllowed:
          specializationAllowed ?? false,
        createdBy: "admin",
      });

    return res.status(201).json({
      message: "Qualification created successfully",
      qualification,
    });
  } catch (error: any) {
    console.error(
      "Error creating qualification:",
      error,
    );

    return res.status(500).json({
      message:
        error.message ||
        "Error creating qualification",
    });
  }
};

// =====================================
// Get All Qualification
// =====================================

export const getQualifications = async (
  req: Request,
  res: Response,
) => {
  try {
    const qualifications =
      await getQualificationService();

    return res.status(200).json({
      qualifications,
    });
  } catch (error: any) {
    console.error(
      "Error getting qualifications:",
      error,
    );

    return res.status(500).json({
      message:
        error.message ||
        "Error getting qualifications",
    });
  }
};

// =====================================
// Get Qualification By ID
// =====================================

export const getQualification = async (
  req: Request,
  res: Response,
) => {
  try {
    const qualificationId =
      String(req.params.id);

    if (!qualificationId) {
      return res.status(400).json({
        message: "Invalid qualification ID",
      });
    }

    const qualification =
      await getQualificationByIdService(
        qualificationId,
      );

    if (!qualification) {
      return res.status(404).json({
        message: "Qualification not found",
      });
    }

    return res.status(200).json({
      qualification,
    });
  } catch (error: any) {
    console.error(
      "Error getting qualification:",
      error,
    );

    return res.status(500).json({
      message:
        error.message ||
        "Error getting qualification",
    });
  }
};

// =====================================
// Update Qualification
// =====================================

export const updateQualification = async (
  req: Request,
  res: Response,
) => {
  try {
    const qualificationId =
      String(req.params.id);

    if (!qualificationId) {
      return res.status(400).json({
        message: "Invalid qualification ID",
      });
    }

    const {
      qualificationId: newQualificationId,
      code,
      name,
      degreeLevel,
      specializationAllowed,
      isActive,
      isDisplay,
    } = req.body;

    // ==============================
    // Validation
    // ==============================

    if (
      newQualificationId !== undefined &&
      !newQualificationId?.trim()
    ) {
      return res.status(400).json({
        message: "Qualification ID is required",
      });
    }

    if (
      code !== undefined &&
      !code?.trim()
    ) {
      return res.status(400).json({
        message: "Qualification code is required",
      });
    }

    if (
      name !== undefined &&
      !name?.trim()
    ) {
      return res.status(400).json({
        message: "Qualification name is required",
      });
    }

    if (
      degreeLevel !== undefined &&
      !degreeLevel?.trim()
    ) {
      return res.status(400).json({
        message: "Degree level is required",
      });
    }

    // ==============================
    // Build Update Data
    // ==============================

    const updateData: Record<string, any> = {};

    if (newQualificationId !== undefined) {
      updateData.qualificationId =
        newQualificationId.trim();
    }

    if (code !== undefined) {
      updateData.code =
        code.trim().toUpperCase();
    }

    if (name !== undefined) {
      updateData.name =
        name.trim();
    }

    if (degreeLevel !== undefined) {
      updateData.degreeLevel =
        degreeLevel.trim();
    }

    if (
      specializationAllowed !== undefined
    ) {
      updateData.specializationAllowed =
        Boolean(specializationAllowed);
    }

    if (isActive !== undefined) {
      updateData.isActive =
        Boolean(isActive);
    }

    if (isDisplay !== undefined) {
      updateData.isDisplay =
        Boolean(isDisplay);
    }

    updateData.updatedBy = "admin";

    // ==============================
    // Update
    // ==============================

    const qualification =
      await updateQualificationService(
        qualificationId,
        updateData,
      );

    if (!qualification) {
      return res.status(404).json({
        message: "Qualification not found",
      });
    }

    return res.status(200).json({
      message:
        "Qualification updated successfully",
      qualification,
    });
  } catch (error: any) {
    console.error(
      "Error updating qualification:",
      error,
    );

    return res.status(500).json({
      message:
        error.message ||
        "Error updating qualification",
    });
  }
};

// =====================================
// Delete Qualification
// =====================================

export const deleteQualification = async (
  req: Request,
  res: Response,
) => {
  try {
    const qualificationId =
      String(req.params.id);

    if (!qualificationId) {
      return res.status(400).json({
        message: "Invalid qualification ID",
      });
    }

    const deleteBy = "admin";

    const qualification =
      await deleteQualificationService(
        qualificationId,
        deleteBy,
      );

    if (!qualification) {
      return res.status(404).json({
        message: "Qualification not found",
      });
    }

    return res.status(200).json({
      message:
        "Qualification deleted successfully",
      qualification,
    });
  } catch (error: any) {
    console.error(
      "Error deleting qualification:",
      error,
    );

    return res.status(500).json({
      message:
        error.message ||
        "Error deleting qualification",
    });
  }
};