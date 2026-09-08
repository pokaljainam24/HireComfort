import type { Request, Response } from "express";
import {
  generateSessionId,
  getClientIp,
} from "../../utils/visitorUtils.js";
import { trackVisitor } from "../../services/VisitorService/VisitorService.js";
import VisitorModel from "../../models/VisitorModel/VisitorModel.js";

export const trackVisitorController = async (
  req: Request,
  res: Response
) => {
  try {
    let sessionId = req.cookies?.visitor_session;

    if (!sessionId) {
      sessionId = generateSessionId();

      res.cookie("visitor_session", sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 365 * 24 * 60 * 60 * 1000,
      });
    }

    const ip = getClientIp(req);

    const result = await trackVisitor({
      ip,
      sessionId,
    });

    if (result.counted) {
      res.cookie("visitor_tracked", "1", {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      });
    }

    return res.status(200).json({
      success: true,
      counted: result.counted,
      reason: result.reason,
    });
  } catch (error) {
    console.error("Visitor tracking error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to track visitor",
    });
  }
};

// =====================================
// Get Total Visitor Count
// =====================================

export const getVisitorCountController = async (
  req: Request,
  res: Response
) => {
  try {
    const count = await VisitorModel.countDocuments();

    return res.status(200).json({
      success: true,
      count,
    });
  } catch (error) {
    console.error("Get visitor count error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get visitor count",
    });
  }
};