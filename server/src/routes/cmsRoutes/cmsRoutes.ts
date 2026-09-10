import { Router } from "express";

import {
  createCms,
  getCms,
  getCmsById,
  updateCms,
  deleteCms,
} from "../../controllers/cmsController/cmsController.js";

import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = Router();

router.post("/", authMiddleware, createCms);

router.get("/", getCms);

router.get("/:id", getCmsById);

router.patch("/:id", authMiddleware, updateCms);

router.delete("/:id", authMiddleware, deleteCms);

export default router;
