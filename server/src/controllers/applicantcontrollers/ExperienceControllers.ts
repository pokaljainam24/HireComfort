import type { Request, Response } from "express";

import {
  createExperienceService,
  getAllExperienceService,
  getExperienceByIdService,
  getExperienceByApplicantService,
  updateExperienceService,
  deleteExperienceService,
} from "../../services/applicantServices/experienceService.js";


// =========================
// CREATE EXPERIENCE
// =========================

export const createExperience = async (
  req: Request,
  res: Response
) => {
  try {
    const experience =
      await createExperienceService(req.body);

    return res.status(201).json({
      success: true,
      message: "Experience created successfully",
      data: experience,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =========================
// GET ALL EXPERIENCE
// =========================

export const getAllExperience = async (
  req: Request,
  res: Response
) => {
  try {
    const experiences =
      await getAllExperienceService();

    return res.status(200).json({
      success: true,
      data: experiences,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =========================
// GET EXPERIENCE BY ID
// =========================

export const getExperienceById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const experience =
      await getExperienceByIdService(
        req.params.id
      );

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: experience,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =========================
// GET EXPERIENCE BY APPLICANT
// =========================

export const getExperienceByApplicant = async (
  req: Request<{ applicantId: string }>,
  res: Response
) => {
  try {
    const experiences =
      await getExperienceByApplicantService(
        req.params.applicantId
      );

    return res.status(200).json({
      success: true,
      data: experiences,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =========================
// UPDATE EXPERIENCE
// =========================

export const updateExperience = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const experience =
      await updateExperienceService(
        req.params.id,
        req.body
      );

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Experience updated successfully",
      data: experience,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =========================
// DELETE EXPERIENCE
// =========================

export const deleteExperience = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const experience =
      await deleteExperienceService(
        req.params.id,
        req.body.deleteBy
      );

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Experience deleted successfully",
      data: experience,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};