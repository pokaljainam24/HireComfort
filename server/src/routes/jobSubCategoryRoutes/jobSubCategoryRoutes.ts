import { Router } from "express";

import {
  createJobSubCategory,
  getJobSubCategories,
  getJobSubCategory,
  updateJobSubCategory,
  deleteJobSubCategory,
} from "../../controllers/JobSubCategoryController/jobSubCategoryController.js";

import { authMiddleware } from "../../middleware/authMiddleware.js";

import uploadJobSubCategoryIcon from "../../middleware/uploadIcon.js";

const router = Router();

// =====================================
// CREATE
// =====================================

router.post(
  "/",
  authMiddleware,
  uploadJobSubCategoryIcon.single("icon"),
  createJobSubCategory,
);

// =====================================
// GET ALL
// =====================================

router.get(
  "/",
  getJobSubCategories,
);

// =====================================
// GET BY ID
// =====================================

router.get(
  "/:id",
  getJobSubCategory,
);

// =====================================
// UPDATE
// =====================================

router.patch(
  "/:id",
  authMiddleware,
  uploadJobSubCategoryIcon.single("icon"),
  updateJobSubCategory,
);

// =====================================
// DELETE
// =====================================

router.delete(
  "/:id",
  authMiddleware,
  deleteJobSubCategory,
);

export default router;
