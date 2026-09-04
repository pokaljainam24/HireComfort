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
    const faq = await createFaqService({
      ...req.body,
      createdBy: "admin",
    });

    return res.status(201).json({
      message: "FAQ created successfully",
      faq,
    });
  } catch (error) {
    console.error("Error creating FAQ:", error);

    return res.status(500).json({
      message: "Error creating FAQ",
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
  } catch (error) {
    console.error("Error getting FAQs:", error);

    return res.status(500).json({
      message: "Error getting FAQs",
    });
  }
};

// =====================================
// Get FAQ By ID
// =====================================

export const getFaq = async (req: Request, res: Response) => {
  try {
    const faqId = req.params.id;

    if (typeof faqId !== "string") {
      return res.status(400).json({
        message: "Invalid FAQ ID",
      });
    }

    const faq = await getFaqByIdService(faqId);

    if (!faq) {
      return res.status(404).json({
        message: "FAQ not found",
      });
    }

    return res.status(200).json({
      faq,
    });
  } catch (error) {
    console.error("Error getting FAQ:", error);

    return res.status(500).json({
      message: "Error getting FAQ",
    });
  }
};

// =====================================
// Update FAQ
// =====================================

export const updateFaq = async (req: Request, res: Response) => {
  try {
    const faqId = req.params.id;

    if (typeof faqId !== "string") {
      return res.status(400).json({
        message: "Invalid FAQ ID",
      });
    }

    const faq = await updateFaqService(faqId, {
      ...req.body,
      updatedBy: "admin",
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
  } catch (error) {
    console.error("Error updating FAQ:", error);

    return res.status(500).json({
      message: "Error updating FAQ",
    });
  }
};

// =====================================
// Delete FAQ
// =====================================

export const deleteFaq = async (req: Request, res: Response) => {
  try {
    const faqId = req.params.id;

    if (typeof faqId !== "string") {
      return res.status(400).json({
        message: "Invalid FAQ ID",
      });
    }

    const deleteBy = "admin";

    const faq = await deleteFaqService(faqId, deleteBy);

    if (!faq) {
      return res.status(404).json({
        message: "FAQ not found",
      });
    }

    return res.status(200).json({
      message: "FAQ deleted successfully",
      faq,
    });
  } catch (error) {
    console.error("Error deleting FAQ:", error);

    return res.status(500).json({
      message: "Error deleting FAQ",
    });
  }
};
