import api from "../axios";

// =====================================
// GET ALL BLOGS
// =====================================

export const getBlogsApi = async () => {
  const response = await api.get("/blogs");

  return response.data;
};

// =====================================
// GET BIG BLOGS
// =====================================

export const getBigBlogsApi = async () => {
  const response = await api.get("/blogs");

  return response.data;
};

// =====================================
// GET LATEST BLOGS
// =====================================

export const getLatestBlogsApi = async () => {
  const response = await api.get("/blogs/latest");

  return response.data;
};

// =====================================
// GET BLOG BY ID
// =====================================

export const getBlogByIdApi = async (id: string) => {
  const response = await api.get(`/blogs/${id}`);

  return response.data;
};

// =====================================
// CREATE BLOG
// =====================================

export const createBlogApi = async (data: any) => {
  const response = await api.post("/blogs", data);

  return response.data;
};

// =====================================
// UPDATE BLOG
// =====================================

export const updateBlogApi = async (id: string, data: any) => {
  const response = await api.put(`/blogs/${id}`, data);

  return response.data;
};

// =====================================
// DELETE BLOG
// =====================================

export const deleteBlogApi = async (id: string) => {
  const response = await api.delete(`/blogs/${id}`);

  return response.data;
};
