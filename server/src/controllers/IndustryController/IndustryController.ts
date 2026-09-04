import type { Request, Response } from "express";

import {
  createIndustryService,
  getIndustriesService,
  getIndustryByIdService,
  updateIndustryService,
  deleteIndustryService,
} from "../../services/IndustryService/IndustryService.js";

// =====================================
// Create
// =====================================

export const createIndustry = async (req: Request, res: Response) => {
  try {
    const industry = await createIndustryService({
      ...req.body,
      createdBy: "admin",
    });

    return res.status(201).json({
      message: "Industry created successfully",
      industry,
    });
  } catch (error) {
    console.error("Error creating industry:", error);

    return res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Error creating industry",
    });
  }
};

// =====================================
// Get All
// =====================================

export const getIndustries = async (req: Request, res: Response) => {
  try {
    const industries = await getIndustriesService();

    return res.status(200).json({
      industries,
    });
  } catch (error) {
    console.error("Error getting industries:", error);

    return res.status(500).json({
      message: "Error getting industries",
    });
  }
};

// =====================================
// Get By ID
// =====================================

export const getIndustry = async (req: Request, res: Response) => {
  try {
    const industryId = req.params.id;

    if (typeof industryId !== "string") {
      return res.status(400).json({
        message: "Invalid industry ID",
      });
    }

    const industry = await getIndustryByIdService(industryId);

    if (!industry) {
      return res.status(404).json({
        message: "Industry not found",
      });
    }

    return res.status(200).json({
      industry,
    });
  } catch (error) {
    console.error("Error getting industry:", error);

    return res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Error getting industry",
    });
  }
};

// =====================================
// Update
// =====================================

export const updateIndustry = async (req: Request, res: Response) => {
  try {
    const industryId = req.params.id;

    if (typeof industryId !== "string") {
      return res.status(400).json({
        message: "Invalid industry ID",
      });
    }

    const industry = await updateIndustryService(industryId, {
      ...req.body,
      updatedBy: "admin",
    });

    if (!industry) {
      return res.status(404).json({
        message: "Industry not found",
      });
    }

    return res.status(200).json({
      message: "Industry updated successfully",
      industry,
    });
  } catch (error) {
    console.error("Error updating industry:", error);

    return res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Error updating industry",
    });
  }
};

// =====================================
// Delete
// =====================================

export const deleteIndustry = async (req: Request, res: Response) => {
  try {
    const industryId = req.params.id;

    if (typeof industryId !== "string") {
      return res.status(400).json({
        message: "Invalid industry ID",
      });
    }

    const industry = await deleteIndustryService(
      industryId,
      "admin",
    );

    if (!industry) {
      return res.status(404).json({
        message: "Industry not found",
      });
    }

    return res.status(200).json({
      message: "Industry deleted successfully",
      industry,
    });
  } catch (error) {
    console.error("Error deleting industry:", error);

    return res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Error deleting industry",
    });
  }
};