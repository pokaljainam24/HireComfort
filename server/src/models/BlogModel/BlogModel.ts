import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  description: string;
  type: string;

  // Big Card
  bgImage: string;
  heroImage: string;

  // Latest Post
  heroImg: string;

  authorImg: string;
  authorName: string;

  date: Date;
  durationInMin: string;

  // Which section
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
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    type: {
      type: String,
      default: "",
      trim: true,
    },

    // =========================
    // BIG CARD
    // =========================

    bgImage: {
      type: String,
      default: "",
    },

    heroImage: {
      type: String,
      default: "",
    },

    // =========================
    // LATEST POST
    // =========================

    heroImg: {
      type: String,
      default: "",
    },

    authorImg: {
      type: String,
      required: true,
    },

    authorName: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: Date,
      required: true,
    },

    durationInMin: {
      type: String,
      default: "",
    },

    // =========================
    // SECTION
    // =========================

    section: {
      type: String,
      enum: ["big", "latest"],
      required: true,
    },

    // =========================
    // STATUS
    // =========================

    isActive: {
      type: Boolean,
      default: true,
    },

    isDisplay: {
      type: Boolean,
      default: true,
    },

    // =========================
    // AUDIT
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
    // SOFT DELETE
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

const Blog = mongoose.model<IBlog>("Blog", blogSchema);

export default Blog;
