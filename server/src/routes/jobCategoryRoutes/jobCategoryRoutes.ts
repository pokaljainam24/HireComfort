import { Router } from "express";

import {
  createJobCategory,
  getJobCategories,
  getJobCategory,
  updateJobCategory,
  deleteJobCategory,
} from "../../controllers/JobCategoryController/jobCategoryController.js";

import uploadJobCategoryIcon from "../../middleware/uploadIcon.js";


const router = Router();

// =====================================
// CREATE JOB CATEGORY
// =====================================

router.post("/", uploadJobCategoryIcon.single("icon"), createJobCategory);

// =====================================
// GET ALL JOB CATEGORIES
// =====================================

router.get("/", getJobCategories);

// =====================================
// GET JOB CATEGORY BY ID
// =====================================

router.get("/:id", getJobCategory);

// =====================================
// UPDATE JOB CATEGORY
// =====================================

router.patch("/:id", uploadJobCategoryIcon.single("icon"), updateJobCategory);

// =====================================
// DELETE JOB CATEGORY
// =====================================

router.delete("/:id", deleteJobCategory);

export default router;
