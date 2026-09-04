import express from "express";

import {
  createFaq,
  getFaqs,
  getFaq,
  updateFaq,
  deleteFaq,
} from "../../controllers/FaqController/faqController.js";

const faqRoutes = express.Router();

faqRoutes.post("/", createFaq);

faqRoutes.get("/", getFaqs);

faqRoutes.get("/:id", getFaq);

faqRoutes.patch("/:id", updateFaq);

faqRoutes.delete("/:id", deleteFaq);

export default faqRoutes;
