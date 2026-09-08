import { Router } from "express";

import {
  trackVisitorController,
  getVisitorCountController,
} from "../../controllers/visitorController/visitorController.js";

import { visitorRateLimiter } from "../../middleware/VisitorRateLimiter.js";


const router = Router();

// Public website visitor tracking
router.post(
  "/track",
  visitorRateLimiter,
  trackVisitorController
);

// Admin dashboard visitor count
router.get(
  "/count",
  getVisitorCountController
);

export default router;