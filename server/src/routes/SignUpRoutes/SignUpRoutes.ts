import { Router } from "express";

import {
  signup,
} from "../../controllers/SignUpController/SignUpController.js";

const router = Router();


/* =========================
   SIGNUP
========================= */

router.post(
  "/signup",
  signup,
);


export default router;