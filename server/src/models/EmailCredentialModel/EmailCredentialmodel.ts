import mongoose, { Schema } from "mongoose";

export interface IEmailCredentialMaster {
  emailSetUpName: string;
  email: string;
  host: string;
  port: string;
  isSSL: boolean;
  password: string;

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

const emailCredentialSchema = new Schema<IEmailCredentialMaster>(
  {
    emailSetUpName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    host: {
      type: String,
      required: true,
      trim: true,
    },

    port: {
      type: String,
      required: true,
      trim: true,
    },

    isSSL: {
      type: Boolean,
      required: true,
      default: false,
    },

    password: {
      type: String,
      required: true,
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

const EmailCredentialMaster = mongoose.model<IEmailCredentialMaster>(
  "EmailCredentialMaster",
  emailCredentialSchema,
);

export default EmailCredentialMaster;
