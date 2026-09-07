import mongoose from "mongoose";

import EmailCredentialMaster from "../../models/EmailCredentialModel/EmailCredentialmodel.js";

export type IEmailCredentialMaster = InstanceType<typeof EmailCredentialMaster>;

// =====================================
// Create Email Credential
// =====================================

export const createEmailCredentialService = async (
  emailCredentialData: Partial<IEmailCredentialMaster>,
) => {
  try {
    // =====================================
    // SMTP Server Validation
    // =====================================

    if (!emailCredentialData.smtpServer?.trim()) {
      throw new Error("SMTP server is required");
    }

    // =====================================
    // Email From Validation
    // =====================================

    if (!emailCredentialData.emailFrom?.trim()) {
      throw new Error("Email from is required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailCredentialData.emailFrom.trim())) {
      throw new Error("Invalid email from format");
    }

    // =====================================
    // Username Validation
    // =====================================

    if (!emailCredentialData.username?.trim()) {
      throw new Error("Username is required");
    }

    if (!emailRegex.test(emailCredentialData.username.trim())) {
      throw new Error("Invalid username email format");
    }

    // =====================================
    // Security Type Validation
    // =====================================

    if (!emailCredentialData.securityType?.trim()) {
      throw new Error("Security type is required");
    }

    // =====================================
    // Password Validation
    // =====================================

    if (!emailCredentialData.password?.trim()) {
      throw new Error("Password is required");
    }

    // =====================================
    // Port Validation
    // =====================================

    if (!emailCredentialData.port?.trim()) {
      throw new Error("Port is required");
    }

    if (!/^\d+$/.test(emailCredentialData.port.trim())) {
      throw new Error("Port must contain only numbers");
    }

    // =====================================
    // Created By Validation
    // =====================================

    if (!emailCredentialData.createdBy?.trim()) {
      throw new Error("Created by is required");
    }

    // =====================================
    // Duplicate Email From Check
    // =====================================

    const existingEmail = await EmailCredentialMaster.findOne({
      emailFrom: emailCredentialData.emailFrom.trim().toLowerCase(),
      isActive: true,
      isDisplay: true,
    });

    if (existingEmail) {
      throw new Error("Email credential already exists");
    }

    // =====================================
    // Create
    // =====================================

    const emailCredential = new EmailCredentialMaster({
      smtpServer: emailCredentialData.smtpServer.trim(),

      emailFrom: emailCredentialData.emailFrom.trim().toLowerCase(),

      username: emailCredentialData.username.trim().toLowerCase(),

      securityType: emailCredentialData.securityType.trim(),

      password: emailCredentialData.password.trim(),

      port: emailCredentialData.port.trim(),

      isActive: true,
      isDisplay: true,

      createdBy: emailCredentialData.createdBy.trim(),

      updatedBy: null,
      deleteAt: null,
      deleteBy: null,
    });

    return await emailCredential.save();
  } catch (error) {
    console.error("Create Email Credential Service Error:", error);

    throw error;
  }
};

// =====================================
// Get Active Email Credentials
// =====================================

export const getEmailCredentialService = async () => {
  try {
    return await EmailCredentialMaster.find({
      isActive: true,
      isDisplay: true,
    }).select("-password");
  } catch (error) {
    console.error("Get Email Credential Service Error:", error);

    throw error;
  }
};

// =====================================
// Get Email Credential By ID
// =====================================

export const getEmailCredentialByIdService = async (id: string) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid email credential ID");
    }

    return await EmailCredentialMaster.findOne({
      _id: id,
      isActive: true,
      isDisplay: true,
    }).select("-password");
  } catch (error) {
    console.error("Get Email Credential By ID Service Error:", error);

    throw error;
  }
};

// =====================================
// Update Email Credential
// =====================================

export const updateEmailCredentialService = async (
  id: string,
  updateData: Partial<IEmailCredentialMaster>,
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid email credential ID");
    }

    // =====================================
    // SMTP Server Validation
    // =====================================

    if (!updateData.smtpServer?.trim()) {
      throw new Error("SMTP server is required");
    }

    // =====================================
    // Email From Validation
    // =====================================

    if (!updateData.emailFrom?.trim()) {
      throw new Error("Email from is required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(updateData.emailFrom.trim())) {
      throw new Error("Invalid email from format");
    }

    // =====================================
    // Username Validation
    // =====================================

    if (!updateData.username?.trim()) {
      throw new Error("Username is required");
    }

    if (!emailRegex.test(updateData.username.trim())) {
      throw new Error("Invalid username email format");
    }

    // =====================================
    // Security Type Validation
    // =====================================

    if (!updateData.securityType?.trim()) {
      throw new Error("Security type is required");
    }

    // =====================================
    // Port Validation
    // =====================================

    if (!updateData.port?.trim()) {
      throw new Error("Port is required");
    }

    if (!/^\d+$/.test(updateData.port.trim())) {
      throw new Error("Port must contain only numbers");
    }

    // =====================================
    // Updated By Validation
    // =====================================

    if (!updateData.updatedBy?.trim()) {
      throw new Error("Updated by is required");
    }

    // =====================================
    // Duplicate Email From Check
    // =====================================

    const existingEmail = await EmailCredentialMaster.findOne({
      emailFrom: updateData.emailFrom.trim().toLowerCase(),

      _id: { $ne: id },

      isActive: true,
      isDisplay: true,
    });

    if (existingEmail) {
      throw new Error("Email credential already exists");
    }

    // =====================================
    // Prepare Update
    // =====================================

    const updateFields: Partial<IEmailCredentialMaster> = {
      smtpServer: updateData.smtpServer.trim(),

      emailFrom: updateData.emailFrom.trim().toLowerCase(),

      username: updateData.username.trim().toLowerCase(),

      securityType: updateData.securityType.trim(),

      port: updateData.port.trim(),

      updatedBy: updateData.updatedBy.trim(),
    };

    // Password update only if supplied
    if (updateData.password?.trim()) {
      updateFields.password = updateData.password.trim();
    }

    // =====================================
    // Update
    // =====================================

    return await EmailCredentialMaster.findOneAndUpdate(
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
    ).select("-password");
  } catch (error) {
    console.error("Update Email Credential Service Error:", error);

    throw error;
  }
};

// =====================================
// Delete Email Credential
// =====================================

export const deleteEmailCredentialService = async (
  id: string,
  deleteBy: string,
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid email credential ID");
    }

    if (!deleteBy?.trim()) {
      throw new Error("Delete by is required");
    }

    // =====================================
    // Soft Delete
    // =====================================

    return await EmailCredentialMaster.findOneAndUpdate(
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
    ).select("-password");
  } catch (error) {
    console.error("Delete Email Credential Service Error:", error);

    throw error;
  }
};

// =====================================
// Get All For Admin
// =====================================

export const getAllEmailCredentialForAdminService = async () => {
  try {
    return await EmailCredentialMaster.find()
      .select("-password")
      .sort({ createdAt: -1 });
  } catch (error) {
    console.error("Get All Email Credential Admin Service Error:", error);

    throw error;
  }
};
