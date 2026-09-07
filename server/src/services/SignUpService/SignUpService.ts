import bcrypt from "bcryptjs";

import { Applicant } from "../../models/ApplicantModels/applicantModel.js";
import Recruiter from "../../models/RecruiterModel/Recruitermodel.js";


/* =========================
   CREATE APPLICANT ACCOUNT
========================= */

export const signupApplicantService = async (data: any) => {
  try {
    // =====================================
    // First Name Validation
    // =====================================

    if (!data.firstName?.trim()) {
      throw new Error("First name is required");
    }

    if (data.firstName.trim().length < 2) {
      throw new Error(
        "First name must contain at least 2 characters",
      );
    }

    // =====================================
    // Last Name Validation
    // =====================================

    if (!data.lastName?.trim()) {
      throw new Error("Last name is required");
    }

    if (data.lastName.trim().length < 2) {
      throw new Error(
        "Last name must contain at least 2 characters",
      );
    }

    // =====================================
    // Email Validation
    // =====================================

    if (!data.email?.trim()) {
      throw new Error("Email is required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(data.email.trim())) {
      throw new Error("Invalid email address");
    }

    const email = data.email.trim().toLowerCase();

    // =====================================
    // Check Applicant Email
    // =====================================

    const existingApplicant = await Applicant.findOne({
      email,
      deleteAt: null,
    });

    if (existingApplicant) {
      throw new Error("Email already exists");
    }

    // =====================================
    // Check Recruiter Email
    // =====================================

    const existingRecruiter = await Recruiter.findOne({
      email,
      deleteAt: null,
    });

    if (existingRecruiter) {
      throw new Error("Email already exists");
    }

    // =====================================
    // Mobile Number Validation
    // =====================================

    if (!data.mobileNumber?.trim()) {
      throw new Error("Mobile number is required");
    }

    const mobileRegex = /^[6-9]\d{9}$/;

    if (!mobileRegex.test(data.mobileNumber.trim())) {
      throw new Error(
        "Invalid mobile number. Enter a valid 10-digit mobile number",
      );
    }

    // =====================================
    // Username Validation
    // =====================================

    if (!data.userName?.trim()) {
      throw new Error("Username is required");
    }

    if (
      data.userName.trim().length < 3 ||
      data.userName.trim().length > 30
    ) {
      throw new Error(
        "Username must be between 3 and 30 characters",
      );
    }

    const usernameRegex = /^[a-zA-Z0-9_.]+$/;

    if (!usernameRegex.test(data.userName.trim())) {
      throw new Error(
        "Username can only contain letters, numbers, underscore and dot",
      );
    }

    // =====================================
    // Check Applicant Username
    // =====================================

    const existingApplicantUsername =
      await Applicant.findOne({
        userName: data.userName.trim(),
        deleteAt: null,
      });

    if (existingApplicantUsername) {
      throw new Error("This username is already taken");
    }

    // =====================================
    // Check Recruiter Username
    // =====================================

    const existingRecruiterUsername =
      await Recruiter.findOne({
        userName: data.userName.trim(),
        deleteAt: null,
      });

    if (existingRecruiterUsername) {
      throw new Error("This username is already taken");
    }

    // =====================================
    // Password Validation
    // =====================================

    if (!data.password) {
      throw new Error("Password is required");
    }

    if (data.password.length < 8) {
      throw new Error(
        "Password must contain at least 8 characters",
      );
    }

    if (!data.confirmPassword) {
      throw new Error("Confirm password is required");
    }

    if (data.password !== data.confirmPassword) {
      throw new Error(
        "Password and confirm password do not match",
      );
    }

    // =====================================
    // Hash Password
    // =====================================

    const hashedPassword = await bcrypt.hash(
      data.password,
      10,
    );

    // =====================================
    // Create Applicant
    // =====================================

    const applicant = new Applicant({
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),

      email,
      mobileNumber: data.mobileNumber.trim(),

      userName: data.userName.trim(),

      password: hashedPassword,

      resume: null,
      profilePic: null,

      higherQualification: null,
      experience: null,

      skills: [],
      preferredLocation: [],

      address: null,
      state: null,

      dob: null,
      gender: null,

      isActive: true,
      isDisplay: true,

      createdBy: "Admin",

      deleteAt: null,
      deleteBy: null,
    });

    const savedApplicant = await applicant.save();

    const { password: _password, ...applicantResponse } =
      savedApplicant.toObject();

    return applicantResponse;
  } catch (error) {
    console.error(
      "Signup Applicant Service Error:",
      error,
    );

    throw error;
  }
};


