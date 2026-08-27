import { Router } from "express";

import {
  createApplicant,
  getApplicants,
  getApplicantById,
  updateApplicant,
  deleteApplicant,
} from "../../controllers/applicantcontrollers/applicantController.js";
 
const router = Router();

router.post("/", createApplicant);

router.get("/", getApplicants);

router.get("/:id", getApplicantById);

router.put("/:id", updateApplicant);

router.delete("/:id", deleteApplicant);

export default router;