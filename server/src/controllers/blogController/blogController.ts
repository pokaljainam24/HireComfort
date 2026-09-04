import type { Request, Response } from "express";

import {
  createBlogService,
  getBlogService,
  getBlogByIdService,
  updateBlogService,
  deleteBlogService,
} from "../../services/blogServices/blogService.js";

// =====================================
// CREATE BLOG
// =====================================

export const createBlog = async (req: Request, res: Response) => {
  try {
    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const blogImg = files?.blogImg?.[0]?.path?.replace(/\\/g, "/") || "";

    const authorImg = files?.authorImg?.[0]?.path?.replace(/\\/g, "/") || "";

    const blog = await createBlogService({
      ...req.body,

      blogImg,

      authorImg,

      createdBy: "admin",
    });

    return res.status(201).json({
      message: "Blog created successfully",

      blog,
    });
  } catch (error) {
    console.error("Error creating blog:", error);

    return res.status(500).json({
      message: "Error creating blog",
    });
  }
};

// =====================================
// GET BLOGS
// =====================================

export const getBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await getBlogService();

    return res.status(200).json({
      blogs,
    });
  } catch (error) {
    console.error("Error getting blogs:", error);

    return res.status(500).json({
      message: "Error getting blogs",
    });
  }
};

// =====================================
// GET BLOG
// =====================================

export const getBlog = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id;

    if (typeof blogId !== "string") {
      return res.status(400).json({
        message: "Invalid blog ID",
      });
    }

    const blog = await getBlogByIdService(blogId);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      blog,
    });
  } catch (error) {
    console.error("Error getting blog:", error);

    return res.status(500).json({
      message: "Error getting blog",
    });
  }
};

// =====================================
// UPDATE BLOG
// =====================================

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id;

    if (typeof blogId !== "string") {
      return res.status(400).json({
        message: "Invalid blog ID",
      });
    }

    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const updateData: any = {
      ...req.body,

      updatedBy: "admin",
    };

    // =====================================
    // BLOG IMAGE
    // =====================================

    if (files?.blogImg?.[0]) {
      updateData.blogImg = files.blogImg[0].path.replace(/\\/g, "/");
    }

    // =====================================
    // AUTHOR IMAGE
    // =====================================

    if (files?.authorImg?.[0]) {
      updateData.authorImg = files.authorImg[0].path.replace(/\\/g, "/");
    }

    const blog = await updateBlogService(blogId, updateData);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      message: "Blog updated successfully",

      blog,
    });
  } catch (error) {
    console.error("Error updating blog:", error);

    return res.status(500).json({
      message: "Error updating blog",
    });
  }
};

// =====================================
// DELETE BLOG
// =====================================

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id;

    if (typeof blogId !== "string") {
      return res.status(400).json({
        message: "Invalid blog ID",
      });
    }

    const deleteBy = "admin";

    const blog = await deleteBlogService(blogId, deleteBy);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      message: "Blog deleted successfully",

      blog,
    });
  } catch (error) {
    console.error("Error deleting blog:", error);

    return res.status(500).json({
      message: "Error deleting blog",
    });
  }
};
