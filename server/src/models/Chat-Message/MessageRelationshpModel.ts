import mongoose, { Document, Schema } from "mongoose";

export interface IMessageRelationship extends Document {
  messageId: mongoose.Types.ObjectId;

  subject: string;
  message: string;
  attachment?: string;

  createdAt: Date;
  updatedAt: Date;
}

const messageRelationshipSchema =
  new Schema<IMessageRelationship>(
    {
      // Reference to Message Master 
      messageId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Message",
      },

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
        trim: true,
      },
    },
    {
      timestamps: true,
    }
  );

export const MessageRelationship =
  mongoose.model<IMessageRelationship>(
    "MessageRelationship",
    messageRelationshipSchema
  );

