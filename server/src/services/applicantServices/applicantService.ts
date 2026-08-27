import bcrypt from "bcryptjs";
import { Applicant } from "../../models/ApplicantModels/applicantModel.js";


/* =========================
   CREATE APPLICANT
========================= */

export const createApplicantService = async (
  data: any
) => {
  // Check existing email only among non-deleted applicants
  const existingEmail = await Applicant.findOne({
    email: data.email,
    deleteAt: null,
  });

  if (existingEmail) {
    throw new Error("Email already exists");
  }

  // Check existing username only among non-deleted applicants
  const existingUsername = await Applicant.findOne({
    userName: data.userName,
    deleteAt: null,
  });

  if (existingUsername) {
    throw new Error("Username already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(
    data.password,
    10
  );

  const applicant = await Applicant.create({
    firstName: data.firstName,
    lastName: data.lastName,

    email: data.email,
    mobileNumber: data.mobileNumber,

    resume: data.resume,
    profilePic: data.profilePic,

    higherQualification:
      data.higherQualification,

    experience: data.experience,

    skills: data.skills || [],

    preferredLocation:
      data.preferredLocation || [],

    address: data.address,
    state: data.state,

    userName: data.userName,
    password: hashedPassword,

    dob: data.dob,
    gender: data.gender,

    isActive: data.isActive ?? true,
    isDisplay: data.isDisplay ?? true,

    createdBy: data.createdBy,

    // Soft delete fields
    deleteAt: null,
    deleteBy: null,
  });

  return applicant;
};


/* =========================
   GET ALL APPLICANTS
   Excludes soft-deleted records
========================= */

export const getApplicantsService = async (
  page: number,
  limit: number
) => {
  const skip = (page - 1) * limit;

  const filter = {
    deleteAt: null,
  };

  const [applicants, total] =
    await Promise.all([
      Applicant.find(filter)
        .select("-password")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),

      Applicant.countDocuments(filter),
    ]);

  return {
    applicants,

    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(
        total / limit
      ),
    },
  };
};


/* =========================
   GET APPLICANT BY ID
   Excludes soft-deleted records
========================= */

export const getApplicantByIdService = async (
  id: string
) => {
  return Applicant.findOne({
    _id: id,
    deleteAt: null,
  }).select("-password");
};


/* =========================
   UPDATE APPLICANT
   Cannot update deleted records
========================= */

export const updateApplicantService = async (
  id: string,
  data: any
) => {
  const updateData: any = {
    ...data,
    updatedBy: data.updatedBy,
  };

  // Hash password if password is being updated
  if (data.password) {
    updateData.password =
      await bcrypt.hash(data.password, 10);
  }

  // Prevent normal update API from changing
  // soft-delete fields
  delete updateData.deleteAt;
  delete updateData.deleteBy;

  const applicant =
    await Applicant.findOneAndUpdate(
      {
        _id: id,
        deleteAt: null,
      },
      updateData,
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

  return applicant;
};


/* =========================
   SOFT DELETE
========================= */

export const deleteApplicantService = async (
  id: string,
  deleteBy: string
) => {
  const applicant =
    await Applicant.findOneAndUpdate(
      {
        _id: id,

        // Only non-deleted applicants
        // can be soft deleted
        deleteAt: null,
      },
      {
        $set: {
          deleteAt: new Date(),
          deleteBy: deleteBy,

          // Disable applicant
          isActive: false,

          // Hide applicant
          isDisplay: false,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

  return applicant;
};


/* =========================
   ACTIVE / INACTIVE
   Cannot update deleted records
========================= */

export const updateActiveService = async (
  id: string,
  isActive: boolean,
  updatedBy: string
) => {
  return Applicant.findOneAndUpdate(
    {
      _id: id,
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
  ).select("-password");
};


/* =========================
   DISPLAY / HIDE
   Cannot update deleted records
========================= */

export const updateDisplayService = async (
  id: string,
  isDisplay: boolean,
  updatedBy: string
) => {
  return Applicant.findOneAndUpdate(
    {
      _id: id,
      deleteAt: null,
    },
    {
      $set: {
        isDisplay,
        updatedBy,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  ).select("-password");
};