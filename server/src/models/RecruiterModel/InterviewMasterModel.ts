import mongoose, { Schema } from "mongoose";

export interface IInterviewMaster {
  applicationId: mongoose.Types.ObjectId;
  interviewType: string;
  interviewTime: Date;
  interviewDate: Date;
  interviewLocation: string;
  meetingLink: string;
  report: string;
  feedback: string;
  recruiterId: mongoose.Types.ObjectId;

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

const interviewMasterSchema = new Schema<IInterviewMaster>(
  {
    applicationId: {
      type: Schema.Types.ObjectId,
      ref: "JobApplicationMaster",
      required: true,
    },

    interviewType: {
      type: String,
      enum: ["Online", "Offline"],
      required: true,
    },

    interviewTime: {
      type: Date,
      required: true,
    },

    interviewDate: {
      type: Date,
      required: true,
    },

    interviewLocation: {
      type: String,
      default: "",
    },

    meetingLink: {
      type: String,
      default: "",
    },

    report: {
      type: String,
      default: "",
    },

    feedback: {
      type: String,
      default: "",
    },

    recruiterId: {
      type: Schema.Types.ObjectId,
      ref: "Recruiter",
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

const InterviewMaster = mongoose.model<IInterviewMaster>(
  "InterviewMaster",
  interviewMasterSchema,
);

export default InterviewMaster;
