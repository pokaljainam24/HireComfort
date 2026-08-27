import { Router } from "express";

import {
  createApplicant,
  getApplicants,
  getApplicantById,
  updateApplicant,
  deleteApplicant,
} from "../../controllers/applicantcontrollers/applicantController.js";

import {
  createApplicantEducation,
  getApplicantEducation,
  getApplicantEducationByApplicantId,
  getApplicantEducationById,
  updateApplicantEducation,
  deleteApplicantEducation,
  updateEducationActive,
} from "../../controllers/applicantcontrollers/educationController.js";

const router = Router();


/* =========================
   APPLICANT EDUCATION
========================= */

router.post(
  "/applicant-education",
  createApplicantEducation
);

router.get(
  "/applicant-education",
  getApplicantEducation
);

router.get(
  "/applicant-education/applicant/:applicantId",
  getApplicantEducationByApplicantId
);

router.get(
  "/applicant-education/:id",
  getApplicantEducationById
);

router.put(
  "/applicant-education/:id",
  updateApplicantEducation
);

router.delete(
  "/applicant-education/:id",
  deleteApplicantEducation
);

router.patch(
  "/applicant-education/:id/active",
  updateEducationActive
);


/* =========================
   APPLICANT MASTER
========================= */

router.post(
  "/",
  createApplicant
);

router.get(
  "/",
  getApplicants
);

router.get(
  "/:id",
  getApplicantById
);

router.put(
  "/:id",
  updateApplicant
);

router.delete(
  "/:id",
  deleteApplicant
);


export default router;