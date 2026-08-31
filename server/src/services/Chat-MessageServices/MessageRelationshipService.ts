import mongoose from "mongoose";
import { Message } from "../../models/Chat-Message/MessageModel.js";
import {
  MessageRelationship,
} from "../../models/Chat-Message/MessageRelationshpModel.js";


// =========================
// CREATE MESSAGE CONTENT
// =========================

export const createMessageRelationshipService =
  async (data: {
    messageId: string;
    subject: string;
    message: string;
    attachment?: string;
  }) => {

    if (
      !mongoose.Types.ObjectId.isValid(
        data.messageId
      )
    ) {
      throw new Error("Invalid message ID");
    }


    // Check Message Master exists
    const messageMaster = 
      await Message.findById(
        data.messageId
      );

    if (!messageMaster) {
      throw new Error("Message not found");
    }


    return MessageRelationship.create({
      messageId: new mongoose.Types.ObjectId(
        data.messageId
      ),

      subject: data.subject,

      message: data.message,

      attachment: data.attachment,
    });
  };


// =========================
// GET ALL MESSAGE CONTENT
// =========================

export const getAllMessageRelationshipsService =
  async () => {

    return MessageRelationship.find()
      .populate({
        path: "messageId",
        populate: [
          {
            path: "senderId",
          },
          {
            path: "receiverId",
          },
        ],
      })
      .sort({
        createdAt: -1,
      });
  };


// =========================
// GET MESSAGE CONTENT BY ID
// =========================

export const getMessageRelationshipByIdService =
  async (id: string) => {

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error(
        "Invalid message relationship ID"
      );
    }

    return MessageRelationship.findById(id)
      .populate({
        path: "messageId",
        populate: [
          {
            path: "senderId",
          },
          {
            path: "receiverId",
          },
        ],
      });
  };


// =========================
// GET CONTENT BY MESSAGE ID
// =========================

export const getMessageRelationshipByMessageIdService =
  async (messageId: string) => {

    if (
      !mongoose.Types.ObjectId.isValid(
        messageId
      )
    ) {
      throw new Error("Invalid message ID");
    }

    return MessageRelationship.find({
      messageId:
        new mongoose.Types.ObjectId(
          messageId
        ),
    }).sort({
      createdAt: -1,
    });
  };


// =========================
// UPDATE MESSAGE CONTENT
// =========================

export const updateMessageRelationshipService =
  async (
    id: string,
    data: {
      subject?: string;
      message?: string;
      attachment?: string;
    }
  ) => {

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error(
        "Invalid message relationship ID"
      );
    }

    return MessageRelationship.findByIdAndUpdate(
      id,
      {
        $set: data,
      },
      {
        new: true,
        runValidators: true,
      }
    );
  };


// =========================
// DELETE MESSAGE CONTENT
// =========================

export const deleteMessageRelationshipService =
  async (id: string) => {

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error(
        "Invalid message relationship ID"
      );
    }

    return MessageRelationship.findByIdAndDelete(
      id
    );
  };