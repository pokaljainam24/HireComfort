import mongoose, { Schema, Document } from "mongoose";

export interface IJobApplicationMaster extends Document {
  jobId: mongoose.Types.ObjectId;
  applicantId: mongoose.Types.ObjectId;
  rating: number;
  notes: string;
  status: string;
  recruiterId: mongoose.Types.ObjectId;
  applicationDate: Date;
  expectedsalary: number;
  noticeperiod: string;
  resume: string;
  companyId: mongoose.Types.ObjectId;
  applicationStatus: string;
  appliedAt: Date;

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

const jobApplicationMasterSchema = new Schema<IJobApplicationMaster>(
  {
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "JobMaster",
      required: true,
    },

    applicantId: {
      type: Schema.Types.ObjectId,
      ref: "Applicant",
      required: true,
    },

    rating: {
      type: Number,
      default: 0,
    },

    notes: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      default: "Pending",
    },

    recruiterId: {
      type: Schema.Types.ObjectId,
      ref: "Recruiter",
      required: true,
    },

    applicationDate: {
      type: Date,
      default: Date.now,
    },

    expectedsalary: {
      type: Number,
      default: 0,
    },

    noticeperiod: {
      type: String,
      default: "",
    },

    resume: {
      type: String,
      default: "",
    },

    companyId: {
      type: Schema.Types.ObjectId,
      ref: "CompanyMaster",
      required: true,
    },

    applicationStatus: {
      type: String,
      default: "Applied",
    },

    appliedAt: {
      type: Date,
      default: Date.now,
    },

    // =========================
    // Status
    // =========================

    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },

    isDisplay: {
      type: Boolean,
      required: true,
      default: true,
    },

    // =========================
    // Audit
    // =========================

    createdBy: {
      type: String,
      required: true,
    },

    updatedBy: {
      type: String,
      default: null,
    },

    // =========================
    // Soft Delete
    // =========================

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

const JobApplicationMaster = mongoose.model<IJobApplicationMaster>(
  "JobApplicationMaster",
  jobApplicationMasterSchema,
);

export default JobApplicationMaster;
