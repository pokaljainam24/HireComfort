import mongoose, { Schema, Document } from "mongoose";

export interface ICms extends Document {
  sectionName: string;
  code: string;
  content: string;

  isActive: boolean;
  isDisplay: boolean;

  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string | null;

  deleteAt: Date | null;
  deleteBy: string | null;
}

const cmsSchema = new Schema<ICms>(
  {
    sectionName: {
      type: String,
      required: true,
      trim: true,
    },

    code: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    content: {
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
  },
);

const Cms = mongoose.model<ICms>("Cms", cmsSchema);

export default Cms;
