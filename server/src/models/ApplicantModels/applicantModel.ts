import mongoose, { Document, Schema } from "mongoose";

export interface IApplicant extends Document {
  
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber?: string;

  resume?: string;
  profilePic?: string;

  higherQualification?: string;
  experience?: string;

  skills: string[];
  preferredLocation: string[];

  address?: string;
  state?: string;

  userName: string;
  password: string;

  dob?: Date;
  gender?: string;

  isActive: boolean;
  isDisplay: boolean;

  createdAt: Date;
  createdBy?: string;

  updatedAt: Date;
  updatedBy?: string;

  deleteAt?: Date | null;
  deleteBy?: string | null;
}

const applicantSchema = new Schema<IApplicant>(
  {
   

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    mobileNumber: {
      type: String,
      trim: true,
    },

    resume: {
      type: String,
      trim: true,
    },

    profilePic: {
      type: String,
      trim: true,
    },

    higherQualification: {
      type: String,
      trim: true,
    },

    experience: {
      type: String,
      trim: true,
    },

    skills: {
      type: [String],
      default: [],
    },

    preferredLocation: {
      type: [String],
      default: [],
    },

    address: {
      type: String,
      trim: true,
    },

    state: {
      type: String,
      trim: true,
    },

    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    dob: {
      type: Date,
    },

    gender: {
      type: String,
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isDisplay: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: String,
      trim: true,
    },

    updatedBy: {
      type: String,
      trim: true,
    },

    deleteAt: {
      type: Date,
      default: null,
    },

    deleteBy: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const Applicant = mongoose.model<IApplicant>(
  "Applicant",
  applicantSchema
);