import mongoose from "mongoose";

import JobSubCategoryMaster from "../../models/JobSubCategoryModel/jobSubCategoryModel.js";
import JobCategoryMaster from "../../models/JobCategoryModel/jobCategoryModel.js";

export type IJobSubCategoryMaster =
  InstanceType<typeof JobSubCategoryMaster>;

// =====================================
// Create Job Sub Category
// =====================================

export async function createJobSubCategoryService(
  jobSubCategoryData: Partial<IJobSubCategoryMaster>,
) {
  try {
    // =====================================
    // CATEGORY ID
    // =====================================

    if (!jobSubCategoryData.categoryId) {
      throw new Error(
        "Category ID is required",
      );
    }

    if (
      !mongoose.Types.ObjectId.isValid(
        jobSubCategoryData.categoryId.toString(),
      )
    ) {
      throw new Error(
        "Invalid category ID",
      );
    }

    // =====================================
    // CHECK CATEGORY
    // =====================================

    const category =
      await JobCategoryMaster.findOne({
        _id: jobSubCategoryData.categoryId,
        isActive: true,
        isDisplay: true,
      });

    if (!category) {
      throw new Error(
        "Job category not found",
      );
    }

    // =====================================
    // NAME
    // =====================================

    if (
      !jobSubCategoryData.name?.trim()
    ) {
      throw new Error(
        "Job sub category name is required",
      );
    }

    if (
      jobSubCategoryData.name.trim()
        .length < 2
    ) {
      throw new Error(
        "Job sub category name must contain at least 2 characters",
      );
    }

    // =====================================
    // DESCRIPTION
    // =====================================

    if (
      !jobSubCategoryData.description?.trim()
    ) {
      throw new Error(
        "Job sub category description is required",
      );
    }

    if (
      jobSubCategoryData.description.trim()
        .length < 2
    ) {
      throw new Error(
        "Job sub category description must contain at least 2 characters",
      );
    }

    // =====================================
    // ICON
    // =====================================

    if (
      !jobSubCategoryData.icon?.trim()
    ) {
      throw new Error(
        "Job sub category icon is required",
      );
    }

    // =====================================
    // CREATED BY
    // =====================================

    if (
      !jobSubCategoryData.createdBy?.trim()
    ) {
      throw new Error(
        "Created by is required",
      );
    }

    // =====================================
    // DUPLICATE NAME
    // SAME CATEGORY
    // =====================================

    const existingSubCategory =
      await JobSubCategoryMaster.findOne({
        categoryId:
          jobSubCategoryData.categoryId,

        name:
          jobSubCategoryData.name.trim(),

        isActive: true,
        isDisplay: true,
      });

    if (existingSubCategory) {
      throw new Error(
        "Job sub category with this name already exists in this category",
      );
    }

    // =====================================
    // CREATE
    // =====================================

    const jobSubCategory =
      new JobSubCategoryMaster({
        categoryId:
          jobSubCategoryData.categoryId,

        name:
          jobSubCategoryData.name.trim(),

        description:
          jobSubCategoryData.description.trim(),

        icon:
          jobSubCategoryData.icon.trim(),

        isActive: true,
        isDisplay: true,

        createdBy:
          jobSubCategoryData.createdBy.trim(),

        updatedBy: null,

        deleteAt: null,
        deleteBy: null,
      });

    return await jobSubCategory.save();
  } catch (error) {
    console.error(
      "Error creating job sub category:",
      error,
    );

    throw error;
  }
}

// =====================================
// Get Job Sub Categories
// =====================================

export async function getJobSubCategoriesService() {
  try {
    return await JobSubCategoryMaster.find({
      isActive: true,
      isDisplay: true,
    }).sort({
      createdAt: -1,
    });
  } catch (error) {
    console.error(
      "Error getting job sub categories:",
      error,
    );

    throw error;
  }
}

// =====================================
// Get Job Sub Category By ID
// =====================================

export async function getJobSubCategoryByIdService(
  id: string,
) {
  try {
    return await JobSubCategoryMaster.findOne({
      _id: id,
      isActive: true,
      isDisplay: true,
    });
  } catch (error) {
    console.error(
      `Error getting job sub category with id ${id}: `,
      error,
    );

    throw error;
  }
}

// =====================================
// Update Job Sub Category
// =====================================

