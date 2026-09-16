import QualificationMaster from "../../models/QuallificationModel/qualificationModel.js";

export type IQualificationMaster =
  InstanceType<typeof QualificationMaster>;

// =====================================
// Create Qualification
// =====================================

export async function createQualificationService(
  qualificationData: Partial<IQualificationMaster>,
) {
  try {
    // ==============================
    // Qualification ID Validation
    // ==============================

    if (!qualificationData.qualificationId?.trim()) {
      throw new Error("Qualification ID is required");
    }

    // ==============================
    // Code Validation
    // ==============================

    if (!qualificationData.code?.trim()) {
      throw new Error("Qualification code is required");
    }

    if (qualificationData.code.trim().length < 2) {
      throw new Error(
        "Qualification code must contain at least 2 characters",
      );
    }

    // ==============================
    // Name Validation
    // ==============================

    if (!qualificationData.name?.trim()) {
      throw new Error("Qualification name is required");
    }

    if (qualificationData.name.trim().length < 2) {
      throw new Error(
        "Qualification name must contain at least 2 characters",
      );
    }

    // ==============================
    // Degree Level Validation
    // ==============================

    if (!qualificationData.degreeLevel?.trim()) {
      throw new Error("Degree level is required");
    }

    // ==============================
    // Create Qualification
    // ==============================

    const qualification = new QualificationMaster({
      ...qualificationData,

      qualificationId:
        qualificationData.qualificationId.trim(),

      code: qualificationData.code.trim().toUpperCase(),

      name: qualificationData.name.trim(),

      degreeLevel:
        qualificationData.degreeLevel.trim(),

      specializationAllowed:
        qualificationData.specializationAllowed ?? false,

      isActive:
        qualificationData.isActive ?? true,

      isDisplay:
        qualificationData.isDisplay ?? true,

      deleteAt:
        qualificationData.deleteAt ?? null,

      deleteBy:
        qualificationData.deleteBy ?? null,
    });

    return await qualification.save();
  } catch (error) {
    console.error("Error creating qualification:", error);
    throw error;
  }
}

// =====================================
// Get All Qualification
// =====================================

export async function getQualificationService() {
  try {
    const qualifications = await QualificationMaster.find().sort({
      name: 1,
    });

    console.log("Qualifications from MongoDB:", qualifications);

    return qualifications;
  } catch (error) {
    console.error("Error getting qualifications:", error);
    throw error;
  }
}

// =====================================
// Get Qualification By ID
// =====================================

export async function getQualificationByIdService(
  id: string,
) {
  try {
    return await QualificationMaster.findOne({
      _id: id,
      isActive: true,
      isDisplay: true,
      deleteAt: null,
    });
  } catch (error) {
    console.error(
      `Error getting qualification with id ${id}:`,
      error,
    );

    throw error;
  }
}

// =====================================
// Update Qualification
// =====================================

export async function updateQualificationService(
  id: string,
  updateData: Partial<IQualificationMaster>,
) {
  try {
    // ==============================
    // Qualification ID Validation
    // ==============================

    if (updateData.qualificationId !== undefined) {
      if (!updateData.qualificationId.trim()) {
        throw new Error(
          "Qualification ID is required",
        );
      }

      updateData.qualificationId =
        updateData.qualificationId.trim();
    }

    // ==============================
    // Code Validation
    // ==============================

    if (updateData.code !== undefined) {
      if (!updateData.code.trim()) {
        throw new Error(
          "Qualification code is required",
        );
      }

      if (updateData.code.trim().length < 2) {
        throw new Error(
          "Qualification code must contain at least 2 characters",
        );
      }

      updateData.code =
        updateData.code.trim().toUpperCase();
    }

    // ==============================
    // Name Validation
    // ==============================

    if (updateData.name !== undefined) {
      if (!updateData.name.trim()) {
        throw new Error(
          "Qualification name is required",
        );
      }

      if (updateData.name.trim().length < 2) {
        throw new Error(
          "Qualification name must contain at least 2 characters",
        );
      }

      updateData.name =
        updateData.name.trim();
    }

    // ==============================
    // Degree Level Validation
    // ==============================

    if (updateData.degreeLevel !== undefined) {
      if (!updateData.degreeLevel.trim()) {
        throw new Error(
          "Degree level is required",
        );
      }

      updateData.degreeLevel =
        updateData.degreeLevel.trim();
    }

    // ==============================
    // Specialization Allowed
    // ==============================

    if (
      updateData.specializationAllowed !==
      undefined
    ) {
      updateData.specializationAllowed =
        Boolean(
          updateData.specializationAllowed,
        );
    }

    // ==============================
    // Update Qualification
    // ==============================

    return await QualificationMaster.findOneAndUpdate(
      {
        _id: id,
        isActive: true,
        isDisplay: true,
        deleteAt: null,
      },
      updateData,
      {
        new: true,
        runValidators: true,
      },
    );
  } catch (error) {
    console.error(
      `Error updating qualification with id ${id}:`,
      error,
    );

    throw error;
  }
}

// =====================================
// Delete Qualification
// =====================================

export async function deleteQualificationService(
  id: string,
  deleteBy: string,
) {
  try {
    return await QualificationMaster.findOneAndUpdate(
      {
        _id: id,
        isActive: true,
        isDisplay: true,
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
    console.error(
      `Error deleting qualification with id ${id}:`,
      error,
    );

    throw error;
  }
}

// =====================================
// Get All Qualification For Admin
// =====================================

export async function getAllQualificationForAdminService() {
  try {
    return await QualificationMaster.find().sort({
      name: 1,
    });
  } catch (error) {
    console.error(
      "Error getting qualifications for admin:",
      error,
    );

    throw error;
  }
}
