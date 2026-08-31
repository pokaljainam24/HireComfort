import type {
  Request,
  Response,
} from "express";

import {
  createApplicantEducationService,
  getApplicantEducationService,
  getApplicantEducationByIdService,
  updateApplicantEducationService,
  deleteApplicantEducationService,
  updateEducationActiveService,
} from "../../services/applicantServices/educationServices.js";


/* =========================
   CREATE EDUCATION
========================= */

export const createApplicantEducation = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      applicantId,
      education,
      passingYear,
      percentageOrCGPA,
      isActive,
      createdBy,
    } = req.body;

    // Validate applicantId
    if (!applicantId) {
      res.status(400).json({
        success: false,
        message: "applicantId is required",
      });

      return;
    }

    // Validate required fields
    if (!education) {
      res.status(400).json({
        success: false,
        message: "education is required",
      });

      return;
    }

    if (passingYear === undefined || passingYear === null) {
      res.status(400).json({
        success: false,
        message: "passingYear is required",
      });

      return;
    }

    if (
      percentageOrCGPA === undefined ||
      percentageOrCGPA === null
    ) {
      res.status(400).json({
        success: false,
        message: "percentageOrCGPA is required",
      });

      return;
    }

    const educationData = {
      applicantId: String(applicantId),
      education,
      passingYear,
      percentageOrCGPA,
      isActive,
      createdBy,
    };

    const result =
      await createApplicantEducationService(
        educationData
      );

    res.status(201).json({
      success: true,
      message:
        "Applicant education created successfully",
      data: result,
    });
  } catch (error: any) {
    const message =
      error?.message || "Failed to create education";

    if (message === "Applicant not found") {
      res.status(404).json({
        success: false,
        message,
      });

      return;
    }

    if (message === "Invalid applicantId") {
      res.status(400).json({
        success: false,
        message,
      });

      return;
    }

    res.status(500).json({
      success: false,
      message,
    });
  }
};


/* =========================
   GET ALL EDUCATION
========================= */

export const getApplicantEducation = async (
  req: Request,
  res: Response
) => {
  try {
    const page = Math.max(
      Number(req.query.page) || 1,
      1
    );

    const limit = Math.max(
      Number(req.query.limit) || 10,
      1
    );

    const applicantId = req.query.applicantId
      ? String(req.query.applicantId)
      : undefined;

    const result =
      await getApplicantEducationService(
        page,
        limit,
        applicantId
      );

    res.status(200).json({
      success: true,
      data: result.education,
      pagination: result.pagination,
    });
  } catch (error: any) {
    const message =
      error?.message ||
      "Failed to fetch applicant education";

    if (
      message === "Invalid applicantId" ||
      message === "Applicant not found"
    ) {
      res.status(400).json({
        success: false,
        message,
      });

      return;
    }

    res.status(500).json({
      success: false,
      message,
    });
  }
};

/* =========================
   GET EDUCATION BY APPLICANT ID
========================= */
export const getApplicantEducationByApplicantId =
  async (
    req: Request<{ applicantId: string }>,
    res: Response
  ) => {
    try {
      const applicantId =
        req.params.applicantId;

      const result =
        await getApplicantEducationService(
          1,
          100,
          applicantId
        );

      res.status(200).json({
        success: true,
        data: result.education,
        pagination: result.pagination,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };


/* =========================
   GET EDUCATION BY ID
========================= */

export const getApplicantEducationById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const education =
      await getApplicantEducationByIdService(
        req.params.id
      );

    res.status(200).json({
      success: true,
      data: education,
    });
  } catch (error: any) {
    const message =
      error?.message ||
      "Failed to fetch applicant education";

    if (
      message === "Invalid education ID"
    ) {
      res.status(400).json({
        success: false,
        message,
      });

      return;
    }

    if (
      message === "Education record not found"
    ) {
      res.status(404).json({
        success: false,
        message,
      });

      return;
    }

    res.status(500).json({
      success: false,
      message,
    });
  }
};


/* =========================
   UPDATE EDUCATION
========================= */

export const updateApplicantEducation = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const education =
      await updateApplicantEducationService(
        req.params.id,
        req.body
      );

    res.status(200).json({
      success: true,
      message:
        "Applicant education updated successfully",
      data: education,
    });
  } catch (error: any) {
    const message =
      error?.message ||
      "Failed to update applicant education";

    if (
      message === "Invalid education ID"
    ) {
      res.status(400).json({
        success: false,
        message,
      });

      return;
    }

    if (
      message === "Education record not found"
    ) {
      res.status(404).json({
        success: false,
        message,
      });

      return;
    }

    res.status(500).json({
      success: false,
      message,
    });
  }
};


/* =========================
   SOFT DELETE EDUCATION
========================= */

export const deleteApplicantEducation = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { deleteBy } = req.body;

    if (!deleteBy) {
      res.status(400).json({
        success: false,
        message: "deleteBy is required",
      });

      return;
    }

    const education =
      await deleteApplicantEducationService(
        req.params.id,
        deleteBy
      );

    res.status(200).json({
      success: true,
      message:
        "Applicant education deleted successfully",
      data: education,
    });
  } catch (error: any) {
    const message =
      error?.message ||
      "Failed to delete applicant education";

    if (
      message === "Invalid education ID"
    ) {
      res.status(400).json({
        success: false,
        message,
      });

      return;
    }

    if (
      message === "Education record not found"
    ) {
      res.status(404).json({
        success: false,
        message,
      });

      return;
    }

    res.status(500).json({
      success: false,
      message,
    });
  }
};


/* =========================
   ACTIVE / INACTIVE
========================= */

export const updateEducationActive = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { isActive, updatedBy } = req.body;

    if (typeof isActive !== "boolean") {
      res.status(400).json({
        success: false,
        message:
          "isActive must be a boolean value",
      });

      return;
    }

    if (!updatedBy) {
      res.status(400).json({
        success: false,
        message: "updatedBy is required",
      });

      return;
    }

    const education =
      await updateEducationActiveService(
        req.params.id,
        isActive,
        updatedBy
      );

    res.status(200).json({
      success: true,
      message:
        "Applicant education active status updated",
      data: education,
    });
  } catch (error: any) {
    const message =
      error?.message ||
      "Failed to update education status";

    if (
      message === "Invalid education ID"
    ) {
      res.status(400).json({
        success: false,
        message,
      });

      return;
    }

    if (
      message === "Education record not found"
    ) {
      res.status(404).json({
        success: false,
        message,
      });

      return;
    }

    res.status(500).json({
      success: false,
      message,
    });
  }
};