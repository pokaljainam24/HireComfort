import React, { useEffect, useState } from "react";

import PageHeader from "@/components/common/PageHeader";
import Field from "@/components/common/Field";
import DataTable, { ColumnDef } from "@/components/common/DataTable";
import ConfirmModal from "@/components/common/ConfirmModal";
import { Icon } from "@/components/common/Icon";

import { getBlogs, createBlog, updateBlog, deleteBlog } from "@/api/blogApi";

import { getJobCategories } from "@/api/jobCategoryApi";

import { Blog, BlogForm } from "@/types/blog";

import { JobCategory } from "@/types/jobCategory";

// =====================================
// EMPTY FORM
// =====================================

const empty: BlogForm = {
  categoryId: "",

  title: "",

  authorName: "",

  authorImg: null,

  date: "",

  durationInMin: "",

  description: "",

  metaTitle: "",

  metaDescription: "",

  blogImg: null,

  section: "latest",
};

// =====================================
// COMPONENT
// =====================================

const BlogsMaster: React.FC = () => {
  // =====================================
  // STATE
  // =====================================

  const [rows, setRows] = useState<Blog[]>([]);

  const [categories, setCategories] = useState<JobCategory[]>([]);

  const [form, setForm] = useState<BlogForm>(empty);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [deleteTarget, setDeleteTarget] = useState<Blog | null>(null);

  const [imgPreview, setImgPreview] = useState("");

  const [blogImgPreview, setBlogImgPreview] = useState("");

  const [loading, setLoading] = useState(false);

  // =====================================
  // LOAD DATA
  // =====================================

  const loadData = async () => {
    try {
      setLoading(true);

      const [blogs, jobCategories] = await Promise.all([
        getBlogs(),
        getJobCategories(),
      ]);

      setRows(blogs);

      setCategories(jobCategories);
    } catch (error) {
      console.error("Error loading blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // INITIAL LOAD
  // =====================================

  useEffect(() => {
    loadData();
  }, []);

  // =====================================
  // RESET
  // =====================================

  const resetForm = () => {
    setForm(empty);

    setEditingId(null);

    setErrors({});
  };

  // =====================================
  // CATEGORY NAME
  // =====================================

  const categoryName = (categoryId: string) => {
    const category = categories.find((category) => category._id === categoryId);

    return category?.name || "Unknown";
  };

  // =====================================
  // IMAGE URL
  // =====================================

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) {
      return "";
    }

    // Already full URL
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }

    // Remove starting slash
    const cleanPath = imagePath.replace(/^\/+/, "");

    return `http://localhost:5000/${cleanPath}`;
  };

  // =====================================
  // VALIDATION
  // =====================================

  const validate = () => {
    const e: Record<string, string> = {};

    // =====================================
    // TITLE
    // =====================================

    if (!form.title.trim()) {
      e.title = "Blog title is required";
    } else if (form.title.trim().length < 2) {
      e.title = "Blog title must contain at least 2 characters";
    }

    // =====================================
    // CATEGORY
    // =====================================

    if (!form.categoryId) {
      e.categoryId = "Select a category";
    }

    // =====================================
    // AUTHOR
    // =====================================

    if (!form.authorName.trim()) {
      e.authorName = "Author name is required";
    } else if (form.authorName.trim().length < 2) {
      e.authorName = "Author name must contain at least 2 characters";
    }

    // =====================================
    // AUTHOR IMAGE
    // =====================================

    if (!editingId && !form.authorImg) {
      e.authorImg = "Author image is required";
    }

    // =====================================
    // DATE
    // =====================================

    if (!form.date) {
      e.date = "Date is required";
    }

    // =====================================
    // READING TIME
    // =====================================

    if (!form.durationInMin.trim()) {
      e.durationInMin = "Reading time is required";
    } else if (Number(form.durationInMin) <= 0) {
      e.durationInMin = "Reading time must be greater than 0";
    }

    // =====================================
    // CONTENT
    // =====================================

    if (!form.description.trim()) {
      e.description = "Blog content is required";
    } else if (form.description.trim().length < 10) {
      e.description = "Blog content must contain at least 10 characters";
    }

    // =====================================
    // META TITLE
    // =====================================

    if (!form.metaTitle.trim()) {
      e.metaTitle = "Meta title is required";
    }

    // =====================================
    // META DESCRIPTION
    // =====================================

    if (!form.metaDescription.trim()) {
      e.metaDescription = "Meta description is required";
    }

    // =====================================
    // BLOG IMAGE
    // =====================================

    if (!editingId && !form.blogImg) {
      e.blogImg = "Blog image is required";
    }

    setErrors(e);

    return Object.keys(e).length === 0;
  };

  // =====================================
  // SUBMIT
  // =====================================

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setLoading(true);

      // =====================================
      // UPDATE
      // =====================================

      if (editingId) {
        const updated = await updateBlog(editingId, form);

        setRows((rows) =>
          rows.map((row) => (row._id === editingId ? updated : row)),
        );
      }

      // =====================================
      // CREATE
      // =====================================
      else {
        const created = await createBlog(form);

        setRows((rows) => [created, ...rows]);
      }

      resetForm();
    } catch (error) {
      console.error("Error saving blog:", error);
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // EDIT
  // =====================================

  const handleEdit = (row: Blog) => {
    setEditingId(row._id);

    setForm({
      categoryId: row.categoryId,
      title: row.title,
      description: row.description,
      metaTitle: row.metaTitle,
      metaDescription: row.metaDescription,
      blogImg: null,
      authorImg: null,
      authorName: row.authorName,
      date: row.date,
      durationInMin: row.durationInMin,
      section: row.section,
    });

    // Existing Author Image
    if (row.authorImg) {
      setImgPreview(getImageUrl(row.authorImg));
    } else {
      setImgPreview("");
    }

    // Existing Blog Image
    if (row.blogImg) {
      setBlogImgPreview(getImageUrl(row.blogImg));
    } else {
      setBlogImgPreview("");
    }
  };

  // =====================================
  // DELETE
  // =====================================

  const handleDelete = async () => {
    if (!deleteTarget) {
      return;
    }

    try {
      setLoading(true);

      await deleteBlog(deleteTarget._id);

      setRows((rows) => rows.filter((row) => row._id !== deleteTarget._id));

      setDeleteTarget(null);
    } catch (error) {
      console.error("Error deleting blog:", error);
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // TABLE
  // =====================================

  const columns: ColumnDef<Blog>[] = [
    {
      header: "Blog Image",

      render: (row) => (
        <div
          style={{
            width: 70,
            height: 45,
            borderRadius: 6,
            overflow: "hidden",
            border: "1px solid #ddd",
          }}
        >
          {row.blogImg ? (
            <img
              src={getImageUrl(row.blogImg)}
              alt={row.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
              }}
            >
              No Image
            </div>
          )}
        </div>
      ),
    },

    {
      header: "Title",

      render: (row) => (
        <div>
          <b>{row.title}</b>

          <div
            className="cell-muted"
            style={{
              fontSize: 12,
            }}
          >
            {row.description.slice(0, 60)}

            {row.description.length > 60 ? "..." : ""}
          </div>
        </div>
      ),
    },

    {
      header: "Category",

      render: (row) => (
        <span className="badge badge-blue">{categoryName(row.categoryId)}</span>
      ),
    },

    {
      header: "Author",

      render: (row) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          {row.authorImg ? (
            <img
              src={getImageUrl(row.authorImg)}
              alt={row.authorName}
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                objectFit: "cover",
                display: "block",
              }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #ddd",
                fontSize: 12,
              }}
            >
              ?
            </div>
          )}

          <span>{row.authorName}</span>
        </div>
      ),
    },

    {
      header: "Date",

      render: (row) => new Date(row.date).toLocaleDateString(),
    },

    {
      header: "Reading Time",

      render: (row) => `${row.durationInMin} min`,
    },
  ];

  const handleAuthorImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    setForm({
      ...form,
      authorImg: file,
    });

    setErrors({
      ...errors,
      authorImg: "",
    });

    if (file) {
      setImgPreview(URL.createObjectURL(file));
    } else {
      setImgPreview("");
    }
  };

  const handleBlogImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    setForm({
      ...form,
      blogImg: file,
    });

    setErrors({
      ...errors,
      blogImg: "",
    });

    if (file) {
      setBlogImgPreview(URL.createObjectURL(file));
    } else {
      setBlogImgPreview("");
    }
  };

  // =====================================
  // UI
  // =====================================

  return (
    <>
      <PageHeader title="Blogs" section="Content" />

      {/* =====================================
          FORM
      ===================================== */}

      <div className="card-panel">
        <div className="card-panel-head">
          <div>
            <h2>{editingId ? "Edit Blog" : "Add Blog"}</h2>

            <p>Publish and manage blog articles.</p>
          </div>

          {editingId && (
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={resetForm}
              disabled={loading}
            >
              <Icon name="x" size={14} />
              Cancel edit
            </button>
          )}
        </div>

        <div className="card-panel-body">
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              {/* TITLE */}

              <Field label="Blog Title" required error={errors.title} span2>
                <input
                  value={form.title}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      title: e.target.value,
                    });

                    setErrors({
                      ...errors,
                      title: "",
                    });
                  }}
                  placeholder="e.g. 5 Tips to Crack Your Next Interview"
                  disabled={loading}
                />
              </Field>

              {/* CATEGORY */}

              <Field label="Category" required error={errors.categoryId}>
                <select
                  value={form.categoryId}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      categoryId: e.target.value,
                    });

                    setErrors({
                      ...errors,
                      categoryId: "",
                    });
                  }}
                  disabled={loading}
                >
                  <option value="">Select category</option>

                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </Field>

              {/* AUTHOR */}

              <Field label="Author Name" required error={errors.authorName}>
                <input
                  value={form.authorName}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      authorName: e.target.value,
                    });

                    setErrors({
                      ...errors,
                      authorName: "",
                    });
                  }}
                  placeholder="e.g. Neha Verma"
                  disabled={loading}
                />
              </Field>

              {/* AUTHOR IMAGE */}

              <Field
                label="Author Image"
                required={!editingId}
                error={errors.authorImg}
              >
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp,image/svg+xml"
                  onChange={handleAuthorImgChange}
                  disabled={loading}
                />

                {imgPreview && (
                  <div style={{ marginTop: 10 }}>
                    <img
                      src={imgPreview}
                      alt="Author image preview"
                      style={{
                        width: 50,
                        height: 50,
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                )}
              </Field>

              {/* DATE */}

              <Field label="Date" required error={errors.date}>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      date: e.target.value,
                    });

                    setErrors({
                      ...errors,
                      date: "",
                    });
                  }}
                  disabled={loading}
                />
              </Field>

              {/* READING TIME */}

              <Field
                label="Reading Time (minutes)"
                required
                error={errors.durationInMin}
              >
                <input
                  type="number"
                  min={1}
                  value={form.durationInMin}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      durationInMin: e.target.value,
                    });

                    setErrors({
                      ...errors,
                      durationInMin: "",
                    });
                  }}
                  placeholder="e.g. 5"
                  disabled={loading}
                />
              </Field>

              {/* SECTION */}

              <Field label="Section" required error={errors.section}>
                <select
                  value={form.section}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      section: e.target.value as "big" | "latest",
                    });

                    setErrors({
                      ...errors,
                      section: "",
                    });
                  }}
                  disabled={loading}
                >
                  <option value="latest">Latest</option>

                  <option value="big">Big</option>
                </select>
              </Field>

              {/* BLOG IMAGE */}

              <Field
                label="Blog Image"
                required={!editingId}
                error={errors.blogImg}
              >
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp,image/svg+xml"
                  onChange={handleBlogImgChange}
                  disabled={loading}
                />

                {blogImgPreview && (
                  <div
                    style={{
                      marginTop: 10,
                    }}
                  >
                    <img
                      src={blogImgPreview}
                      alt="Blog image preview"
                      style={{
                        width: 120,
                        height: 70,
                        objectFit: "cover",
                        borderRadius: 6,
                      }}
                    />
                  </div>
                )}
              </Field>

              {/* META TITLE */}

              <Field label="Meta Title" required error={errors.metaTitle} span2>
                <input
                  value={form.metaTitle}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      metaTitle: e.target.value,
                    });

                    setErrors({
                      ...errors,
                      metaTitle: "",
                    });
                  }}
                  placeholder="SEO meta title"
                  disabled={loading}
                />
              </Field>

              {/* META DESCRIPTION */}

              <Field
                label="Meta Description"
                required
                error={errors.metaDescription}
                span2
              >
                <textarea
                  value={form.metaDescription}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      metaDescription: e.target.value,
                    });

                    setErrors({
                      ...errors,
                      metaDescription: "",
                    });
                  }}
                  placeholder="SEO meta description"
                  disabled={loading}
                />
              </Field>

              {/* BLOG CONTENT */}

              <Field
                label="Blog Content"
                required
                error={errors.description}
                span2
              >
                <textarea
                  value={form.description}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      description: e.target.value,
                    });

                    setErrors({
                      ...errors,
                      description: "",
                    });
                  }}
                  placeholder="Write the blog content here..."
                  style={{
                    minHeight: 180,
                  }}
                  disabled={loading}
                />
              </Field>
            </div>

            {/* ACTIONS */}

            <div className="form-actions">
              <button
                type="button"
                className="btn btn-outline"
                onClick={resetForm}
                disabled={loading}
              >
                Reset
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                <Icon name={editingId ? "edit" : "plus"} size={15} />

                {loading
                  ? "Saving..."
                  : editingId
                    ? "Update Blog"
                    : "Publish Blog"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* =====================================
          DATA TABLE
      ===================================== */}

      <div className="card-panel">
        <div className="card-panel-head">
          <div>
            <h2>All Blogs</h2>

            <p>{rows.length} articles published</p>
          </div>
        </div>

        <DataTable
          columns={columns}
          rows={rows}
          rowKey={(row) => row._id}
          searchPlaceholder="Search blogs..."
          onSearch={(row, query) =>
            row.title.toLowerCase().includes(query) ||
            row.authorName.toLowerCase().includes(query) ||
            categoryName(row.categoryId).toLowerCase().includes(query)
          }
          onEdit={handleEdit}
          onDelete={(row) => setDeleteTarget(row)}
        />
      </div>

      {/* =====================================
          DELETE MODAL
      ===================================== */}

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete blog?"
        message={`"${deleteTarget?.title}" will be permanently removed.`}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default BlogsMaster;
