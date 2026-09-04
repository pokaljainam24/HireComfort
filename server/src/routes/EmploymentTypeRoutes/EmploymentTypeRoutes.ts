import { Router } from "express";

import {
  createEmploymentType,
  getEmploymentTypes,
  getEmploymentType,
  updateEmploymentType,
  deleteEmploymentType,
} from "../../controllers/EmploymentTypecontroller/EmploymentTypecontroller.js";

const router = Router();

// =====================================
// Employment Type Routes
// =====================================

// Create
router.post("/", createEmploymentType);

// Get All
router.get("/", getEmploymentTypes);

// Get By ID
router.get("/:id", getEmploymentType);

// Update
router.put("/:id", updateEmploymentType);

// Delete
router.delete("/:id", deleteEmploymentType);

export default router;