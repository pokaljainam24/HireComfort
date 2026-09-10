import mongoose, { Schema } from "mongoose";
// TODO: Remove old stale index id_i 
export interface IRecruiter {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  address: string;
  userName: string;
  password: string;
  department: string;
  remark: string;
  joiningDate: Date;
  designation: string;

  // Status
  isActive: boolean;
  isDisplay: boolean;

  // Audit fields
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;

  // Soft delete
  deleteAt: Date | null;
  deleteBy: string | null;
}

const recruiterSchema = new Schema<IRecruiter>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
    userName: {
      type: String,
      required: false,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    department: {
      type: String,
      required: false,
    },
    remark: {
      type: String,
      default: "",
    },
    joiningDate: {
      type: Date,
      required: true,
    },
    designation: {
      type: String,
      required: false,
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
      default: null,
    },

    updatedBy: {
      type: String,
      default: null,
    },

    // Soft delete
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

const Recruiter = mongoose.model<IRecruiter>("Recruiter", recruiterSchema);

export default Recruiter;
