import type { Request, Response } from "express";
import mongoose from "mongoose";

import {
  getJobSubCategories,
  getJobSubCategoryById,
  createJobSubCategory,
  updateJobSubCategory,
  deleteJobSubCategory,
  getJobSubCategoryByNameAndCategoryId,
} from "../../services/admin/jobSubCategoriesService.js";
import { getJobCategoryByName } from "../../services/admin/jobCategoriesService.js";

export const getJobSubCategoriesController = async (
  req: Request,
  res: Response,
) => {
  try {
    const subCategories = await getJobSubCategories();

    return res.status(200).json({
      success: true,
      data: subCategories,
    });
  } catch (error) {
    console.error("Get job sub categories error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch job sub categories",
    });
  }
};

export const getJobSubCategoryByIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job sub category ID",
      });
    }

    const subCategory = await getJobSubCategoryById(id);

    if (!subCategory) {
      return res.status(404).json({
        success: false,
        message: "Job sub category not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: subCategory,
    });
  } catch (error) {
    console.error("Get job sub category error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch job sub category",
    });
  }
};

export const createJobSubCategoryController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { name, description, icon, categoryName, createdBy = "admin" } = req.body;

    if (!name || !description || !icon || !categoryName) {
      return res.status(400).json({
        success: false,
        message:
          "name, description, icon and categoryName are required",
      });
    }

    const category = await getJobCategoryByName(categoryName);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category does not exist",
      });
    }

    const existingSubCategory = await getJobSubCategoryByNameAndCategoryId(name, category.id);
    if (existingSubCategory) {
      return res.status(400).json({
        success: false,
        message: "Sub category already exists",
      });
    }

    const subCategory = await createJobSubCategory({
      name,
      description,
      icon,
      categoryId: category.id,
      createdBy,
    });

    return res.status(201).json({
      success: true,
      message: "Job sub category created successfully",
      data: subCategory,
    });
  } catch (error) {
    console.error("Create job sub category error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create job sub category",
    });
  }
};

export const updateJobSubCategoryController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job sub category ID",
      });
    }

    const {
      name,
      description,
      icon,
      categoryId,
      isActive,
      isDisplay,
      updatedBy,
    } = req.body;

    if (categoryId && !mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }

    const subCategory = await updateJobSubCategory(id, {
      name,
      description,
      icon,
      categoryId,
      isActive,
      isDisplay,
      updatedBy,
    });

    if (!subCategory) {
      return res.status(404).json({
        success: false,
        message: "Job sub category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job sub category updated successfully",
      data: subCategory,
    });
  } catch (error) {
    console.error("Update job sub category error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update job sub category",
    });
  }
};

export const deleteJobSubCategoryController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job sub category ID",
      });
    }

    const deletedBy = "admin";

    const subCategory = await deleteJobSubCategory(id as string, deletedBy);

    if (!subCategory) {
      return res.status(404).json({
        success: false,
        message: "Job sub category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job sub category deleted successfully",
    });
  } catch (error) {
    console.error("Delete job sub category error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete job sub category",
    });
  }
};
