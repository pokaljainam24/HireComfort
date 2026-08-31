import mongoose, { Document, Schema } from "mongoose";

export interface IMessage extends Document {
  senderId: mongoose.Types.ObjectId;
  receiverId: mongoose.Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    // Recruiter who sends the first message
    senderId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Recruiter",
    },

    // Applicant who receives the first message
    receiverId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Applicant",
    },
  },
  {
    timestamps: true,  
  }
);

export const Message = mongoose.model<IMessage>(
  "Message",
  messageSchema
);






