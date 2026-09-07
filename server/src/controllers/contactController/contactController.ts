import type { Request, Response } from "express";

import {
  createContactService,
  getContactService,
  getContactByIdService,
  updateContactService,
  deleteContactService,
} from "../../services/contactServices/contactService.js";

// =====================================
// Create Contact
// =====================================

export const createContact = async (req: Request, res: Response) => {
  try {
    const contact = await createContactService({
      ...req.body,
      createdBy: "admin",
    });

    return res.status(201).json({
      message: "Contact created successfully",
      contact,
    });
  } catch (error: any) {
    console.error("Create Contact Controller Error:", error);

    return res.status(500).json({
      message: error.message || "Failed to create Contact",
    });
  }
};

// =====================================
// Get Contacts
// =====================================

export const getContacts = async (req: Request, res: Response) => {
  try {
    const contact = await getContactService();

    return res.status(200).json({
      contact,
    });
  } catch (error: any) {
    console.error("Get Contacts Controller Error:", error);

    return res.status(500).json({
      message: error.message || "Failed to get Contacts",
    });
  }
};

// =====================================
// Get Contact By ID
// =====================================

export const getContact = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      return res.status(400).json({
        message: "Invalid Contact ID",
      });
    }

    const contact = await getContactByIdService(id);

    if (!contact) {
      return res.status(404).json({
        message: "Contact not found",
      });
    }

    return res.status(200).json({
      contact,
    });
  } catch (error: any) {
    console.error("Get Contact By ID Controller Error:", error);

    return res.status(500).json({
      message: error.message || "Failed to get Contact",
    });
  }
};

// =====================================
// Update Contact
// =====================================

export const updateContact = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      return res.status(400).json({
        message: "Invalid Contact ID",
      });
    }

    const contact = await updateContactService(id, {
      ...req.body,
      updatedBy: "admin",
    });

    if (!contact) {
      return res.status(404).json({
        message: "Contact not found",
      });
    }

    return res.status(200).json({
      message: "Contact updated successfully",
      contact,
    });
  } catch (error: any) {
    console.error("Update Contact Controller Error:", error);

    return res.status(500).json({
      message: error.message || "Failed to update Contact",
    });
  }
};

// =====================================
// Delete Contact
// =====================================

export const deleteContact = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      return res.status(400).json({
        message: "Invalid Contact ID",
      });
    }

    const contact = await deleteContactService(id, "admin");

    if (!contact) {
      return res.status(404).json({
        message: "Contact not found",
      });
    }

    return res.status(200).json({
      message: "Contact deleted successfully",
      contact,
    });
  } catch (error: any) {
    console.error("Delete Contact Controller Error:", error);

    return res.status(500).json({
      message: error.message || "Failed to delete Contact",
    });
  }
};
