import mongoose, { Document, Schema } from "mongoose";

export interface IContact extends Document {
  name: string;
  company: string;
  email: string;
  phone: string;
  subject: string;

  isActive: boolean;
  isDisplay: boolean;

  createdAt: Date;
  createdBy: string;

  updatedAt: Date;
  updatedBy: string | null;

  deleteAt: Date | null;
  deleteBy: string | null;
}

const ContactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      default: "",
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    subject: {
      type: String,
      required: true,
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
      required: true,
      default: "admin",
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
  },
);

const ContactModel = mongoose.model<IContact>(
  "Contact",
  ContactSchema,
);

export default ContactModel;