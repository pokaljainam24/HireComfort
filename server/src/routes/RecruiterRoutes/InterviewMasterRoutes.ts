import express from "express";

import {
  createInterviewMaster,
  getInterviewMasters,
  getInterviewMaster,
  updateInterviewMaster,
  deleteInterviewMaster,
} from "../../controllers/Recruiter/InterviewMasterController.js";

const router = express.Router();

// Create Interview
router.post("/", createInterviewMaster);

// Get All Interviews
router.get("/", getInterviewMasters);

// Get Interview By ID
router.get("/:id", getInterviewMaster);

// Update Interview
router.patch("/:id", updateInterviewMaster);

// Delete Interview
router.delete("/:id", deleteInterviewMaster);

export default router;
