import QualificationMaster from "../../models/QuallificationModel/qualificationModel.js";

export type IQualificationMaster = InstanceType<typeof QualificationMaster>;

// =====================================
// Create Qualification
// =====================================

export async function createQualificationService(
  qualificationData: Partial<IQualificationMaster>,
) {
  try {
    // ==============================
    // Qualification Validation
    // ==============================

    if (!qualificationData.qualificationTest?.trim()) {
      throw new Error("Qualification is required");
    }

    if (qualificationData.qualificationTest.trim().length < 2) {
      throw new Error("Qualification must contain at least 2 characters");
    }

    // ==============================
    // Create Qualification
    // ==============================

    const qualification = new QualificationMaster({
      ...qualificationData,

      qualificationTest: qualificationData.qualificationTest.trim(),
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
    return await QualificationMaster.find({
      isActive: true,
      isDisplay: true,
    });
  } catch (error) {
    console.error("Error getting qualifications:", error);
    throw error;
  }
}

// =====================================
// Get Qualification By ID
// =====================================

export async function getQualificationByIdService(id: string) {
  try {
    return await QualificationMaster.findOne({
      _id: id,
      isActive: true,
      isDisplay: true,
    });
  } catch (error) {
    console.error(`Error getting qualification with id ${id}:`, error);
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
    if (updateData.qualificationTest !== undefined) {
      if (!updateData.qualificationTest.trim()) {
        throw new Error("Qualification is required");
      }

      if (updateData.qualificationTest.trim().length < 2) {
        throw new Error("Qualification must contain at least 2 characters");
      }

      updateData.qualificationTest = updateData.qualificationTest.trim();
    }

    return await QualificationMaster.findOneAndUpdate(
      {
        _id: id,
        isActive: true,
        isDisplay: true,
      },
      updateData,
      {
        new: true,
        runValidators: true,
      },
    );
  } catch (error) {
    console.error(`Error updating qualification with id ${id}:`, error);
    throw error;
  }
}

// =====================================
// Delete Qualification
// =====================================

export async function deleteQualificationService(id: string, deleteBy: string) {
  try {
    return await QualificationMaster.findOneAndUpdate(
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
    console.error(`Error deleting qualification with id ${id}:`, error);
    throw error;
  }
}

// =====================================
// Get All Qualification For Admin
// =====================================

export async function getAllQualificationForAdminService() {
  try {
    return await QualificationMaster.find();
  } catch (error) {
    console.error("Error getting qualifications for admin:", error);
    throw error;
  }
}
