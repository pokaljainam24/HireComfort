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
    // Password Validation
    // =====================================

    if (!password) {
      return res.status(400).json({
        message: "Password is required",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long",
      });
    }

    if (!/[A-Z]/.test(password)) {
      return res.status(400).json({
        message: "Password must contain at least one uppercase letter",
      });
    }

    if (!/[a-z]/.test(password)) {
      return res.status(400).json({
        message: "Password must contain at least one lowercase letter",
      });
    }

    if (!/[0-9]/.test(password)) {
      return res.status(400).json({
        message: "Password must contain at least one number",
      });
    }

    if (!/[!@#$%^&*(),.?":{}|<>_\-\\[\]/`~'+;=]/.test(password)) {
      return res.status(400).json({
        message:
          "Password must contain at least one special character",
      });
    }

    // =====================================
    // Confirm Password Validation
    // =====================================

    if (!confirmPassword) {
      return res.status(400).json({
        message: "Confirm password is required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Password and confirm password do not match",
      });
    }

    // =====================================
    // Applicant Signup
    // =====================================

    if (accountType === "applicant") {
      const applicant = await signupApplicantService({
        firstName,
        lastName,
        email,
        mobileNumber,
        password,
        confirmPassword,
        userName: username,
      });

      return res.status(201).json({
        message: "Applicant account created successfully",
        applicant,
      });
    }

    // =====================================
    // Recruiter Signup
    // =====================================

    if (accountType === "recruiter") {
      const recruiter = await signupRecruiterService({
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
        message: "Recruiter account created successfully",
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