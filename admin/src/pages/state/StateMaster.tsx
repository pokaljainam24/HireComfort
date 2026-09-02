import React, { useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import Field from "@/components/common/Field";
import DataTable, { ColumnDef } from "@/components/common/DataTable";
import ConfirmModal from "@/components/common/ConfirmModal";
import { Icon } from "@/components/common/Icon";
import { StateItem } from "@/types/state";
import { genId, seedCountries, seedStates } from "@/data/seed";

const empty: Omit<StateItem, "id"> = { countryId: "", name: "", code: "" };

const StateMaster: React.FC = () => {
  const [rows, setRows] = useState<StateItem[]>(seedStates);
  const [form, setForm] = useState<Omit<StateItem, "id">>(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [deleteTarget, setDeleteTarget] = useState<StateItem | null>(null);

  const countryName = (id: string) => seedCountries.find((c) => c.id === id)?.name ?? "—";

  const resetForm = () => {
    setForm(empty);
    setEditingId(null);
    setErrors({});
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.countryId) e.countryId = "Select a country";
    if (!form.name.trim()) e.name = "State name is required";
    if (!form.code.trim()) e.code = "State code is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    if (editingId) {
      setRows((r) => r.map((row) => (row.id === editingId ? { ...row, ...form } : row)));
    } else {
      setRows((r) => [{ id: genId("st"), ...form }, ...r]);
    }
    resetForm();
  };

  const handleEdit = (row: StateItem) => {
    setEditingId(row.id);
    setForm({ countryId: row.countryId, name: row.name, code: row.code });
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const columns: ColumnDef<StateItem>[] = [
    { header: "State Name", render: (r) => <b>{r.name}</b> },
    { header: "Code", render: (r) => <span className="badge badge-blue">{r.code}</span> },
    { header: "Country", render: (r) => countryName(r.countryId) },
  ];

  return (
    <>
      <PageHeader title="State Master" section="Location Masters" />

      <div className="card-panel">
        <div className="card-panel-head">
          <div>
            <h2>{editingId ? "Edit State" : "Add State"}</h2>
            <p>States are linked to a parent country.</p>
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
              <Field label="Country" required error={errors.countryId}>
                <select value={form.countryId} onChange={(e) => setForm({ ...form, countryId: e.target.value })}>
                  <option value="">Select country</option>
                  {seedCountries.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="State Name" required error={errors.name}>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Gujarat" />
              </Field>
              <Field label="State Code" required error={errors.code}>
                <input
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                  placeholder="e.g. GJ"
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
                {editingId ? "Update State" : "Add State"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="card-panel">
        <div className="card-panel-head">
          <div>
            <h2>All States</h2>
            <p>{rows.length} states configured</p>
          </div>
        </div>
        <DataTable
          columns={columns}
          rows={rows}
          rowKey={(r) => r.id}
          searchPlaceholder="Search state..."
          onSearch={(r, q) => r.name.toLowerCase().includes(q) || r.code.toLowerCase().includes(q)}
          onEdit={handleEdit}
          onDelete={(r) => setDeleteTarget(r)}
        />
      </div>

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete state?"
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

export default StateMaster;
