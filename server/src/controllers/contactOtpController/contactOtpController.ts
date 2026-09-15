import type {
  Request,
  Response,
} from "express";

import {
  sendContactOtpService,
  verifyContactOtpService,
} from "../../services/contactOtpServices/contactOtpService.js";

// =====================================
// SEND CONTACT OTP
// =====================================

export const sendContactOtp =
  async (
    req: Request,
    res: Response,
  ) => {
    try {
      const {
        email,
      } = req.body;

      // =====================================
      // Validation
      // =====================================

      if (!email) {
        return res.status(400).json({
          success: false,
          message:
            "Email is required",
        });
      }

      // =====================================
      // Send OTP
      // =====================================

      const result =
        await sendContactOtpService(
          email,
        );

      return res.status(200).json(
        result,
      );
    } catch (error: any) {
      console.error(
        "SEND CONTACT OTP ERROR:",
        error,
      );

      return res.status(400).json({
        success: false,

        message:
          error?.message ||
          "Failed to send OTP",
      });
    }
  };

// =====================================
// VERIFY CONTACT OTP
// =====================================

export const verifyContactOtp =
  async (
    req: Request,
    res: Response,
  ) => {
    try {
      const {
        email,
        otp,
      } = req.body;

      // =====================================
      // Validation
      // =====================================

      if (!email) {
        return res.status(400).json({
          success: false,
          message:
            "Email is required",
        });
      }

      if (!otp) {
        return res.status(400).json({
          success: false,
          message:
            "OTP is required",
        });
      }

      // =====================================
      // Verify OTP
      // =====================================

      const result =
        await verifyContactOtpService(
          email,
          otp,
        );

      // =====================================
      // Success
      // =====================================

      return res.status(200).json(
        result,
      );
    } catch (error: any) {
      console.error(
        "VERIFY CONTACT OTP ERROR:",
        error,
      );

      return res.status(400).json({
        success: false,

        message:
          error?.message ||
          "Invalid or expired OTP",
      });
    }
  };