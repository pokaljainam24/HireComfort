import type { Request, Response } from "express";
import mongoose from "mongoose";

import {
  createJobCategory,
  deleteJobCategory,
  getJobCategories,
  getJobCategoryById,
  updateJobCategory,
} from "../../services/admin/jobCategoriesService.js";

export const getJobCategoriesController = async (
  req: Request,
  res: Response,
) => {
  try {
    const categories = await getJobCategories();

    return res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Get job categories error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch job categories",
    });
  }
};

export const getJobCategoryByIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job category ID",
      });
    }

    const category = await getJobCategoryById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Job category not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error("Get job category error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch job category",
    });
  }
};

export const createJobCategoryController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { name, description, icon, createdBy = "admin" } = req.body;

    if (!name || !description || !icon) {
      return res.status(400).json({
        success: false,
        message: "name, description and icon are required",
      });
    }

    const category = await createJobCategory({
      name,
      description,
      icon,
      createdBy,
    });

    return res.status(201).json({
      success: true,
      message: "Job category created successfully",
      data: category,
    });
  } catch (error) {
    console.error("Create job category error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create job category",
    });
  }
};

export const updateJobCategoryController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job category ID",
      });
    }

    const { name, description, icon, isActive, isDisplay, updatedBy } =
      req.body;

    const category = await updateJobCategory(id, {
      name,
      description,
      icon,
      isActive,
      isDisplay,
      updatedBy,
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Job category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job category updated successfully",
      data: category,
    });
  } catch (error) {
    console.error("Update job category error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update job category",
    });
  }
};

export const deleteJobCategoryController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job category ID",
      });
    }

    /*
     * In a real application, deletedBy should ideally
     * come from the authenticated user/token rather than
     * req.body.
     */
    const deletedBy = "admin";

    const category = await deleteJobCategory(id as string, deletedBy);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Job category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job category deleted successfully",
    });
  } catch (error) {
    console.error("Delete job category error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete job category",
    });
  }
};
