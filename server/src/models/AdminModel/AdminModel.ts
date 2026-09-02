import mongoose, { Schema } from "mongoose";

const adminMasterSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    // Status
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

    // Audit
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },

    createdBy: {
      type: String,
      required: true,
    },

    updatedAt: {
      type: Date,
      required: true,
      default: Date.now,
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
    versionKey: false,
  },
);

const AdminMaster = mongoose.model("AdminMaster", adminMasterSchema);

export default AdminMaster;
