import { Router } from "express";

import {
  createJobCategory,
  getJobCategories,
  getJobCategory,
  updateJobCategory,
  deleteJobCategory,
} from "../../controllers/JobCategoryController/jobCategoryController.js";

import { authMiddleware } from "../../middleware/authMiddleware.js";

import uploadJobCategoryIcon from "../../middleware/uploadIcon.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  uploadJobCategoryIcon.single("icon"),
  createJobCategory,
);

router.get("/", getJobCategories);

router.get("/:id", getJobCategory);

router.patch(
  "/:id",
  authMiddleware,
  uploadJobCategoryIcon.single("icon"),
  updateJobCategory,
);

router.delete("/:id", authMiddleware, deleteJobCategory);

export default router;