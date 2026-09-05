import CmsMaster from "../../models/CmsModel/CmsModel.js";

export type ICmsMaster = InstanceType<typeof CmsMaster>;

// =====================================
// Create CMS
// =====================================

export async function createCmsService(cmsData: Partial<ICmsMaster>) {
  try {
    // SMTP Server
    if (!cmsData.smtpServer?.trim()) {
      throw new Error("SMTP server is required");
    }

    // Email From
    if (!cmsData.emailFrom?.trim()) {
      throw new Error("Email from is required");
    }

    // Username
    if (!cmsData.username?.trim()) {
      throw new Error("Username is required");
    }

    // Security Type
    if (!cmsData.securityType?.trim()) {
      throw new Error("Security type is required");
    }

    // Password
    if (!cmsData.password?.trim()) {
      throw new Error("Password is required");
    }

    // Port
    if (!cmsData.port) {
      throw new Error("Port is required");
    }

    // Content
    if (!cmsData.content?.trim()) {
      throw new Error("Content is required");
    }

    // Created By
    if (!cmsData.createdBy?.trim()) {
      throw new Error("Created by is required");
    }

    // =====================================
    // Create CMS
    // =====================================

    const cms = new CmsMaster({
      ...cmsData,

      smtpServer: cmsData.smtpServer.trim(),

      emailFrom: cmsData.emailFrom.trim().toLowerCase(),

      username: cmsData.username.trim(),

      securityType: cmsData.securityType.trim(),

      password: cmsData.password.trim(),

      port: Number(cmsData.port),

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
    // SMTP Server
    if (!updateData.smtpServer?.trim()) {
      throw new Error("SMTP server is required");
    }

    // Email From
    if (!updateData.emailFrom?.trim()) {
      throw new Error("Email from is required");
    }

    // Username
    if (!updateData.username?.trim()) {
      throw new Error("Username is required");
    }

    // Security Type
    if (!updateData.securityType?.trim()) {
      throw new Error("Security type is required");
    }

    // Password
    if (!updateData.password?.trim()) {
      throw new Error("Password is required");
    }

    // Port
    if (!updateData.port) {
      throw new Error("Port is required");
    }

    // Content
    if (!updateData.content?.trim()) {
      throw new Error("Content is required");
    }

    // =====================================
    // Update CMS
    // =====================================

    return await CmsMaster.findOneAndUpdate(
      {
        _id: id,
        isActive: true,
        isDisplay: true,
      },
      {
        ...updateData,

        smtpServer: updateData.smtpServer.trim(),

        emailFrom: updateData.emailFrom.trim().toLowerCase(),

        username: updateData.username.trim(),

        securityType: updateData.securityType.trim(),

        password: updateData.password.trim(),

        port: Number(updateData.port),

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
