import IndustryMaster from "../../models/IndustryModel/IndustryModel.js";

export type IIndustryMaster = InstanceType<typeof IndustryMaster>;

// =====================================
// Create
// =====================================

export async function createIndustryService(
  industryData: Partial<IIndustryMaster>,
) {
  try {
    // Industry ID validation
    if (industryData.IndustryId === undefined) {
      throw new Error("Industry ID is required");
    }

    if (industryData.IndustryId <= 0) {
      throw new Error("Industry ID must be greater than 0");
    }

    // Industry name validation
    if (!industryData.IndustryName?.trim()) {
      throw new Error("Industry name is required");
    }

    if (industryData.IndustryName.trim().length < 2) {
      throw new Error(
        "Industry name must contain at least 2 characters",
      );
    }

    // Created by validation
    if (!industryData.createdBy?.trim()) {
      throw new Error("Created by is required");
    }

    // Duplicate check
    const existingIndustry = await IndustryMaster.findOne({
      IndustryId: industryData.IndustryId,
      isActive: true,
      isDisplay: true,
    });

    if (existingIndustry) {
      throw new Error("Industry with this ID already exists");
    }

    // Duplicate name check
    const existingIndustryName = await IndustryMaster.findOne({
      IndustryName: industryData.IndustryName.trim(),
      isActive: true,
      isDisplay: true,
    });

    if (existingIndustryName) {
      throw new Error("Industry with this name already exists");
    }

    const industry = new IndustryMaster({
      ...industryData,

      IndustryName: industryData.IndustryName.trim(),

      isActive: true,
      isDisplay: true,

      createdBy: industryData.createdBy.trim(),

      updatedBy: null,
      deleteAt: null,
      deleteBy: null,
    });

    return await industry.save();
  } catch (error) {
    console.error("Error creating industry:", error);
    throw error;
  }
}

// =====================================
// Get All Active
// =====================================

export async function getIndustriesService() {
  try {
    return await IndustryMaster.find({
      isActive: true,
      isDisplay: true,
    }).sort({ IndustryId: 1 });
  } catch (error) {
    console.error("Error getting industries:", error);
    throw error;
  }
}

// =====================================
// Get By ID
// =====================================

export async function getIndustryByIdService(id: string) {
  try {
    const industryId = Number(id);

    if (isNaN(industryId)) {
      throw new Error("Invalid industry ID");
    }

    return await IndustryMaster.findOne({
      IndustryId: industryId,
      isActive: true,
      isDisplay: true,
    });
  } catch (error) {
    console.error(
      `Error getting industry with id ${id}:`,
      error,
    );

    throw error;
  }
}

// =====================================
// Update
// =====================================

export async function updateIndustryService(
  id: string,
  updateData: Partial<IIndustryMaster>,
) {
  try {
    const industryId = Number(id);

    if (isNaN(industryId)) {
      throw new Error("Invalid industry ID");
    }

    // Industry name validation
    if (
      updateData.IndustryName !== undefined &&
      !updateData.IndustryName.trim()
    ) {
      throw new Error("Industry name is required");
    }

    if (
      updateData.IndustryName !== undefined &&
      updateData.IndustryName.trim().length < 2
    ) {
      throw new Error(
        "Industry name must contain at least 2 characters",
      );
    }

    // Updated by validation
    if (!updateData.updatedBy?.trim()) {
      throw new Error("Updated by is required");
    }

    // Check current industry
    const currentIndustry = await IndustryMaster.findOne({
      IndustryId: industryId,
      isActive: true,
      isDisplay: true,
    });

    if (!currentIndustry) {
      return null;
    }

    // Duplicate name check
    if (updateData.IndustryName !== undefined) {
      const existingIndustry = await IndustryMaster.findOne({
        IndustryId: { $ne: industryId },
        IndustryName: updateData.IndustryName.trim(),
        isActive: true,
        isDisplay: true,
      });

      if (existingIndustry) {
        throw new Error(
          "Industry with this name already exists",
        );
      }
    }

    const data: Partial<IIndustryMaster> = {
      ...updateData,
    };

    if (data.IndustryName !== undefined) {
      data.IndustryName = data.IndustryName.trim();
    }

    if (data.updatedBy != null) {
      data.updatedBy = data.updatedBy.trim();
    }

    return await IndustryMaster.findOneAndUpdate(
      {
        IndustryId: industryId,
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
    console.error(
      `Error updating industry with id ${id}:`,
      error,
    );

    throw error;
  }
}

// =====================================
// Soft Delete
// =====================================

export async function deleteIndustryService(
  id: string,
  deleteBy: string,
) {
  try {
    const industryId = Number(id);

    if (isNaN(industryId)) {
      throw new Error("Invalid industry ID");
    }

    if (!deleteBy?.trim()) {
      throw new Error("Delete by is required");
    }

    return await IndustryMaster.findOneAndUpdate(
      {
        IndustryId: industryId,
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
    console.error(
      `Error deleting industry with id ${id}:`,
      error,
    );

    throw error;
  }
}

// =====================================
// Get All For Admin
// =====================================

export async function getAllIndustryForAdminService() {
  try {
    return await IndustryMaster.find().sort({
      IndustryId: 1,
    });
  } catch (error) {
    console.error("Error getting all industries:", error);

    throw error;
  }
}