/* =========================
   CREATE RECRUITER ACCOUNT
========================= */

export const signupRecruiterService = async (data: any) => {
  try {
    // =====================================
    // First Name Validation
    // =====================================

    if (!data.firstName?.trim()) {
      throw new Error("First name is required");
    }

    if (data.firstName.trim().length < 2) {
      throw new Error(
        "First name must contain at least 2 characters",
      );
    }

    // =====================================
    // Last Name Validation
    // =====================================

    if (!data.lastName?.trim()) {
      throw new Error("Last name is required");
    }

    if (data.lastName.trim().length < 2) {
      throw new Error(
        "Last name must contain at least 2 characters",
      );
    }

    // =====================================
    // Company Name Validation
    // =====================================

    if (!data.companyName?.trim()) {
      throw new Error("Company name is required");
    }

    // =====================================
    // Email Validation
    // =====================================

    if (!data.email?.trim()) {
      throw new Error("Email is required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(data.email.trim())) {
      throw new Error("Invalid email address");
    }

    const email = data.email.trim().toLowerCase();

    // =====================================
    // Check Recruiter Email
    // =====================================

    const existingRecruiter = await Recruiter.findOne({
      email,
      deleteAt: null,
    });

    if (existingRecruiter) {
      throw new Error(
        "Recruiter with this email already exists",
      );
    }

    // =====================================
    // Check Applicant Email
    // =====================================

    const existingApplicant = await Applicant.findOne({
      email,
      deleteAt: null,
    });

    if (existingApplicant) {
      throw new Error("Email already exists");
    }

    // =====================================
    // Mobile Number Validation
    // =====================================

    if (!data.mobileNumber?.trim()) {
      throw new Error("Mobile number is required");
    }

    const mobileRegex = /^[6-9]\d{9}$/;

    if (!mobileRegex.test(data.mobileNumber.trim())) {
      throw new Error(
        "Invalid mobile number. Enter a valid 10-digit mobile number",
      );
    }

    // =====================================
    // Username Validation
    // =====================================

    if (!data.userName?.trim()) {
      throw new Error("Username is required");
    }

    if (
      data.userName.trim().length < 3 ||
      data.userName.trim().length > 30
    ) {
      throw new Error(
        "Username must be between 3 and 30 characters",
      );
    }

    const usernameRegex = /^[a-zA-Z0-9_.]+$/;

    if (!usernameRegex.test(data.userName.trim())) {
      throw new Error(
        "Username can only contain letters, numbers, underscore and dot",
      );
    }

    // =====================================
    // Check Recruiter Username
    // =====================================

    const existingRecruiterUsername =
      await Recruiter.findOne({
        userName: data.userName.trim(),
        deleteAt: null,
      });

    if (existingRecruiterUsername) {
      throw new Error("This username is already taken");
    }

    // =====================================
    // Check Applicant Username
    // =====================================

    const existingApplicantUsername =
      await Applicant.findOne({
        userName: data.userName.trim(),
        deleteAt: null,
      });

    if (existingApplicantUsername) {
      throw new Error("This username is already taken");
    }

    // =====================================
    // Password Validation
    // =====================================

    if (!data.password) {
      throw new Error("Password is required");
    }

    if (data.password.length < 8) {
      throw new Error(
        "Password must contain at least 8 characters",
      );
    }

    if (!data.confirmPassword) {
      throw new Error("Confirm password is required");
    }

    if (data.password !== data.confirmPassword) {
      throw new Error(
        "Password and confirm password do not match",
      );
    }

    // =====================================
    // Hash Password
    // =====================================

    const hashedPassword = await bcrypt.hash(
      data.password,
      10,
    );

    // =====================================
    // Create Recruiter
    // =====================================

    const recruiter = new Recruiter({
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),

      email,
      mobileNumber: data.mobileNumber.trim(),

      companyName: data.companyName.trim(),

      userName: data.userName.trim(),

      password: hashedPassword,

      // =====================================
      // Default Recruiter Profile Values
      // =====================================

      address: "",
      department: "",
      designation: "",
      remark: "",

      joiningDate: new Date(),

      isActive: true,
      isDisplay: true,

      createdBy: "Admin",

      deleteAt: null,
      deleteBy: null,
    });

    const savedRecruiter = await recruiter.save();

    const { password: _password, ...recruiterResponse } =
      savedRecruiter.toObject();

    return recruiterResponse;
  } catch (error) {
    console.error(
      "Signup Recruiter Service Error:",
      error,
    );

    throw error;
  }
};