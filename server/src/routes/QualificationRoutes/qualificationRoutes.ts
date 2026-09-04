import express from "express";

import {
  createQualification,
  getQualifications,
  getQualification,
  updateQualification,
  deleteQualification,
} from "../../controllers/QualificationController/qualificationController.js";

const qualificationRoutes = express.Router();

qualificationRoutes.post("/", createQualification);

qualificationRoutes.get("/", getQualifications);

qualificationRoutes.get("/:id", getQualification);

qualificationRoutes.patch("/:id", updateQualification);

qualificationRoutes.delete("/:id", deleteQualification);

export default qualificationRoutes;
