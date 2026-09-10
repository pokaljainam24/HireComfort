import type { Request, Response } from "express";

import {
  createFaqService,
  getFaqService,
  getFaqByIdService,
  updateFaqService,
  deleteFaqService,
} from "../../services/faqServices/faqService.js";

// =====================================
// Create FAQ
// =====================================

export const createFaq = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const faq = await createFaqService({
      ...req.body,
      createdBy: req.user.username,
    });

    return res.status(201).json({
      message: "FAQ created successfully",
      faq,
    });
  } catch (error: any) {
    console.error("Create FAQ Controller Error:", error);

    return res.status(500).json({
      message: error.message || "Failed to create FAQ",
    });
  }
};

// =====================================
// Get FAQs
// =====================================

export const getFaqs = async (req: Request, res: Response) => {
  try {
    const faqs = await getFaqService();

    return res.status(200).json({
      faqs,
    });
  } catch (error: any) {
    console.error("Get FAQs Controller Error:", error);

    return res.status(500).json({
      message: error.message || "Failed to get FAQs",
    });
  }
};

// =====================================
// Get FAQ By ID
// =====================================

export const getFaq = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      return res.status(400).json({
        message: "Invalid FAQ ID",
      });
    }

    const faq = await getFaqByIdService(id);

    if (!faq) {
      return res.status(404).json({
        message: "FAQ not found",
      });
    }

    return res.status(200).json({
      faq,
    });
  } catch (error: any) {
    console.error("Get FAQ By ID Controller Error:", error);

    return res.status(500).json({
      message: error.message || "Failed to get FAQ",
    });
  }
};

// =====================================
// Update FAQ
// =====================================

export const updateFaq = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      return res.status(400).json({
        message: "Invalid FAQ ID",
      });
    }

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const faq = await updateFaqService(id, {
      ...req.body,
      updatedBy: req.user.username,
    });

    if (!faq) {
      return res.status(404).json({
        message: "FAQ not found",
      });
    }

    return res.status(200).json({
      message: "FAQ updated successfully",
      faq,
    });
  } catch (error: any) {
    console.error("Update FAQ Controller Error:", error);

    return res.status(500).json({
      message: error.message || "Failed to update FAQ",
    });
  }
};

// =====================================
// Delete FAQ
// =====================================

export const deleteFaq = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      return res.status(400).json({
        message: "Invalid FAQ ID",
      });
    }

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const deleteBy = req.user.username;

    const faq = await deleteFaqService(id, deleteBy);

    if (!faq) {
      return res.status(404).json({
        message: "FAQ not found",
      });
    }

    return res.status(200).json({
      message: "FAQ deleted successfully",
      faq,
    });
  } catch (error: any) {
    console.error("Delete FAQ Controller Error:", error);

    return res.status(500).json({
      message: error.message || "Failed to delete FAQ",
    });
  }
};