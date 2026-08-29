import { model, Schema } from "mongoose";

const jobCategoriesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isDisplay: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: String,
    required: true,
  },
  updatedBy: {
    type: String,
  },
  deleteAt: {
    type: Date,
    default: null,
  },
  deleteBy: {
    type: String,
    default: "admin",
  },
});

export default model("jobCategories", jobCategoriesSchema);
