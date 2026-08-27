import mongoose from "mongoose";
import {
  ApplicantEducation,
} from "../../models/ApplicantModels/educationModel.js";
import {
  Applicant,
} from "../../models/ApplicantModels/applicantModel.js";


/* =========================
   CREATE EDUCATION
========================= */

export const createApplicantEducationService = async (
  data: any
) => {
  // Validate applicantId
  if (
    !data.applicantId ||
    !mongoose.Types.ObjectId.isValid(data.applicantId)
  ) {
    throw new Error("Invalid applicantId");
  }

  // Convert string applicantId to ObjectId
  const applicantId = new mongoose.Types.ObjectId(
    data.applicantId
  );

  // Check applicant exists using Applicant's _id
  const applicant = await Applicant.findOne({
    _id: applicantId,
    deleteAt: null,
  });

  if (!applicant) {
    throw new Error("Applicant not found");
  }

  // Create education
  const education = await ApplicantEducation.create({
    applicantId,

    education: data.education,

    passingYear: data.passingYear,

    percentageOrCGPA: data.percentageOrCGPA,

    isActive: data.isActive ?? true,

    createdBy: data.createdBy,
  });

  return education;
};


/* =========================
   GET ALL EDUCATION
========================= */

export const getApplicantEducationService = async (
  page: number,
  limit: number,
  applicantId?: string
) => {
  const skip = (page - 1) * limit;

  const filter: any = {
    deleteAt: null,
  };

  // Filter by applicant
  if (applicantId) {
    // Validate applicantId
    if (
      !mongoose.Types.ObjectId.isValid(applicantId)
    ) {
      throw new Error("Invalid applicantId");
    }

    // Convert string to ObjectId
    const applicantObjectId =
      new mongoose.Types.ObjectId(applicantId);

    // Check applicant exists
    const applicant = await Applicant.findOne({
      _id: applicantObjectId,
      deleteAt: null,
    });

    if (!applicant) {
      throw new Error("Applicant not found");
    }

    filter.applicantId = applicantObjectId;
  }

  const [education, total] = await Promise.all([
    ApplicantEducation.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),

    ApplicantEducation.countDocuments(filter),
  ]);

  return {
    education,

    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};


/* =========================
   GET EDUCATION BY ID
========================= */

export const getApplicantEducationByIdService = async (
  id: string
) => {
  // Validate education ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid education ID");
  }

  const education = await ApplicantEducation.findOne({
    _id: new mongoose.Types.ObjectId(id),
    deleteAt: null,
  });

  if (!education) {
    throw new Error("Education record not found");
  }

  return education;
};


/* =========================
   UPDATE EDUCATION
========================= */

export const updateApplicantEducationService = async (
  id: string,
  data: any
) => {
  // Validate education ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid education ID");
  }

  const updateData: any = {
    education: data.education,
    passingYear: data.passingYear,
    percentageOrCGPA: data.percentageOrCGPA,
    isActive: data.isActive,
    updatedBy: data.updatedBy,
  };

  // Remove undefined values
  Object.keys(updateData).forEach((key) => {
    if (updateData[key] === undefined) {
      delete updateData[key];
    }
  });

  const education =
    await ApplicantEducation.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(id),
        deleteAt: null,
      },
      {
        $set: updateData,
      },
      {
        new: true,
        runValidators: true,
      }
    );

  if (!education) {
    throw new Error("Education record not found");
  }

  return education;
};


/* =========================
   SOFT DELETE EDUCATION
========================= */

export const deleteApplicantEducationService = async (
  id: string,
  deleteBy: string
) => {
  // Validate education ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid education ID");
  }

  const education =
    await ApplicantEducation.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(id),

        // Only non-deleted records
        deleteAt: null,
      },
      {
        $set: {
          deleteAt: new Date(),
          deleteBy,
          isActive: false,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

  if (!education) {
    throw new Error("Education record not found");
  }

  return education;
};


/* =========================
   ACTIVE / INACTIVE
========================= */

export const updateEducationActiveService = async (
  id: string,
  isActive: boolean,
  updatedBy: string
) => {
  // Validate education ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid education ID");
  }

  const education =
    await ApplicantEducation.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(id),
        deleteAt: null,
      },
      {
        $set: {
          isActive,
          updatedBy,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

  if (!education) {
    throw new Error("Education record not found");
  }

  return education;
};