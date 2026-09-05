import mongoose, { Schema, Document } from "mongoose";

export interface ICms extends Document {
  smtpServer: string;
  emailFrom: string;
  username: string;
  securityType: string;
  password: string;
  port: number;
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
    smtpServer: {
      type: String,
      required: true,
      trim: true,
    },

    emailFrom: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    username: {
      type: String,
      required: true,
      trim: true,
    },

    securityType: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      trim: true,
    },

    port: {
      type: Number,
      required: true,
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
