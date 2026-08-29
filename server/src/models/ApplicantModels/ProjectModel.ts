import mongoose, { Document, Schema } from "mongoose";

export interface IApplicantProject extends Document {
  applicantId: mongoose.Types.ObjectId;

  title: string;
  description?: string;
  startDate: Date;
  endDate?: Date | null;
  link?: string;

  isActive: boolean;
  isDisplay: boolean;

  createdAt: Date;
  createdBy?: string;

  updatedAt: Date;
  updatedBy?: string;

  deleteAt?: Date | null;
  deleteBy?: string | null;
}

const applicantProjectSchema =
  new Schema<IApplicantProject>(
    {
      applicantId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Applicant",
      },

      title: {
        type: String,
        required: true,
        trim: true,
      },

      description: {
        type: String,
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

      link: {
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

export const ApplicantProject =
  mongoose.model<IApplicantProject>(
    "ApplicantProject",
    applicantProjectSchema
  );