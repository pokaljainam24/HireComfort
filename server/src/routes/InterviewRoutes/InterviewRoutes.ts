
import { Router } from "express";

import {
  createInterviewRoundController,
  getInterviewRoundsController,
  getInterviewRoundByIdController,
  getInterviewRoundsByApplicantController,
  getInterviewRoundsByJobController,
  getInterviewRoundsByCompanyController,
  updateInterviewRoundController,
  deleteInterviewRoundController,
} from "../../controllers/InterviewController/InterviewController.js";

const router = Router();

// =====================================
// Create
// =====================================

router.post(
  "/",
  createInterviewRoundController,
);

// =====================================
// Get All
// =====================================

router.get(
  "/",
  getInterviewRoundsController,
);

// =====================================
// Get By Applicant
// =====================================

router.get(
  "/applicant/:applicantId",
  getInterviewRoundsByApplicantController,
);

// =====================================
// Get By Job
// =====================================

router.get(
  "/job/:jobMasterId",
  getInterviewRoundsByJobController,
);

// =====================================
// Get By Company
// =====================================

router.get(
  "/company/:companyId",
  getInterviewRoundsByCompanyController,
);

// =====================================
// Get By ID
// =====================================

router.get(
  "/:id",
  getInterviewRoundByIdController,
);

// =====================================
// Update
// =====================================

router.put(
  "/:id",
  updateInterviewRoundController,
);

// =====================================
// Delete
// =====================================

router.delete(
  "/:id",
  deleteInterviewRoundController,
);

export default router;

