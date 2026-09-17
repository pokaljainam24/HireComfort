import express from "express";

import {
  createRecruiter,
  getRecruiters,
  getRecruiter,
  updateRecruiter,
  deleteRecruiter,
  getRecruiterAnalytics,
  updatePassword
} from "../../controllers/Recruiter/recruiterController.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const recruiterRouter = express.Router();

recruiterRouter.post("/", createRecruiter);

recruiterRouter.get("/", getRecruiters);

recruiterRouter.get("/analytics", authMiddleware, getRecruiterAnalytics)

recruiterRouter.get("/:id", getRecruiter);

recruiterRouter.patch("/:id", updateRecruiter);

recruiterRouter.delete("/:id", deleteRecruiter);

recruiterRouter.patch("/:id/update-password", updatePassword);

export default recruiterRouter;
