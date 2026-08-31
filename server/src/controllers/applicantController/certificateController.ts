
import type { Request, Response } from "express";

import {
  createCertificateService,
  getAllCertificatesService,
  getCertificateByIdService,
  getCertificatesByApplicantService,
  updateCertificateService,
  deleteCertificateService,
} from "../../services/applicantServices/certificatesService.js";


// =========================
// CREATE CERTIFICATE
// =========================

export const createCertificate = async (
  req: Request,
  res: Response
) => {
  try {
    const certificate = await createCertificateService(req.body);

    return res.status(201).json({
      success: true,
      message: "Certificate created successfully",
      data: certificate,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =========================
// GET ALL CERTIFICATES
// =========================

export const getAllCertificates = async (
  req: Request,
  res: Response
) => {
  try {
    const certificates = await getAllCertificatesService();

    return res.status(200).json({
      success: true,
      data: certificates,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =========================
// GET CERTIFICATE BY ID
// =========================

export const getCertificateById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const certificate = await getCertificateByIdService(
      req.params.id
    );

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: certificate,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =========================
// GET CERTIFICATES BY APPLICANT
// =========================

export const getCertificatesByApplicant = async (
  req: Request<{ applicantId: string }>,
  res: Response
) => {
  try {
    const certificates =
      await getCertificatesByApplicantService(
        req.params.applicantId
      );

    return res.status(200).json({
      success: true,
      data: certificates,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =========================
// UPDATE CERTIFICATE
// =========================

export const updateCertificate = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const certificate = await updateCertificateService(
      req.params.id,
      req.body
    );

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Certificate updated successfully",
      data: certificate,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =========================
// DELETE CERTIFICATE
// =========================

export const deleteCertificate = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const certificate = await deleteCertificateService(
      req.params.id,
      req.body.deleteBy
    );

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Certificate deleted successfully",
      data: certificate,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
