import type { Request, Response } from "express";

import {
  createMessageRelationshipService,
  getAllMessageRelationshipsService,
  getMessageRelationshipByIdService,
  getMessageRelationshipByMessageIdService,
  updateMessageRelationshipService,
  deleteMessageRelationshipService,
} from "../../services/Chat-MessageServices/MessageRelationshipService.js";


// =========================
// CREATE MESSAGE CONTENT
// =========================

export const createMessageRelationship = async (
  req: Request,
  res: Response
) => {

  try {

    const data =
      await createMessageRelationshipService(
        req.body
      );

    return res.status(201).json({
      success: true,
      message:
        "Message content created successfully",
      data,
    });

  } catch (error: any) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =========================
// GET ALL
// =========================

export const getAllMessageRelationships =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const data =
        await getAllMessageRelationshipsService();

      return res.status(200).json({
        success: true,
        data,
      });

    } catch (error: any) {

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };


// =========================
// GET BY ID
// =========================

export const getMessageRelationshipById =
  async (
    req: Request<{ id: string }>,
    res: Response
  ) => {

    try {

      const data =
        await getMessageRelationshipByIdService(
          req.params.id
        );

      if (!data) {

        return res.status(404).json({
          success: false,
          message:
            "Message content not found",
        });
      }

      return res.status(200).json({
        success: true,
        data,
      });

    } catch (error: any) {

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };


// =========================
// GET BY MESSAGE ID
// =========================

export const getMessageRelationshipByMessageId =
  async (
    req: Request<{ messageId: string }>,
    res: Response
  ) => {

    try {

      const data =
        await getMessageRelationshipByMessageIdService(
          req.params.messageId
        );

      return res.status(200).json({
        success: true,
        data,
      });

    } catch (error: any) {

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };


// =========================
// UPDATE
// =========================

export const updateMessageRelationship =
  async (
    req: Request<{ id: string }>,
    res: Response
  ) => {

    try {

      const data =
        await updateMessageRelationshipService(
          req.params.id,
          req.body
        );

      if (!data) {

        return res.status(404).json({
          success: false,
          message:
            "Message content not found",
        });
      }

      return res.status(200).json({
        success: true,
        message:
          "Message content updated successfully",
        data,
      });

    } catch (error: any) {

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };


// =========================
// DELETE
// =========================

export const deleteMessageRelationship =
  async (
    req: Request<{ id: string }>,
    res: Response
  ) => {

    try {

      const data =
        await deleteMessageRelationshipService(
          req.params.id
        );

      if (!data) {

        return res.status(404).json({
          success: false,
          message:
            "Message content not found",
        });
      }

      return res.status(200).json({
        success: true,
        message:
          "Message content deleted successfully",
      });

    } catch (error: any) {

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };