import type { Request, Response } from "express";

import {
  createJobSubCategoryService,
  getJobSubCategoriesService,
  getJobSubCategoryByIdService,
  updateJobSubCategoryService,
  deleteJobSubCategoryService,
} from "../../services/JobSubCategoryServices/jobSubCategoryService.js";

// =====================================
// Create Job Sub Category
// =====================================

export const createJobSubCategory = async (
  req: Request,
  res: Response,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const icon = req.file
      ? `/uploads/job-sub-categories/${req.file.filename}`
      : "";

    const jobSubCategory =
      await createJobSubCategoryService({
        ...req.body,
        icon,
        createdBy: req.user.username,
      });

    return res.status(201).json({
      message:
        "Job sub category created successfully",
      jobSubCategory,
    });
  } catch (error: any) {
    console.error(
      "Create Job Sub Category Controller Error:",
      error,
    );

    return res.status(500).json({
      message:
        error.message ||
        "Failed to create job sub category",
    });
  }
};

// =====================================
// Get Job Sub Categories
// =====================================

export const getJobSubCategories = async (
  req: Request,
  res: Response,
) => {
  try {
    const jobSubCategories =
      await getJobSubCategoriesService();

    return res.status(200).json({
      jobSubCategories,
    });
  } catch (error: any) {
    console.error(
      "Get Job Sub Categories Controller Error:",
      error,
    );

    return res.status(500).json({
      message:
        error.message ||
        "Failed to get job sub categories",
    });
  }
};

// =====================================
// Get Job Sub Category By ID
// =====================================

export const getJobSubCategory = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      return res.status(400).json({
        message:
          "Invalid job sub category ID",
      });
    }

    const jobSubCategory =
      await getJobSubCategoryByIdService(id);

    if (!jobSubCategory) {
      return res.status(404).json({
        message:
          "Job sub category not found",
      });
    }

    return res.status(200).json({
      jobSubCategory,
    });
  } catch (error: any) {
    console.error(
      "Get Job Sub Category By ID Controller Error:",
      error,
    );

    return res.status(500).json({
      message:
        error.message ||
        "Failed to get job sub category",
    });
  }
};

// =====================================
// Update Job Sub Category
// =====================================

export const updateJobSubCategory = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      return res.status(400).json({
        message:
          "Invalid job sub category ID",
      });
    }

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const icon = req.file
      ? `/uploads/job-sub-categories/${req.file.filename}`
      : undefined;

    const jobSubCategory =
      await updateJobSubCategoryService(
        id,
        {
          ...req.body,

          ...(icon !== undefined && {
            icon,
          }),

          updatedBy: req.user.username,
        },
      );

    if (!jobSubCategory) {
      return res.status(404).json({
        message:
          "Job sub category not found",
      });
    }

    return res.status(200).json({
      message:
        "Job sub category updated successfully",
      jobSubCategory,
    });
  } catch (error: any) {
    console.error(
      "Update Job Sub Category Controller Error:",
      error,
    );

    return res.status(500).json({
      message:
        error.message ||
        "Failed to update job sub category",
    });
  }
};

// =====================================
// Delete Job Sub Category
// =====================================

export const deleteJobSubCategory = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      return res.status(400).json({
        message:
          "Invalid job sub category ID",
      });
    }

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const deleteBy =
      req.user.username;

    const jobSubCategory =
      await deleteJobSubCategoryService(
        id,
        deleteBy,
      );

    if (!jobSubCategory) {
      return res.status(404).json({
        message:
          "Job sub category not found",
      });
    }

    return res.status(200).json({
      message:
        "Job sub category deleted successfully",
      jobSubCategory,
    });
  } catch (error: any) {
    console.error(
      "Delete Job Sub Category Controller Error:",
      error,
    );

    return res.status(500).json({
      message:
        error.message ||
        "Failed to delete job sub category",
    });
  }
};
