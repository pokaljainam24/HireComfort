import fs from "fs";
import path from "path";

import BlogMaster from "../../models/BlogModel/BlogModel.js";

export type IBlogMaster = InstanceType<typeof BlogMaster>;

// =====================================
// STATIC BLOG CATEGORIES
// =====================================

const BLOG_CATEGORIES = ["Job Seekers", "Recruiters"] as const;

// =====================================
// DELETE IMAGE FILE
// =====================================

const deleteImageFile = (imagePath?: string | null) => {
  try {
    if (!imagePath) {
      return;
    }

    const filePath = path.resolve(imagePath);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);

      console.log("Image deleted:", filePath);
    }
  } catch (error) {
    console.error("Error deleting image file:", error);
  }
};

// =====================================
// CREATE BLOG
// =====================================

export async function createBlogService(
  blogData: Partial<IBlogMaster>,
) {
  try {
    // ==============================
    // Category Validation
    // ==============================

    if (!blogData.categoryId?.trim()) {
      throw new Error("Blog category is required");
    }

    if (
      !BLOG_CATEGORIES.includes(
        blogData.categoryId.trim() as (typeof BLOG_CATEGORIES)[number],
      )
    ) {
      throw new Error(
        "Blog category must be either Job Seekers or Recruiters",
      );
    }

    // ==============================
    // Title Validation
    // ==============================

    if (!blogData.title?.trim()) {
      throw new Error("Blog title is required");
    }

    if (blogData.title.trim().length < 2) {
      throw new Error(
        "Blog title must contain at least 2 characters",
      );
    }

    // ==============================
    // Description Validation
    // ==============================

    if (!blogData.description?.trim()) {
      throw new Error("Blog description is required");
    }

    if (blogData.description.trim().length < 2) {
      throw new Error(
        "Blog description must contain at least 2 characters",
      );
    }

    // ==============================
    // Meta Title Validation
    // ==============================

    if (!blogData.metaTitle?.trim()) {
      throw new Error("Meta title is required");
    }

    // ==============================
    // Meta Description Validation
    // ==============================

    if (!blogData.metaDescription?.trim()) {
      throw new Error("Meta description is required");
    }

    // ==============================
    // Blog Image Validation
    // ==============================

    if (!blogData.blogImg?.trim()) {
      throw new Error("Blog image is required");
    }

    // ==============================
    // Author Image Validation
    // ==============================

    if (!blogData.authorImg?.trim()) {
      throw new Error("Author image is required");
    }

    // ==============================
    // Author Name Validation
    // ==============================

    if (!blogData.authorName?.trim()) {
      throw new Error("Author name is required");
    }

    if (blogData.authorName.trim().length < 2) {
      throw new Error(
        "Author name must contain at least 2 characters",
      );
    }

    // ==============================
    // Date Validation
    // ==============================

    if (!blogData.date) {
      throw new Error("Blog date is required");
    }

    // ==============================
    // Reading Time Validation
    // ==============================

    if (!blogData.durationInMin?.trim()) {
      throw new Error("Reading time is required");
    }

    // ==============================
    // Section Validation
    // ==============================

    if (!blogData.section) {
      throw new Error("Blog section is required");
    }

    if (!["big", "latest"].includes(blogData.section)) {
      throw new Error(
        "Blog section must be either big or latest",
      );
    }

    // ==============================
    // Duplicate Blog Validation
    // ==============================

    const existingBlog = await BlogMaster.findOne({
      title: blogData.title.trim(),
      isActive: true,
      isDisplay: true,
    });

    if (existingBlog) {
      throw new Error("Blog with this title already exists");
    }

    // ==============================
    // Created By Validation
    // ==============================

    if (!blogData.createdBy?.trim()) {
      throw new Error("Created by is required");
    }

    // ==============================
    // Create Blog
    // ==============================

    const blog = new BlogMaster({
      ...blogData,

      categoryId: blogData.categoryId.trim(),

      title: blogData.title.trim(),

      description: blogData.description.trim(),

      metaTitle: blogData.metaTitle.trim(),

      metaDescription: blogData.metaDescription.trim(),

      blogImg: blogData.blogImg.trim(),

      authorImg: blogData.authorImg.trim(),

      authorName: blogData.authorName.trim(),

      durationInMin: blogData.durationInMin.trim(),

      section: blogData.section,

      // Status
      isActive: true,
      isDisplay: true,

      // Audit
      createdBy: blogData.createdBy.trim(),

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

// =====================================
// GET ALL BLOGS
// =====================================

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

// =====================================
// GET BLOG BY ID
// =====================================

export async function getBlogByIdService(id: string) {
  try {
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

// =====================================
// UPDATE BLOG
// =====================================

export async function updateBlogService(
  id: string,
  updateData: Partial<IBlogMaster>,
) {
  try {
    // ==============================
    // Category Validation
    // ==============================

    if (updateData.categoryId !== undefined) {
      if (!updateData.categoryId?.trim()) {
        throw new Error("Blog category is required");
      }

      if (
        !BLOG_CATEGORIES.includes(
          updateData.categoryId.trim() as (typeof BLOG_CATEGORIES)[number],
        )
      ) {
        throw new Error(
          "Blog category must be either Job Seekers or Recruiters",
        );
      }
    }

    // ==============================
    // Title Validation
    // ==============================

    if (
      updateData.title !== undefined &&
      !updateData.title.trim()
    ) {
      throw new Error("Blog title is required");
    }

    if (
      updateData.title !== undefined &&
      updateData.title.trim().length < 2
    ) {
      throw new Error(
        "Blog title must contain at least 2 characters",
      );
    }

    // ==============================
    // Description Validation
    // ==============================

    if (
      updateData.description !== undefined &&
      !updateData.description.trim()
    ) {
      throw new Error("Blog description is required");
    }

    if (
      updateData.description !== undefined &&
      updateData.description.trim().length < 2
    ) {
      throw new Error(
        "Blog description must contain at least 2 characters",
      );
    }

    // ==============================
    // Meta Title Validation
    // ==============================

    if (
      updateData.metaTitle !== undefined &&
      !updateData.metaTitle.trim()
    ) {
      throw new Error("Meta title is required");
    }

    // ==============================
    // Meta Description Validation
    // ==============================

    if (
      updateData.metaDescription !== undefined &&
      !updateData.metaDescription.trim()
    ) {
      throw new Error("Meta description is required");
    }

    // ==============================
    // Blog Image Validation
    // ==============================

    if (
      updateData.blogImg !== undefined &&
      !updateData.blogImg.trim()
    ) {
      throw new Error("Blog image is required");
    }

    // ==============================
    // Author Image Validation
    // ==============================

    if (
      updateData.authorImg !== undefined &&
      !updateData.authorImg.trim()
    ) {
      throw new Error("Author image is required");
    }

    // ==============================
    // Author Name Validation
    // ==============================

    if (
      updateData.authorName !== undefined &&
      !updateData.authorName.trim()
    ) {
      throw new Error("Author name is required");
    }

    if (
      updateData.authorName !== undefined &&
      updateData.authorName.trim().length < 2
    ) {
      throw new Error(
        "Author name must contain at least 2 characters",
      );
    }

    // ==============================
    // Date Validation
    // ==============================

    if (
      updateData.date !== undefined &&
      !updateData.date
    ) {
      throw new Error("Blog date is required");
    }

    // ==============================
    // Reading Time Validation
    // ==============================

    if (
      updateData.durationInMin !== undefined &&
      !updateData.durationInMin.trim()
    ) {
      throw new Error("Reading time is required");
    }

    // ==============================
    // Section Validation
    // ==============================

    if (updateData.section !== undefined) {
      if (!["big", "latest"].includes(updateData.section)) {
        throw new Error(
          "Blog section must be either big or latest",
        );
      }
    }

    // ==============================
    // Updated By Validation
    // ==============================

    if (!updateData.updatedBy?.trim()) {
      throw new Error("Updated by is required");
    }

    // ==============================
    // Duplicate Title Validation
    // ==============================

    if (updateData.title !== undefined) {
      const existingBlog = await BlogMaster.findOne({
        _id: { $ne: id },
        title: updateData.title.trim(),
        isActive: true,
        isDisplay: true,
      });

      if (existingBlog) {
        throw new Error(
          "Blog with this title already exists",
        );
      }
    }

    // ==============================
    // GET OLD BLOG
    // ==============================

    const oldBlog = await BlogMaster.findOne({
      _id: id,
      isActive: true,
      isDisplay: true,
    });

    if (!oldBlog) {
      throw new Error("Blog not found");
    }

    const oldBlogImg = oldBlog.blogImg;
    const oldAuthorImg = oldBlog.authorImg;

    // ==============================
    // Normalize Values
    // ==============================

    const data: Partial<IBlogMaster> = {
      ...updateData,
    };

    if (data.categoryId !== undefined) {
      data.categoryId = data.categoryId.trim();
    }

    if (data.title !== undefined) {
      data.title = data.title.trim();
    }

    if (data.description !== undefined) {
      data.description = data.description.trim();
    }

    if (data.metaTitle !== undefined) {
      data.metaTitle = data.metaTitle.trim();
    }

    if (data.metaDescription !== undefined) {
      data.metaDescription = data.metaDescription.trim();
    }

    if (data.blogImg !== undefined) {
      data.blogImg = data.blogImg.trim();
    }

    if (data.authorImg !== undefined) {
      data.authorImg = data.authorImg.trim();
    }

    if (data.authorName !== undefined) {
      data.authorName = data.authorName.trim();
    }

    if (data.durationInMin !== undefined) {
      data.durationInMin = data.durationInMin.trim();
    }

    if (data.updatedBy != null) {
      data.updatedBy = data.updatedBy.trim();
    }

    // ==============================
    // Update Blog
    // ==============================

    const updatedBlog = await BlogMaster.findOneAndUpdate(
      {
        _id: id,
        isActive: true,
        isDisplay: true,
      },

      data,

      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedBlog) {
      throw new Error("Blog not found");
    }

    // ==============================
    // DELETE OLD BLOG IMAGE
    // ==============================

    if (
      data.blogImg !== undefined &&
      oldBlogImg &&
      oldBlogImg !== data.blogImg
    ) {
      deleteImageFile(oldBlogImg);
    }

    // ==============================
    // DELETE OLD AUTHOR IMAGE
    // ==============================

    if (
      data.authorImg !== undefined &&
      oldAuthorImg &&
      oldAuthorImg !== data.authorImg
    ) {
      deleteImageFile(oldAuthorImg);
    }

    return updatedBlog;
  } catch (error) {
    console.error(`Error updating blog with id ${id}:`, error);

    throw error;
  }
}

// =====================================
// DELETE BLOG
// =====================================

export async function deleteBlogService(
  id: string,
  deleteBy: string,
) {
  try {
    // ==============================
    // Delete By Validation
    // ==============================

    if (!deleteBy?.trim()) {
      throw new Error("Delete by is required");
    }

    // ==============================
    // GET BLOG
    // ==============================

    const blog = await BlogMaster.findOne({
      _id: id,
      isActive: true,
    });

    if (!blog) {
      return null;
    }

    // ==============================
    // DELETE BLOG IMAGE
    // ==============================

    if (blog.blogImg) {
      deleteImageFile(blog.blogImg);
    }

    // ==============================
    // DELETE AUTHOR IMAGE
    // ==============================

    if (blog.authorImg) {
      deleteImageFile(blog.authorImg);
    }

    // ==============================
    // Soft Delete
    // ==============================

    return await BlogMaster.findOneAndUpdate(
      {
        _id: id,
        isActive: true,
      },

      {
        isActive: false,
        isDisplay: false,

        deleteAt: new Date(),
        deleteBy: deleteBy.trim(),
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

// =====================================
// GET ALL BLOGS FOR ADMIN
// =====================================

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
