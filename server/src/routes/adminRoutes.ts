import { Router } from "express";

import {
  createAdmin,
  loginAdmin,
  getAdmins,
  getAdmin,
  updateAdmin,
  deleteAdmin,
  changeAdminPassword,
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

// PATCH /api/admin/:id
router.patch("/:id", authMiddleware, updateAdmin);

// DELETE /api/admin/:id
router.delete("/:id", authMiddleware, deleteAdmin);

// ==========================================
// CHANGE PASSWORD
// ==========================================

// PUT /api/admin/change-password
router.put(
  "/change-password",
  authMiddleware,
  changeAdminPassword,
);

export default router;