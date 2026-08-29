import mongoose from "mongoose";
import { ApplicantProject } from "../../models/ApplicantModels/ProjectModel.js";


// =========================
// CREATE PROJECT
// =========================

export const createProjectService = async (data: {
  applicantId: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate?: Date | null;
  link?: string;
  createdBy?: string;
}) => {
  if (!mongoose.Types.ObjectId.isValid(data.applicantId)) {
    throw new Error("Invalid applicant ID");
  }

  return ApplicantProject.create({
    ...data,
    applicantId: new mongoose.Types.ObjectId(
      data.applicantId
    ),
  });
};


// =========================
// GET ALL PROJECTS
// =========================

export const getAllProjectsService = async () => {
  return ApplicantProject.find({
    deleteAt: null,
  })
    .populate("applicantId", "-password")
    .sort({ createdAt: -1 });
};


// =========================
// GET PROJECT BY ID
// =========================

export const getProjectByIdService = async (
  id: string
) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid project ID");
  }

  return ApplicantProject.findOne({
    _id: id,
    deleteAt: null,
  }).populate("applicantId", "-password");
};


// =========================
// GET PROJECTS BY APPLICANT
// =========================

export const getProjectsByApplicantService = async (
  applicantId: string
) => {
  if (!mongoose.Types.ObjectId.isValid(applicantId)) {
    throw new Error("Invalid applicant ID");
  }

  return ApplicantProject.find({
    applicantId: new mongoose.Types.ObjectId(
      applicantId
    ),
    deleteAt: null,
  }).sort({ startDate: -1 });
};


// =========================
// UPDATE PROJECT
// =========================

export const updateProjectService = async (
  id: string,
  data: {
    title?: string;
    description?: string;
    startDate?: Date;
    endDate?: Date | null;
    link?: string;
    isActive?: boolean;
    isDisplay?: boolean;
    updatedBy?: string;
  }
) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid project ID");
  }

  return ApplicantProject.findOneAndUpdate(
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
// DELETE PROJECT
// =========================

export const deleteProjectService = async (
  id: string,
  deleteBy?: string
) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid project ID");
  }

  return ApplicantProject.findOneAndUpdate(
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