import express from "express";

import {
  createCompany,
  getCompanys,
  getCompany,
  updateCompany,
  deleteCompany,
  getCompanyByRecruiterId
} from "../../controllers/Recruiter/companyController.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const companyRoutes = express.Router();

companyRoutes.post("/", authMiddleware, createCompany);
companyRoutes.get("/", getCompanys);
companyRoutes.get("/:id", getCompany);
companyRoutes.get("/recruiter/:id", getCompanyByRecruiterId)
companyRoutes.patch("/:id", updateCompany);
companyRoutes.delete("/:id", deleteCompany);

export default companyRoutes;