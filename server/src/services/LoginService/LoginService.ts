import bcryptjs from "bcryptjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { Applicant } from "../../models/ApplicantModels/applicantModel.js";
import Recruiter from "../../models/RecruiterModel/Recruitermodel.js";

// =====================================
// LOGIN
// =====================================

export const loginService = async (data: {
  username: string;
  password: string;
  loginAs: "applicant" | "recruiter";
}) => {
  try {
    // =====================================
    // Username Validation
    // =====================================

    if (!data.username?.trim()) {
      throw new Error("Username is required");
    }

    // =====================================
    // Password Validation
    // =====================================

    if (!data.password) {
      throw new Error("Password is required");
    }

    // =====================================
    // Login As Validation
    // =====================================

    if (!data.loginAs) {
      throw new Error("Login as is required");
    }

    // =====================================
    // Applicant Login
    // =====================================

    if (data.loginAs === "applicant") {
      const applicant = await Applicant.findOne({
        userName: data.username.trim(),
        deleteAt: null,
      }).select("+password");

      if (!applicant) {
        throw new Error("Invalid username or password");
      }

      if (applicant.isActive === false) {
        throw new Error("Applicant account is inactive");
      }

      if (!applicant.password) {
        throw new Error("Applicant password is not available");
      }

      const passwordMatch = await bcryptjs.compare(
        data.password,
        applicant.password,
      );

      if (!passwordMatch) {
        throw new Error("Invalid username or password");
      }

      // =====================================
      // Applicant Token
      // =====================================

      const token = jwt.sign(
        {
          id: applicant._id,
          userName: applicant.userName,
          role: "applicant",
        },
        process.env.JWT_SECRET || "hirecomfort_secret",
        {
          expiresIn: "1d",
        },
      );

     const { password, ...applicantResponse } =
           applicant.toObject();

           return {
             token,
             role: "applicant",
             user: applicantResponse,
           };
    }

    // =====================================
    // Recruiter Login
    // =====================================

    if (data.loginAs === "recruiter") {
      const recruiter = await Recruiter.findOne({
        userName: data.username.trim(),
        isActive: true,
        isDisplay: true,
      });

      if (!recruiter) {
        throw new Error("Invalid username or password");
      }

      if (!recruiter.password) {
        throw new Error("Recruiter password is not available");
      }

      const passwordMatch = await bcrypt.compare(
        data.password,
        recruiter.password,
      );

      if (!passwordMatch) {
        throw new Error("Invalid username or password");
      }

      // =====================================
      // Recruiter Token
      // =====================================

      const token = jwt.sign(
        {
          id: recruiter._id,
          userName: recruiter.userName,
          role: "recruiter",
        },
        process.env.JWT_SECRET || "hirecomfort_secret",
        {
          expiresIn: "1d",
        },
      );

      const { password, ...recruiterResponse } = recruiter.toObject();

      return {
        token,
        role: "recruiter",
        user: recruiterResponse,
      };
    }

    throw new Error("Invalid login type");
  } catch (error) {
    console.error("Login Service Error:", error);
    throw error;
  }
};