import { Router } from "express";

import {
  login,
} from "../../controllers/LoginController/LoginController.js";

const router = Router();

// =====================================
// Login
// =====================================

router.post(
  "/login",
  login,
);

export default router;