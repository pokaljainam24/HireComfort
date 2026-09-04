import { Router } from "express";

import {
  createJobSubCategory,
  getJobSubCategories,
  getJobSubCategory,
  updateJobSubCategory,
  deleteJobSubCategory,
} from "../../controllers/JobSubCategoryController/jobSubCategoryController.js";

import uploadJobSubCategoryIcon from "../../middleware/uploadIcon.js";

const router = Router();

router.post("/", uploadJobSubCategoryIcon.single("icon"), createJobSubCategory);

router.get("/", getJobSubCategories);

router.get("/:id", getJobSubCategory);

router.patch(
  "/:id",
  uploadJobSubCategoryIcon.single("icon"),
  updateJobSubCategory,
);

router.delete("/:id", deleteJobSubCategory);

export default router;
