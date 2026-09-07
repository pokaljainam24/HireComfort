import type { Request, Response } from "express";

import { loginService } from "../../services/LoginService/LoginService.js";

// =====================================
// Login
// =====================================

export const login = async (
  req: Request,
  res: Response,
) => {
  try {
    console.log("LOGIN REQUEST:", req.body);

    const {
      username,
      password,
      loginAs,
    } = req.body;

    // =====================================
    // Username Validation
    // =====================================

    if (!username?.trim()) {
      return res.status(400).json({
        message: "Username is required",
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

    // =====================================
    // Login As Validation
    // =====================================

    if (!loginAs) {
      return res.status(400).json({
        message: "Login as is required",
      });
    }

    if (
      loginAs !== "applicant" &&
      loginAs !== "recruiter"
    ) {
      return res.status(400).json({
        message: "Invalid login type",
      });
    }

    // =====================================
    // Login
    // =====================================

    const result = await loginService({
      username,
      password,
      loginAs,
    });

    // =====================================
    // Success Response
    // =====================================

    return res.status(200).json({
      message: "Login successful",
      token: result.token,
      role: result.role,
      user: result.user,
    });
  } catch (error) {
    console.error(
      "Login Controller Error:",
      error,
    );

    return res.status(401).json({
      message:
        error instanceof Error
          ? error.message
          : "Login failed",
    });
  }
};