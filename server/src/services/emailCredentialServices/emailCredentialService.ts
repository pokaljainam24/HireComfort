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
    // Email Setup Name Validation
    // =====================================

    if (!emailCredentialData.emailSetUpName?.trim()) {
      throw new Error("Email setup name is required");
    }

    if (emailCredentialData.emailSetUpName.trim().length < 2) {
      throw new Error("Email setup name must contain at least 2 characters");
    }

    // =====================================
    // Email Validation
    // =====================================

    if (!emailCredentialData.email?.trim()) {
      throw new Error("Email is required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailCredentialData.email.trim())) {
      throw new Error("Invalid email format");
    }

    // =====================================
    // Host Validation
    // =====================================

    if (!emailCredentialData.host?.trim()) {
      throw new Error("Host is required");
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
    // Password Validation
    // =====================================

    if (!emailCredentialData.password?.trim()) {
      throw new Error("Password is required");
    }

    // =====================================
    // Created By Validation
    // =====================================

    if (!emailCredentialData.createdBy?.trim()) {
      throw new Error("Created by is required");
    }

    // =====================================
    // Duplicate Email Check
    // =====================================

    const existingEmail = await EmailCredentialMaster.findOne({
      email: emailCredentialData.email.trim().toLowerCase(),
      isActive: true,
      isDisplay: true,
    });

    if (existingEmail) {
      throw new Error("Email credential already exists");
    }

    // =====================================
    // Duplicate Setup Name Check
    // =====================================

    const existingSetupName = await EmailCredentialMaster.findOne({
      emailSetUpName: emailCredentialData.emailSetUpName.trim(),
      isActive: true,
      isDisplay: true,
    });

    if (existingSetupName) {
      throw new Error("Email setup name already exists");
    }

    // =====================================
    // Create
    // =====================================

    const emailCredential = new EmailCredentialMaster({
      emailSetUpName: emailCredentialData.emailSetUpName.trim(),

      email: emailCredentialData.email.trim().toLowerCase(),

      host: emailCredentialData.host.trim(),

      port: emailCredentialData.port.trim(),

      isSSL: Boolean(emailCredentialData.isSSL),

      password: emailCredentialData.password.trim(),

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
    // Email Setup Name Validation
    // =====================================

    if (!updateData.emailSetUpName?.trim()) {
      throw new Error("Email setup name is required");
    }

    if (updateData.emailSetUpName.trim().length < 2) {
      throw new Error("Email setup name must contain at least 2 characters");
    }

    // =====================================
    // Email Validation
    // =====================================

    if (!updateData.email?.trim()) {
      throw new Error("Email is required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(updateData.email.trim())) {
      throw new Error("Invalid email format");
    }

    // =====================================
    // Host Validation
    // =====================================

    if (!updateData.host?.trim()) {
      throw new Error("Host is required");
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
    // Duplicate Email Check
    // =====================================

    const existingEmail = await EmailCredentialMaster.findOne({
      email: updateData.email.trim().toLowerCase(),
      _id: { $ne: id },
      isActive: true,
      isDisplay: true,
    });

    if (existingEmail) {
      throw new Error("Email credential already exists");
    }

    // =====================================
    // Duplicate Setup Name Check
    // =====================================

    const existingSetupName = await EmailCredentialMaster.findOne({
      emailSetUpName: updateData.emailSetUpName.trim(),
      _id: { $ne: id },
      isActive: true,
      isDisplay: true,
    });

    if (existingSetupName) {
      throw new Error("Email setup name already exists");
    }

    // =====================================
    // Prepare Update
    // =====================================

    const updateFields: any = {
      emailSetUpName: updateData.emailSetUpName.trim(),

      email: updateData.email.trim().toLowerCase(),

      host: updateData.host.trim(),

      port: updateData.port.trim(),

      isSSL: Boolean(updateData.isSSL),

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
    return await EmailCredentialMaster.find();
  } catch (error) {
    console.error("Get All Email Credential Admin Service Error:", error);

    throw error;
  }
};
