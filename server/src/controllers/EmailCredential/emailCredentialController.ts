import type { Request, Response } from "express";

import {
  createEmailCredentialService,
  getEmailCredentialService,
  getEmailCredentialByIdService,
  updateEmailCredentialService,
  deleteEmailCredentialService,
} from "../../services/emailCredentialServices/emailCredentialService.js";

// =====================================
// Create
// =====================================

export const createEmailCredential = async (req: Request, res: Response) => {
  try {
    const emailCredential = await createEmailCredentialService({
      ...req.body,
      createdBy: "admin",
    });

    return res.status(201).json({
      message: "Email credential created successfully",
      emailCredential,
    });
  } catch (error: any) {
    console.error("Create Email Credential Controller Error:", error);

    return res.status(500).json({
      message: error.message || "Failed to create email credential",
    });
  }
};

// =====================================
// Get All
// =====================================

export const getEmailCredentials = async (req: Request, res: Response) => {
  try {
    const emailCredentials = await getEmailCredentialService();

    return res.status(200).json({
      emailCredentials,
    });
  } catch (error: any) {
    console.error("Get Email Credentials Controller Error:", error);

    return res.status(500).json({
      message: error.message || "Failed to fetch email credentials",
    });
  }
};

// =====================================
// Get By ID
// =====================================

export const getEmailCredential = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      return res.status(400).json({
        message: "Email credential ID is required",
      });
    }

    const emailCredential = await getEmailCredentialByIdService(id);

    if (!emailCredential) {
      return res.status(404).json({
        message: "Email credential not found",
      });
    }

    return res.status(200).json({
      emailCredential,
    });
  } catch (error: any) {
    console.error("Get Email Credential Controller Error:", error);

    return res.status(500).json({
      message: error.message || "Failed to fetch email credential",
    });
  }
};

// =====================================
// Update
// =====================================

export const updateEmailCredential = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      return res.status(400).json({
        message: "Email credential ID is required",
      });
    }

    const emailCredential = await updateEmailCredentialService(id, {
      ...req.body,
      updatedBy: "admin",
    });

    if (!emailCredential) {
      return res.status(404).json({
        message: "Email credential not found",
      });
    }

    return res.status(200).json({
      message: "Email credential updated successfully",
      emailCredential,
    });
  } catch (error: any) {
    console.error("Update Email Credential Controller Error:", error);

    return res.status(500).json({
      message: error.message || "Failed to update email credential",
    });
  }
};

// =====================================
// Delete
// =====================================

export const deleteEmailCredential = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      return res.status(400).json({
        message: "Email credential ID is required",
      });
    }

    const emailCredential = await deleteEmailCredentialService(id, "admin");

    if (!emailCredential) {
      return res.status(404).json({
        message: "Email credential not found",
      });
    }

    return res.status(200).json({
      message: "Email credential deleted successfully",
      emailCredential,
    });
  } catch (error: any) {
    console.error("Delete Email Credential Controller Error:", error);

    return res.status(500).json({
      message: error.message || "Failed to delete email credential",
    });
  }
};
