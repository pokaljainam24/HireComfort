import mongoose, { Schema } from "mongoose";

export interface IJobMaster {
  companyId: mongoose.Types.ObjectId;
  description: string;
  title: string;
  skills: string[];
  exp: string;
  jobType: string;
  nop: number;
  location: string;
  salaryRange: number;
  interviewType: string;
  lastAppliedDate: Date;
  qualification: string;
  icon: string;

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

const jobMasterSchema = new Schema<IJobMaster>(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "CompanyMaster",
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    skills: {
      type: [String],
      required: true,
      default: [],
    },

    exp: {
      type: String,
      required: true,
    },

    jobType: {
      type: String,
      required: true,
    },

    nop: {
      type: Number,
      required: true,
      min: 1,
    },

    location: {
      type: String,
      required: true,
    },

    salaryRange: {
      type: Number,
      required: true,
    },

    interviewType: {
      type: String,
      required: true,
    },

    lastAppliedDate: {
      type: Date,
      required: true,
    },

    qualification: {
      type: String,
      required: true,
    },

    icon: {
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

const JobMaster = mongoose.model<IJobMaster>("JobMaster", jobMasterSchema);

export default JobMaster;
