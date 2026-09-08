import axios from "axios";

import type {
  Blog,
  BlogForm,
} from "@/types/blog";

const SERVER_URL = "http://localhost:5000";

const API_URL = `${SERVER_URL}/api/blogs`;

// =====================================
// AUTH HEADER
// =====================================

const getAuthHeaders = () => {
  const token = sessionStorage.getItem("admin_panel_auth_token");

  if (!token) {
    throw new Error("Authentication token not found");
  }

  return {
    Authorization: `Bearer ${token}`,
  };
};

// =====================================
// IMAGE URL
// =====================================

export const getBlogImageUrl = (
  imagePath?: string,
): string => {
  if (!imagePath) {
    return "";
  }

  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  return `${SERVER_URL}/${imagePath.replace(/^\/+/, "")}`;
};

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

export const getBlogById = async (
  id: string,
): Promise<Blog> => {
  const response = await axios.get(
    `${API_URL}/${id}`,
  );

  return response.data.blog;
};

// =====================================
// CREATE BLOG
// =====================================

export const createBlog = async (
  form: BlogForm,
): Promise<Blog> => {
  const formData = new FormData();

  formData.append(
    "categoryId",
    form.categoryId,
  );

  formData.append(
    "title",
    form.title,
  );

  formData.append(
    "description",
    form.description,
  );

  formData.append(
    "metaTitle",
    form.metaTitle,
  );

  formData.append(
    "metaDescription",
    form.metaDescription,
  );

  formData.append(
    "authorName",
    form.authorName,
  );

  formData.append(
    "date",
    form.date,
  );

  formData.append(
    "durationInMin",
    form.durationInMin,
  );

  formData.append(
    "section",
    form.section,
  );

  // =====================================
  // BLOG IMAGE
  // =====================================

  if (form.blogImg) {
    formData.append(
      "blogImg",
      form.blogImg,
    );
  }

  // =====================================
  // AUTHOR IMAGE
  // =====================================

  if (form.authorImg) {
    formData.append(
      "authorImg",
      form.authorImg,
    );
  }

  // =====================================
  // API REQUEST
  // =====================================

  const response = await axios.post(
    API_URL,
    formData,
    {
      headers: getAuthHeaders(),
    },
  );

  return response.data.blog;
};

// =====================================
// UPDATE BLOG
// =====================================

export const updateBlog = async (
  id: string,
  form: BlogForm,
): Promise<Blog> => {
  const formData = new FormData();

  formData.append(
    "categoryId",
    form.categoryId,
  );

  formData.append(
    "title",
    form.title,
  );

  formData.append(
    "description",
    form.description,
  );

  formData.append(
    "metaTitle",
    form.metaTitle,
  );

  formData.append(
    "metaDescription",
    form.metaDescription,
  );

  formData.append(
    "authorName",
    form.authorName,
  );

  formData.append(
    "date",
    form.date,
  );

  formData.append(
    "durationInMin",
    form.durationInMin,
  );

  formData.append(
    "section",
    form.section,
  );

  // =====================================
  // BLOG IMAGE
  // =====================================

  if (form.blogImg) {
    formData.append(
      "blogImg",
      form.blogImg,
    );
  }

  // =====================================
  // AUTHOR IMAGE
  // =====================================

  if (form.authorImg) {
    formData.append(
      "authorImg",
      form.authorImg,
    );
  }

  // =====================================
  // API REQUEST
  // =====================================

  const response = await axios.patch(
    `${API_URL}/${id}`,
    formData,
    {
      headers: getAuthHeaders(),
    },
  );

  return response.data.blog;
};

// =====================================
// DELETE BLOG
// =====================================

export const deleteBlog = async (
  id: string,
): Promise<Blog> => {
  const response = await axios.delete(
    `${API_URL}/${id}`,
    {
      headers: getAuthHeaders(),
    },
  );

  return response.data.blog;
};