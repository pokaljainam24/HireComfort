import mongoose from "mongoose";
import { ApplicantExperience } from "../../models/ApplicantModels/experienceModel.js";

// =========================
// CREATE EXPERIENCE
// =========================

export const createExperienceService = async (data: {
  applicantId: string;
  companyName: string;
  role: string;
  startDate: Date;
  endDate?: Date | null;
  description?: string;
  createdBy?: string;
}) => {
  if (!mongoose.Types.ObjectId.isValid(data.applicantId)) {
    throw new Error("Invalid applicant ID");
  }

  return ApplicantExperience.create({
    ...data,
    applicantId: new mongoose.Types.ObjectId(data.applicantId),
  });
};


// =========================
// GET ALL EXPERIENCE
// =========================

export const getAllExperienceService = async () => {
  return ApplicantExperience.find({
    deleteAt: null,
  })
    .populate("applicantId", "-password")
    .sort({ createdAt: -1 });
};


// =========================
// GET EXPERIENCE BY ID
// =========================

export const getExperienceByIdService = async (
  id: string
) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid experience ID");
  }

  return ApplicantExperience.findOne({
    _id: id,
    deleteAt: null,
  }).populate("applicantId", "-password");
};


// =========================
// GET EXPERIENCE BY APPLICANT
// =========================

export const getExperienceByApplicantService = async (
  applicantId: string
) => {
  if (!mongoose.Types.ObjectId.isValid(applicantId)) {
    throw new Error("Invalid applicant ID");
  }

  return ApplicantExperience.find({
    applicantId: new mongoose.Types.ObjectId(applicantId),
    deleteAt: null,
  }).sort({ startDate: -1 });
};


// =========================
// UPDATE EXPERIENCE
// =========================

export const updateExperienceService = async (
  id: string,
  data: {
    companyName?: string;
    role?: string;
    startDate?: Date;
    endDate?: Date | null;
    description?: string;
    isActive?: boolean;
    isDisplay?: boolean;
    updatedBy?: string;
  }
) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid experience ID");
  }

  return ApplicantExperience.findOneAndUpdate(
    {
      _id: id,
      deleteAt: null,
    },
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
// DELETE EXPERIENCE
// =========================

export const deleteExperienceService = async (
  id: string,
  deleteBy?: string
) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid experience ID");
  }

  return ApplicantExperience.findOneAndUpdate(
    {
      _id: id,
      deleteAt: null,
    },
    {
      $set: {
        deleteAt: new Date(),
        deleteBy: deleteBy ?? null,
        isActive: false,
      },
    },
    {
      new: true,
    }
  );
};