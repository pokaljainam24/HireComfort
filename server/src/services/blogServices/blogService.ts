import mongoose from "mongoose";

import BlogMaster from "../../models/BlogModel/BlogModel.js";

export type IBlogMaster = InstanceType<typeof BlogMaster>;

// =====================================================
// CREATE BLOG
// =====================================================

export async function createBlogService(blogData: Partial<IBlogMaster>) {
  try {
    // ==============================
    // Title Validation
    // ==============================

    if (!blogData.title?.trim()) {
      throw new Error("Blog title is required");
    }

    if (blogData.title.trim().length < 5) {
      throw new Error("Blog title must contain at least 5 characters");
    }

    // ==============================
    // Description Validation
    // ==============================

    if (!blogData.description?.trim()) {
      throw new Error("Blog description is required");
    }

    // ==============================
    // Blog Type Validation
    // ==============================

    if (!blogData.type?.trim()) {
      throw new Error("Blog type is required");
    }

    // ==============================
    // Author Name Validation
    // ==============================

    if (!blogData.authorName?.trim()) {
      throw new Error("Author name is required");
    }

    if (blogData.authorName.trim().length < 2) {
      throw new Error("Author name must contain at least 2 characters");
    }

    // ==============================
    // Author Image Validation
    // ==============================

    if (!blogData.authorImg?.trim()) {
      throw new Error("Author image is required");
    }

    // ==============================
    // Date Validation
    // ==============================

    if (!blogData.date) {
      throw new Error("Blog date is required");
    }

    const blogDate = new Date(blogData.date);

    if (isNaN(blogDate.getTime())) {
      throw new Error("Invalid blog date");
    }

    // ==============================
    // Duration Validation
    // ==============================

    if (!blogData.durationInMin?.trim()) {
      throw new Error("Blog duration is required");
    }

    // ==============================
    // Section Validation
    // ==============================

    if (!blogData.section?.trim()) {
      throw new Error("Blog section is required");
    }

    if (blogData.section !== "big" && blogData.section !== "latest") {
      throw new Error("Blog section must be either big or latest");
    }

    // ==============================
    // Big Blog Validation
    // ==============================

    if (blogData.section === "big") {
      if (!blogData.bgImage?.trim()) {
        throw new Error("Background image is required");
      }

      if (!blogData.heroImage?.trim()) {
        throw new Error("Hero image is required");
      }
    }

    // ==============================
    // Latest Blog Validation
    // ==============================

    if (blogData.section === "latest") {
      if (!blogData.heroImg?.trim()) {
        throw new Error("Hero image is required");
      }
    }

    // ==============================
    // Create Blog
    // ==============================

    const blog = new BlogMaster({
      ...blogData,

      // Normalize values

      title: blogData.title.trim(),

      description: blogData.description.trim(),

      type: blogData.type.trim(),

      authorName: blogData.authorName.trim(),

      authorImg: blogData.authorImg.trim(),

      bgImage: blogData.bgImage?.trim() || "",

      heroImage: blogData.heroImage?.trim() || "",

      heroImg: blogData.heroImg?.trim() || "",

      durationInMin: blogData.durationInMin.trim(),

      section: blogData.section.trim(),

      date: blogDate,

      // Status

      isActive: true,

      isDisplay: true,

      // Audit

      createdBy: blogData.createdBy || "admin",

      updatedBy: null,

      // Soft Delete

      deleteAt: null,

      deleteBy: null,
    });

    return await blog.save();
  } catch (error) {
    console.error("Error creating blog:", error);

    throw error;
  }
}

// =====================================================
// GET ALL ACTIVE BLOGS
// =====================================================

export async function getBlogService() {
  try {
    return await BlogMaster.find({
      isActive: true,

      isDisplay: true,
    }).sort({
      createdAt: -1,
    });
  } catch (error) {
    console.error("Error getting blogs:", error);

    throw error;
  }
}

// =====================================================
// GET BLOG BY ID
// =====================================================

export async function getBlogByIdService(id: string) {
  try {
    // ==============================
    // ID Validation
    // ==============================

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid blog ID");
    }

    return await BlogMaster.findOne({
      _id: id,

      isActive: true,

      isDisplay: true,
    });
  } catch (error) {
    console.error(`Error getting blog with id ${id}:`, error);

    throw error;
  }
}

// =====================================================
// UPDATE BLOG
// =====================================================

export async function updateBlogService(
  id: string,

  updateData: Partial<IBlogMaster>,
) {
  try {
    // ==============================
    // ID Validation
    // ==============================

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid blog ID");
    }

    // ==============================
    // Update
    // ==============================

    return await BlogMaster.findOneAndUpdate(
      {
        _id: id,

        isActive: true,

        isDisplay: true,
      },

      {
        ...updateData,

        updatedAt: new Date(),
      },

      {
        new: true,

        runValidators: true,
      },
    );
  } catch (error) {
    console.error(`Error updating blog with id ${id}:`, error);

    throw error;
  }
}

// =====================================================
// DELETE BLOG - SOFT DELETE
// =====================================================

export async function deleteBlogService(
  id: string,

  deleteBy: string,
) {
  try {
    // ==============================
    // ID Validation
    // ==============================

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid blog ID");
    }

    return await BlogMaster.findOneAndUpdate(
      {
        _id: id,

        isActive: true,
      },

      {
        isActive: false,

        isDisplay: false,

        deleteAt: new Date(),

        deleteBy,
      },

      {
        new: true,
      },
    );
  } catch (error) {
    console.error(`Error deleting blog with id ${id}:`, error);

    throw error;
  }
}

// =====================================================
// GET ALL BLOGS FOR ADMIN
// =====================================================

export async function getAllBlogForAdminService() {
  try {
    return await BlogMaster.find().sort({
      createdAt: -1,
    });
  } catch (error) {
    console.error("Error getting blogs for admin:", error);

    throw error;
  }
}
