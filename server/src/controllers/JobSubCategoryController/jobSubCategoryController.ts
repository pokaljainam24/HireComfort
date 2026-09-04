import type { Request, Response } from "express";

import {
  createJobSubCategoryService,
  getJobSubCategoriesService,
  getJobSubCategoryByIdService,
  updateJobSubCategoryService,
  deleteJobSubCategoryService,
} from "../../services/JobSubCategoryServices/jobSubCategoryService.js";

// =====================================
// Create
// =====================================

export const createJobSubCategory = async (req: Request, res: Response) => {
  try {
    const icon = req.file
      ? `/uploads/job-sub-categories/${req.file.filename}`
      : "";

    const jobSubCategory = await createJobSubCategoryService({
      ...req.body,
      icon,
      createdBy: "admin",
    });

    return res.status(201).json({
      message: "Job sub category created successfully",
      jobSubCategory,
    });
  } catch (error) {
    console.error("Error creating job sub category:", error);

    return res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Error creating job sub category",
    });
  }
};

// =====================================
// Get All
// =====================================

export const getJobSubCategories = async (req: Request, res: Response) => {
  try {
    const jobSubCategories = await getJobSubCategoriesService();

    return res.status(200).json({
      jobSubCategories,
    });
  } catch (error) {
    console.error("Error getting job sub categories:", error);

    return res.status(500).json({
      message: "Error getting job sub categories",
    });
  }
};

// =====================================
// Get By ID
// =====================================

export const getJobSubCategory = async (req: Request, res: Response) => {
  try {
    const jobSubCategoryId = req.params.id;

    if (typeof jobSubCategoryId !== "string") {
      return res.status(400).json({
        message: "Invalid job sub category ID",
      });
    }

    const jobSubCategory = await getJobSubCategoryByIdService(jobSubCategoryId);

    if (!jobSubCategory) {
      return res.status(404).json({
        message: "Job sub category not found",
      });
    }

    return res.status(200).json({
      jobSubCategory,
    });
  } catch (error) {
    console.error("Error getting job sub category:", error);

    return res.status(500).json({
      message: "Error getting job sub category",
    });
  }
};

// =====================================
// Update
// =====================================

export const updateJobSubCategory = async (req: Request, res: Response) => {
  try {
    const jobSubCategoryId = req.params.id;

    if (typeof jobSubCategoryId !== "string") {
      return res.status(400).json({
        message: "Invalid job sub category ID",
      });
    }

    const icon = req.file
      ? `/uploads/job-sub-categories/${req.file.filename}`
      : undefined;

    const jobSubCategory = await updateJobSubCategoryService(jobSubCategoryId, {
      ...req.body,
      ...(icon !== undefined && { icon }),
      updatedBy: "admin",
    });

    if (!jobSubCategory) {
      return res.status(404).json({
        message: "Job sub category not found",
      });
    }

    return res.status(200).json({
      message: "Job sub category updated successfully",
      jobSubCategory,
    });
  } catch (error) {
    console.error("Error updating job sub category:", error);

    return res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Error updating job sub category",
    });
  }
};

// =====================================
// Delete
// =====================================

export const deleteJobSubCategory = async (req: Request, res: Response) => {
  try {
    const jobSubCategoryId = req.params.id;

    if (typeof jobSubCategoryId !== "string") {
      return res.status(400).json({
        message: "Invalid job sub category ID",
      });
    }

    const jobSubCategory = await deleteJobSubCategoryService(
      jobSubCategoryId,
      "admin",
    );

    if (!jobSubCategory) {
      return res.status(404).json({
        message: "Job sub category not found",
      });
    }

    return res.status(200).json({
      message: "Job sub category deleted successfully",
      jobSubCategory,
    });
  } catch (error) {
    console.error("Error deleting job sub category:", error);

    return res.status(500).json({
      message: "Error deleting job sub category",
    });
  }
};
