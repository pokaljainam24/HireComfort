import type { Request, Response } from "express";

import {
  createMessageService,
  getAllMessagesService,
  getMessageByIdService,
  getMessagesByRecruiterService,
  getMessagesByApplicantService,
  deleteMessageService,
} from "../../services/Chat-MessageServices/MessageService.js";

// Create Message
export const createMessage = async (req: Request, res: Response) => {
  try {
    const message = await createMessageService({
      ...req.body,
      createdBy: "admin",
    });

    return res.status(201).json({
      message: "Message created successfully",
      messageData: message,
    });
  } catch (error) {
    console.error("Error creating message:", error);

    return res.status(500).json({
      message: "Error creating message",
    });
  }
};

// Get All Messages
export const getAllMessages = async (req: Request, res: Response) => {
  try {
    const messages = await getAllMessagesService();

    return res.status(200).json({
      messages,
    });
  } catch (error) {
    console.error("Error getting messages:", error);

    return res.status(500).json({
      message: "Error getting messages",
    });
  }
};

// Get Message By ID
export const getMessageById = async (req: Request, res: Response) => {
  try {
    const messageId = req.params.id;

    if (typeof messageId !== "string") {
      return res.status(400).json({
        message: "Invalid message ID",
      });
    }

    const message = await getMessageByIdService(messageId);

    if (!message) {
      return res.status(404).json({
        message: "Message not found",
      });
    }

    return res.status(200).json({
      message,
    });
  } catch (error) {
    console.error("Error getting message:", error);

    return res.status(500).json({
      message: "Error getting message",
    });
  }
};

// Get Messages By Recruiter
export const getMessagesByRecruiter = async (req: Request, res: Response) => {
  try {
    const recruiterId = req.params.recruiterId;

    if (typeof recruiterId !== "string") {
      return res.status(400).json({
        message: "Invalid recruiter ID",
      });
    }

    const messages = await getMessagesByRecruiterService(recruiterId);

    return res.status(200).json({
      messages,
    });
  } catch (error) {
    console.error("Error getting recruiter messages:", error);

    return res.status(500).json({
      message: "Error getting recruiter messages",
    });
  }
};

// Get Messages By Applicant
export const getMessagesByApplicant = async (req: Request, res: Response) => {
  try {
    const applicantId = req.params.applicantId;

    if (typeof applicantId !== "string") {
      return res.status(400).json({
        message: "Invalid applicant ID",
      });
    }

    const messages = await getMessagesByApplicantService(applicantId);

    return res.status(200).json({
      messages,
    });
  } catch (error) {
    console.error("Error getting applicant messages:", error);

    return res.status(500).json({
      message: "Error getting applicant messages",
    });
  }
};

// Delete Message
export const deleteMessage = async (req: Request, res: Response) => {
  try {
    const messageId = req.params.id;

    if (typeof messageId !== "string") {
      return res.status(400).json({
        message: "Invalid message ID",
      });
    }

    const message = await deleteMessageService(messageId);

    if (!message) {
      return res.status(404).json({
        message: "Message not found",
      });
    }

    return res.status(200).json({
      message: "Message deleted successfully",
      data: message,
    });
  } catch (error) {
    console.error("Error deleting message:", error);

    return res.status(500).json({
      message: "Error deleting message",
    });
  }
};
