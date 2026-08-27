import type { Request, Response } from "express";

import {
  createRecruiterService,
  getRecruitersService,
  getRecruiterByIdService,
  updateRecruiterService,
  deleteRecruiterService,
} from "../../services/recruiterServices/recruiterService.js";

/* =========================
   CREATE
========================= */

export const createRecruiter = async (req: Request, res: Response) => {
  try {
    // TODO: Replace "admin" with the actual user ID from the request (e.g., req.user.id) when authentication is implemented.
    const recruiter = await createRecruiterService({
      ...req.body,
      createdBy: "admin",
    });

    return res.status(201).json({
      message: "Recruiter created successfully",
      recruiter,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating recruiter",
      error,
    });
  }
};

/* =========================
    GET ALL
========================= */

export const getRecruiters = async (req: Request, res: Response) => {
  try {
    const recruiters = await getRecruitersService();

    return res.status(200).json({
      recruiters,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error getting recruiters",
      error,
    });
  }
};

/* =========================
    GET BY ID
========================= */

export const getRecruiter = async (req: Request, res: Response) => {
  try {
    const recruiterId = req.params.id;

    if (typeof recruiterId !== "string") {
      return res.status(400).json({
        message: "Invalid recruiter ID",
      });
    }

    const recruiter = await getRecruiterByIdService(recruiterId);

    if (!recruiter) {
      return res.status(404).json({
        message: "Recruiter not found",
      });
    }

    return res.status(200).json({
      recruiter,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error getting recruiter",
      error,
    });
  }
};



/* =========================
    UPDATE
========================= */

export const updateRecruiter = async (req: Request, res: Response) => {
  try {
    const recruiterId = req.params.id;

    if (typeof recruiterId !== "string") {
      return res.status(400).json({
        message: "Invalid recruiter ID",
      });
    }

    const recruiter = await updateRecruiterService(
      recruiterId,
      req.body,
      "admin",
    );

    if (!recruiter) {
      return res.status(404).json({
        message: "Recruiter not found",
      });
    }

    return res.status(200).json({
      message: "Recruiter updated successfully",
      recruiter,
    });
  } catch (error) {
    console.error("Error updating recruiter:", error);

    return res.status(500).json({
      message: "Error updating recruiter",
      error,
    });
  }
};



/* =========================
   DELETE
========================= */

export const deleteRecruiter = async (req: Request, res: Response) => {
  try {
    const recruiterId = req.params.id;

    if (typeof recruiterId !== "string") {
      return res.status(400).json({
        message: "Invalid recruiter ID",
      });
    }

    const deleteBy = "admin";

    const recruiter = await deleteRecruiterService(recruiterId, deleteBy);

    if (!recruiter) {
      return res.status(404).json({
        message: "Recruiter not found",
      });
    }

    return res.status(200).json({
      message: "Recruiter deleted successfully",
      recruiter,
    });
  } catch (error) {
    console.error("Error deleting recruiter:", error);

    return res.status(500).json({
      message: "Error deleting recruiter",
    });
  }
};
