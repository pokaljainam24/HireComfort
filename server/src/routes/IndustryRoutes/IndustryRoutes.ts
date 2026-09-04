import { Router } from "express";

import {
  createIndustry,
  getIndustries,
  getIndustry,
  updateIndustry,
  deleteIndustry,
} from "../../controllers/IndustryController/IndustryController.js";

const router = Router();

// =====================================
// Industry Routes
// =====================================

// Create
router.post("/", createIndustry);

// Get All
router.get("/", getIndustries);

// Get By ID
router.get("/:id", getIndustry);

// Update
router.put("/:id", updateIndustry);

// Delete
router.delete("/:id", deleteIndustry);

export default router;