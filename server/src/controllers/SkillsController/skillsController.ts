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

export const createSkills = async (req: Request, res: Response) => {
  try {
    const skills = await createSkillsService({
      ...req.body,
      createdBy: "admin",
    });

    return res.status(201).json({
      message: "Skills created successfully",
      skills,
    });
  } catch (error) {
    console.error("Error creating skills:", error);

    return res.status(500).json({
      message: "Error creating skills",
    });
  }
};

// =====================================
// Get All Skills
// =====================================

export const getSkills = async (req: Request, res: Response) => {
  try {
    const skills = await getSkillsService();

    return res.status(200).json({
      skills,
    });
  } catch (error) {
    console.error("Error getting skills:", error);

    return res.status(500).json({
      message: "Error getting skills",
    });
  }
};

// =====================================
// Get Skills By ID
// =====================================

export const getSkill = async (req: Request, res: Response) => {
  try {
    const skillsId = req.params.id;

    if (typeof skillsId !== "string") {
      return res.status(400).json({
        message: "Invalid skills ID",
      });
    }

    const skills = await getSkillsByIdService(skillsId);

    if (!skills) {
      return res.status(404).json({
        message: "Skills not found",
      });
    }

    return res.status(200).json({
      skills,
    });
  } catch (error) {
    console.error("Error getting skills:", error);

    return res.status(500).json({
      message: "Error getting skills",
    });
  }
};

// =====================================
// Update Skills
// =====================================

export const updateSkills = async (req: Request, res: Response) => {
  try {
    const skillsId = req.params.id;

    if (typeof skillsId !== "string") {
      return res.status(400).json({
        message: "Invalid skills ID",
      });
    }

    const skills = await updateSkillsService(skillsId, {
      ...req.body,
      updatedBy: "admin",
    });

    if (!skills) {
      return res.status(404).json({
        message: "Skills not found",
      });
    }

    return res.status(200).json({
      message: "Skills updated successfully",
      skills,
    });
  } catch (error) {
    console.error("Error updating skills:", error);

    return res.status(500).json({
      message: "Error updating skills",
    });
  }
};

// =====================================
// Delete Skills
// =====================================

export const deleteSkills = async (req: Request, res: Response) => {
  try {
    const skillsId = req.params.id;

    if (typeof skillsId !== "string") {
      return res.status(400).json({
        message: "Invalid skills ID",
      });
    }

    const deleteBy = "admin";

    const skills = await deleteSkillsService(skillsId, deleteBy);

    if (!skills) {
      return res.status(404).json({
        message: "Skills not found",
      });
    }

    return res.status(200).json({
      message: "Skills deleted successfully",
      skills,
    });
  } catch (error) {
    console.error("Error deleting skills:", error);

    return res.status(500).json({
      message: "Error deleting skills",
    });
  }
};
