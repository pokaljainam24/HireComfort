import express from "express";

import {
  createEmailCredential,
  getEmailCredentials,
  getEmailCredential,
  updateEmailCredential,
  deleteEmailCredential,
} from "../../controllers/EmailCredential/emailCredentialController.js";

const emailCredentialRoutes = express.Router();

// Create
emailCredentialRoutes.post("/", createEmailCredential);

// Get all
emailCredentialRoutes.get("/", getEmailCredentials);

// Get by ID
emailCredentialRoutes.get("/:id", getEmailCredential);

// Update
emailCredentialRoutes.patch("/:id", updateEmailCredential);

// Delete
emailCredentialRoutes.delete("/:id", deleteEmailCredential);

export default emailCredentialRoutes;
