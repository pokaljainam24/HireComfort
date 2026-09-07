import type { Request, Response } from "express";

import {
  signupApplicantService,
  signupRecruiterService,
} from "../../services/SignUpService/SignUpService.js";


/* =========================
   SIGNUP
========================= */

export const signup = async (
  req: Request,
  res: Response,
) => {
  try {
    console.log("SIGNUP REQUEST:", req.body);

    const {
      firstName,
      lastName,
      email,
      mobileNumber,
      password,
      confirmPassword,
      accountType,
      username,
      companyName,
    } = req.body;

    // =====================================
    // Account Type Validation
    // =====================================

    if (!accountType) {
      return res.status(400).json({
        message: "Account type is required",
      });
    }

    // =====================================
    // Applicant Signup
    // =====================================

    if (accountType === "applicant") {
      const applicant =
        await signupApplicantService({
          firstName,
          lastName,
          email,
          mobileNumber,
          password,
          confirmPassword,
          userName: username,
        });

      return res.status(201).json({
        message:
          "Applicant account created successfully",

        applicant,
      });
    }

    // =====================================
    // Recruiter Signup
    // =====================================

    if (accountType === "recruiter") {
      const recruiter =
        await signupRecruiterService({
          firstName,
          lastName,
          email,
          mobileNumber,
          password,
          confirmPassword,
          userName: username,
          companyName,
        });

      return res.status(201).json({
        message:
          "Recruiter account created successfully",

        recruiter,
      });
    }

    // =====================================
    // Invalid Account Type
    // =====================================

    return res.status(400).json({
      message: "Invalid account type",
    });
  } catch (error) {
    console.error(
      "Signup Controller Error:",
      error,
    );

    return res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Signup failed",
    });
  }
};