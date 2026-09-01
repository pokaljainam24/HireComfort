import express from "express";

import {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
} from "../../controllers/blogController/blogController.js";

import upload from "../../middleware/upload.js";



const router = express.Router();

// CREATE BLOG

router.post(
  "/",
  upload.fields([
    {
      name: "bgImage",
      maxCount: 1,
    },
    {
      name: "heroImage",
      maxCount: 1,
    },
    {
      name: "heroImg",
      maxCount: 1,
    },
    {
      name: "authorImg",
      maxCount: 1,
    },
  ]),
  createBlog,
);

// GET ALL

router.get("/", getBlogs);

// GET BY ID

router.get("/:id", getBlog);

// UPDATE

router.put(
  "/:id",
  upload.fields([
    {
      name: "bgImage",
      maxCount: 1,
    },
    {
      name: "heroImage",
      maxCount: 1,
    },
    {
      name: "heroImg",
      maxCount: 1,
    },
    {
      name: "authorImg",
      maxCount: 1,
    },
  ]),
  updateBlog,
);

// DELETE

router.delete("/:id", deleteBlog);

export default router;
