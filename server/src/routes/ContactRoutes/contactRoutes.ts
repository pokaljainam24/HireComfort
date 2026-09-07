import { Router } from "express";

import {
  createContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact,
} from "../../controllers/contactController/contactController.js";

const router = Router();

// =====================================
// Create Contact
// =====================================

router.post("/", createContact);

// =====================================
// Get Contacts
// =====================================

router.get("/", getContacts);

// =====================================
// Get Contact By ID
// =====================================

router.get("/:id", getContact);

// =====================================
// Update Contact
// =====================================

router.put("/:id", updateContact);

// =====================================
// Delete Contact
// =====================================

router.delete("/:id", deleteContact);

export default router;
