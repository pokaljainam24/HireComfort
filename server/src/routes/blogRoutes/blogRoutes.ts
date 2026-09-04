import { Router } from "express";

import uploadIcon from "../../middleware/uploadIcon.js";

import {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
} from "../../controllers/blogController/blogController.js";

const router = Router();

// =====================================
// UPLOAD FIELDS
// =====================================

const blogUpload = uploadIcon.fields([
  {
    name: "blogImg",
    maxCount: 1,
  },
  {
    name: "authorImg",
    maxCount: 1,
  },
]);

// =====================================
// CREATE
// =====================================

router.post("/", blogUpload, createBlog);

// =====================================
// GET ALL
// =====================================

router.get("/", getBlogs);

// =====================================
// GET BY ID
// =====================================

router.get("/:id", getBlog);

// =====================================
// UPDATE
// =====================================

router.patch("/:id", blogUpload, updateBlog);

// =====================================
// DELETE
// =====================================

router.delete("/:id", deleteBlog);

export default router;
