import { Router } from "express";

import {
  createApplicant,
  getApplicants,
  getApplicantById,
  updateApplicant,
  deleteApplicant,
  getApplicantByUsername,
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

import {
  createCertificate,
  getAllCertificates,
  getCertificateById,
  getCertificatesByApplicant,
  updateCertificate,
  deleteCertificate,
} from "../../controllers/applicantcontrollers/certificateController.js";

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

router.patch(
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
   Applicant Certificates
========================= */

router.post(
  "/applicant-certificates",
  createCertificate
);

// Get all certificates
router.get(
  "/applicant-certificates",
  getAllCertificates
);

// Get certificates by applicant
// Keep this BEFORE /:id
router.get(
  "/applicant-certificates/applicant/:applicantId",
  getCertificatesByApplicant
);

// Get certificate by ID
router.get(
  "/applicant-certificates/:id",
  getCertificateById
);

// Update certificate
router.patch(
  "/applicant-certificates/:id",
  updateCertificate
);

// Soft delete certificate
router.delete(
  "/applicant-certificates/:id",
  deleteCertificate
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

router.patch(
  "/:id",
  updateApplicant
);

router.delete(
  "/:id",
  deleteApplicant
);

router.get(
  "/username/:username",
  getApplicantByUsername
);




export default router;