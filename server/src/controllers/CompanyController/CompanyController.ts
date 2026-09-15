import type { Request, Response } from "express";

import {
  createCompanyTypeService,
  getCompanyTypesService,
  getCompanyTypeByIdService,
  updateCompanyTypeService,
  deleteCompanyTypeService,
} from "../../services/CompanyTypes/companyTypesServices.js";

// CREATE
export const createCompanyType = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      companyTypeId,
      code,
      name,
      description,
    } = req.body;

    if (!companyTypeId) {
      return res.status(400).json({
        message: "Company Type ID is required",
      });
    }

    if (!code) {
      return res.status(400).json({
        message: "Company Type code is required",
      });
    }

    if (!name) {
      return res.status(400).json({
        message: "Company Type name is required",
      });
    }

    const companyType = await createCompanyTypeService({
      companyTypeId,
      code,
      name,
      description,
    });

    return res.status(201).json({
      message: "Company type created successfully",
      companyType,
    });
  } catch (error: any) {
    console.error(
      "Create Company Type Controller Error:",
      error
    );

    return res.status(500).json({
      message:
        error.message || "Failed to create company type",
    });
  }
};

// GET ALL
export const getCompanyTypes = async (
  req: Request,
  res: Response
) => {
  try {
    const companyTypes = await getCompanyTypesService();

    return res.status(200).json({
      companyTypes,
    });
  } catch (error: any) {
    console.error(
      "Get Company Types Controller Error:",
      error
    );

    return res.status(500).json({
      message:
        error.message || "Failed to get company types",
    });
  }
};

// GET BY ID
export const getCompanyType = async (
  req: Request,
  res: Response
) => {
  try {
    const id = String(req.params.id);

    const companyType =
      await getCompanyTypeByIdService(id);

    if (!companyType) {
      return res.status(404).json({
        message: "Company type not found",
      });
    }

    return res.status(200).json({
      companyType,
    });
  } catch (error: any) {
    console.error(
      "Get Company Type Controller Error:",
      error
    );

    return res.status(500).json({
      message:
        error.message || "Failed to get company type",
    });
  }
};

// UPDATE
export const updateCompanyType = async (
  req: Request,
  res: Response
) => {
  try {
    const id = String(req.params.id);

    const {
      companyTypeId,
      code,
      name,
      description,
      isActive,
      isDisplay,
    } = req.body;

    const companyType =
      await updateCompanyTypeService(id, {
        companyTypeId,
        code,
        name,
        description,
        isActive,
        isDisplay,
      });

    if (!companyType) {
      return res.status(404).json({
        message: "Company type not found",
      });
    }

    return res.status(200).json({
      message: "Company type updated successfully",
      companyType,
    });
  } catch (error: any) {
    console.error(
      "Update Company Type Controller Error:",
      error
    );

    return res.status(500).json({
      message:
        error.message || "Failed to update company type",
    });
  }
};

// DELETE
export const deleteCompanyType = async (
  req: Request,
  res: Response
) => {
  try {
    const id = String(req.params.id);

    const companyType =
      await deleteCompanyTypeService(id);

    if (!companyType) {
      return res.status(404).json({
        message: "Company type not found",
      });
    }

    return res.status(200).json({
      message: "Company type deleted successfully",
      companyType,
    });
  } catch (error: any) {
    console.error(
      "Delete Company Type Controller Error:",
      error
    );

    return res.status(500).json({
      message:
        error.message || "Failed to delete company type",
    });
  }
};