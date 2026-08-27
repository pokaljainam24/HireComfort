import mongoose, { Schema, Types } from "mongoose";

export interface ICompanyMaster {
  recruiterId: Types.ObjectId;
  companyName: string;
  address: string;
  contactNumber: string;
  companyEmail: string;
  numberOfEmployee: string;
  companyType: string;
  website: string;
  gstNumber: string;
  companyLogo: string;
  aboutCompany: string;
  city: string;
  state: string;
  country: string;
  instagram: string;
  twitter: string;
  linkedin: string;
  facebook: string;

  // Status
  isActive: boolean;
  isDisplay: boolean;

  // Audit
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string | null;
  deleteAt: Date | null;
  deleteBy: string | null;
}

const companyMasterSchema = new Schema<ICompanyMaster>(
  {
    recruiterId: {
      type: Schema.Types.ObjectId,
      ref: "Recruiter",
      required: true,
    },

    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    contactNumber: {
      type: String,
      required: true,
      trim: true,
    },

    companyEmail: {
      type: String,
      required: true,
      trim: true,
    },

    numberOfEmployee: {
      type: String,
      required: true,
      trim: true,
    },

    companyType: {
      type: String,
      required: true,
      trim: true,
    },

    website: {
      type: String,
      default: "",
      trim: true,
    },

    gstNumber: {
      type: String,
      default: "",
      trim: true,
    },

    companyLogo: {
      type: String,
      default: "",
    },

    aboutCompany: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    country: {
      type: String,
      required: true,
      trim: true,
    },

    instagram: {
      type: String,
      default: "",
    },

    twitter: {
      type: String,
      default: "",
    },

    linkedin: {
      type: String,
      default: "",
    },

    facebook: {
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

const CompanyMaster = mongoose.model<ICompanyMaster>(
  "CompanyMaster",
  companyMasterSchema,
);

export default CompanyMaster;