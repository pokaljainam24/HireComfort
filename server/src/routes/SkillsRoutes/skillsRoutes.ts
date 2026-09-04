import express from "express";

import {
  createSkills,
  getSkills,
  getSkill,
  updateSkills,
  deleteSkills,
} from "../../controllers/SkillsController/skillsController.js";

const skillsRoutes = express.Router();

skillsRoutes.post("/", createSkills);

skillsRoutes.get("/", getSkills);

skillsRoutes.get("/:id", getSkill);

skillsRoutes.patch("/:id", updateSkills);

skillsRoutes.delete("/:id", deleteSkills);

export default skillsRoutes;
