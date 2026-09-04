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
    // Employment Type ID validation
    if (employmentTypeData.EmploymentTypeId === undefined) {
      throw new Error("Employment type ID is required");
    }

    if (employmentTypeData.EmploymentTypeId <= 0) {
      throw new Error(
        "Employment type ID must be greater than 0",
      );
    }

    // Employment Name validation
    if (!employmentTypeData.EmploymentName?.trim()) {
      throw new Error("Employment name is required");
    }

    if (employmentTypeData.EmploymentName.trim().length < 2) {
      throw new Error(
        "Employment name must contain at least 2 characters",
      );
    }

    // Created by validation
    if (!employmentTypeData.createdBy?.trim()) {
      throw new Error("Created by is required");
    }

    // Duplicate ID check
    const existingEmploymentType =
      await EmploymentTypeMaster.findOne({
        EmploymentTypeId: employmentTypeData.EmploymentTypeId,
        isActive: true,
        isDisplay: true,
      });

    if (existingEmploymentType) {
      throw new Error(
        "Employment type with this ID already exists",
      );
    }

    // Duplicate name check
    const existingEmploymentTypeName =
      await EmploymentTypeMaster.findOne({
        EmploymentName:
          employmentTypeData.EmploymentName.trim(),
        isActive: true,
        isDisplay: true,
      });

    if (existingEmploymentTypeName) {
      throw new Error(
        "Employment type with this name already exists",
      );
    }

    const employmentType = new EmploymentTypeMaster({
      ...employmentTypeData,

      EmploymentName:
        employmentTypeData.EmploymentName.trim(),

      isActive: true,
      isDisplay: true,

      createdBy: employmentTypeData.createdBy.trim(),

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
      throw new Error("Invalid employment type ID");
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
      throw new Error("Invalid employment type ID");
    }

    // Employment Name validation
    if (
      updateData.EmploymentName !== undefined &&
      !updateData.EmploymentName.trim()
    ) {
      throw new Error("Employment name is required");
    }

    if (
      updateData.EmploymentName !== undefined &&
      updateData.EmploymentName.trim().length < 2
    ) {
      throw new Error(
        "Employment name must contain at least 2 characters",
      );
    }

    // Updated by validation
    if (!updateData.updatedBy?.trim()) {
      throw new Error("Updated by is required");
    }

    // Check current employment type
    const currentEmploymentType =
      await EmploymentTypeMaster.findOne({
        EmploymentTypeId: employmentTypeId,
        isActive: true,
        isDisplay: true,
      });

    if (!currentEmploymentType) {
      return null;
    }

    // Duplicate name check
    if (updateData.EmploymentName !== undefined) {
      const existingEmploymentType =
        await EmploymentTypeMaster.findOne({
          EmploymentTypeId: { $ne: employmentTypeId },
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

    const data: Partial<IEmploymentTypeMaster> = {
      ...updateData,
    };

    if (data.EmploymentName !== undefined) {
      data.EmploymentName = data.EmploymentName.trim();
    }

    if (data.updatedBy != null) {
      data.updatedBy = data.updatedBy.trim();
    }

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
      throw new Error("Invalid employment type ID");
    }

    if (!deleteBy?.trim()) {
      throw new Error("Delete by is required");
    }

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