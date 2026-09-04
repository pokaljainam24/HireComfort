import mongoose, { Schema, Document } from "mongoose";

export interface IEmploymentTypeMaster {
  EmploymentTypeId: number;
  EmploymentName: string;

  // Status
  isActive: boolean;
  isDisplay: boolean;

  // Audit
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string | null;

  // Soft delete
  deleteAt: Date | null;
  deleteBy: string | null;
}

export type EmploymentTypeMasterDocument =
  IEmploymentTypeMaster & Document;

const employmentTypeMasterSchema =
  new Schema<EmploymentTypeMasterDocument>(
    {
      EmploymentTypeId: {
        type: Number,
        required: true,
        unique: true,
      },

      EmploymentName: {
        type: String,
        required: true,
        trim: true,
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
    },
  );

const EmploymentTypeMaster =
  mongoose.model<EmploymentTypeMasterDocument>(
    "EmploymentTypeMaster",
    employmentTypeMasterSchema,
  );

export default EmploymentTypeMaster;