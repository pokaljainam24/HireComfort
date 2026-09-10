import type { Request, Response } from "express";

import {
  createJobCategoryService,
  getJobCategoryService,
  getJobCategoryByIdService,
  updateJobCategoryService,
  deleteJobCategoryService,
} from "../../services/JobCategoryServices/jobCategoryService.js";

// =====================================
// Create Job Category
// =====================================

export const createJobCategory = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const icon = req.file
      ? `/uploads/job-categories/${req.file.filename}`
      : "";

    const jobCategory = await createJobCategoryService({
      ...req.body,
      icon,
      createdBy: req.user.username,
    });

    return res.status(201).json({
      message: "Job category created successfully",
      jobCategory,
    });
  } catch (error: any) {
    console.error("Create Job Category Controller Error:", error);

    return res.status(500).json({
      message: error.message || "Failed to create job category",
    });
  }
};

// =====================================
// Get Job Categories
// =====================================

export const getJobCategories = async (req: Request, res: Response) => {
  try {
    const jobCategories = await getJobCategoryService();

    return res.status(200).json({
      jobCategories,
    });
  } catch (error: any) {
    console.error("Get Job Categories Controller Error:", error);

    return res.status(500).json({
      message: error.message || "Failed to get job categories",
    });
  }
};

// =====================================
// Get Job Category By ID
// =====================================

export const getJobCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      return res.status(400).json({
        message: "Invalid job category ID",
      });
    }

    const jobCategory = await getJobCategoryByIdService(id);

    if (!jobCategory) {
      return res.status(404).json({
        message: "Job category not found",
      });
    }

    return res.status(200).json({
      jobCategory,
    });
  } catch (error: any) {
    console.error("Get Job Category By ID Controller Error:", error);

    return res.status(500).json({
      message: error.message || "Failed to get job category",
    });
  }
};

// =====================================
// Update Job Category
// =====================================

export const updateJobCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      return res.status(400).json({
        message: "Invalid job category ID",
      });
    }

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const icon = req.file
      ? `/uploads/job-categories/${req.file.filename}`
      : undefined;

    const jobCategory = await updateJobCategoryService(id, {
      ...req.body,

      ...(icon !== undefined && {
        icon,
      }),

      updatedBy: req.user.username,
    });

    if (!jobCategory) {
      return res.status(404).json({
        message: "Job category not found",
      });
    }

    return res.status(200).json({
      message: "Job category updated successfully",
      jobCategory,
    });
  } catch (error: any) {
    console.error("Update Job Category Controller Error:", error);

    return res.status(500).json({
      message: error.message || "Failed to update job category",
    });
  }
};

// =====================================
// Delete Job Category
// =====================================

export const deleteJobCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      return res.status(400).json({
        message: "Invalid job category ID",
      });
    }

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const deleteBy = req.user.username;

    const jobCategory = await deleteJobCategoryService(id, deleteBy);

    if (!jobCategory) {
      return res.status(404).json({
        message: "Job category not found",
      });
    }

    return res.status(200).json({
      message: "Job category deleted successfully",
      jobCategory,
    });
  } catch (error: any) {
    console.error("Delete Job Category Controller Error:", error);

    return res.status(500).json({
      message: error.message || "Failed to delete job category",
    });
  }
};