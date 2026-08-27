import mongoose, { Schema } from "mongoose";

export interface IMessageReceiver {
  messageId: mongoose.Types.ObjectId;
  senderId: mongoose.Types.ObjectId;
  receiverId: mongoose.Types.ObjectId;

  isRead: boolean;
  readDate: Date | null;

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

const messageReceiverSchema = new Schema<IMessageReceiver>(
  {
    messageId: {
      type: Schema.Types.ObjectId,
      ref: "MessageMaster",
      required: true,
    },

    senderId: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    receiverId: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    readDate: {
      type: Date,
      default: null,
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

const MessageReceiver = mongoose.model<IMessageReceiver>(
  "MessageReceiver",
  messageReceiverSchema,
);

export default MessageReceiver;
