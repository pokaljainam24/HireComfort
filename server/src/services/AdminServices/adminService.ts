import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import AdminMaster from "../../models/AdminModel/AdminModel.js";

export type IAdminMaster = InstanceType<typeof AdminMaster>;

// =====================================================
// CREATE ADMIN SERVICE
// =====================================================

export async function createAdminService(adminData: Partial<IAdminMaster>) {
  try {
    // ==============================
    // Username Validation
    // ==============================

    if (!adminData.username?.trim()) {
      throw new Error("Username is required");
    }

    if (adminData.username.trim().length < 3) {
      throw new Error("Username must contain at least 3 characters");
    }

    // ==============================
    // Password Validation
    // ==============================

    if (!adminData.password?.trim()) {
      throw new Error("Password is required");
    }

    if (adminData.password.length < 6) {
      throw new Error("Password must contain at least 6 characters");
    }

    // ==============================
    // Created By Validation
    // ==============================

    if (!adminData.createdBy?.trim()) {
      throw new Error("Created by is required");
    }

    // ==============================
    // Check Username Already Exists
    // ==============================

    const existingAdmin = await AdminMaster.findOne({
      username: adminData.username.trim(),
      deleteAt: null,
    });

    if (existingAdmin) {
      throw new Error("Username already exists");
    }

    // ==============================
    // Password Hash
    // ==============================

    const hashedPassword = await bcrypt.hash(adminData.password, 10);

    // ==============================
    // Create Admin
    // ==============================

    const admin = new AdminMaster({
      ...adminData,

      username: adminData.username.trim(),

      password: hashedPassword,

      isActive: adminData.isActive !== undefined ? adminData.isActive : true,

      isDisplay: adminData.isDisplay !== undefined ? adminData.isDisplay : true,

      createdAt: new Date(),
      createdBy: adminData.createdBy.trim(),

      updatedAt: new Date(),
      updatedBy: null,

      deleteAt: null,
      deleteBy: null,
    });

    const savedAdmin = await admin.save();

    // Password response mein nahi bhejna
    const result = savedAdmin.toObject() as {
      password?: string;
      [key: string]: any;
    };

    delete result.password;

    return result;
  } catch (error) {
    console.error("Error creating admin:", error);
    throw error;
  }
}

// =====================================================
// LOGIN ADMIN SERVICE
// =====================================================

export async function loginAdminService(username: string, password: string) {
  try {
    // ==============================
    // Username Validation
    // ==============================

    if (!username?.trim()) {
      throw new Error("Username is required");
    }

    // ==============================
    // Password Validation
    // ==============================

    if (!password?.trim()) {
      throw new Error("Password is required");
    }

    // ==============================
    // Find Admin
    // ==============================

    const admin = await AdminMaster.findOne({
      username: username.trim(),
      isActive: true,
      isDisplay: true,
      deleteAt: null,
    });

    if (!admin) {
      throw new Error("Invalid username or password");
    }

    // ==============================
    // Compare Password
    // ==============================

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      throw new Error("Invalid username or password");
    }

    // ==============================
    // JWT Secret Validation
    // ==============================

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT secret is not configured");
    }

    // ==============================
    // Generate JWT
    // ==============================

    const token = jwt.sign(
      {
        id: admin._id.toString(),
        username: admin.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    // ==============================
    // Login Response
    // ==============================

    return {
      token,

      user: {
        id: admin._id,
        username: admin.username,
      },
    };
  } catch (error) {
    console.error("Error admin login:", error);
    throw error;
  }
}

// =====================================================
// GET ADMIN SERVICE
// =====================================================

export async function getAdminService() {
  try {
    return await AdminMaster.find({
      isActive: true,
      isDisplay: true,
      deleteAt: null,
    }).select("-password");
  } catch (error) {
    console.error("Error getting admins:", error);
    throw error;
  }
}

// =====================================================
// GET ADMIN BY ID SERVICE
// =====================================================

export async function getAdminByIdService(id: string) {
  try {
    // ==============================
    // ID Validation
    // ==============================

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid admin ID");
    }

    return await AdminMaster.findOne({
      _id: id,
      isActive: true,
      isDisplay: true,
      deleteAt: null,
    }).select("-password");
  } catch (error) {
    console.error(`Error getting admin with id ${id}:`, error);

    throw error;
  }
}

// =====================================================
// UPDATE ADMIN SERVICE
// =====================================================

export async function updateAdminService(
  id: string,
  updateData: Partial<IAdminMaster>,
) {
  try {
    // ==============================
    // ID Validation
    // ==============================

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid admin ID");
    }

    // ==============================
    // Username Validation
    // ==============================

    if (updateData.username !== undefined) {
      if (!updateData.username.trim()) {
        throw new Error("Username is required");
      }

      if (updateData.username.trim().length < 3) {
        throw new Error("Username must contain at least 3 characters");
      }

      const existingAdmin = await AdminMaster.findOne({
        username: updateData.username.trim(),
        _id: { $ne: id },
        deleteAt: null,
      });

      if (existingAdmin) {
        throw new Error("Username already exists");
      }

      updateData.username = updateData.username.trim();
    }

    // ==============================
    // Password Validation
    // ==============================

    if (updateData.password !== undefined) {
      if (!updateData.password.trim()) {
        throw new Error("Password cannot be empty");
      }

      if (updateData.password.length < 6) {
        throw new Error("Password must contain at least 6 characters");
      }

      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    // ==============================
    // Update Admin
    // ==============================

    return await AdminMaster.findOneAndUpdate(
      {
        _id: id,
        isActive: true,
        isDisplay: true,
        deleteAt: null,
      },
      {
        ...updateData,
        updatedAt: new Date(),
      },
      {
        new: true,
        runValidators: true,
      },
    ).select("-password");
  } catch (error) {
    console.error(`Error updating admin with id ${id}:`, error);

    throw error;
  }
}

// =====================================================
// DELETE ADMIN SERVICE
// =====================================================

export async function deleteAdminService(id: string, deleteBy: string) {
  try {
    // ==============================
    // ID Validation
    // ==============================

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid admin ID");
    }

    // ==============================
    // Delete By Validation
    // ==============================

    if (!deleteBy?.trim()) {
      throw new Error("Delete by is required");
    }

    // ==============================
    // Soft Delete
    // ==============================

    return await AdminMaster.findOneAndUpdate(
      {
        _id: id,
        isActive: true,
        isDisplay: true,
        deleteAt: null,
      },
      {
        isActive: false,
        isDisplay: false,

        deleteAt: new Date(),
        deleteBy: deleteBy.trim(),

        updatedAt: new Date(),
        updatedBy: deleteBy.trim(),
      },
      {
        new: true,
      },
    ).select("-password");
  } catch (error) {
    console.error(`Error deleting admin with id ${id}:`, error);

    throw error;
  }
}

// =====================================================
// GET ALL ADMIN FOR ADMIN SERVICE
// =====================================================

export async function getAllAdminForAdminService() {
  try {
    return await AdminMaster.find().select("-password").sort({
      createdAt: -1,
    });
  } catch (error) {
    console.error("Error getting admins for admin:", error);

    throw error;
  }
}
