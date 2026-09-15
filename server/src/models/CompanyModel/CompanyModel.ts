import mongoose, { Schema, Document } from "mongoose";

export interface ICompanyType extends Document {
  companyTypeId: string;
  code: string;
  name: string;
  description: string;
  isActive: boolean;
  isDisplay: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deleteAt?: Date | null;
  deleteBy?: string | null;
}

const CompanyTypeSchema = new Schema<ICompanyType>(
  {
    companyTypeId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isDisplay: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: String,
      default: null,
    },

    updatedBy: {
      type: String,
      default: null,
    },

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
    collection: "companytypes",
  }
);

export const CompanyTypeMaster = mongoose.model<ICompanyType>(
  "CompanyTypeMaster",
  CompanyTypeSchema,
  "companyTypes"
);