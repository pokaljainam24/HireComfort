import CmsMaster from "../../models/CmsModel/CmsModel.js";

export type ICmsMaster = InstanceType<typeof CmsMaster>;

// =====================================
// Create CMS
// =====================================

export async function createCmsService(cmsData: Partial<ICmsMaster>) {
  try {
    // Title
    if (!cmsData.title?.trim()) {
      throw new Error("Title is required");
    }

    // Content
    if (!cmsData.content?.trim()) {
      throw new Error("Content is required");
    }

    // Created By
    if (!cmsData.createdBy?.trim()) {
      throw new Error("Created by is required");
    }

    const cms = new CmsMaster({
      title: cmsData.title.trim(),

      content: cmsData.content.trim(),

      isActive: true,
      isDisplay: true,

      createdBy: cmsData.createdBy.trim(),

      updatedBy: null,

      deleteAt: null,
      deleteBy: null,
    });

    return await cms.save();
  } catch (error) {
    console.error("Error creating CMS:", error);

    throw error;
  }
}

// =====================================
// Get CMS
// =====================================

export async function getCmsService() {
  try {
    return await CmsMaster.find({
      isActive: true,
      isDisplay: true,
    }).sort({ createdAt: -1 });
  } catch (error) {
    console.error("Error getting CMS:", error);

    throw error;
  }
}

// =====================================
// Get CMS By ID
// =====================================

export async function getCmsByIdService(id: string) {
  try {
    return await CmsMaster.findOne({
      _id: id,
      isActive: true,
      isDisplay: true,
    });
  } catch (error) {
    console.error(`Error getting CMS with id ${id}:`, error);

    throw error;
  }
}

// =====================================
// Update CMS
// =====================================

export async function updateCmsService(
  id: string,
  updateData: Partial<ICmsMaster>,
) {
  try {
    // Title
    if (!updateData.title?.trim()) {
      throw new Error("Title is required");
    }

    // Content
    if (!updateData.content?.trim()) {
      throw new Error("Content is required");
    }

    return await CmsMaster.findOneAndUpdate(
      {
        _id: id,
        isActive: true,
        isDisplay: true,
      },
      {
        title: updateData.title.trim(),

        content: updateData.content.trim(),

        updatedBy: updateData.updatedBy,
      },
      {
        new: true,
        runValidators: true,
      },
    );
  } catch (error) {
    console.error(`Error updating CMS with id ${id}:`, error);

    throw error;
  }
}

// =====================================
// Delete CMS
// =====================================

export async function deleteCmsService(id: string, deleteBy: string) {
  try {
    return await CmsMaster.findOneAndUpdate(
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
    console.error(`Error deleting CMS with id ${id}:`, error);

    throw error;
  }
}

// =====================================
// Get All CMS For Admin
// =====================================

export async function getAllCmsForAdminService() {
  try {
    return await CmsMaster.find().sort({ createdAt: -1 });
  } catch (error) {
    console.error("Error getting CMS for admin:", error);

    throw error;
  }
}
