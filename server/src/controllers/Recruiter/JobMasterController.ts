import type { Request, Response } from "express";

import {
  createJobMasterService,
  getJobMastersService,
  getJobMasterByIdService,
  updateJobMasterService,
  deleteJobMasterService,
} from "../../services/recruiterServices/JobMasterService.js";

// Create Job
export const createJobMaster = async (req: Request, res: Response) => {
  try {
    const jobMaster = await createJobMasterService({
      ...req.body,
      createdBy: "admin",
    });

    return res.status(201).json({
      message: "Job created successfully",
      jobMaster,
    });
  } catch (error: any) {
    console.error("Error creating job:", error);

    return res.status(500).json({
      message: "Error creating job",
      error: error.message,
    });
  }
};

// Get All Jobs
export const getJobMasters = async (req: Request, res: Response) => {
  try {
    const jobs = await getJobMastersService();

    return res.status(200).json({
      jobs,
    });
  } catch (error) {
    console.error("Error getting jobs:", error);

    return res.status(500).json({
      message: "Error getting jobs",
    });
  }
};

// Get Job By ID
export const getJobMaster = async (req: Request, res: Response) => {
  try {
    const jobMasterId = req.params.id;

    if (typeof jobMasterId !== "string") {
      return res.status(400).json({
        message: "Invalid job ID",
      });
    }

    const jobMaster = await getJobMasterByIdService(jobMasterId);

    if (!jobMaster) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    return res.status(200).json({
      jobMaster,
    });
  } catch (error) {
    console.error("Error getting job:", error);

    return res.status(500).json({
      message: "Error getting job",
    });
  }
};

// Update Job
export const updateJobMaster = async (req: Request, res: Response) => {
  try {
    const jobMasterId = req.params.id;

    if (typeof jobMasterId !== "string") {
      return res.status(400).json({
        message: "Invalid job ID",
      });
    }

    const jobMaster = await updateJobMasterService(jobMasterId, {
      ...req.body,
      updatedBy: "admin",
    });

    if (!jobMaster) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    return res.status(200).json({
      message: "Job updated successfully",
      jobMaster,
    });
  } catch (error) {
    console.error("Error updating job:", error);

    return res.status(500).json({
      message: "Error updating job",
    });
  }
};

// Delete Job
export const deleteJobMaster = async (req: Request, res: Response) => {
  try {
    const jobMasterId = req.params.id;

    if (typeof jobMasterId !== "string") {
      return res.status(400).json({
        message: "Invalid job ID",
      });
    }

    const deleteBy = "admin";

    const jobMaster = await deleteJobMasterService(jobMasterId, deleteBy);

    if (!jobMaster) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    return res.status(200).json({
      message: "Job deleted successfully",
      jobMaster,
    });
  } catch (error) {
    console.error("Error deleting job:", error);

    return res.status(500).json({
      message: "Error deleting job",
    });
  }
};
