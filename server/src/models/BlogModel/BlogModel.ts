import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  categoryId: mongoose.Types.ObjectId;

  title: string;
  description: string;

  metaTitle: string;
  metaDescription: string;

  blogImg: string;

  authorImg: string;
  authorName: string;

  date: Date;
  durationInMin: string;

  section: "big" | "latest";

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

const blogSchema = new Schema<IBlog>(
  {
    // =====================================
    // CATEGORY
    // =====================================

    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "JobCategory",
      required: true,
    },

    // =====================================
    // BASIC
    // =====================================

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    // =====================================
    // SEO
    // =====================================

    metaTitle: {
      type: String,
      required: true,
      trim: true,
    },

    metaDescription: {
      type: String,
      required: true,
      trim: true,
    },

    // =====================================
    // BLOG IMAGE
    // =====================================

    blogImg: {
      type: String,
      required: true,
      default: "",
    },

    // =====================================
    // AUTHOR
    // =====================================

    authorImg: {
      type: String,
      required: true,
      default: "",
    },

    authorName: {
      type: String,
      required: true,
      trim: true,
    },

    // =====================================
    // BLOG DETAILS
    // =====================================

    date: {
      type: Date,
      required: true,
    },

    durationInMin: {
      type: String,
      required: true,
      trim: true,
    },

    section: {
      type: String,
      enum: ["big", "latest"],
      required: true,
    },

    // =====================================
    // STATUS
    // =====================================

    isActive: {
      type: Boolean,
      default: true,
    },

    isDisplay: {
      type: Boolean,
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

const Blog = mongoose.model<IBlog>("Blog", blogSchema);

export default Blog;
