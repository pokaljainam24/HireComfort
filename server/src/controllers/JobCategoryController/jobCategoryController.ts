import type { Request, Response } from "express";

import {
  createJobCategoryService,
  getJobCategoryService,
  getJobCategoryByIdService,
  updateJobCategoryService,
  deleteJobCategoryService,
} from "../../services/JobCategoryServices/jobCategoryService.js";

// =====================================
// CREATE JOB CATEGORY
// =====================================

export const createJobCategory = async (req: Request, res: Response) => {
  try {
    const icon = req.file ? `/uploads/job-categories/${req.file.filename}` : "";

    const jobCategory = await createJobCategoryService({
      ...req.body,
      icon,
      createdBy: "admin",
    });

    return res.status(201).json({
      message: "Job category created successfully",
      jobCategory,
    });
  } catch (error) {
    console.error("Error creating job category:", error);

    return res.status(500).json({
      message: "Error creating job category",
    });
  }
};

// =====================================
// GET ALL JOB CATEGORIES
// =====================================

export const getJobCategories = async (req: Request, res: Response) => {
  try {
    const jobCategories = await getJobCategoryService();

    return res.status(200).json({
      jobCategories,
    });
  } catch (error) {
    console.error("Error getting job categories:", error);

    return res.status(500).json({
      message: "Error getting job categories",
    });
  }
};

// =====================================
// GET JOB CATEGORY BY ID
// =====================================

export const getJobCategory = async (req: Request, res: Response) => {
  try {
    const jobCategoryId = req.params.id;

    if (typeof jobCategoryId !== "string") {
      return res.status(400).json({
        message: "Invalid job category ID",
      });
    }

    const jobCategory = await getJobCategoryByIdService(jobCategoryId);

    if (!jobCategory) {
      return res.status(404).json({
        message: "Job category not found",
      });
    }

    return res.status(200).json({
      jobCategory,
    });
  } catch (error) {
    console.error("Error getting job category:", error);

    return res.status(500).json({
      message: "Error getting job category",
    });
  }
};

// =====================================
// UPDATE JOB CATEGORY
// =====================================

export const updateJobCategory = async (req: Request, res: Response) => {
  try {
    const jobCategoryId = req.params.id;

    if (typeof jobCategoryId !== "string") {
      return res.status(400).json({
        message: "Invalid job category ID",
      });
    }

    const icon = req.file
      ? `/uploads/job-categories/${req.file.filename}`
      : undefined;

    const jobCategory = await updateJobCategoryService(jobCategoryId, {
      ...req.body,

      ...(icon !== undefined && {
        icon,
      }),

      updatedBy: "admin",
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
  } catch (error) {
    console.error("Error updating job category:", error);

    return res.status(500).json({
      message: "Error updating job category",
    });
  }
};

// =====================================
// DELETE JOB CATEGORY
// =====================================

export const deleteJobCategory = async (req: Request, res: Response) => {
  try {
    const jobCategoryId = req.params.id;

    if (typeof jobCategoryId !== "string") {
      return res.status(400).json({
        message: "Invalid job category ID",
      });
    }

    const deleteBy = "admin";

    const jobCategory = await deleteJobCategoryService(jobCategoryId, deleteBy);

    if (!jobCategory) {
      return res.status(404).json({
        message: "Job category not found",
      });
    }

    return res.status(200).json({
      message: "Job category deleted successfully",
      jobCategory,
    });
  } catch (error) {
    console.error("Error deleting job category:", error);

    return res.status(500).json({
      message: "Error deleting job category",
    });
  }
};
