import mongoose, { Document, Schema } from "mongoose";

export interface IApplicantExperience extends Document {
  applicantId: mongoose.Types.ObjectId;

  companyName: string;
  role: string;
  startDate: Date;
  endDate?: Date | null;
  description?: string;

  isActive: boolean;
  isDisplay: boolean;

  createdAt: Date;
  createdBy?: string;

  updatedAt: Date;
  updatedBy?: string;

  deleteAt?: Date | null;
  deleteBy?: string | null;
}

const applicantExperienceSchema =
  new Schema<IApplicantExperience>(
    {
      applicantId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Applicant",
      },

      companyName: {
        type: String,
        required: true,
        trim: true,
      },

      role: {
        type: String,
        required: true,
        trim: true,
      },

      startDate: {
        type: Date,
        required: true,
      },

      endDate: {
        type: Date,
        default: null,
      },

      description: {
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

export const ApplicantExperience =
  mongoose.model<IApplicantExperience>(
    "ApplicantExperience",
    applicantExperienceSchema
  );