import type { Request, Response } from "express";

import {
  createInterviewMasterService,
  getInterviewMastersService,
  getInterviewMasterByIdService,
  updateInterviewMasterService,
  deleteInterviewMasterService,
} from "../../services/recruiterServices/InterviewMasterService.js";

// Create Interview
export const createInterviewMaster = async (req: Request, res: Response) => {
  try {
    const interview = await createInterviewMasterService({
      ...req.body,
      createdBy: "admin",
    });

    return res.status(201).json({
      message: "Interview created successfully",
      interview,
    });
  } catch (error) {
    console.error("Error creating interview:", error);

    return res.status(500).json({
      message: "Error creating interview",
    });
  }
};

// Get All Interviews
export const getInterviewMasters = async (req: Request, res: Response) => {
  try {
    const interviews = await getInterviewMastersService();

    return res.status(200).json({
      interviews,
    });
  } catch (error) {
    console.error("Error getting interviews:", error);

    return res.status(500).json({
      message: "Error getting interviews",
    });
  }
};

// Get Interview By ID
export const getInterviewMaster = async (req: Request, res: Response) => {
  try {
    const interviewId = req.params.id;

    if (typeof interviewId !== "string") {
      return res.status(400).json({
        message: "Invalid interview ID",
      });
    }

    const interview = await getInterviewMasterByIdService(interviewId);

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found",
      });
    }

    return res.status(200).json({
      interview,
    });
  } catch (error) {
    console.error("Error getting interview:", error);

    return res.status(500).json({
      message: "Error getting interview",
    });
  }
};

// Update Interview
export const updateInterviewMaster = async (req: Request, res: Response) => {
  try {
    const interviewId = req.params.id;

    if (typeof interviewId !== "string") {
      return res.status(400).json({
        message: "Invalid interview ID",
      });
    }

    const interview = await updateInterviewMasterService(interviewId, {
      ...req.body,
      updatedBy: "admin",
    });

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found",
      });
    }

    return res.status(200).json({
      message: "Interview updated successfully",
      interview,
    });
  } catch (error) {
    console.error("Error updating interview:", error);

    return res.status(500).json({
      message: "Error updating interview",
    });
  }
};

// Delete Interview
export const deleteInterviewMaster = async (req: Request, res: Response) => {
  try {
    const interviewId = req.params.id;

    if (typeof interviewId !== "string") {
      return res.status(400).json({
        message: "Invalid interview ID",
      });
    }

    const deleteBy = "admin";

    const interview = await deleteInterviewMasterService(interviewId, deleteBy);

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found",
      });
    }

    return res.status(200).json({
      message: "Interview deleted successfully",
      interview,
    });
  } catch (error) {
    console.error("Error deleting interview:", error);

    return res.status(500).json({
      message: "Error deleting interview",
    });
  }
};
