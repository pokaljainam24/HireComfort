import mongoose, { Schema, Document } from "mongoose";

export interface IEducation extends Document {
    
    applicantId: mongoose.Types.ObjectId;
    education:string;
    passingYear: number;
    percentageOrCGPA: number;

    isActive: boolean;

   createdAt: Date;
   createdBy?: string;

   updatedAt: Date;
   updatedBy?: string;

   deleteAt?: Date | null;
   deleteBy?: string | null;
}
const applicantEducationSchema =
  new Schema<IEducation>(
    {
    

      applicantId: {
        type: Schema.Types.ObjectId,
        ref: "Applicant",
        required: true,
      },

      education: {
        type: String,
        required: true,
        trim: true,
      },

      passingYear: {
        type: Number,
        required: true,
      },

      percentageOrCGPA: {
        type: Number,
        required: true,
      },

      isActive: {
        type: Boolean,
        default: true,
      },

      createdBy: {
        type: String,
      },

      updatedBy: {
        type: String,
      },

      // Soft delete
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

export const ApplicantEducation =
  mongoose.model<IEducation>(
    "ApplicantEducation",
    applicantEducationSchema
  );