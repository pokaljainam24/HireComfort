import type { Request, Response } from "express";

import {
  createEmailTemplateService,
  getEmailTemplateService,
  getEmailTemplateByIdService,
  updateEmailTemplateService,
  deleteEmailTemplateService,
} from "../../services/emailTemplatesServices/emailTemplateService.js";

// =====================================
// Create
// =====================================

export const createEmailTemplate = async (req: Request, res: Response) => {
  try {
    const emailTemplate = await createEmailTemplateService({
      ...req.body,
      createdBy: "admin",
    });

    return res.status(201).json({
      message: "Email template created successfully",
      emailTemplate,
    });
  } catch (error: any) {
    console.error("Create Email Template Controller Error:", error);

    return res.status(500).json({
      message: error.message || "Failed to create email template",
    });
  }
};

// =====================================
// Get All
// =====================================

export const getEmailTemplates = async (req: Request, res: Response) => {
  try {
    const emailTemplates = await getEmailTemplateService();

    return res.status(200).json({
      emailTemplates,
    });
  } catch (error: any) {
    console.error("Get Email Templates Controller Error:", error);

    return res.status(500).json({
      message: error.message || "Failed to fetch email templates",
    });
  }
};

// =====================================
// Get By ID
// =====================================

export const getEmailTemplate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      return res.status(400).json({
        message: "Email template ID is required",
      });
    }

    const emailTemplate = await getEmailTemplateByIdService(id);

    if (!emailTemplate) {
      return res.status(404).json({
        message: "Email template not found",
      });
    }

    return res.status(200).json({
      emailTemplate,
    });
  } catch (error: any) {
    console.error("Get Email Template Controller Error:", error);

    return res.status(500).json({
      message: error.message || "Failed to fetch email template",
    });
  }
};

// =====================================
// Update
// =====================================

export const updateEmailTemplate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      return res.status(400).json({
        message: "Email template ID is required",
      });
    }

    const emailTemplate = await updateEmailTemplateService(id, {
      ...req.body,
      updatedBy: "admin",
    });

    if (!emailTemplate) {
      return res.status(404).json({
        message: "Email template not found",
      });
    }

    return res.status(200).json({
      message: "Email template updated successfully",
      emailTemplate,
    });
  } catch (error: any) {
    console.error("Update Email Template Controller Error:", error);

    return res.status(500).json({
      message: error.message || "Failed to update email template",
    });
  }
};

// =====================================
// Delete
// =====================================

export const deleteEmailTemplate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      return res.status(400).json({
        message: "Email template ID is required",
      });
    }

    const emailTemplate = await deleteEmailTemplateService(id, "admin");

    if (!emailTemplate) {
      return res.status(404).json({
        message: "Email template not found",
      });
    }

    return res.status(200).json({
      message: "Email template deleted successfully",
      emailTemplate,
    });
  } catch (error: any) {
    console.error("Delete Email Template Controller Error:", error);

    return res.status(500).json({
      message: error.message || "Failed to delete email template",
    });
  }
};
