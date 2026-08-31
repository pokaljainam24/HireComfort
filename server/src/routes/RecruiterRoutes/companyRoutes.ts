import express from "express";

import {
  createCompany,
  getCompanys,
  getCompany,
  updateCompany,
  deleteCompany,
} from "../../controllers/Recruiter/companyController.js";

const companyRoutes = express.Router();

companyRoutes.post("/", createCompany);
companyRoutes.get("/", getCompanys);
companyRoutes.get("/:id", getCompany);
companyRoutes.patch("/:id", updateCompany);
companyRoutes.delete("/:id", deleteCompany);

export default companyRoutes;