import axios from "axios";

import type { Blog, BlogForm } from "@/types/blog";

const API_URL = "http://localhost:5000/api/blogs";

// =====================================
// GET BLOGS
// =====================================

export const getBlogs = async (): Promise<Blog[]> => {
  const response = await axios.get(API_URL);

  return response.data.blogs;
};

// =====================================
// GET BLOG BY ID
// =====================================

export const getBlogById = async (id: string): Promise<Blog> => {
  const response = await axios.get(`${API_URL}/${id}`);

  return response.data.blog;
};

// =====================================
// CREATE BLOG
// =====================================

export const createBlog = async (form: BlogForm): Promise<Blog> => {
  const formData = new FormData();

  formData.append("categoryId", form.categoryId);

  formData.append("title", form.title);

  formData.append("description", form.description);

  formData.append("metaTitle", form.metaTitle);

  formData.append("metaDescription", form.metaDescription);

  formData.append("authorName", form.authorName);

  formData.append("date", form.date);

  formData.append("durationInMin", form.durationInMin);

  formData.append("section", form.section);

  // Blog Image
  if (form.blogImg) {
    formData.append("blogImg", form.blogImg);
  }

  // Author Image
  if (form.authorImg) {
    formData.append("authorImg", form.authorImg);
  }

  const response = await axios.post(API_URL, formData);

  return response.data.blog;
};

// =====================================
// UPDATE BLOG
// =====================================

export const updateBlog = async (id: string, form: BlogForm): Promise<Blog> => {
  const formData = new FormData();

  formData.append("categoryId", form.categoryId);

  formData.append("title", form.title);

  formData.append("description", form.description);

  formData.append("metaTitle", form.metaTitle);

  formData.append("metaDescription", form.metaDescription);

  formData.append("authorName", form.authorName);

  formData.append("date", form.date);

  formData.append("durationInMin", form.durationInMin);

  formData.append("section", form.section);

  // Blog Image
  if (form.blogImg) {
    formData.append("blogImg", form.blogImg);
  }

  // Author Image
  if (form.authorImg) {
    formData.append("authorImg", form.authorImg);
  }

  const response = await axios.patch(`${API_URL}/${id}`, formData);

  return response.data.blog;
};

// =====================================
// DELETE BLOG
// =====================================

export const deleteBlog = async (id: string): Promise<Blog> => {
  const response = await axios.delete(`${API_URL}/${id}`);

  return response.data.blog;
};
