import mongoose from "mongoose";
import JobSubCategoryMaster from "../../models/JobSubCategoryModel/jobSubCategoryModel.js";
import JobCategoryMaster from "../../models/JobCategoryModel/jobCategoryModel.js";

export type IJobSubCategoryMaster = InstanceType<typeof JobSubCategoryMaster>;

// =====================================
// Create
// =====================================

export async function createJobSubCategoryService(
  jobSubCategoryData: Partial<IJobSubCategoryMaster>,
) {
  try {
    // Category ID validation
    if (!jobSubCategoryData.categoryId) {
      throw new Error("Category ID is required");
    }

    if (
      !mongoose.Types.ObjectId.isValid(jobSubCategoryData.categoryId.toString())
    ) {
      throw new Error("Invalid category ID");
    }

    // Check category exists
    const category = await JobCategoryMaster.findOne({
      _id: jobSubCategoryData.categoryId,
      isActive: true,
      isDisplay: true,
    });

    if (!category) {
      throw new Error("Job category not found");
    }

    // Name validation
    if (!jobSubCategoryData.name?.trim()) {
      throw new Error("Job sub category name is required");
    }

    if (jobSubCategoryData.name.trim().length < 2) {
      throw new Error(
        "Job sub category name must contain at least 2 characters",
      );
    }

    // Description validation
    if (!jobSubCategoryData.description?.trim()) {
      throw new Error("Job sub category description is required");
    }

    if (jobSubCategoryData.description.trim().length < 2) {
      throw new Error(
        "Job sub category description must contain at least 2 characters",
      );
    }

    // Icon validation
    if (!jobSubCategoryData.icon?.trim()) {
      throw new Error("Job sub category icon is required");
    }

    // Created by validation
    if (!jobSubCategoryData.createdBy?.trim()) {
      throw new Error("Created by is required");
    }

    // Duplicate check inside same category
    const existingSubCategory = await JobSubCategoryMaster.findOne({
      categoryId: jobSubCategoryData.categoryId,
      name: jobSubCategoryData.name.trim(),
      isActive: true,
      isDisplay: true,
    });

    if (existingSubCategory) {
      throw new Error(
        "Job sub category with this name already exists in this category",
      );
    }

    const jobSubCategory = new JobSubCategoryMaster({
      ...jobSubCategoryData,

      name: jobSubCategoryData.name.trim(),

      description: jobSubCategoryData.description.trim(),

      icon: jobSubCategoryData.icon.trim(),

      isActive: true,
      isDisplay: true,

      createdBy: jobSubCategoryData.createdBy.trim(),

      updatedBy: null,
      deleteAt: null,
      deleteBy: null,
    });

    return await jobSubCategory.save();
  } catch (error) {
    console.error("Error creating job sub category:", error);
    throw error;
  }
}

// =====================================
// Get All Active
// =====================================

export async function getJobSubCategoriesService() {
  try {
    return await JobSubCategoryMaster.find({
      isActive: true,
      isDisplay: true,
    });
  } catch (error) {
    console.error("Error getting job sub categories:", error);
    throw error;
  }
}

// =====================================
// Get By ID
// =====================================

export async function getJobSubCategoryByIdService(id: string) {
  try {
    return await JobSubCategoryMaster.findOne({
      _id: id,
      isActive: true,
      isDisplay: true,
    });
  } catch (error) {
    console.error(`Error getting job sub category with id ${id}:`, error);

    throw error;
  }
}

// =====================================
// Update
// =====================================

export async function updateJobSubCategoryService(
  id: string,
  updateData: Partial<IJobSubCategoryMaster>,
) {
  try {
    // Category validation
    if (updateData.categoryId !== undefined) {
      if (!mongoose.Types.ObjectId.isValid(updateData.categoryId.toString())) {
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

    // Name validation
    if (updateData.name !== undefined && !updateData.name.trim()) {
      throw new Error("Job sub category name is required");
    }

    if (updateData.name !== undefined && updateData.name.trim().length < 2) {
      throw new Error(
        "Job sub category name must contain at least 2 characters",
      );
    }

    // Description validation
    if (
      updateData.description !== undefined &&
      !updateData.description.trim()
    ) {
      throw new Error("Job sub category description is required");
    }

    if (
      updateData.description !== undefined &&
      updateData.description.trim().length < 2
    ) {
      throw new Error(
        "Job sub category description must contain at least 2 characters",
      );
    }

    // Icon validation
    if (updateData.icon !== undefined && !updateData.icon.trim()) {
      throw new Error("Job sub category icon is required");
    }

    // Updated by validation
    if (!updateData.updatedBy?.trim()) {
      throw new Error("Updated by is required");
    }

    // Duplicate check
    if (updateData.name !== undefined || updateData.categoryId !== undefined) {
      const currentData = await JobSubCategoryMaster.findById(id);

      if (!currentData) {
        return null;
      }

      const categoryId = updateData.categoryId ?? currentData.categoryId;

      const name = updateData.name?.trim() ?? currentData.name;

      const existingSubCategory = await JobSubCategoryMaster.findOne({
        _id: { $ne: id },
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

    const data: Partial<IJobSubCategoryMaster> = {
      ...updateData,
    };

    if (data.name !== undefined) {
      data.name = data.name.trim();
    }

    if (data.description !== undefined) {
      data.description = data.description.trim();
    }

    if (data.icon !== undefined) {
      data.icon = data.icon.trim();
    }

    return await JobSubCategoryMaster.findOneAndUpdate(
      {
        _id: id,
        isActive: true,
        isDisplay: true,
      },
      data,
      {
        new: true,
        runValidators: true,
      },
    );
  } catch (error) {
    console.error(`Error updating job sub category with id ${id}:`, error);
    throw error;
  }
}

// =====================================
// Soft Delete
// =====================================

export async function deleteJobSubCategoryService(
  id: string,
  deleteBy: string,
) {
  try {
    if (!deleteBy?.trim()) {
      throw new Error("Delete by is required");
    }

    return await JobSubCategoryMaster.findOneAndUpdate(
      {
        _id: id,
        isActive: true,
      },
      {
        isActive: false,
        isDisplay: false,
        deleteAt: new Date(),
        deleteBy: deleteBy.trim(),
      },
      {
        new: true,
      },
    );
  } catch (error) {
    console.error(`Error deleting job sub category with id ${id}:`, error);
    throw error;
  }
}

// =====================================
// Get All For Admin
// =====================================

export async function getAllJobSubCategoryForAdminService() {
  try {
    return await JobSubCategoryMaster.find();
  } catch (error) {
    console.error("Error getting all job sub categories:", error);

    throw error;
  }
}
