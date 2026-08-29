import type { Request, Response } from "express";

import {
  createCompanyService,
  getCompanyService,
  getCompanyByIdService,
  updateCompanyService,
  deleteCompanyService,
} from "../../services/recruiterServices/companyService.js";

export const createCompany = async (req: Request, res: Response) => {
  try {
    const company = await createCompanyService({
      ...req.body,
      createdBy: "admin",
    });

    return res.status(201).json({
      message: "Company created successfully",
      company,
    });
  } catch (error) {
    console.error("Error creating company:", error);

    return res.status(500).json({
      message: "Error creating company",
    });
  }
};

export const getCompanys = async (req: Request, res: Response) => {
  try {
    const companies = await getCompanyService();

    return res.status(200).json({
      companies,
    });
  } catch (error) {
    console.error("Error getting companies:", error);

    return res.status(500).json({
      message: "Error getting companies",
    });
  }
};

export const getCompany = async (req: Request, res: Response) => {
  try {
    const companyId = req.params.id;

    if (typeof companyId !== "string") {
      return res.status(400).json({
        message: "Invalid company ID",
      });
    }

    const company = await getCompanyByIdService(companyId);

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    return res.status(200).json({
      company,
    });
  } catch (error) {
    console.error("Error getting company:", error);

    return res.status(500).json({
      message: "Error getting company",
    });
  }
};

export const updateCompany = async (req: Request, res: Response) => {
  try {
    const companyId = req.params.id;

    if (typeof companyId !== "string") {
      return res.status(400).json({
        message: "Invalid company ID",
      });
    }

    const company = await updateCompanyService(companyId, {
      ...req.body,
      updatedBy: "admin",
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    return res.status(200).json({
      message: "Company updated successfully",
      company,
    });
  } catch (error) {
    console.error("Error updating company:", error);

    return res.status(500).json({
      message: "Error updating company",
    });
  }
};

export const deleteCompany = async (req: Request, res: Response) => {
  try {
    const companyId = req.params.id;

    if (typeof companyId !== "string") {
      return res.status(400).json({
        message: "Invalid company ID",
      });
    }

    const deleteBy = "admin";

    const company = await deleteCompanyService(companyId, deleteBy);

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    return res.status(200).json({
      message: "Company deleted successfully",
      company,
    });
  } catch (error) {
    console.error("Error deleting company:", error);

    return res.status(500).json({
      message: "Error deleting company",
    });
  }
};
