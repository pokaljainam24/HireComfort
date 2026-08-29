import mongoose, { Schema, Document} from "mongoose";
export interface ICertificates extends Document {
    applicantId: mongoose.Types.ObjectId,
    credentialId: string,
    IssuedBy: string,
    IssuedDate: Date,
    ExpirationDate: Date,
    certificationName: string,
 
    isActive: boolean;
    isDisplay: boolean;

    createdAt: Date;
    createdBy?: string;
  
    updatedAt: Date;
    updatedBy?: string;
  
    deleteAt?: Date | null;
    deleteBy?: string | null; 
  
}

const CertificatesSchema = new Schema<ICertificates>(
  {
   

    applicantId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Applicant",
    },

    credentialId: {
      type: String,
      required: true,
      trim: true,
    },

    IssuedBy: {
      type: String,
      required: true,
      trim: true,
    },

    IssuedDate: {
      type: Date,
      required: true,
    },

    ExpirationDate: {
      type: Date,
      required: true,
    },

    certificationName: {
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
      trim: true,
    },

    updatedBy: {
      type: String,
      trim: true,
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
  }
);

export const Certificates = mongoose.model<ICertificates>(
  "Certificates",
  CertificatesSchema,
);