import type { Request, Response } from "express";

import {
  createAdminService,
  loginAdminService,
  getAdminService,
  getAdminByIdService,
  updateAdminService,
  deleteAdminService,
} from "../../services/AdminServices/adminService.js";

// =====================================================
// CREATE ADMIN
// =====================================================

export const createAdmin = async (req: Request, res: Response) => {
  try {
    const admin = await createAdminService({
      ...req.body,
      createdBy: "admin",
    });

    return res.status(201).json({
      message: "Admin created successfully",
      admin,
    });
  } catch (error) {
    console.error("Error creating admin:", error);

    return res.status(500).json({
      message: "Error creating admin",
    });
  }
};

// =====================================================
// LOGIN ADMIN
// =====================================================

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const result = await loginAdminService(username, password);

    return res.status(200).json({
      message: "Login successful",
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    console.error("Error admin login:", error);

    return res.status(401).json({
      message: "Invalid username or password",
    });
  }
};

// =====================================================
// GET ADMINS
// =====================================================

export const getAdmins = async (req: Request, res: Response) => {
  try {
    const admins = await getAdminService();

    return res.status(200).json({
      admins,
    });
  } catch (error) {
    console.error("Error getting admins:", error);

    return res.status(500).json({
      message: "Error getting admins",
    });
  }
};

// =====================================================
// GET ADMIN BY ID
// =====================================================

export const getAdmin = async (req: Request, res: Response) => {
  try {
    const adminId = req.params.id;

    if (typeof adminId !== "string") {
      return res.status(400).json({
        message: "Invalid admin ID",
      });
    }

    const admin = await getAdminByIdService(adminId);

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    return res.status(200).json({
      admin,
    });
  } catch (error) {
    console.error("Error getting admin:", error);

    return res.status(500).json({
      message: "Error getting admin",
    });
  }
};

// =====================================================
// UPDATE ADMIN
// =====================================================

export const updateAdmin = async (req: Request, res: Response) => {
  try {
    const adminId = req.params.id;

    if (typeof adminId !== "string") {
      return res.status(400).json({
        message: "Invalid admin ID",
      });
    }

    const admin = await updateAdminService(adminId, {
      ...req.body,
      updatedBy: "admin",
    });

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    return res.status(200).json({
      message: "Admin updated successfully",
      admin,
    });
  } catch (error) {
    console.error("Error updating admin:", error);

    return res.status(500).json({
      message: "Error updating admin",
    });
  }
};

// =====================================================
// DELETE ADMIN
// =====================================================

export const deleteAdmin = async (req: Request, res: Response) => {
  try {
    const adminId = req.params.id;

    if (typeof adminId !== "string") {
      return res.status(400).json({
        message: "Invalid admin ID",
      });
    }

    const deleteBy = "admin";

    const admin = await deleteAdminService(adminId, deleteBy);

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    return res.status(200).json({
      message: "Admin deleted successfully",
      admin,
    });
  } catch (error) {
    console.error("Error deleting admin:", error);

    return res.status(500).json({
      message: "Error deleting admin",
    });
  }
};
