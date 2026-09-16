import express from "express";

import {
  createQualification,
  getQualifications,
  getQualification,
  updateQualification,
  deleteQualification,
} from "../../controllers/QualificationController/qualificationController.js";

const qualificationRoutes = express.Router();

// =====================================
// Create Qualification
// =====================================

qualificationRoutes.post(
  "/",
  createQualification,
);

// =====================================
// Get All Qualifications
// =====================================

qualificationRoutes.get(
  "/",
  getQualifications,
);

// =====================================
// Get Qualification By ID
// =====================================

qualificationRoutes.get(
  "/:id",
  getQualification,
);

// =====================================
// Update Qualification
// =====================================

qualificationRoutes.patch(
  "/:id",
  updateQualification,
);

// =====================================
// Delete Qualification
// =====================================

qualificationRoutes.delete(
  "/:id",
  deleteQualification,
);

export default qualificationRoutes;
