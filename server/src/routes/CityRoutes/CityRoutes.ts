import { Router } from "express";

import {
  getCities,
  getCitiesByStateId,
  getCity,
} from "../../controllers/CityController/CityController.js";

const router = Router();

// =====================================
// City Routes
// =====================================

router.get("/", getCities);

router.get(
  "/state/:stateId",
  getCitiesByStateId,
);

router.get("/:id", getCity);

export default router;