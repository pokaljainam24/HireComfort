import mongoose from "mongoose";

import CmsMaster from "../../models/CmsModel/CmsModel.js";

export type ICmsMaster = InstanceType<typeof CmsMaster>;

// =====================================
// Create CMS
// =====================================

export async function createCmsService(cmsData: Partial<ICmsMaster>) {
  try {
    // ==============================
    // Section Name Validation
    // ==============================

    if (!cmsData.sectionName?.trim()) {
      throw new Error("Section name is required");
    }

    if (cmsData.sectionName.trim().length < 2) {
      throw new Error("Section name must contain at least 2 characters");
    }

    // ==============================
    // Code Validation
    // ==============================

    if (!cmsData.code?.trim()) {
      throw new Error("Code is required");
    }

    if (cmsData.code.trim().length < 2) {
      throw new Error("Code must contain at least 2 characters");
    }

    // ==============================
    // Content Validation
    // ==============================

    if (!cmsData.content?.trim()) {
      throw new Error("Content is required");
    }

    // ==============================
    // Created By Validation
    // ==============================

    if (!cmsData.createdBy?.trim()) {
      throw new Error("Created by is required");
    }

    // ==============================
    // Duplicate Code Validation
    // ==============================

    const existingCms = await CmsMaster.findOne({
      code: cmsData.code.trim().toLowerCase(),
      isActive: true,
      isDisplay: true,
    });

    if (existingCms) {
      throw new Error("CMS code already exists");
    }

    // ==============================
    // Create CMS
    // ==============================

    const cms = new CmsMaster({
      ...cmsData,

      // Store normalized values
      sectionName: cmsData.sectionName.trim(),

      code: cmsData.code.trim().toLowerCase(),

      content: cmsData.content.trim(),
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
    });
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
    // ==============================
    // Section Name Validation
    // ==============================

    if (!updateData.sectionName?.trim()) {
      throw new Error("Section name is required");
    }

    if (updateData.sectionName.trim().length < 2) {
      throw new Error("Section name must contain at least 2 characters");
    }

    // ==============================
    // Code Validation
    // ==============================

    if (!updateData.code?.trim()) {
      throw new Error("Code is required");
    }

    if (updateData.code.trim().length < 2) {
      throw new Error("Code must contain at least 2 characters");
    }

    // ==============================
    // Content Validation
    // ==============================

    if (!updateData.content?.trim()) {
      throw new Error("Content is required");
    }

    // ==============================
    // Duplicate Code Validation
    // ==============================

    const existingCms = await CmsMaster.findOne({
      code: updateData.code.trim().toLowerCase(),
      _id: { $ne: id },
      isActive: true,
      isDisplay: true,
    });

    if (existingCms) {
      throw new Error("CMS code already exists");
    }

    // ==============================
    // Update CMS
    // ==============================

    return await CmsMaster.findOneAndUpdate(
      {
        _id: id,
        isActive: true,
        isDisplay: true,
      },
      {
        ...updateData,

        sectionName: updateData.sectionName.trim(),

        code: updateData.code.trim().toLowerCase(),

        content: updateData.content.trim(),
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
        deleteBy,
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
    return await CmsMaster.find();
  } catch (error) {
    console.error("Error getting CMS for admin:", error);

    throw error;
  }
}
