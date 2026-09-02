import React, { useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import Field from "@/components/common/Field";
import DataTable, { ColumnDef } from "@/components/common/DataTable";
import ConfirmModal from "@/components/common/ConfirmModal";
import { Icon } from "@/components/common/Icon";
import { CmsSection } from "@/types/cms";
import { genId } from "@/utils/id";

const seed: CmsSection[] = [
  { id: genId("cms"), sectionName: "About Us", code: "about-us", content: "We connect great talent with great companies..." },
  { id: genId("cms"), sectionName: "Privacy Policy", code: "privacy-policy", content: "Your privacy is important to us..." },
  { id: genId("cms"), sectionName: "Terms & Conditions", code: "terms", content: "By using this platform you agree to..." },
];

const empty: Omit<CmsSection, "id"> = { sectionName: "", code: "", content: "" };

const CMSMaster: React.FC = () => {
  const [rows, setRows] = useState<CmsSection[]>(seed);
  const [form, setForm] = useState<Omit<CmsSection, "id">>(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [deleteTarget, setDeleteTarget] = useState<CmsSection | null>(null);

  const resetForm = () => {
    setForm(empty);
    setEditingId(null);
    setErrors({});
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.sectionName.trim()) e.sectionName = "Section name is required";
    if (!form.code.trim()) e.code = "Code is required";
    if (!form.content.trim()) e.content = "Content is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    if (editingId) {
      setRows((r) => r.map((row) => (row.id === editingId ? { ...row, ...form } : row)));
    } else {
      setRows((r) => [{ id: genId("cms"), ...form }, ...r]);
    }
    resetForm();
  };

  const handleEdit = (row: CmsSection) => {
    setEditingId(row.id);
    setForm({ sectionName: row.sectionName, code: row.code, content: row.content });
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const columns: ColumnDef<CmsSection>[] = [
    { header: "Section Name", render: (r) => <b>{r.sectionName}</b> },
    { header: "Code", render: (r) => <span className="badge badge-gray">{r.code}</span> },
    {
      header: "Content Preview",
      render: (r) => (
        <span className="cell-muted">
          {r.content.slice(0, 50)}
          {r.content.length > 50 ? "..." : ""}
        </span>
      ),
    },
  ];

  return (
    <>
      <PageHeader title="CMS Pages" section="Content" />

      <div className="card-panel">
        <div className="card-panel-head">
          <div>
            <h2>{editingId ? "Edit Section" : "Add Section"}</h2>
            <p>Editable static content sections shown on the website.</p>
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
              <Field label="Section Name" required error={errors.sectionName}>
                <input value={form.sectionName} onChange={(e) => setForm({ ...form, sectionName: e.target.value })} placeholder="e.g. About Us" />
              </Field>
              <Field label="Section Code" required error={errors.code} hint="Used as the page slug">
                <input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} placeholder="e.g. about-us" />
              </Field>
              <Field label="Content" required error={errors.content} span2>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="Section content..."
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
                {editingId ? "Update Section" : "Add Section"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="card-panel">
        <div className="card-panel-head">
          <div>
            <h2>All Sections</h2>
            <p>{rows.length} CMS sections</p>
          </div>
        </div>
        <DataTable
          columns={columns}
          rows={rows}
          rowKey={(r) => r.id}
          searchPlaceholder="Search sections..."
          onSearch={(r, q) => r.sectionName.toLowerCase().includes(q) || r.code.toLowerCase().includes(q)}
          onEdit={handleEdit}
          onDelete={(r) => setDeleteTarget(r)}
        />
      </div>

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete section?"
        message={`"${deleteTarget?.sectionName}" will be permanently removed.`}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          setRows((r) => r.filter((row) => row.id !== deleteTarget?.id));
          setDeleteTarget(null);
        }}
      />
    </>
  );
};

export default CMSMaster;
