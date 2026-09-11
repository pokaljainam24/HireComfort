import express from "express";

import {
  createRecruiter,
  getRecruiters,
  getRecruiter,
  updateRecruiter,
  deleteRecruiter,
  getRecruiterAnalytics
} from "../../controllers/Recruiter/recruiterController.js";

const recruiterRouter = express.Router();

recruiterRouter.post("/", createRecruiter);

recruiterRouter.get("/", getRecruiters);

recruiterRouter.get("/analytics", getRecruiterAnalytics)

recruiterRouter.get("/:id", getRecruiter);

recruiterRouter.patch("/:id", updateRecruiter);

recruiterRouter.delete("/:id", deleteRecruiter);

export default recruiterRouter;
