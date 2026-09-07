import { Router } from "express";

import {
  getStates,
  getStatesByCountryId,
  getState,
} from "../../controllers/StateController/StateController.js";

const router = Router();

// =====================================
// State Routes
// =====================================

router.get("/", getStates);

router.get(
  "/country/:countryId",
  getStatesByCountryId,
);

router.get("/:id", getState);

export default router;