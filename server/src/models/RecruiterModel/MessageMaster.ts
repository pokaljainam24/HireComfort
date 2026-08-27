import mongoose, { Schema } from "mongoose";

export interface IMessageMaster {
  subject: string;
  message: string;
  attachment: string;

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

const messageMasterSchema = new Schema<IMessageMaster>(
  {
    subject: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    attachment: {
      type: String,
      default: "",
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

const MessageMaster = mongoose.model<IMessageMaster>(
  "MessageMaster",
  messageMasterSchema,
);

export default MessageMaster;
