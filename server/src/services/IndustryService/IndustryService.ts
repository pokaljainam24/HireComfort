import IndustryMaster from "../../models/IndustryModel/IndustryModel.js";

export type IIndustryMaster =
  InstanceType<typeof IndustryMaster>;

// =====================================
// Create
// =====================================

export async function createIndustryService(
  industryData: Partial<IIndustryMaster>,
) {
  try {
    // =====================================
    // Industry Name validation
    // =====================================

    if (!industryData.IndustryName?.trim()) {
      throw new Error(
        "Industry name is required",
      );
    }

    if (
      industryData.IndustryName.trim().length < 2
    ) {
      throw new Error(
        "Industry name must contain at least 2 characters",
      );
    }

    // =====================================
    // Created By validation
    // =====================================

    if (!industryData.createdBy?.trim()) {
      throw new Error(
        "Created by is required",
      );
    }

    // =====================================
    // Duplicate Industry Name check
    // =====================================

    const existingIndustry =
      await IndustryMaster.findOne({
        IndustryName:
          industryData.IndustryName.trim(),
        isActive: true,
        isDisplay: true,
      });

    if (existingIndustry) {
      throw new Error(
        "Industry with this name already exists",
      );
    }

    // =====================================
    // Generate Industry ID
    // =====================================

    const lastIndustry =
      await IndustryMaster.findOne()
        .sort({
          IndustryId: -1,
        })
        .select("IndustryId");

    const IndustryId =
      lastIndustry
        ? lastIndustry.IndustryId + 1
        : 1;

    // =====================================
    // Create Industry
    // =====================================

    const industry =
      new IndustryMaster({
        IndustryId,

        IndustryName:
          industryData.IndustryName.trim(),

        isActive: true,
        isDisplay: true,

        createdBy:
          industryData.createdBy.trim(),

        updatedBy: null,
        deleteAt: null,
        deleteBy: null,
      });

    return await industry.save();

  } catch (error) {
    console.error(
      "Error creating industry:",
      error,
    );

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
    }).sort({
      IndustryId: 1,
    });

  } catch (error) {
    console.error(
      "Error getting industries:",
      error,
    );

    throw error;
  }
}

// =====================================
// Get By ID
// =====================================

export async function getIndustryByIdService(
  id: string,
) {
  try {
    const industryId = Number(id);

    if (isNaN(industryId)) {
      throw new Error(
        "Invalid industry ID",
      );
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
      throw new Error(
        "Invalid industry ID",
      );
    }

    // =====================================
    // Industry Name validation
    // =====================================

    if (
      updateData.IndustryName !== undefined &&
      !updateData.IndustryName.trim()
    ) {
      throw new Error(
        "Industry name is required",
      );
    }

    if (
      updateData.IndustryName !== undefined &&
      updateData.IndustryName.trim().length < 2
    ) {
      throw new Error(
        "Industry name must contain at least 2 characters",
      );
    }

    // =====================================
    // Updated By validation
    // =====================================

    if (!updateData.updatedBy?.trim()) {
      throw new Error(
        "Updated by is required",
      );
    }

    // =====================================
    // Check Current Industry
    // =====================================

    const currentIndustry =
      await IndustryMaster.findOne({
        IndustryId: industryId,
        isActive: true,
        isDisplay: true,
      });

    if (!currentIndustry) {
      return null;
    }

    // =====================================
    // Duplicate Industry Name check
    // =====================================

    if (
      updateData.IndustryName !== undefined
    ) {
      const existingIndustry =
        await IndustryMaster.findOne({
          IndustryId: {
            $ne: industryId,
          },

          IndustryName:
            updateData.IndustryName.trim(),

          isActive: true,
          isDisplay: true,
        });

      if (existingIndustry) {
        throw new Error(
          "Industry with this name already exists",
        );
      }
    }

    // =====================================
    // Prepare Update Data
    // =====================================

    const data: Partial<IIndustryMaster> = {
      ...updateData,
    };

    // Do not allow IndustryId to be changed
    delete data.IndustryId;

    if (data.IndustryName !== undefined) {
      data.IndustryName =
        data.IndustryName.trim();
    }

    if (data.updatedBy != null) {
      data.updatedBy =
        data.updatedBy.trim();
    }

    // =====================================
    // Update
    // =====================================

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
      throw new Error(
        "Invalid industry ID",
      );
    }

    // =====================================
    // Delete By validation
    // =====================================

    if (!deleteBy?.trim()) {
      throw new Error(
        "Delete by is required",
      );
    }

    // =====================================
    // Soft Delete
    // =====================================

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
    console.error(
      "Error getting all industries:",
      error,
    );

    throw error;
  }
}

