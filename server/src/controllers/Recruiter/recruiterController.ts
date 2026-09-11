import type { Request, Response } from "express";

import {
  createRecruiterService,
  getRecruitersService,
  getRecruiterByIdService,
  updateRecruiterService,
  deleteRecruiterService,
  getRecruiterAnalyticsService,
  updatePasswordService,
} from "../../services/recruiterServices/recruiterService.js";


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

export const getRecruiterAnalytics = async (req: Request, res: Response) => {
  try {
    const analytics = await getRecruiterAnalyticsService();
    return res.status(200).json({
      success: true,
      analytics,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching analytics",
      error,
    });
  }
};


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

export const updatePassword = async (req: Request, res: Response) => {
  try {
    const recruiterId = req.params.id;
    const { password, confirmPassword, currentPassword } = req.body;

    if (!recruiterId || typeof recruiterId !== "string" || !recruiterId.trim()) {
      return res.status(400).json({
        message: "Invalid recruiter ID",
      });
    }

    if (!currentPassword || typeof currentPassword !== "string" || !currentPassword.trim()) {
      return res.status(400).json({
        message: "Current password is required",
      });
    }

    if (!password || typeof password !== "string") {
      return res.status(400).json({
        message: "Password is required",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must contain at least 8 characters",
      });
    }

    if (!confirmPassword || typeof confirmPassword !== "string") {
      return res.status(400).json({
        message: "Confirm password is required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Password and Confirm Password do not match",
      });
    }

    const recruiter = await updatePasswordService(
      recruiterId,
      password,
      currentPassword,
      "admin",
    );

    if (!recruiter) {
      return res.status(404).json({
        message: "Recruiter not found",
      });
    }

    return res.status(200).json({
      message: "Password updated successfully",
      recruiter,
    });
  } catch (error: any) {
    console.error("Error updating password:", error);

    return res.status(400).json({
      message: error.message || "Error updating password",
    });
  }
};