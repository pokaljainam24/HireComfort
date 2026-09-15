import express from "express";

import {
  createCompanyType,
  getCompanyTypes,
  getCompanyType,
  updateCompanyType,
  deleteCompanyType,
} from "../../controllers/CompanyController/CompanyController.js";

const router = express.Router();

// Create Company Type
router.post("/", createCompanyType);

// Get all Company Types
router.get("/", getCompanyTypes);

// Get Company Type by ID
router.get("/:id", getCompanyType);

// Update Company Type
router.put("/:id", updateCompanyType);

// Delete Company Type
router.delete("/:id", deleteCompanyType);

export default router;