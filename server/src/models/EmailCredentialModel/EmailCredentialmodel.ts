import mongoose, { Schema } from "mongoose";

export interface IEmailCredentialMaster {
  smtpServer: string;
  emailFrom: string;
  username: string;
  securityType: string;
  password: string;
  port: string;

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
      lowercase: true,
    },

    securityType: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    port: {
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

const EmailCredentialMaster = mongoose.model<IEmailCredentialMaster>(
  "EmailCredentialMaster",
  emailCredentialSchema,
);

export default EmailCredentialMaster;
