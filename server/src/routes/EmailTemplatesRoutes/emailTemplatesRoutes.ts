import { Router } from "express";

import {
  createEmailTemplate,
  getEmailTemplates,
  getEmailTemplate,
  updateEmailTemplate,
  deleteEmailTemplate,
} from "../../controllers/EmailTemplatesController/emailTemplateController.js";

const router = Router();

router.post("/", createEmailTemplate);

router.get("/", getEmailTemplates);

router.get("/:id", getEmailTemplate);

router.put("/:id", updateEmailTemplate);

router.delete("/:id", deleteEmailTemplate);

export default router;
