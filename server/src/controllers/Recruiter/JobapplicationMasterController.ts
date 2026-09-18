import type { Request, Response } from "express";

import {
  createJobApplicationService,
  getJobApplicationsService,
  getJobApplicationByIdService,
  updateJobApplicationService,
  deleteJobApplicationService,
} from "../../services/recruiterServices/JobapplicationMasterService.js";
import { getJobMasterByIdService } from "../../services/recruiterServices/JobMasterService.js";


import type { ICompanyMaster } from "../../models/RecruiterModel/Companymodel.js";

// Create Job Application
export const createJobApplication = async (
  req: Request,
  res: Response
) => {
  try {
    const { applicantId, applicationDate, appliedAt, createdBy, jobId } = req.body;

    const job = await getJobMasterByIdService(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const company = job.companyId as unknown as (ICompanyMaster & { _id: any }) | null;

    const payload: any = {
      jobId,
      applicantId,
      applicationDate,
      appliedAt,
      createdBy,
      companyId: company?._id || job.companyId,
    };
    if (company?.recruiterId) {
      payload.recruiterId = company.recruiterId;
    }

    const jobApplication = await createJobApplicationService(payload);

    return res.status(201).json({
      message: "Job Application submitted successfully",
      jobApplication,
    });
  } catch (error: any) {
    console.error(
      "Error creating job application:",
      error
    );

    return res.status(400).json({
      message: error?.message || "Error creating job application",
    });
  }
};

// Get All Job Applications
export const getJobApplications = async (
  req: Request,
  res: Response
) => {
  try {
    const jobApplications =
      await getJobApplicationsService();

    return res.status(200).json({
      jobApplications,
    });
  } catch (error) {
    console.error(
      "Error getting job applications:",
      error
    );

    return res.status(500).json({
      message: "Error getting job applications",
    });
  }
};


// Get Job Application By ID
export const getJobApplication = async (
  req: Request,
  res: Response
) => {
  try {
    const jobApplicationId = req.params.id;

    if (typeof jobApplicationId !== "string") {
      return res.status(400).json({
        message: "Invalid job application ID",
      });
    }

    const jobApplication =
      await getJobApplicationByIdService(
        jobApplicationId
      );

    if (!jobApplication) {
      return res.status(404).json({
        message: "Job application not found",
      });
    }

    return res.status(200).json({
      jobApplication,
    });
  } catch (error) {
    console.error(
      "Error getting job application:",
      error
    );

    return res.status(500).json({
      message: "Error getting job application",
    });
  }
};


// Update Job Application
export const updateJobApplication = async (
  req: Request,
  res: Response
) => {
  try {
    const jobApplicationId = req.params.id;

    if (typeof jobApplicationId !== "string") {
      return res.status(400).json({
        message: "Invalid job application ID",
      });
    }

    const jobApplication =
      await updateJobApplicationService(
        jobApplicationId,
        {
          ...req.body,
          updatedBy: "admin",
        }
      );

    if (!jobApplication) {
      return res.status(404).json({
        message: "Job application not found",
      });
    }

    return res.status(200).json({
      message: "Job application updated successfully",
      jobApplication,
    });
  } catch (error) {
    console.error(
      "Error updating job application:",
      error
    );

    return res.status(500).json({
      message: "Error updating job application",
    });
  }
};

export const updateJobApplicationStatus = async (
  req: Request,
  res: Response
) => {
  try {
    const jobApplicationId = req.params.id;

    if (typeof jobApplicationId !== "string") {
      return res.status(400).json({
        message: "Invalid job application ID",
      });
    }

    const { status, rejectedAtRound } = req.body;

    // If rejecting, rejectedAtRound must be provided
    if (status === "Rejected") {
      if (
        typeof rejectedAtRound !== "number" ||
        rejectedAtRound < 1
      ) {
        return res.status(400).json({
          message: "rejectedAtRound is required when rejecting an application",
        });
      }
    }

    const updateData: any = {
      applicationStatus: status,
      updatedBy: "admin",
    };

    if (status === "Rejected") {
      updateData.rejectedAtRound = rejectedAtRound;
    } else {
      // Clear old rejection information if the applicant
      // is moved back into the interview process.
      updateData.rejectedAtRound = null;
    }

    const updatedStatus = await updateJobApplicationService(
      jobApplicationId,
      updateData
    );

    if (!updatedStatus) {
      return res.status(404).json({
        message: "Job application not found",
      });
    }

    return res.status(200).json({
      message: "Job application updated successfully",
      updatedStatus,
    });
  } catch (error) {
    console.error(
      "Error updating job application status:",
      error
    );

    return res.status(500).json({
      message: "Error updating job application",
    });
  }
};




// Delete Job Application
export const deleteJobApplication = async (
  req: Request,
  res: Response
) => {
  try {
    const jobApplicationId = req.params.id;

    if (typeof jobApplicationId !== "string") {
      return res.status(400).json({
        message: "Invalid job application ID",
      });
    }

    const deleteBy = "admin";

    const jobApplication =
      await deleteJobApplicationService(
        jobApplicationId,
        deleteBy
      );

    if (!jobApplication) {
      return res.status(404).json({
        message: "Job application not found",
      });
    }

    return res.status(200).json({
      message: "Job application deleted successfully",
      jobApplication,
    });
  } catch (error) {
    console.error(
      "Error deleting job application:",
      error
    );

    return res.status(500).json({
      message: "Error deleting job application",
    });
  }
};
