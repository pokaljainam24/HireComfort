import SkillsMaster from "../../models/SkillsModel/skillsModel.js";

export type ISkillsMaster = InstanceType<typeof SkillsMaster>;

// =====================================
// Create Skills
// =====================================

export async function createSkillsService(skillsData: Partial<ISkillsMaster>) {
  try {
    // ==============================
    // Skills Validation
    // ==============================

    if (!skillsData.skillsTest?.trim()) {
      throw new Error("Skills is required");
    }

    if (skillsData.skillsTest.trim().length < 2) {
      throw new Error("Skills must contain at least 2 characters");
    }

    // ==============================
    // Create Skills
    // ==============================

    const skills = new SkillsMaster({
      ...skillsData,

      skillsTest: skillsData.skillsTest.trim(),
    });

    return await skills.save();
  } catch (error) {
    console.error("Error creating skills:", error);
    throw error;
  }
}

// =====================================
// Get All Skills
// =====================================

export async function getSkillsService() {
  try {
    return await SkillsMaster.find({
      isActive: true,
      isDisplay: true,
    });
  } catch (error) {
    console.error("Error getting skills:", error);
    throw error;
  }
}

// =====================================
// Get Skills By ID
// =====================================

export async function getSkillsByIdService(id: string) {
  try {
    return await SkillsMaster.findOne({
      _id: id,
      isActive: true,
      isDisplay: true,
    });
  } catch (error) {
    console.error(`Error getting skills with id ${id}:`, error);
    throw error;
  }
}

// =====================================
// Update Skills
// =====================================

export async function updateSkillsService(
  id: string,
  updateData: Partial<ISkillsMaster>,
) {
  try {
    if (updateData.skillsTest !== undefined) {
      if (!updateData.skillsTest.trim()) {
        throw new Error("Skills is required");
      }

      if (updateData.skillsTest.trim().length < 2) {
        throw new Error("Skills must contain at least 2 characters");
      }

      updateData.skillsTest = updateData.skillsTest.trim();
    }

    return await SkillsMaster.findOneAndUpdate(
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
    console.error(`Error updating skills with id ${id}:`, error);
    throw error;
  }
}

// =====================================
// Delete Skills
// =====================================

export async function deleteSkillsService(id: string, deleteBy: string) {
  try {
    return await SkillsMaster.findOneAndUpdate(
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
    console.error(`Error deleting skills with id ${id}:`, error);
    throw error;
  }
}

// =====================================
// Get All Skills For Admin
// =====================================

export async function getAllSkillsForAdminService() {
  try {
    return await SkillsMaster.find();
  } catch (error) {
    console.error("Error getting skills for admin:", error);
    throw error;
  }
}
