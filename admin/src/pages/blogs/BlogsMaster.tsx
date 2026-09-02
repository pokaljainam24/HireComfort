import React, { useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import Field from "@/components/common/Field";
import DataTable, { ColumnDef } from "@/components/common/DataTable";
import ConfirmModal from "@/components/common/ConfirmModal";
import { Icon } from "@/components/common/Icon";
import { Blog } from "@/types/blog";
import { genId } from "@/utils/id";

const seed: Blog[] = [
  {
    id: genId("bl"),
    title: "5 Tips to Crack Your Next Interview",
    authorName: "Neha Verma",
    name: "Neha Verma",
    email: "neha.verma@example.com",
    recruiterId: "REC-1042",
    readingTime: 6,
    blogText: "Preparation, research, and confidence are key to acing any interview...",
  },
  {
    id: genId("bl"),
    title: "How to Write a Job Description That Attracts Talent",
    authorName: "Karan Patel",
    name: "Karan Patel",
    email: "karan.patel@example.com",
    recruiterId: "REC-1108",
    readingTime: 4,
    blogText: "A great job description balances clarity with an authentic company voice...",
  },
];

const empty: Omit<Blog, "id"> = {
  title: "",
  authorName: "",
  name: "",
  email: "",
  recruiterId: "",
  readingTime: 1,
  blogText: "",
};

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const BlogsMaster: React.FC = () => {
  const [rows, setRows] = useState<Blog[]>(seed);
  const [form, setForm] = useState<Omit<Blog, "id">>(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [deleteTarget, setDeleteTarget] = useState<Blog | null>(null);

  const resetForm = () => {
    setForm(empty);
    setEditingId(null);
    setErrors({});
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.authorName.trim()) e.authorName = "Author name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!emailRe.test(form.email)) e.email = "Enter a valid email";
    if (!form.recruiterId.trim()) e.recruiterId = "Recruiter ID is required";
    if (!form.readingTime || form.readingTime < 1) e.readingTime = "Reading time must be at least 1 min";
    if (!form.blogText.trim()) e.blogText = "Blog content is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    const payload = { ...form, name: form.authorName };
    if (editingId) {
      setRows((r) => r.map((row) => (row.id === editingId ? { ...row, ...payload } : row)));
    } else {
      setRows((r) => [{ id: genId("bl"), ...payload }, ...r]);
    }
    resetForm();
  };

  const handleEdit = (row: Blog) => {
    setEditingId(row.id);
    setForm({
      title: row.title,
      authorName: row.authorName,
      name: row.name,
      email: row.email,
      recruiterId: row.recruiterId,
      readingTime: row.readingTime,
      blogText: row.blogText,
    });
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const columns: ColumnDef<Blog>[] = [
    {
      header: "Title",
      render: (r) => (
        <div>
          <b>{r.title}</b>
          <div className="cell-muted" style={{ fontSize: 12 }}>
            {r.blogText.slice(0, 60)}
            {r.blogText.length > 60 ? "..." : ""}
          </div>
        </div>
      ),
    },
    { header: "Author", render: (r) => r.authorName },
    { header: "Recruiter ID", render: (r) => <span className="badge badge-gray">{r.recruiterId}</span> },
    { header: "Reading Time", render: (r) => `${r.readingTime} min` },
  ];

  return (
    <>
      <PageHeader title="Blogs" section="Content" />

      <div className="card-panel">
        <div className="card-panel-head">
          <div>
            <h2>{editingId ? "Edit Blog" : "Add Blog"}</h2>
            <p>Publish and manage recruiter/blog articles.</p>
          </div>
          {editingId && (
            <button className="btn btn-ghost btn-sm" onClick={resetForm}>
              <Icon name="x" size={14} /> Cancel edit
            </button>
          )}
        </div>
        <div className="card-panel-body">
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <Field label="Blog Title" required error={errors.title} span2>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. 5 Tips to Crack Your Next Interview" />
              </Field>
              <Field label="Author Name" required error={errors.authorName}>
                <input value={form.authorName} onChange={(e) => setForm({ ...form, authorName: e.target.value })} placeholder="e.g. Neha Verma" />
              </Field>
              <Field label="Author Email" required error={errors.email}>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="e.g. neha@example.com" />
              </Field>
              <Field label="Recruiter ID" required error={errors.recruiterId}>
                <input value={form.recruiterId} onChange={(e) => setForm({ ...form, recruiterId: e.target.value })} placeholder="e.g. REC-1042" />
              </Field>
              <Field label="Reading Time (minutes)" required error={errors.readingTime}>
                <input
                  type="number"
                  min={1}
                  value={form.readingTime}
                  onChange={(e) => setForm({ ...form, readingTime: Number(e.target.value) })}
                />
              </Field>
              <Field label="Blog Content" required error={errors.blogText} span2>
                <textarea
                  value={form.blogText}
                  onChange={(e) => setForm({ ...form, blogText: e.target.value })}
                  placeholder="Write the blog content here..."
                  style={{ minHeight: 140 }}
                />
              </Field>
            </div>
            <div className="form-actions">
              <button type="button" className="btn btn-outline" onClick={resetForm}>
                Reset
              </button>
              <button type="submit" className="btn btn-primary">
                <Icon name={editingId ? "edit" : "plus"} size={15} />
                {editingId ? "Update Blog" : "Publish Blog"}
              </button>
            </div>
          </form>
        </div>
      </div>

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
          rowKey={(r) => r.id}
          searchPlaceholder="Search blogs..."
          onSearch={(r, q) => r.title.toLowerCase().includes(q) || r.authorName.toLowerCase().includes(q)}
          onEdit={handleEdit}
          onDelete={(r) => setDeleteTarget(r)}
        />
      </div>

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete blog?"
        message={`"${deleteTarget?.title}" will be permanently removed.`}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          setRows((r) => r.filter((row) => row.id !== deleteTarget?.id));
          setDeleteTarget(null);
        }}
      />
    </>
  );
};

export default BlogsMaster;
