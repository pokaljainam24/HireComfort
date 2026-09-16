import mongoose, { Schema } from "mongoose";

export interface IQualificationMaster {
  qualificationId: string;
  code: string;
  name: string;
  degreeLevel: string;
  specializationAllowed: boolean;

  // Status
  isActive: boolean;
  isDisplay: boolean;

  // Audit
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string | null;

  // Soft Delete
  deleteAt: Date | null;
  deleteBy: string | null;
}

const qualificationMasterSchema =
  new Schema<IQualificationMaster>(
    {
      qualificationId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },

      code: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        uppercase: true,
      },

      name: {
        type: String,
        required: true,
        trim: true,
      },

      degreeLevel: {
        type: String,
        required: true,
        trim: true,
      },

      specializationAllowed: {
        type: Boolean,
        default: false,
      },

      // Status
      isActive: {
        type: Boolean,
        default: true,
      },

      isDisplay: {
        type: Boolean,
        default: true,
      },

      // Audit
      createdBy: {
        type: String,
        required: true,
      },

      updatedBy: {
        type: String,
        default: null,
      },

      // Soft Delete
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

const QualificationMaster =
  mongoose.model<IQualificationMaster>(
    "QualificationMaster",
    qualificationMasterSchema,
    "qualificationmasters"
  );

export default QualificationMaster;