export async function updateJobSubCategoryService(
  id: string,
  updateData: Partial<IJobSubCategoryMaster>,
) {
  try {
    // ==========================================
    // CATEGORY VALIDATION
    // ==========================================

    if (updateData.categoryId !== undefined) {
      if (
        !mongoose.Types.ObjectId.isValid(
          updateData.categoryId.toString(),
        )
      ) {
        throw new Error("Invalid category ID");
      }

      const category = await JobCategoryMaster.findOne({
        _id: updateData.categoryId,
        isActive: true,
        isDisplay: true,
      });

      if (!category) {
        throw new Error("Job category not found");
      }
    }

    // ==========================================
    // NAME VALIDATION
    // ==========================================

    if (
      updateData.name !== undefined &&
      !updateData.name.trim()
    ) {
      throw new Error("Job sub category name is required");
    }

    if (
      updateData.name !== undefined &&
      updateData.name.trim().length < 2
    ) {
      throw new Error(
        "Job sub category name must contain at least 2 characters",
      );
    }

    // ==========================================
    // DESCRIPTION VALIDATION
    // ==========================================

    if (
      updateData.description !== undefined &&
      !updateData.description.trim()
    ) {
      throw new Error(
        "Job sub category description is required",
      );
    }

    if (
      updateData.description !== undefined &&
      updateData.description.trim().length < 2
    ) {
      throw new Error(
        "Job sub category description must contain at least 2 characters",
      );
    }

    // ==========================================
    // ICON VALIDATION
    // ==========================================

    if (
      updateData.icon !== undefined &&
      !updateData.icon.trim()
    ) {
      throw new Error("Job sub category icon is required");
    }

    // ==========================================
    // UPDATED BY VALIDATION
    // ==========================================

    if (!updateData.updatedBy?.trim()) {
      throw new Error("Updated by is required");
    }

    // ==========================================
    // CHECK CURRENT DATA
    // ==========================================

    if (
      updateData.name !== undefined ||
      updateData.categoryId !== undefined
    ) {
      const currentData =
        await JobSubCategoryMaster.findById(id);

      if (!currentData) {
        return null;
      }

      const categoryId =
        updateData.categoryId ?? currentData.categoryId;

      const name =
        updateData.name?.trim() ?? currentData.name;

      // ==========================================
      // DUPLICATE CHECK
      // ==========================================

      const existingSubCategory =
        await JobSubCategoryMaster.findOne({
          _id: {
            $ne: id,
          },
          categoryId,
          name,
          isActive: true,
          isDisplay: true,
        });

      if (existingSubCategory) {
        throw new Error(
          "Job sub category with this name already exists in this category",
        );
      }
    }

    // ==========================================
    // BUILD UPDATE PAYLOAD
    // ==========================================

    const updatePayload: Partial<IJobSubCategoryMaster> = {};

    if (updateData.categoryId !== undefined) {
      updatePayload.categoryId =
        updateData.categoryId;
    }

    if (updateData.name !== undefined) {
      updatePayload.name =
        updateData.name.trim();
    }

    if (updateData.description !== undefined) {
      updatePayload.description =
        updateData.description.trim();
    }

    if (updateData.updatedBy !== undefined) {
      updatePayload.updatedBy =
        updateData.updatedBy.trim();
    }

    if (
      updateData.icon !== undefined &&
      updateData.icon.trim()
    ) {
      updatePayload.icon =
        updateData.icon.trim();
    }

    // ==========================================
    // UPDATE
    // ==========================================

    return await JobSubCategoryMaster.findOneAndUpdate(
      {
        _id: id,
        isActive: true,
        isDisplay: true,
      },
      updatePayload,
      {
        new: true,
        runValidators: true,
      },
    );
  } catch (error) {
    console.error(
      `Error updating job sub category with id ${id}:`,
      error,
    );

    throw error;
  }
}

// =====================================
// Delete Job Sub Category
// =====================================

export async function deleteJobSubCategoryService(
  id: string,
  deleteBy: string,
) {
  try {
    // =====================================
    // DELETE BY
    // =====================================

    if (!deleteBy?.trim()) {
      throw new Error(
        "Delete by is required",
      );
    }

    // =====================================
    // SOFT DELETE
    // =====================================

    return await JobSubCategoryMaster.findOneAndUpdate(
      {
        _id: id,
        isActive: true,
      },

      {
        isActive: false,
        isDisplay: false,

        deleteAt: new Date(),

        deleteBy:
          deleteBy.trim(),
      },

      {
        new: true,
      },
    );
  } catch (error) {
    console.error(
      `Error deleting job sub category with id ${id}: `,
      error,
    );

    throw error;
  }
}

// =====================================
// Get All Job Sub Categories For Admin
// =====================================

export async function getAllJobSubCategoryForAdminService() {
  try {
    return await JobSubCategoryMaster.find()
      .sort({
        createdAt: -1,
      });
  } catch (error) {
    console.error(
      "Error getting job sub categories for admin:",
      error,
    );

    throw error;
  }
}
