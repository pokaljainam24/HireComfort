import type { Request, Response } from "express";

import {
  createApplicantService,
  getApplicantsService,
  getApplicantByIdService,
  updateApplicantService,
  deleteApplicantService,
  updateActiveService,
  updateDisplayService,
  getApplicantByUsernameService,
} from "../../services/applicantServices/applicantService.js";


/* =========================
   CREATE
========================= */

export const createApplicant = async (
  req: Request,
  res: Response
) => {
  try {
    const applicant = await createApplicantService(req.body);

    res.status(201).json({
      success: true,
      message: "Applicant created successfully",
      data: applicant,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


/* =========================
   GET ALL
========================= */

export const getApplicants = async (
  req: Request,
  res: Response
) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await getApplicantsService(page, limit);

    res.status(200).json({
      success: true,
      data: result.applicants,
      pagination: result.pagination,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* =========================
   GET BY ID
========================= */

export const getApplicantById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const applicant = await getApplicantByIdService(req.params.id);

    if (!applicant) {
      res.status(404).json({
        success: false,
        message: "Applicant not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      data: applicant,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* =========================
   UPDATE
========================= */

export const updateApplicant = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const applicant = await updateApplicantService(
      req.params.id,
      req.body
    );

    if (!applicant) {
      res.status(404).json({
        success: false,
        message: "Applicant not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "Applicant updated successfully",
      data: applicant,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


/* =========================
   SOFT DELETE
========================= */

export const deleteApplicant = async (
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

    const applicant = await deleteApplicantService(
      req.params.id,
      deleteBy
    );

    if (!applicant) {
      res.status(404).json({
        success: false,
        message: "Applicant not found or already deleted",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "Applicant deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* =========================
   ACTIVE / INACTIVE
========================= */

export const updateActive = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const applicant = await updateActiveService(
      req.params.id,
      req.body.isActive,
      req.body.updatedBy
    );

    if (!applicant) {
      res.status(404).json({
        success: false,
        message: "Applicant not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "Applicant active status updated",
      data: applicant,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* =========================
   DISPLAY / HIDE
========================= */

export const updateDisplay = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const applicant = await updateDisplayService(
      req.params.id,
      req.body.isDisplay,
      req.body.updatedBy
    );

    if (!applicant) {
      res.status(404).json({
        success: false,
        message: "Applicant not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "Applicant display status updated",
      data: applicant,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   GET APPLICANT BY USERNAME
========================= */

export const getApplicantByUsername = async (
  req: Request<{ username: string }>,
  res: Response
) => {
  try {
    const applicant = await getApplicantByUsernameService(
      req.params.username
    );

    if (!applicant) {
      return res.status(404).json({
        success: false,
        message: "Applicant not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: applicant,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


