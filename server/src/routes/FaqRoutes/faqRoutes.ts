import express from "express";

import {
  createFaq,
  getFaqs,
  getFaq,
  updateFaq,
  deleteFaq,
} from "../../controllers/FaqController/faqController.js";

import { authMiddleware } from "../../middleware/authMiddleware.js";

const faqRoutes =
  express.Router();

// =====================================
// CREATE
// =====================================

faqRoutes.post(
  "/",
  authMiddleware,
  createFaq,
);

// =====================================
// GET ALL
// =====================================

faqRoutes.get(
  "/",
  getFaqs,
);

// =====================================
// GET BY ID
// =====================================

faqRoutes.get(
  "/:id",
  getFaq,
);

// =====================================
// UPDATE
// =====================================

faqRoutes.patch(
  "/:id",
  authMiddleware,
  updateFaq,
);

// =====================================
// DELETE
// =====================================

faqRoutes.delete(
  "/:id",
  authMiddleware,
  deleteFaq,
);

export default faqRoutes;