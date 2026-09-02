import { Router } from "express";

import {
  createAdmin,
  loginAdmin,
  getAdmins,
  getAdmin,
  updateAdmin,
  deleteAdmin,
} from "../controllers/AdminController/adminController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

// ==========================================
// AUTH
// ==========================================

// POST /api/admin/login
router.post("/login", loginAdmin);

// ==========================================
// ADMIN CRUD
// ==========================================

// POST /api/admin
router.post("/", authMiddleware, createAdmin);

// GET /api/admin
router.get("/", authMiddleware, getAdmins);

// GET /api/admin/:id
router.get("/:id", authMiddleware, getAdmin);

// PUT /api/admin/:id
router.patch("/:id", authMiddleware, updateAdmin);

// DELETE /api/admin/:id
router.delete("/:id", authMiddleware, deleteAdmin);

export default router;
