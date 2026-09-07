import { Router } from "express";

import {
  getCountriesController,
  getCountry,
} from "../../controllers/CountryController/CountryController.js";

const router = Router();

// =====================================
// Country Routes
// =====================================

router.get("/", getCountriesController);
router.get("/:id", getCountry);

export default router;