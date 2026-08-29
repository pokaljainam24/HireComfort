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
import { createRecruiter, getRecruiter, getRecruiters, updateRecruiter, deleteRecruiter } from "../../controllers/Recruiter/recruiterController.js";

const router = Router();

router.post("/recruiters", createRecruiter);

router.get("/recruiters", getRecruiters);

router.get("/recruiters/:id", getRecruiter);

router.patch("/recruiters/:id", updateRecruiter);

router.delete("/recruiters/:id", deleteRecruiter);

// router.get("/applicants");
// router.get("/applicants/:id");
// router.delete("/applicants/:id");

// router.get("/jobs");
// router.get("/jobs/:id");
// router.delete("/jobs/:id");

// router.get("/applications");
// router.get("/applications/:id");

// router.get("/interviews");
// router.get("/interviews/:id");

// router.get("/companies");
// router.get("/companies/:id");

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

export default router;
