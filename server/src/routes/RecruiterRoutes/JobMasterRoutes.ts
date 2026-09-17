import express from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";

import {
  createJobMaster,
  getJobMasters,
  getJobMastersByRecruiter,
  getJobMaster,
  updateJobMaster,
  deleteJobMaster,
  createJobMasterByRecruiterId
} from "../../controllers/Recruiter/JobMasterController.js";

const router = express.Router();

// Create Job
router.post("/", createJobMaster);

router.post("/recruiter", createJobMasterByRecruiterId);

// Get All Jobs
router.get("/", getJobMasters);

// Get Jobs for recruiter
router.get("/recruiter", authMiddleware, getJobMastersByRecruiter);

// Get Job By ID
router.get("/:id", getJobMaster);

// Update Job
router.patch("/:id", updateJobMaster);

// Soft Delete Job
router.delete("/:id", deleteJobMaster);

export default router;
