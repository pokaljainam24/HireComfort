import { Router } from "express";

// =====================================
// OTP Controller
// =====================================

import {
  sendContactOtp,
  verifyContactOtp,
} from "../../controllers/contactOtpController/contactOtpController.js";

// =====================================
// Contact Controller
// =====================================

import {
  createContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact,
} from "../../controllers/contactController/contactController.js";

const router = Router();

// =====================================
// OTP Routes
// =====================================

router.post(
  "/send-otp",
  sendContactOtp,
);

router.post(
  "/verify-otp",
  verifyContactOtp,
);

// =====================================
// Contact Routes
// =====================================

router.post(
  "/",
  createContact,
);

router.get(
  "/",
  getContacts,
);

router.get(
  "/:id",
  getContact,
);

router.put(
  "/:id",
  updateContact,
);

router.delete(
  "/:id",
  deleteContact,
);

export default router;