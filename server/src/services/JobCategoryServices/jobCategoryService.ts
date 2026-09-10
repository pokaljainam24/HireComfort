import JobCategoryMaster from "../../models/JobCategoryModel/jobCategoryModel.js";

export type IJobCategoryMaster = InstanceType<typeof JobCategoryMaster>;

// =====================================
// Create Job Category
// =====================================

export async function createJobCategoryService(
  jobCategoryData: Partial<IJobCategoryMaster>,
) {
  try {
    // Name
    if (!jobCategoryData.name?.trim()) {
      throw new Error("Job category name is required");
    }

    if (jobCategoryData.name.trim().length < 2) {
      throw new Error(
        "Job category name must contain at least 2 characters",
      );
    }

    // Description
    if (!jobCategoryData.description?.trim()) {
      throw new Error("Job category description is required");
    }

    if (jobCategoryData.description.trim().length < 2) {
      throw new Error(
        "Job category description must contain at least 2 characters",
      );
    }

    // Icon
    if (!jobCategoryData.icon?.trim()) {
      throw new Error("Job category icon is required");
    }

    // Duplicate Name
    const existingCategory = await JobCategoryMaster.findOne({
      name: jobCategoryData.name.trim(),
      isActive: true,
      isDisplay: true,
    });

    if (existingCategory) {
      throw new Error("Job category with this name already exists");
    }

    // Created By
    if (!jobCategoryData.createdBy?.trim()) {
      throw new Error("Created by is required");
    }

    const jobCategory = new JobCategoryMaster({
      name: jobCategoryData.name.trim(),

      description: jobCategoryData.description.trim(),

      icon: jobCategoryData.icon.trim(),

      isActive: true,
      isDisplay: true,

      createdBy: jobCategoryData.createdBy.trim(),

      updatedBy: null,

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
// Get Job Categories
// =====================================

export async function getJobCategoryService() {
  try {
    return await JobCategoryMaster.find({
      isActive: true,
      isDisplay: true,
    }).sort({ createdAt: -1 });
  } catch (error) {
    console.error("Error getting job categories:", error);

    throw error;
  }
}

// =====================================
// Get Job Category By ID
// =====================================

export async function getJobCategoryByIdService(id: string) {
  try {
    return await JobCategoryMaster.findOne({
      _id: id,
      isActive: true,
      isDisplay: true,
    });
  } catch (error) {
    console.error(`Error getting job category with id ${id}: `, error);

    throw error;
  }
}

// =====================================
// Update Job Category
// =====================================

export async function updateJobCategoryService(
  id: string,
  updateData: Partial<IJobCategoryMaster>,
) {
  try {
    // Name
    if (!updateData.name?.trim()) {
      throw new Error("Job category name is required");
    }

    if (updateData.name.trim().length < 2) {
      throw new Error(
        "Job category name must contain at least 2 characters",
      );
    }

    // Description
    if (!updateData.description?.trim()) {
      throw new Error("Job category description is required");
    }

    if (updateData.description.trim().length < 2) {
      throw new Error(
        "Job category description must contain at least 2 characters",
      );
    }

    // Updated By
    if (!updateData.updatedBy?.trim()) {
      throw new Error("Updated by is required");
    }

    // Duplicate Name
    const existingCategory = await JobCategoryMaster.findOne({
      _id: { $ne: id },

      name: updateData.name.trim(),

      isActive: true,
      isDisplay: true,
    });

    if (existingCategory) {
      throw new Error("Job category with this name already exists");
    }

    const updatePayload: Partial<IJobCategoryMaster> = {
      name: updateData.name.trim(),

      description: updateData.description.trim(),

      updatedBy: updateData.updatedBy.trim(),
    };

    // Icon only update if new icon is provided
    if (updateData.icon?.trim()) {
      updatePayload.icon = updateData.icon.trim();
    }

    return await JobCategoryMaster.findOneAndUpdate(
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
    console.error(`Error updating job category with id ${id}: `, error);

    throw error;
  }
}

// =====================================
// Delete Job Category
// =====================================

export async function deleteJobCategoryService(
  id: string,
  deleteBy: string,
) {
  try {
    if (!deleteBy?.trim()) {
      throw new Error("Delete by is required");
    }

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
    console.error(`Error deleting job category with id ${id}: `, error);

    throw error;
  }
}

// =====================================
// Get All Job Categories For Admin
// =====================================

export async function getAllJobCategoryForAdminService() {
  try {
    return await JobCategoryMaster.find().sort({
      createdAt: -1,
    });
  } catch (error) {
    console.error("Error getting job categories for admin:", error);

    throw error;
  }
}
