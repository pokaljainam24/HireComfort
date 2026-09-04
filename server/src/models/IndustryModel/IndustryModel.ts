import  mongoose, { Schema, Document } from "mongoose";

export interface IIndustryMaster {
  IndustryId: number;
  IndustryName: string;

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

export type IndustryMasterDocument = IIndustryMaster & Document;

const industryMasterSchema = new Schema<IndustryMasterDocument>(
  {
    IndustryId: {
      type: Number,
      required: true,
      unique: true,
    },

    IndustryName: {
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

const IndustryMaster = mongoose.model<IndustryMasterDocument>(
  "IndustryMaster",
  industryMasterSchema,
);

export default IndustryMaster;