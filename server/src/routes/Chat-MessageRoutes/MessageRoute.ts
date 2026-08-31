import { Router } from "express";

import {
  createMessage,
  getMessageById,
  deleteMessage,
} from "../../controllers/Chat-MessageControllers/MessageController.js";


const router = Router();

// Create/send message
router.post("/", createMessage);

// Get chat/message by message ID
router.get("/:messageId", getMessageById);

// Delete message
router.delete("/:messageId", deleteMessage);

export default router;