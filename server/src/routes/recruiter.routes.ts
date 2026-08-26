import express from "express";

import {
  createRecruiter,
  getRecruiters,
  getRecruiter,
  updateRecruiter,
  deleteRecruiter,
} from "../controllers/recruiter.controller.js";

const recruiterRouter = express.Router();

recruiterRouter.post("/", createRecruiter);

recruiterRouter.get("/", getRecruiters);

recruiterRouter.get("/:id", getRecruiter);

recruiterRouter.put("/:id", updateRecruiter);

recruiterRouter.delete("/:id", deleteRecruiter);

export default recruiterRouter;
