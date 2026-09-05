import EmploymentTypeMaster from "../../models/EmploymentTypesModel/EmploymentTypeModel.js";

export type IEmploymentTypeMaster =
  InstanceType<typeof EmploymentTypeMaster>;

// =====================================
// Create
// =====================================

export async function createEmploymentTypeService(
  employmentTypeData: Partial<IEmploymentTypeMaster>,
) {
  try {
    // =====================================
    // Employment Name validation
    // =====================================

    if (!employmentTypeData.EmploymentName?.trim()) {
      throw new Error(
        "Employment name is required",
      );
    }

    if (
      employmentTypeData.EmploymentName.trim().length < 2
    ) {
      throw new Error(
        "Employment name must contain at least 2 characters",
      );
    }

    // =====================================
    // Employment Type validation
    // =====================================

    if (!employmentTypeData.EmploymentType?.trim()) {
      throw new Error(
        "Employment type is required",
      );
    }

    // =====================================
    // Created By validation
    // =====================================

    if (!employmentTypeData.createdBy?.trim()) {
      throw new Error("Created by is required");
    }

    // Duplicate ID check
    const existingEmploymentTypeById =
      await EmploymentTypeMaster.findOne({
        EmploymentTypeId: employmentTypeData.EmploymentTypeId,
        isActive: true,
        isDisplay: true,
      });

    if (existingEmploymentTypeById) {
      throw new Error(
        "Created by is required",
      );
    }

    // =====================================
    // Duplicate Employment Name
    // =====================================

    const existingEmploymentType =
      await EmploymentTypeMaster.findOne({
        EmploymentName:
          employmentTypeData.EmploymentName.trim(),
        isActive: true,
        isDisplay: true,
      });

    if (existingEmploymentType) {
      throw new Error(
        "Employment type with this name already exists",
      );
    }

    // =====================================
    // Generate Employment Type ID
    // =====================================

    const lastEmploymentType =
      await EmploymentTypeMaster.findOne()
        .sort({
          EmploymentTypeId: -1,
        })
        .select("EmploymentTypeId");

    const EmploymentTypeId =
      lastEmploymentType
        ? lastEmploymentType.EmploymentTypeId + 1
        : 1;

    // =====================================
    // Create Employment Type
    // =====================================

    const employmentType =
      new EmploymentTypeMaster({
        EmploymentTypeId,

        EmploymentName:
          employmentTypeData.EmploymentName.trim(),

        EmploymentType:
          employmentTypeData.EmploymentType.trim(),

        isActive: true,
        isDisplay: true,

        createdBy:
          employmentTypeData.createdBy.trim(),

        updatedBy: null,
        deleteAt: null,
        deleteBy: null,
      });

    return await employmentType.save();

  } catch (error) {
    console.error(
      "Error creating employment type:",
      error,
    );

    throw error;
  }
}

// =====================================
// Get All Active
// =====================================

export async function getEmploymentTypesService() {
  try {
    return await EmploymentTypeMaster.find({
      isActive: true,
      isDisplay: true,
    }).sort({
      EmploymentTypeId: 1,
    });

  } catch (error) {
    console.error(
      "Error getting employment types:",
      error,
    );

    throw error;
  }
}

// =====================================
// Get By ID
// =====================================

export async function getEmploymentTypeByIdService(
  id: string,
) {
  try {
    const employmentTypeId = Number(id);

    if (isNaN(employmentTypeId)) {
      throw new Error(
        "Invalid employment type ID",
      );
    }

    return await EmploymentTypeMaster.findOne({
      EmploymentTypeId: employmentTypeId,
      isActive: true,
      isDisplay: true,
    });

  } catch (error) {
    console.error(
      `Error getting employment type with id ${id}:`,
      error,
    );

    throw error;
  }
}

// =====================================
// Update
// =====================================

export async function updateEmploymentTypeService(
  id: string,
  updateData: Partial<IEmploymentTypeMaster>,
) {
  try {
    const employmentTypeId = Number(id);

    if (isNaN(employmentTypeId)) {
      throw new Error(
        "Invalid employment type ID",
      );
    }

    // =====================================
    // Employment Name validation
    // =====================================

    if (
      updateData.EmploymentName !== undefined &&
      !updateData.EmploymentName.trim()
    ) {
      throw new Error(
        "Employment name is required",
      );
    }

    if (
      updateData.EmploymentName !== undefined &&
      updateData.EmploymentName.trim().length < 2
    ) {
      throw new Error(
        "Employment name must contain at least 2 characters",
      );
    }

    // =====================================
    // Employment Type validation
    // =====================================

    if (
      updateData.EmploymentType !== undefined &&
      !updateData.EmploymentType.trim()
    ) {
      throw new Error(
        "Employment type is required",
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
    // Check Current Employment Type
    // =====================================

    const currentEmploymentType =
      await EmploymentTypeMaster.findOne({
        EmploymentTypeId: employmentTypeId,
        isActive: true,
        isDisplay: true,
      });

    if (!currentEmploymentType) {
      return null;
    }

    // =====================================
    // Duplicate Employment Name
    // =====================================

    if (updateData.EmploymentName !== undefined) {
      const existingEmploymentType =
        await EmploymentTypeMaster.findOne({
          EmploymentTypeId: {
            $ne: employmentTypeId,
          },

          EmploymentName:
            updateData.EmploymentName.trim(),

          isActive: true,
          isDisplay: true,
        });

      if (existingEmploymentType) {
        throw new Error(
          "Employment type with this name already exists",
        );
      }
    }

    // =====================================
    // Prepare Update Data
    // =====================================

    const data: Partial<IEmploymentTypeMaster> = {
      ...updateData,
    };

    // Never allow ID to be changed
    delete data.EmploymentTypeId;

    if (data.EmploymentName !== undefined) {
      data.EmploymentName =
        data.EmploymentName.trim();
    }

    if (data.EmploymentType !== undefined) {
      data.EmploymentType =
        data.EmploymentType.trim();
    }

    if (data.updatedBy != null) {
      data.updatedBy =
        data.updatedBy.trim();
    }

    // =====================================
    // Update
    // =====================================

    return await EmploymentTypeMaster.findOneAndUpdate(
      {
        EmploymentTypeId: employmentTypeId,
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
      `Error updating employment type with id ${id}:`,
      error,
    );

    throw error;
  }
}

// =====================================
// Soft Delete
// =====================================

export async function deleteEmploymentTypeService(
  id: string,
  deleteBy: string,
) {
  try {
    const employmentTypeId = Number(id);

    if (isNaN(employmentTypeId)) {
      throw new Error(
        "Invalid employment type ID",
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

    return await EmploymentTypeMaster.findOneAndUpdate(
      {
        EmploymentTypeId: employmentTypeId,
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
      `Error deleting employment type with id ${id}:`,
      error,
    );

    throw error;
  }
}

// =====================================
// Get All For Admin
// =====================================

export async function getAllEmploymentTypeForAdminService() {
  try {
    return await EmploymentTypeMaster.find().sort({
      EmploymentTypeId: 1,
    });

  } catch (error) {
    console.error(
      "Error getting all employment types:",
      error,
    );

    throw error;
  }
}