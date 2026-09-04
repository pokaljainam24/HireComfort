import { Router } from "express";

import {
  createCms,
  getCms,
  getCmsById,
  updateCms,
  deleteCms,
} from "../../controllers/cmsController/cmsController.js";

const router = Router();

router.post("/", createCms);

router.get("/", getCms);

router.get("/:id", getCmsById);

router.patch("/:id", updateCms);

router.delete("/:id", deleteCms);

export default router;
