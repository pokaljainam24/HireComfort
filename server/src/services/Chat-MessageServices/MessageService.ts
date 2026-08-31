import mongoose from "mongoose";
import { Message } from "../../models/Chat-Message/MessageModel.js";
import { Applicant } from "../../models/ApplicantModels/applicantModel.js";
import  Recruiter  from "../../models/RecruiterModel/Recruitermodel.js";


// =========================
// CREATE FIRST MESSAGE
// Recruiter → Applicant
// =========================

export const createMessageService = async (data: {
  senderId: string;
  receiverId: string;
}) => {

  // Validate Recruiter ID
  if (!mongoose.Types.ObjectId.isValid(data.senderId)) {
    throw new Error("Invalid recruiter ID");
  }

  // Validate Applicant ID
  if (!mongoose.Types.ObjectId.isValid(data.receiverId)) {
    throw new Error("Invalid applicant ID");
  }


  // Check recruiter exists
  const recruiter = await Recruiter.findById(
    data.senderId
  );

  if (!recruiter) {
    throw new Error("Recruiter not found");
  }


  // Check applicant exists
  const applicant = await Applicant.findById(
    data.receiverId
  );

  if (!applicant) {
    throw new Error("Applicant not found");
  }


  // Create message master
  const message = await Message.create({
    senderId: new mongoose.Types.ObjectId(
      data.senderId
    ),

    receiverId: new mongoose.Types.ObjectId(
      data.receiverId
    ),
  });


  return message;
};


// =========================
// GET ALL MESSAGES
// =========================

export const getAllMessagesService = async () => {

  return Message.find()
    .populate("senderId")
    .populate("receiverId")
    .sort({
      createdAt: -1,
    });
};


// =========================
// GET MESSAGE BY ID
// =========================

export const getMessageByIdService = async (
  id: string
) => {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid message ID");
  }

  return Message.findById(id)
    .populate("senderId")
    .populate("receiverId");
};


// =========================
// GET MESSAGES BY RECRUITER
// =========================

export const getMessagesByRecruiterService =
  async (recruiterId: string) => {

    if (
      !mongoose.Types.ObjectId.isValid(
        recruiterId
      )
    ) {
      throw new Error("Invalid recruiter ID");
    }

    return Message.find({
      senderId: new mongoose.Types.ObjectId(
        recruiterId
      ),
    })
      .populate("receiverId")
      .sort({
        createdAt: -1,
      });
  };


// =========================
// GET MESSAGES BY APPLICANT
// =========================

export const getMessagesByApplicantService =
  async (applicantId: string) => {

    if (
      !mongoose.Types.ObjectId.isValid(
        applicantId
      )
    ) {
      throw new Error("Invalid applicant ID");
    }

    return Message.find({
      receiverId: new mongoose.Types.ObjectId(
        applicantId
      ),
    })
      .populate("senderId")
      .sort({
        createdAt: -1,
      });
  };


// =========================
// DELETE MESSAGE
// =========================

export const deleteMessageService = async (
  id: string
) => {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid message ID");
  }

  return Message.findByIdAndDelete(id);
};