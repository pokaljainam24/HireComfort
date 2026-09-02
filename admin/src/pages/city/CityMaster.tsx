import React, { useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import Field from "@/components/common/Field";
import DataTable, { ColumnDef } from "@/components/common/DataTable";
import ConfirmModal from "@/components/common/ConfirmModal";
import { Icon } from "@/components/common/Icon";
import { City } from "@/types/city";
import { genId, seedStates } from "@/data/seed";

const seedCities: City[] = [
  { id: "cy_amd", stateId: "st_gj", name: "Ahmedabad" },
  { id: "cy_brc", stateId: "st_gj", name: "Bharuch" },
  { id: "cy_pun", stateId: "st_mh", name: "Pune" },
];

const empty: Omit<City, "id"> = { stateId: "", name: "" };

const CityMaster: React.FC = () => {
  const [rows, setRows] = useState<City[]>(seedCities);
  const [form, setForm] = useState<Omit<City, "id">>(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [deleteTarget, setDeleteTarget] = useState<City | null>(null);

  const stateName = (id: string) => seedStates.find((s) => s.id === id)?.name ?? "—";

  const resetForm = () => {
    setForm(empty);
    setEditingId(null);
    setErrors({});
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.stateId) e.stateId = "Select a state";
    if (!form.name.trim()) e.name = "City name is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    if (editingId) {
      setRows((r) => r.map((row) => (row.id === editingId ? { ...row, ...form } : row)));
    } else {
      setRows((r) => [{ id: genId("cy"), ...form }, ...r]);
    }
    resetForm();
  };

  const handleEdit = (row: City) => {
    setEditingId(row.id);
    setForm({ stateId: row.stateId, name: row.name });
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const columns: ColumnDef<City>[] = [
    { header: "City Name", render: (r) => <b>{r.name}</b> },
    { header: "State", render: (r) => stateName(r.stateId) },
  ];

  return (
    <>
      <PageHeader title="City Master" section="Location Masters" />

      <div className="card-panel">
        <div className="card-panel-head">
          <div>
            <h2>{editingId ? "Edit City" : "Add City"}</h2>
            <p>Cities are linked to a parent state.</p>
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
              <Field label="State" required error={errors.stateId}>
                <select value={form.stateId} onChange={(e) => setForm({ ...form, stateId: e.target.value })}>
                  <option value="">Select state</option>
                  {seedStates.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="City Name" required error={errors.name}>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Ahmedabad" />
              </Field>
            </div>
            <div className="form-actions">
              <button type="button" className="btn btn-outline" onClick={resetForm}>
                Reset
              </button>
              <button type="submit" className="btn btn-primary">
                <Icon name={editingId ? "edit" : "plus"} size={15} />
                {editingId ? "Update City" : "Add City"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="card-panel">
        <div className="card-panel-head">
          <div>
            <h2>All Cities</h2>
            <p>{rows.length} cities configured</p>
          </div>
        </div>
        <DataTable
          columns={columns}
          rows={rows}
          rowKey={(r) => r.id}
          searchPlaceholder="Search city..."
          onSearch={(r, q) => r.name.toLowerCase().includes(q)}
          onEdit={handleEdit}
          onDelete={(r) => setDeleteTarget(r)}
        />
      </div>

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete city?"
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

export default CityMaster;
