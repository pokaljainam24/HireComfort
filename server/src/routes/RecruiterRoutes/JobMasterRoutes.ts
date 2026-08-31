import express from "express";

import {
  createJobMaster,
  getJobMasters,
  getJobMaster,
  updateJobMaster,
  deleteJobMaster,
} from "../../controllers/Recruiter/JobMasterController.js";

const router = express.Router();

// Create Job
router.post("/", createJobMaster);

// Get All Jobs
router.get("/", getJobMasters);

// Get Job By ID
router.get("/:id", getJobMaster);

// Update Job
router.patch("/:id", updateJobMaster);

// Soft Delete Job
router.delete("/:id", deleteJobMaster);

export default router;
