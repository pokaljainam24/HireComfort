import mongoose, { Document, Schema } from "mongoose";

export interface IInterviewRound extends Document {
  applicantId: mongoose.Types.ObjectId;
  jobMasterId: mongoose.Types.ObjectId;
  companyId: mongoose.Types.ObjectId;
  remark?: string;
  status: string;
  round: number;
  createdAt: Date;
  updatedAt: Date;
}

const interviewRoundSchema = new Schema<IInterviewRound>(
  {
    applicantId: {
      type: Schema.Types.ObjectId,
      ref: "Applicant",
      required: true,
    },

    jobMasterId: {
      type: Schema.Types.ObjectId,
      ref: "JobMaster",
      required: true,
    },

    companyId: {
      type: Schema.Types.ObjectId,
      ref: "CompanyMaster",
      required: true,
    },

    remark: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      required: true,
      trim: true,
    },

    round: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    timestamps: true,
  }
);

export const InterviewRound = mongoose.model<IInterviewRound>(
  "InterviewRound",
  interviewRoundSchema
);