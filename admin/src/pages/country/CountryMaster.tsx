import React, { useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import Field from "@/components/common/Field";
import DataTable, { ColumnDef } from "@/components/common/DataTable";
import ConfirmModal from "@/components/common/ConfirmModal";
import { Icon } from "@/components/common/Icon";
import { Country } from "@/types/country";
import { genId } from "@/utils/id";
import { seedCountries } from "@/data/seed";

const empty: Omit<Country, "id"> = { name: "", code: "" };

const CountryMaster: React.FC = () => {
  const [rows, setRows] = useState<Country[]>(seedCountries);
  const [form, setForm] = useState<Omit<Country, "id">>(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [deleteTarget, setDeleteTarget] = useState<Country | null>(null);

  const resetForm = () => {
    setForm(empty);
    setEditingId(null);
    setErrors({});
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Country name is required";
    if (!form.code.trim()) e.code = "Country code is required";
    else if (form.code.trim().length > 5) e.code = "Use a short code (max 5 chars)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    if (editingId) {
      setRows((r) => r.map((row) => (row.id === editingId ? { ...row, ...form } : row)));
    } else {
      setRows((r) => [{ id: genId("cty"), ...form }, ...r]);
    }
    resetForm();
  };

  const handleEdit = (row: Country) => {
    setEditingId(row.id);
    setForm({ name: row.name, code: row.code });
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const columns: ColumnDef<Country>[] = [
    { header: "Country Name", render: (r) => <b>{r.name}</b> },
    { header: "Code", render: (r) => <span className="badge badge-blue">{r.code}</span> },
    { header: "ID", render: (r) => <span className="cell-muted">{r.id}</span> },
  ];

  return (
    <>
      <PageHeader title="Country Master" section="Location Masters" />

      <div className="card-panel">
        <div className="card-panel-head">
          <div>
            <h2>{editingId ? "Edit Country" : "Add Country"}</h2>
            <p>Countries used across job locations and profiles.</p>
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
              <Field label="Country Name" required error={errors.name}>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. India"
                />
              </Field>
              <Field label="Country Code" required error={errors.code} hint="ISO short code">
                <input
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                  placeholder="e.g. IN"
                  maxLength={5}
                />
              </Field>
            </div>
            <div className="form-actions">
              <button type="button" className="btn btn-outline" onClick={resetForm}>
                Reset
              </button>
              <button type="submit" className="btn btn-primary">
                <Icon name={editingId ? "edit" : "plus"} size={15} />
                {editingId ? "Update Country" : "Add Country"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="card-panel">
        <div className="card-panel-head">
          <div>
            <h2>All Countries</h2>
            <p>{rows.length} countries configured</p>
          </div>
        </div>
        <DataTable
          columns={columns}
          rows={rows}
          rowKey={(r) => r.id}
          searchPlaceholder="Search country..."
          onSearch={(r, q) => r.name.toLowerCase().includes(q) || r.code.toLowerCase().includes(q)}
          onEdit={handleEdit}
          onDelete={(r) => setDeleteTarget(r)}
        />
      </div>

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete country?"
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

export default CountryMaster;
