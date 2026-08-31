import { Router } from "express";

import {
  createApplicant,
  getApplicants,
  getApplicantById,
  updateApplicant,
  deleteApplicant,
  getApplicantByUsername,
} from "../../controllers/applicantController/applicantController.js";

import {
  createApplicantEducation,
  getApplicantEducation,
  getApplicantEducationByApplicantId,
  getApplicantEducationById,
  updateApplicantEducation,
  deleteApplicantEducation,
  updateEducationActive,
} from "../../controllers/applicantController/educationController.js";

import {
  createCertificate,
  getAllCertificates,
  getCertificateById,
  getCertificatesByApplicant,
  updateCertificate,
  deleteCertificate,
} from "../../controllers/applicantController/certificateController.js";

import {
  createExperience,
  getAllExperience,
  getExperienceById,
  getExperienceByApplicant,
  updateExperience,
  deleteExperience,
} from "../../controllers/applicantController/ExperienceControllers.js";

import {
  createProject,
  getAllProjects,
  getProjectById,
  getProjectsByApplicant,
  updateProject,
  deleteProject,
} from "../../controllers/applicantController/projectController.js";

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

/* ====================
   APPLICANT EXPERIENCE
=======================*/


router.post(
  "/applicant-experience",
  createExperience
);

router.get(
  "/applicant-experience",
  getAllExperience
);

router.get(
  "/applicant-experience/applicant/:applicantId",
  getExperienceByApplicant
);

router.get(
  "/applicant-experience/:id",
  getExperienceById
);

router.patch(
  "/applicant-experience/:id",
  updateExperience
);

router.delete(
  "/applicant-experience/:id",
  deleteExperience
);

/* =========================
   APPLICANT PROJECTS
========================= */

router.post(
  "/applicant-projects",
  createProject
);

router.get(
  "/applicant-projects",
  getAllProjects
);

router.get(
  "/applicant-projects/applicant/:applicantId",
  getProjectsByApplicant
);

router.get(
  "/applicant-projects/:id",
  getProjectById
);

router.patch(
  "/applicant-projects/:id",
  updateProject
);

router.delete(
  "/applicant-projects/:id",
  deleteProject
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

router.get(
  "/username/:username",
  getApplicantByUsername
);




export default router;