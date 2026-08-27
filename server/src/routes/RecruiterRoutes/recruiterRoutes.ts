import express from "express";

import {
  createRecruiter,
  getRecruiters,
  getRecruiter,
  updateRecruiter,
  deleteRecruiter,
} from "../../controllers/Recruiter/recruiterController.js";

const recruiterRouter = express.Router();

recruiterRouter.post("/", createRecruiter);

recruiterRouter.get("/", getRecruiters);

recruiterRouter.get("/:id", getRecruiter);

recruiterRouter.patch("/:id", updateRecruiter);

recruiterRouter.delete("/:id", deleteRecruiter);

export default recruiterRouter;
