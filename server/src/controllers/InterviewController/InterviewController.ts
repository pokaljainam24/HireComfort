
import type { Request, Response } from "express";

import {
  createInterviewRoundService,
  getInterviewRoundsService,
  getInterviewRoundByIdService,
  getInterviewRoundsByApplicantService,
  getInterviewRoundsByJobService,
  getInterviewRoundsByCompanyService,
  updateInterviewRoundService,
  deleteInterviewRoundService,
} from "../../services/InterviewServices/InterviewService.js";

// =====================================
// Create
// =====================================

export async function createInterviewRoundController(
  req: Request,
  res: Response,
) {
  try {
    const interviewRound =
      await createInterviewRoundService(req.body);

    return res.status(201).json({
      success: true,
      message: "Interview round created successfully",
      data: interviewRound,
    });
  } catch (error: unknown) {
    console.error(
      "Error creating interview round:",
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create interview round",
    });
  }
}

// =====================================
// Get All
// =====================================

export async function getInterviewRoundsController(
  req: Request,
  res: Response,
) {
  try {
    const interviewRounds =
      await getInterviewRoundsService();

    return res.status(200).json({
      success: true,
      message: "Interview rounds fetched successfully",
      data: interviewRounds,
    });
  } catch (error: unknown) {
    console.error(
      "Error getting interview rounds:",
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to get interview rounds",
    });
  }
}

// =====================================
// Get By ID
// =====================================

export async function getInterviewRoundByIdController(
  req: Request<{ id: string }>,
  res: Response,
) {
  try {
    const { id } = req.params;

    const interviewRound =
      await getInterviewRoundByIdService(id);

    if (!interviewRound) {
      return res.status(404).json({
        success: false,
        message: "Interview round not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Interview round fetched successfully",
      data: interviewRound,
    });
  } catch (error: unknown) {
    console.error(
      `Error getting interview round with id ${req.params.id}:`,
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to get interview round",
    });
  }
}

// =====================================
// Get By Applicant
// =====================================

export async function getInterviewRoundsByApplicantController(
  req: Request<{ applicantId: string }>,
  res: Response,
) {
  try {
    const { applicantId } = req.params;

    const interviewRounds =
      await getInterviewRoundsByApplicantService(
        applicantId,
      );

    return res.status(200).json({
      success: true,
      message:
        "Applicant interview rounds fetched successfully",
      data: interviewRounds,
    });
  } catch (error: unknown) {
    console.error(
      `Error getting interview rounds for applicant ${req.params.applicantId}:`,
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to get applicant interview rounds",
    });
  }
}

// =====================================
// Get By Job
// =====================================

export async function getInterviewRoundsByJobController(
  req: Request<{ jobMasterId: string }>,
  res: Response,
) {
  try {
    const { jobMasterId } = req.params;

    const interviewRounds =
      await getInterviewRoundsByJobService(
        jobMasterId,
      );

    return res.status(200).json({
      success: true,
      message:
        "Job interview rounds fetched successfully",
      data: interviewRounds,
    });
  } catch (error: unknown) {
    console.error(
      `Error getting interview rounds for job ${req.params.jobMasterId}:`,
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to get job interview rounds",
    });
  }
}

// =====================================
// Get By Company
// =====================================

export async function getInterviewRoundsByCompanyController(
  req: Request<{ companyId: string }>,
  res: Response,
) {
  try {
    const { companyId } = req.params;

    const interviewRounds =
      await getInterviewRoundsByCompanyService(
        companyId,
      );

    return res.status(200).json({
      success: true,
      message:
        "Company interview rounds fetched successfully",
      data: interviewRounds,
    });
  } catch (error: unknown) {
    console.error(
      `Error getting interview rounds for company ${req.params.companyId}:`,
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to get company interview rounds",
    });
  }
}

// =====================================
// Update
// =====================================

export async function updateInterviewRoundController(
  req: Request<{ id: string }>,
  res: Response,
) {
  try {
    const { id } = req.params;

    const interviewRound =
      await updateInterviewRoundService(
        id,
        req.body,
      );

    if (!interviewRound) {
      return res.status(404).json({
        success: false,
        message: "Interview round not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Interview round updated successfully",
      data: interviewRound,
    });
  } catch (error: unknown) {
    console.error(
      `Error updating interview round with id ${req.params.id}:`,
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update interview round",
    });
  }
}

// =====================================
// Delete
// =====================================

export async function deleteInterviewRoundController(
  req: Request<{ id: string }>,
  res: Response,
) {
  try {
    const { id } = req.params;

    const interviewRound =
      await deleteInterviewRoundService(id);

    if (!interviewRound) {
      return res.status(404).json({
        success: false,
        message: "Interview round not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Interview round deleted successfully",
      data: interviewRound,
    });
  } catch (error: unknown) {
    console.error(
      `Error deleting interview round with id ${req.params.id}:`,
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to delete interview round",
    });
  }
}




