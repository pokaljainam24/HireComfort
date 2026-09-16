import type { Request, Response } from "express";

import {
  createSkillsService,
  getSkillsService,
  getSkillsByIdService,
  updateSkillsService,
  deleteSkillsService,
} from "../../services/SkillsServices/skillsServices.js";

// =====================================
// Create Skills
// =====================================

export const createSkills = async (
  req: Request,
  res: Response,
) => {
  try {
    const {
      skillId,
      name,
      category,
      description,
    } = req.body;

    // ==============================
    // Validation
    // ==============================

    if (!skillId?.trim()) {
      return res.status(400).json({
        message: "Skill ID is required",
      });
    }

    if (!name?.trim()) {
      return res.status(400).json({
        message: "Skill name is required",
      });
    }

    if (name.trim().length < 2) {
      return res.status(400).json({
        message:
          "Skill name must contain at least 2 characters",
      });
    }

    if (!category?.trim()) {
      return res.status(400).json({
        message: "Skill category is required",
      });
    }

    const skills = await createSkillsService({
      skillId: skillId.trim(),
      name: name.trim(),
      category: category.trim(),
      description: description?.trim() || "",
      createdBy: "admin",
    });

    return res.status(201).json({
      message: "Skills created successfully",
      skills,
    });
  } catch (error: any) {
    console.error("Error creating skills:", error);

    return res.status(500).json({
      message:
        error.message || "Error creating skills",
    });
  }
};

// =====================================
// Get All Skills
// =====================================

export const getSkills = async (
  req: Request,
  res: Response,
) => {
  try {
    const skills = await getSkillsService();

    return res.status(200).json({
      skills,
    });
  } catch (error: any) {
    console.error("Error getting skills:", error);

    return res.status(500).json({
      message:
        error.message || "Error getting skills",
    });
  }
};

// =====================================
// Get Skills By ID
// =====================================

export const getSkill = async (
  req: Request,
  res: Response,
) => {
  try {
    const skillsId = String(req.params.id);

    if (!skillsId) {
      return res.status(400).json({
        message: "Invalid skills ID",
      });
    }

    const skills =
      await getSkillsByIdService(skillsId);

    if (!skills) {
      return res.status(404).json({
        message: "Skills not found",
      });
    }

    return res.status(200).json({
      skills,
    });
  } catch (error: any) {
    console.error("Error getting skills:", error);

    return res.status(500).json({
      message:
        error.message || "Error getting skills",
    });
  }
};

// =====================================
// Update Skills
// =====================================

export const updateSkills = async (
  req: Request,
  res: Response,
) => {
  try {
    const skillsId = String(req.params.id);

    if (!skillsId) {
      return res.status(400).json({
        message: "Invalid skills ID",
      });
    }

    const {
      skillId,
      name,
      category,
      description,
      isActive,
      isDisplay,
    } = req.body;

    // ==============================
    // Validation
    // ==============================

    if (
      skillId !== undefined &&
      !skillId?.trim()
    ) {
      return res.status(400).json({
        message: "Skill ID is required",
      });
    }

    if (
      name !== undefined &&
      !name?.trim()
    ) {
      return res.status(400).json({
        message: "Skill name is required",
      });
    }

    if (
      name !== undefined &&
      name.trim().length < 2
    ) {
      return res.status(400).json({
        message:
          "Skill name must contain at least 2 characters",
      });
    }

    if (
      category !== undefined &&
      !category?.trim()
    ) {
      return res.status(400).json({
        message: "Skill category is required",
      });
    }

    // ==============================
    // Update Data
    // ==============================

    const updateData: Record<string, any> = {};

    if (skillId !== undefined) {
      updateData.skillId = skillId.trim();
    }

    if (name !== undefined) {
      updateData.name = name.trim();
    }

    if (category !== undefined) {
      updateData.category = category.trim();
    }

    if (description !== undefined) {
      updateData.description =
        description.trim();
    }

    if (isActive !== undefined) {
      updateData.isActive = Boolean(isActive);
    }

    if (isDisplay !== undefined) {
      updateData.isDisplay =
        Boolean(isDisplay);
    }

    updateData.updatedBy = "admin";

    const skills =
      await updateSkillsService(
        skillsId,
        updateData,
      );

    if (!skills) {
      return res.status(404).json({
        message: "Skills not found",
      });
    }

    return res.status(200).json({
      message: "Skills updated successfully",
      skills,
    });
  } catch (error: any) {
    console.error(
      "Error updating skills:",
      error,
    );

    return res.status(500).json({
      message:
        error.message || "Error updating skills",
    });
  }
};

// =====================================
// Delete Skills
// =====================================

export const deleteSkills = async (
  req: Request,
  res: Response,
) => {
  try {
    const skillsId = String(req.params.id);

    if (!skillsId) {
      return res.status(400).json({
        message: "Invalid skills ID",
      });
    }

    const deleteBy = "admin";

    const skills =
      await deleteSkillsService(
        skillsId,
        deleteBy,
      );

    if (!skills) {
      return res.status(404).json({
        message: "Skills not found",
      });
    }

    return res.status(200).json({
      message: "Skills deleted successfully",
      skills,
    });
  } catch (error: any) {
    console.error(
      "Error deleting skills:",
      error,
    );

    return res.status(500).json({
      message:
        error.message || "Error deleting skills",
    });
  }
};
