import mongoose from "mongoose";

import EmailTemplateMaster from "../../models/EmailTemplatesModel/EmailTemplatemodel.js";

export type IEmailTemplateMaster = InstanceType<typeof EmailTemplateMaster>;

// =====================================
// Create Email Template
// =====================================

export const createEmailTemplateService = async (
  emailTemplateData: Partial<IEmailTemplateMaster>,
) => {
  try {
    // =====================================
    // Template Name Validation
    // =====================================

    if (!emailTemplateData.templateName?.trim()) {
      throw new Error("Template name is required");
    }

    if (emailTemplateData.templateName.trim().length < 2) {
      throw new Error("Template name must contain at least 2 characters");
    }

    if (emailTemplateData.templateName.trim().length > 50) {
      throw new Error("Template name must not exceed 50 characters");
    }

    // =====================================
    // Description Validation
    // =====================================

    if (!emailTemplateData.description?.trim()) {
      throw new Error("Description is required");
    }

    // =====================================
    // Created By Validation
    // =====================================

    if (!emailTemplateData.createdBy?.trim()) {
      throw new Error("Created by is required");
    }

    // =====================================
    // Duplicate Template Name Check
    // =====================================

    const existingTemplate = await EmailTemplateMaster.findOne({
      templateName: emailTemplateData.templateName.trim(),
      isActive: true,
      isDisplay: true,
    });

    if (existingTemplate) {
      throw new Error("Email template already exists");
    }

    // =====================================
    // Create
    // =====================================

    const emailTemplate = new EmailTemplateMaster({
      templateName: emailTemplateData.templateName.trim(),
      description: emailTemplateData.description.trim(),

      isActive: true,
      isDisplay: true,

      createdBy: emailTemplateData.createdBy.trim(),
      updatedBy: null,

      deleteAt: null,
      deleteBy: null,
    });

    return await emailTemplate.save();
  } catch (error) {
    console.error("Create Email Template Service Error:", error);
    throw error;
  }
};

// =====================================
// Get Active Email Templates
// =====================================

export const getEmailTemplateService = async () => {
  try {
    return await EmailTemplateMaster.find({
      isActive: true,
      isDisplay: true,
    });
  } catch (error) {
    console.error("Get Email Template Service Error:", error);
    throw error;
  }
};

// =====================================
// Get Email Template By ID
// =====================================

export const getEmailTemplateByIdService = async (id: string) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid email template ID");
    }

    return await EmailTemplateMaster.findOne({
      _id: id,
      isActive: true,
      isDisplay: true,
    });
  } catch (error) {
    console.error("Get Email Template By ID Service Error:", error);
    throw error;
  }
};

// =====================================
// Update Email Template
// =====================================

export const updateEmailTemplateService = async (
  id: string,
  updateData: Partial<IEmailTemplateMaster>,
) => {
  try {
    // =====================================
    // ID Validation
    // =====================================

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid email template ID");
    }

    // =====================================
    // Template Name Validation
    // =====================================

    if (!updateData.templateName?.trim()) {
      throw new Error("Template name is required");
    }

    if (updateData.templateName.trim().length < 2) {
      throw new Error("Template name must contain at least 2 characters");
    }

    if (updateData.templateName.trim().length > 50) {
      throw new Error("Template name must not exceed 50 characters");
    }

    // =====================================
    // Description Validation
    // =====================================

    if (!updateData.description?.trim()) {
      throw new Error("Description is required");
    }

    // =====================================
    // Updated By Validation
    // =====================================

    if (!updateData.updatedBy?.trim()) {
      throw new Error("Updated by is required");
    }

    // =====================================
    // Duplicate Template Name Check
    // =====================================

    const existingTemplate = await EmailTemplateMaster.findOne({
      templateName: updateData.templateName.trim(),
      _id: { $ne: id },
      isActive: true,
      isDisplay: true,
    });

    if (existingTemplate) {
      throw new Error("Email template already exists");
    }

    // =====================================
    // Prepare Update
    // =====================================

    const updateFields = {
      templateName: updateData.templateName.trim(),
      description: updateData.description.trim(),
      updatedBy: updateData.updatedBy.trim(),
    };

    // =====================================
    // Update
    // =====================================

    return await EmailTemplateMaster.findOneAndUpdate(
      {
        _id: id,
        isActive: true,
        isDisplay: true,
      },
      updateFields,
      {
        new: true,
        runValidators: true,
      },
    );
  } catch (error) {
    console.error("Update Email Template Service Error:", error);
    throw error;
  }
};

// =====================================
// Delete Email Template
// =====================================

export const deleteEmailTemplateService = async (
  id: string,
  deleteBy: string,
) => {
  try {
    // =====================================
    // ID Validation
    // =====================================

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid email template ID");
    }

    // =====================================
    // Delete By Validation
    // =====================================

    if (!deleteBy?.trim()) {
      throw new Error("Delete by is required");
    }

    // =====================================
    // Soft Delete
    // =====================================

    return await EmailTemplateMaster.findOneAndUpdate(
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
    console.error("Delete Email Template Service Error:", error);
    throw error;
  }
};

// =====================================
// Get All For Admin
// =====================================

export const getAllEmailTemplateForAdminService = async () => {
  try {
    return await EmailTemplateMaster.find();
  } catch (error) {
    console.error("Get All Email Template Admin Service Error:", error);

    throw error;
  }
};
