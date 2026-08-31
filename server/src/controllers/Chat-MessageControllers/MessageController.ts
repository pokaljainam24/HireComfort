import type { Request, Response } from "express";

import {
  createMessageService,
  getAllMessagesService,
  getMessageByIdService,
  getMessagesByRecruiterService,
  getMessagesByApplicantService,
  deleteMessageService,
} from "../../services/Chat-MessageServices/MessageService.js";


// =========================
// CREATE FIRST MESSAGE
// =========================

export const createMessage = async (
  req: Request,
  res: Response
) => {

  try {

    const message =
      await createMessageService(req.body);

    return res.status(201).json({
      success: true,
      message:
        "Message created successfully",
      data: message,
    });

  } catch (error: any) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =========================
// GET ALL MESSAGES
// =========================

export const getAllMessages = async (
  req: Request,
  res: Response
) => {

  try {

    const messages =
      await getAllMessagesService();

    return res.status(200).json({
      success: true,
      data: messages,
    });

  } catch (error: any) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =========================
// GET MESSAGE BY ID
// =========================

export const getMessageById = async (
  req: Request<{ id: string }>,
  res: Response
) => {

  try {

    const message =
      await getMessageByIdService(
        req.params.id
      );

    if (!message) {

      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: message,
    });

  } catch (error: any) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =========================
// GET MESSAGES BY RECRUITER
// =========================

export const getMessagesByRecruiter = async (
  req: Request<{
    recruiterId: string;
  }>,
  res: Response
) => {

  try {

    const messages =
      await getMessagesByRecruiterService(
        req.params.recruiterId
      );

    return res.status(200).json({
      success: true,
      data: messages,
    });

  } catch (error: any) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =========================
// GET MESSAGES BY APPLICANT
// =========================

export const getMessagesByApplicant = async (
  req: Request<{
    applicantId: string;
  }>,
  res: Response
) => {

  try {

    const messages =
      await getMessagesByApplicantService(
        req.params.applicantId
      );

    return res.status(200).json({
      success: true,
      data: messages,
    });

  } catch (error: any) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =========================
// DELETE MESSAGE
// =========================

export const deleteMessage = async (
  req: Request<{ id: string }>,
  res: Response
) => {

  try {

    const message =
      await deleteMessageService(
        req.params.id
      );

    if (!message) {

      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Message deleted successfully",
    });

  } catch (error: any) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};