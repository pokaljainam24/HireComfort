import JobCategoryMaster from "../../models/JobCategoryModel/jobCategoryModel.js";

export type IJobCategoryMaster = InstanceType<typeof JobCategoryMaster>;

// =====================================
// CREATE JOB CATEGORY
// =====================================

export async function createJobCategoryService(
  jobCategoryData: Partial<IJobCategoryMaster>,
) {
  try {
    // ==============================
    // Job Category Name Validation
    // ==============================

    if (!jobCategoryData.name?.trim()) {
      throw new Error("Job category name is required");
    }

    if (jobCategoryData.name.trim().length < 2) {
      throw new Error("Job category name must contain at least 2 characters");
    }

    // ==============================
    // Description Validation
    // ==============================

    if (!jobCategoryData.description?.trim()) {
      throw new Error("Job category description is required");
    }

    if (jobCategoryData.description.trim().length < 2) {
      throw new Error(
        "Job category description must contain at least 2 characters",
      );
    }

    // ==============================
    // Icon Validation
    // ==============================

    if (!jobCategoryData.icon?.trim()) {
      throw new Error("Job category icon is required");
    }

    // ==============================
    // Duplicate Category Validation
    // ==============================

    const existingCategory = await JobCategoryMaster.findOne({
      name: jobCategoryData.name.trim(),
      isActive: true,
      isDisplay: true,
    });

    if (existingCategory) {
      throw new Error("Job category with this name already exists");
    }

    // ==============================
    // Created By Validation
    // ==============================

    if (!jobCategoryData.createdBy?.trim()) {
      throw new Error("Created by is required");
    }

    // ==============================
    // Create Job Category
    // ==============================

    const jobCategory = new JobCategoryMaster({
      ...jobCategoryData,

      // Store normalized values
      name: jobCategoryData.name.trim(),

      description: jobCategoryData.description.trim(),

      icon: jobCategoryData.icon.trim(),

      // Status
      isActive: true,
      isDisplay: true,

      // Audit
      createdBy: jobCategoryData.createdBy.trim(),

      updatedBy: null,

      // Soft Delete
      deleteAt: null,
      deleteBy: null,
    });

    return await jobCategory.save();
  } catch (error) {
    console.error("Error creating job category:", error);

    throw error;
  }
}

// =====================================
// GET ALL JOB CATEGORIES
// =====================================

export async function getJobCategoryService() {
  try {
    return await JobCategoryMaster.find({
      isActive: true,
      isDisplay: true,
    });
  } catch (error) {
    console.error("Error getting job categories:", error);

    throw error;
  }
}

// =====================================
// GET JOB CATEGORY BY ID
// =====================================

export async function getJobCategoryByIdService(id: string) {
  try {
    return await JobCategoryMaster.findOne({
      _id: id,
      isActive: true,
      isDisplay: true,
    });
  } catch (error) {
    console.error(`Error getting job category with id ${id}:`, error);

    throw error;
  }
}

// =====================================
// UPDATE JOB CATEGORY
// =====================================

export async function updateJobCategoryService(
  id: string,
  updateData: Partial<IJobCategoryMaster>,
) {
  try {
    // ==============================
    // Name Validation
    // ==============================

    if (updateData.name !== undefined && !updateData.name.trim()) {
      throw new Error("Job category name is required");
    }

    if (updateData.name !== undefined && updateData.name.trim().length < 2) {
      throw new Error("Job category name must contain at least 2 characters");
    }

    // ==============================
    // Description Validation
    // ==============================

    if (
      updateData.description !== undefined &&
      !updateData.description.trim()
    ) {
      throw new Error("Job category description is required");
    }

    if (
      updateData.description !== undefined &&
      updateData.description.trim().length < 2
    ) {
      throw new Error(
        "Job category description must contain at least 2 characters",
      );
    }

    // ==============================
    // Icon Validation
    // ==============================

    if (updateData.icon !== undefined && !updateData.icon.trim()) {
      throw new Error("Job category icon is required");
    }

    // ==============================
    // Updated By Validation
    // ==============================

    if (!updateData.updatedBy?.trim()) {
      throw new Error("Updated by is required");
    }

    // ==============================
    // Duplicate Name Validation
    // ==============================

    if (updateData.name !== undefined) {
      const existingCategory = await JobCategoryMaster.findOne({
        _id: { $ne: id },

        name: updateData.name.trim(),

        isActive: true,
        isDisplay: true,
      });

      if (existingCategory) {
        throw new Error("Job category with this name already exists");
      }
    }

    // ==============================
    // Normalize Values
    // ==============================

    const data: Partial<IJobCategoryMaster> = {
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

    // ==============================
    // Update Job Category
    // ==============================

    return await JobCategoryMaster.findOneAndUpdate(
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
    console.error(`Error updating job category with id ${id}:`, error);

    throw error;
  }
}

// =====================================
// DELETE JOB CATEGORY
// =====================================

export async function deleteJobCategoryService(id: string, deleteBy: string) {
  try {
    // ==============================
    // Delete By Validation
    // ==============================

    if (!deleteBy?.trim()) {
      throw new Error("Delete by is required");
    }

    // ==============================
    // Soft Delete
    // ==============================

    return await JobCategoryMaster.findOneAndUpdate(
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
    console.error(`Error deleting job category with id ${id}:`, error);

    throw error;
  }
}

// =====================================
// GET ALL JOB CATEGORIES FOR ADMIN
// =====================================

export async function getAllJobCategoryForAdminService() {
  try {
    return await JobCategoryMaster.find();
  } catch (error) {
    console.error("Error getting job categories for admin:", error);

    throw error;
  }
}
