
import mongoose from "mongoose";
import { Certificates } from "../../models/ApplicantModels/certificatesModel.js";

// =========================
// CREATE CERTIFICATE
// =========================

export const createCertificateService = async (data: {
  applicantId: string;
  credentialId: string;
  IssuedBy: string;
  IssuedDate: Date;
  ExpirationDate: Date;
  certificationName: string;
  isActive?: boolean;
  isDisplay?: boolean;
  createdBy?: string;
}) => {
  const certificate = await Certificates.create({
    ...data,
    applicantId: new mongoose.Types.ObjectId(data.applicantId),
  });

  return certificate;
};


// =========================
// GET ALL CERTIFICATES
// =========================

export const getAllCertificatesService = async () => {
  return Certificates.find({
    deleteAt: null,
  })
    .populate("applicantId", "-password")
    .sort({ createdAt: -1 });
};


// =========================
// GET CERTIFICATE BY ID
// =========================

export const getCertificateByIdService = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid certificate ID");
  }

  return Certificates.findOne({
    _id: id,
    deleteAt: null,
  }).populate("applicantId", "-password");
};


// =========================
// GET CERTIFICATES BY APPLICANT
// =========================

export const getCertificatesByApplicantService = async (
  applicantId: string
) => {
  if (!mongoose.Types.ObjectId.isValid(applicantId)) {
    throw new Error("Invalid applicant ID");
  }

  return Certificates.find({
    applicantId: new mongoose.Types.ObjectId(applicantId),
    deleteAt: null,
  }).sort({ createdAt: -1 });
};


// =========================
// UPDATE CERTIFICATE
// =========================

export const updateCertificateService = async (
  id: string,
  data: {
    credentialId?: string;
    IssuedBy?: string;
    IssuedDate?: Date;
    ExpirationDate?: Date;
    certificationName?: string;
    isActive?: boolean;
    isDisplay?: boolean;
    updatedBy?: string;
  }
) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid certificate ID");
  }

  return Certificates.findOneAndUpdate(
    {
      _id: id,
      deleteAt: null,
    },
    {
      $set: data,
    },
    {
      new: true,
      runValidators: true,
    }
  );
};


// =========================
// SOFT DELETE CERTIFICATE
// =========================

export const deleteCertificateService = async (
  id: string,
  deleteBy?: string
) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid certificate ID");
  }

  return Certificates.findOneAndUpdate(
    {
      _id: id,
      deleteAt: null,
    },
    {
      $set: {
        deleteAt: new Date(),
        deleteBy: deleteBy ?? null,
        isActive: false,
      },
    },
    {
      new: true,
    }
  );
};

