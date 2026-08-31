import { Router } from "express";

import {
  createJobApplication,
  getJobApplications,
  getJobApplication,
  updateJobApplication,
  deleteJobApplication,
} from "../../controllers/Recruiter/JobapplicationMasterController.js";

const router = Router();

// Create Job Application
router.post("/", createJobApplication);

// Get All Job Applications
router.get("/", getJobApplications);

// Get Job Application By ID
router.get("/:id", getJobApplication);

// Update Job Application
router.patch("/:id", updateJobApplication);

// Delete Job Application
router.delete("/:id", deleteJobApplication);

export default router;

