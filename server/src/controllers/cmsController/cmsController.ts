import type { Request, Response } from "express";

import {
  createCmsService,
  getCmsService,
  getCmsByIdService,
  updateCmsService,
  deleteCmsService,
} from "../../services/cmsServices/cmsService.js";

// =====================================
// Create CMS
// =====================================

export const createCms = async (req: Request, res: Response) => {
  try {
    const cms = await createCmsService({
      ...req.body,
      createdBy: "admin",
    });

    return res.status(201).json({
      message: "CMS created successfully",
      cms,
    });
  } catch (error: any) {
    console.error("Create CMS Controller Error:", error);

    return res.status(500).json({
      message: error.message || "Failed to create CMS",
    });
  }
};

// =====================================
// Get CMS
// =====================================

export const getCms = async (req: Request, res: Response) => {
  try {
    const cms = await getCmsService();

    return res.status(200).json({
      cms,
    });
  } catch (error: any) {
    console.error("Get CMS Controller Error:", error);

    return res.status(500).json({
      message: error.message || "Failed to get CMS",
    });
  }
};

// =====================================
// Get CMS By ID
// =====================================

export const getCmsById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      return res.status(400).json({
        message: "Invalid CMS ID",
      });
    }

    const cms = await getCmsByIdService(id);

    if (!cms) {
      return res.status(404).json({
        message: "CMS not found",
      });
    }

    return res.status(200).json({
      cms,
    });
  } catch (error: any) {
    console.error("Get CMS By ID Controller Error:", error);

    return res.status(500).json({
      message: error.message || "Failed to get CMS",
    });
  }
};

// =====================================
// Update CMS
// =====================================

export const updateCms = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      return res.status(400).json({
        message: "Invalid CMS ID",
      });
    }

    const cms = await updateCmsService(id, {
      ...req.body,
      updatedBy: "admin",
    });

    if (!cms) {
      return res.status(404).json({
        message: "CMS not found",
      });
    }

    return res.status(200).json({
      message: "CMS updated successfully",
      cms,
    });
  } catch (error: any) {
    console.error("Update CMS Controller Error:", error);

    return res.status(500).json({
      message: error.message || "Failed to update CMS",
    });
  }
};

// =====================================
// Delete CMS
// =====================================

export const deleteCms = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      return res.status(400).json({
        message: "Invalid CMS ID",
      });
    }

    const cms = await deleteCmsService(id, "admin");

    if (!cms) {
      return res.status(404).json({
        message: "CMS not found",
      });
    }

    return res.status(200).json({
      message: "CMS deleted successfully",
      cms,
    });
  } catch (error: any) {
    console.error("Delete CMS Controller Error:", error);

    return res.status(500).json({
      message: error.message || "Failed to delete CMS",
    });
  }
};
