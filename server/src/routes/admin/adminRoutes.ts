import { Router } from "express";
import {
  createCity,
  createCountry,
  createState,
  deleteCity,
  deleteCountry,
  deleteState,
  getCities,
  getCountries,
  getStates,
  updateCity,
  updateCountry,
  updateState,
} from "../../controllers/admin/locationController.js";

import {
  createJobCategoryController,
  deleteJobCategoryController,
  getJobCategoriesController,
  getJobCategoryByIdController,
  updateJobCategoryController,
} from "../../controllers/admin/jobCategoriesController.js";
import {
  createJobSubCategoryController,
  deleteJobSubCategoryController,
  getJobSubCategoriesController,
  getJobSubCategoryByIdController,
  updateJobSubCategoryController,
} from "../../controllers/admin/jobSubCategoriesController.js";
import {
  createEventController,
  getEventsByJobController,
  getEventsByApplicantController,
  getEventsByTypeController,
  getEventsController
} from "../../controllers/admin/analyticsEventsController.js";
import {
  createAnalyticsController,
  deleteAnalyticsController,
  getAnalyticsByIdController,
  getAnalyticsByJobController,
  incrementAnalyticsController,
  updateAnalyticsController,
} from "../../controllers/admin/analyticsMasterController.js";

import { createRecruiter, getRecruiter, getRecruiters, updateRecruiter, deleteRecruiter } from "../../controllers/Recruiter/recruiterController.js";
import { createCompany, deleteCompany, getCompany, getCompanys, updateCompany } from "../../controllers/Recruiter/companyController.js";
import { deleteApplicant, getApplicantById, getApplicants, updateApplicant } from "../../controllers/applicantcontrollers/applicantController.js";
import { getProfile, updateProfile } from "../../controllers/admin/profileController.js";

const router = Router();

router.get("/profile", getProfile);
router.patch("/profile", updateProfile);

router.post("/recruiters", createRecruiter);
router.get("/recruiters", getRecruiters);
router.get("/recruiters/:id", getRecruiter);
router.patch("/recruiters/:id", updateRecruiter);
router.delete("/recruiters/:id", deleteRecruiter);

router.get("/applicants", getApplicants);
router.get("/applicants/:id", getApplicantById);
router.patch("/applicants/:id", updateApplicant);
router.delete("/applicants/:id", deleteApplicant);


router.get("/analytics-event", getEventsController);
router.post("/analytics-event/", createEventController);
router.get("/analytics-event/job/:jobId", getEventsByJobController);
router.get("/analytics-event/applicant/:applicantId", getEventsByApplicantController);
router.get("/analytics-event/type/:eventType", getEventsByTypeController);

// router.get("/jobs");
// router.get("/jobs/:id");
// router.delete("/jobs/:id");

// router.get("/applications");
// router.get("/applications/:id");

// router.get("/interviews");
// router.get("/interviews/:id");

router.post("/companies", createCompany);
router.get("/companies", getCompanys);
router.get("/companies/:id", getCompany);
router.delete("/companies/:id", deleteCompany);
router.patch("/companies/:id", updateCompany);

// Location management routes
router.get("/countries", getCountries);
router.delete("/countries/:id", deleteCountry);
router.patch("/countries/:id", updateCountry);
router.delete("/states/:id", deleteState);

router.get("/states", getStates);
router.post("/countries", createCountry);
router.post("/states", createState);
router.patch("/states/:id", updateState);

router.patch("/cities/:id", updateCity);
router.get("/cities", getCities);
router.post("/cities", createCity);
router.delete("/cities/:id", deleteCity);

// Job categories and sub categories management routes
router.get("/job-categories", getJobCategoriesController);
router.get("/job-categories/:id", getJobCategoryByIdController);
router.post("/job-categories", createJobCategoryController);
router.patch("/job-categories/:id", updateJobCategoryController);
router.delete("/job-categories/:id", deleteJobCategoryController);

router.get("/job-subcategories", getJobSubCategoriesController);
router.get("/job-subcategories/:id", getJobSubCategoryByIdController);
router.post("/job-subcategories", createJobSubCategoryController);
router.patch("/job-subcategories/:id", updateJobSubCategoryController);
router.delete("/job-subcategories/:id", deleteJobSubCategoryController);

router.post("/analytics/", createAnalyticsController);
router.get("/analytics/:id", getAnalyticsByIdController);
// Note: can provide the startDate and endDate as query params in getAnalyticsByJobController
router.get("/analytics/job/:jobId", getAnalyticsByJobController);
router.patch("/analytics/:id", updateAnalyticsController);
router.patch("/analytics/job/:jobId/increment", incrementAnalyticsController);
router.delete("/analytics/:id", deleteAnalyticsController);

export default router;
