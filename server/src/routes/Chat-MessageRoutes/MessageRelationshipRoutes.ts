import express from "express";

import {
  createMessageRelationship,
  getAllMessageRelationships,
  getMessageRelationshipById,
  getMessageRelationshipByMessageId,
  updateMessageRelationship,
  deleteMessageRelationship,
} from "../../controllers/Chat-MessageControllers/MessageRelationshipController.js";

const router = express.Router();

// =========================
// CREATE
// =========================

router.post("/", createMessageRelationship);

// =========================
// GET ALL
// =========================

router.get("/", getAllMessageRelationships);

// =========================
// GET BY MESSAGE ID
// =========================

router.get("/message/:messageId", getMessageRelationshipByMessageId);

// =========================
// GET BY ID
// =========================

router.get("/:id", getMessageRelationshipById);

// =========================
// UPDATE
// =========================

router.put("/:id", updateMessageRelationship);

// =========================
// DELETE
// =========================

router.delete("/:id", deleteMessageRelationship);

export default router;
