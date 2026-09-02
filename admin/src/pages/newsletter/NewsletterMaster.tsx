import React, { useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import Field from "@/components/common/Field";
import DataTable, { ColumnDef } from "@/components/common/DataTable";
import ConfirmModal from "@/components/common/ConfirmModal";
import { Icon } from "@/components/common/Icon";
import { Newsletter } from "@/types/newsletter";
import { genId } from "@/utils/id";

const seed: Newsletter[] = [
  { id: genId("nl"), name: "Priya Shah", email: "priya.shah@example.com" },
  { id: genId("nl"), name: "Rohan Mehta", email: "rohan.mehta@example.com" },
  { id: genId("nl"), name: "Aisha Khan", email: "aisha.khan@example.com" },
];

const empty: Omit<Newsletter, "id"> = { name: "", email: "" };
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const NewsletterMaster: React.FC = () => {
  const [rows, setRows] = useState<Newsletter[]>(seed);
  const [form, setForm] = useState<Omit<Newsletter, "id">>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [deleteTarget, setDeleteTarget] = useState<Newsletter | null>(null);

  const resetForm = () => {
    setForm(empty);
    setErrors({});
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!emailRe.test(form.email)) e.email = "Enter a valid email";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setRows((r) => [{ id: genId("nl"), ...form }, ...r]);
    resetForm();
  };

  const columns: ColumnDef<Newsletter>[] = [
    {
      header: "Subscriber",
      render: (r) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className="avatar-sm">{r.name.charAt(0).toUpperCase()}</div>
          <b>{r.name}</b>
        </div>
      ),
    },
    { header: "Email", render: (r) => <span className="cell-muted">{r.email}</span> },
    { header: "Status", render: () => <span className="badge badge-green">Subscribed</span> },
  ];

  return (
    <>
      <PageHeader title="Newsletter Subscribers" section="Content" />

      <div className="card-panel">
        <div className="card-panel-head">
          <div>
            <h2>Add Subscriber</h2>
            <p>Manually add a subscriber to the newsletter list.</p>
          </div>
        </div>
        <div className="card-panel-body">
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <Field label="Full Name" required error={errors.name}>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Priya Shah" />
              </Field>
              <Field label="Email Address" required error={errors.email}>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="e.g. priya@example.com"
                />
              </Field>
            </div>
            <div className="form-actions">
              <button type="button" className="btn btn-outline" onClick={resetForm}>
                Reset
              </button>
              <button type="submit" className="btn btn-primary">
                <Icon name="plus" size={15} />
                Add Subscriber
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="card-panel">
        <div className="card-panel-head">
          <div>
            <h2>All Subscribers</h2>
            <p>{rows.length} subscribers</p>
          </div>
        </div>
        <DataTable
          columns={columns}
          rows={rows}
          rowKey={(r) => r.id}
          searchPlaceholder="Search subscribers..."
          onSearch={(r, q) => r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q)}
          onDelete={(r) => setDeleteTarget(r)}
        />
      </div>

      <ConfirmModal
        open={!!deleteTarget}
        title="Remove subscriber?"
        message={`"${deleteTarget?.email}" will be removed from the list.`}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          setRows((r) => r.filter((row) => row.id !== deleteTarget?.id));
          setDeleteTarget(null);
        }}
      />
    </>
  );
};

export default NewsletterMaster;
