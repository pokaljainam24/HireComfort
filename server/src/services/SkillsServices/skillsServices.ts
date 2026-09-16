import SkillsMaster from "../../models/SkillsModel/skillsModel.js";

export type ISkillsMaster = InstanceType<typeof SkillsMaster>;

// =====================================
// Create Skills
// =====================================

export async function createSkillsService(
  skillsData: Partial<ISkillsMaster>,
) {
  try {
    // ==============================
    // Skills Validation
    // ==============================

    if (!skillsData.skillId?.trim()) {
      throw new Error("Skill ID is required");
    }

    if (!skillsData.name?.trim()) {
      throw new Error("Skill name is required");
    }

    if (skillsData.name.trim().length < 2) {
      throw new Error(
        "Skill name must contain at least 2 characters",
      );
    }

    if (!skillsData.category?.trim()) {
      throw new Error("Skill category is required");
    }

    // ==============================
    // Create Skills
    // ==============================

    const skills = new SkillsMaster({
      ...skillsData,

      skillId: skillsData.skillId.trim(),
      name: skillsData.name.trim(),
      category: skillsData.category.trim(),
      description: skillsData.description?.trim() || "",
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
    const skills = await SkillsMaster.find().sort({
      name: 1,
    });

    console.log("Skills from MongoDB:", skills);

    return skills;
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
      deleteAt: null,
    });
  } catch (error) {
    console.error(
      `Error getting skills with id ${id}:`,
      error,
    );
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
    // ==============================
    // Skill ID Validation
    // ==============================

    if (updateData.skillId !== undefined) {
      if (!updateData.skillId.trim()) {
        throw new Error("Skill ID is required");
      }

      updateData.skillId = updateData.skillId.trim();
    }

    // ==============================
    // Name Validation
    // ==============================

    if (updateData.name !== undefined) {
      if (!updateData.name.trim()) {
        throw new Error("Skill name is required");
      }

      if (updateData.name.trim().length < 2) {
        throw new Error(
          "Skill name must contain at least 2 characters",
        );
      }

      updateData.name = updateData.name.trim();
    }

    // ==============================
    // Category Validation
    // ==============================

    if (updateData.category !== undefined) {
      if (!updateData.category.trim()) {
        throw new Error("Skill category is required");
      }

      updateData.category = updateData.category.trim();
    }

    // ==============================
    // Description
    // ==============================

    if (updateData.description !== undefined) {
      updateData.description =
        updateData.description.trim();
    }

    return await SkillsMaster.findOneAndUpdate(
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
      `Error updating skills with id ${id}:`,
      error,
    );
    throw error;
  }
}

// =====================================
// Delete Skills
// =====================================

export async function deleteSkillsService(
  id: string,
  deleteBy: string,
) {
  try {
    return await SkillsMaster.findOneAndUpdate(
      {
        _id: id,
        isActive: true,
        isDisplay: true,
        deleteAt: null,
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
      `Error deleting skills with id ${id}:`,
      error,
    );
    throw error;
  }
}

// =====================================
// Get All Skills For Admin
// =====================================

export async function getAllSkillsForAdminService() {
  try {
    return await SkillsMaster.find().sort({
      name: 1,
    });
  } catch (error) {
    console.error(
      "Error getting skills for admin:",
      error,
    );
    throw error;
  }
}