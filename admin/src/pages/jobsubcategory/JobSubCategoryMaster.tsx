import React, { useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import Field from "@/components/common/Field";
import DataTable, { ColumnDef } from "@/components/common/DataTable";
import ConfirmModal from "@/components/common/ConfirmModal";
import { Icon } from "@/components/common/Icon";
import { JobSubCategory } from "@/types/jobSubCategory";
import { genId, seedJobCategories } from "@/data/seed";

const seedSubCategories: JobSubCategory[] = [
  { id: "jsc_fe", categoryId: "jc_it", name: "Frontend Developer", description: "React / Vue / Angular roles", icon: "🖥" },
  { id: "jsc_be", categoryId: "jc_it", name: "Backend Developer", description: "Node / Java / Python roles", icon: "🗄" },
  { id: "jsc_ta", categoryId: "jc_hr", name: "Talent Acquisition", description: "Recruitment specialists", icon: "🎯" },
];

const empty: Omit<JobSubCategory, "id"> = { categoryId: "", name: "", description: "", icon: "" };

const JobSubCategoryMaster: React.FC = () => {
  const [rows, setRows] = useState<JobSubCategory[]>(seedSubCategories);
  const [form, setForm] = useState<Omit<JobSubCategory, "id">>(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [deleteTarget, setDeleteTarget] = useState<JobSubCategory | null>(null);

  const categoryName = (id: string) => seedJobCategories.find((c) => c.id === id)?.name ?? "—";

  const resetForm = () => {
    setForm(empty);
    setEditingId(null);
    setErrors({});
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.categoryId) e.categoryId = "Select a job category";
    if (!form.name.trim()) e.name = "Sub category name is required";
    if (!form.description.trim()) e.description = "Description is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    if (editingId) {
      setRows((r) => r.map((row) => (row.id === editingId ? { ...row, ...form } : row)));
    } else {
      setRows((r) => [{ id: genId("jsc"), ...form }, ...r]);
    }
    resetForm();
  };

  const handleEdit = (row: JobSubCategory) => {
    setEditingId(row.id);
    setForm({ categoryId: row.categoryId, name: row.name, description: row.description, icon: row.icon });
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const columns: ColumnDef<JobSubCategory>[] = [
    {
      header: "Sub Category",
      render: (r) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className="icon-preview">{r.icon || "🗂"}</div>
          <b>{r.name}</b>
        </div>
      ),
    },
    { header: "Parent Category", render: (r) => <span className="badge badge-blue">{categoryName(r.categoryId)}</span> },
    { header: "Description", render: (r) => <span className="cell-muted">{r.description}</span> },
  ];

  return (
    <>
      <PageHeader title="Job Sub Category Master" section="Job Masters" />

      <div className="card-panel">
        <div className="card-panel-head">
          <div>
            <h2>{editingId ? "Edit Sub Category" : "Add Sub Category"}</h2>
            <p>Sub categories are linked to a parent job category.</p>
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
              <Field label="Parent Category" required error={errors.categoryId}>
                <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
                  <option value="">Select category</option>
                  {seedJobCategories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Sub Category Name" required error={errors.name}>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Frontend Developer" />
              </Field>
              <Field label="Icon" hint="Emoji or short icon code">
                <input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="e.g. 🖥" />
              </Field>
              <Field label="Description" required error={errors.description}>
                <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Short description" />
              </Field>
            </div>
            <div className="form-actions">
              <button type="button" className="btn btn-outline" onClick={resetForm}>
                Reset
              </button>
              <button type="submit" className="btn btn-primary">
                <Icon name={editingId ? "edit" : "plus"} size={15} />
                {editingId ? "Update Sub Category" : "Add Sub Category"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="card-panel">
        <div className="card-panel-head">
          <div>
            <h2>All Job Sub Categories</h2>
            <p>{rows.length} sub categories configured</p>
          </div>
        </div>
        <DataTable
          columns={columns}
          rows={rows}
          rowKey={(r) => r.id}
          searchPlaceholder="Search sub category..."
          onSearch={(r, q) => r.name.toLowerCase().includes(q) || r.description.toLowerCase().includes(q)}
          onEdit={handleEdit}
          onDelete={(r) => setDeleteTarget(r)}
        />
      </div>

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete sub category?"
        message={`"${deleteTarget?.name}" will be permanently removed.`}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          setRows((r) => r.filter((row) => row.id !== deleteTarget?.id));
          setDeleteTarget(null);
        }}
      />
    </>
  );
};

export default JobSubCategoryMaster;
