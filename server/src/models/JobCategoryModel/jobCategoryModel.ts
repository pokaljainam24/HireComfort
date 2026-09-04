import mongoose, { Document, Schema } from "mongoose";

export interface IJobCategory extends Document {
  name: string;
  description: string;
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

const jobCategorySchema = new Schema<IJobCategory>(
  {
    // =====================================
    // BASIC FIELDS
    // =====================================

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    // File path / URL
    icon: {
      type: String,
      default: "",
      trim: true,
    },

    // =====================================
    // STATUS
    // =====================================

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

    // =====================================
    // AUDIT
    // =====================================

    createdBy: {
      type: String,
      required: true,
    },

    updatedBy: {
      type: String,
      default: null,
    },

    // =====================================
    // SOFT DELETE
    // =====================================

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

const JobCategoryModel = mongoose.model<IJobCategory>(
  "JobCategory",
  jobCategorySchema,
);

export default JobCategoryModel;
