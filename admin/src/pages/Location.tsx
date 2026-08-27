import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import "../assets/css/AdminLocation.css";

type LocationKind = "countries" | "states" | "cities";
type LocationItem = {
  _id: string;
  name: string;
  code: string;
  countryId?: string;
  stateId?: string;
};
type FormValues = { name: string; code: string; parentId: string };

const API_ROOT = "http://localhost:5000/api/admin";
const labels: Record<LocationKind, string> = {
  countries: "countries",
  states: "states",
  cities: "cities",
};

function Location() {
  const [activeKind, setActiveKind] = useState<LocationKind>("countries");
  const [locations, setLocations] = useState<
    Record<LocationKind, LocationItem[]>
  >({ countries: [], states: [], cities: [] });
  const [form, setForm] = useState<FormValues>({
    name: "",
    code: "",
    parentId: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadLocations = async () => {
    setLoading(true);
    setError("");
    try {
      const responses = await Promise.all(
        Object.keys(labels).map((kind) => fetch(`${API_ROOT}/${kind}`)),
      );
      if (responses.some((response) => !response.ok))
        throw new Error("Could not load locations.");
      const payloads = await Promise.all(
        responses.map((response) => response.json()),
      );
      const next = {} as Record<LocationKind, LocationItem[]>;
      (Object.keys(labels) as LocationKind[]).forEach((kind, index) => {
        const payload = payloads[index];
        next[kind] = Array.isArray(payload) ? payload : (payload[kind] ?? []);
      });
      setLocations(next);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Could not load locations.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadLocations();
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const visibleLocations = useMemo(
    () =>
      locations[activeKind].filter((item) =>
        `${item.name} ${item.code}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [activeKind, locations, query],
  );

  const resetForm = () => {
    setForm({ name: "", code: "", parentId: "" });
    setEditingId(null);
  };
  const beginEdit = (item: LocationItem) => {
    setEditingId(item._id);
    setForm({
      name: item.name,
      code: item.code,
      parentId: item.countryId ?? item.stateId ?? "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    const body: Record<string, string> = {
      name: form.name.trim(),
      code: form.code.trim().toUpperCase(),
    };
    if (activeKind === "states") body.countryId = form.parentId;
    if (activeKind === "cities") body.stateId = form.parentId;
    try {
      const response = await fetch(
        `${API_ROOT}/${activeKind}${editingId ? `/${editingId}` : ""}`,
        {
          method: editingId ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        },
      );
      const payload = await response.json().catch(() => ({}));
      if (!response.ok)
        throw new Error(payload.message ?? "Could not save location.");
      resetForm();
      await loadLocations();
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Could not save location.",
      );
    } finally {
      setSaving(false);
    }
  };

  const remove = async (item: LocationItem) => {
    if (!window.confirm(`Delete ${item.name}?`)) return;
    setError("");
    try {
      const response = await fetch(`${API_ROOT}/${activeKind}/${item._id}`, {
        method: "DELETE",
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok)
        throw new Error(payload.message ?? "Could not delete location.");
      if (editingId === item._id) resetForm();
      await loadLocations();
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Could not delete location.",
      );
    }
  };

  const parentKind: LocationKind | null =
    activeKind === "states"
      ? "countries"
      : activeKind === "cities"
        ? "states"
        : null;

  return (
    <main className="admin-location-page">
      <div className="container">
        <header className="admin-location-heading">
          <div>
            <span className="admin-kicker">Administration</span>
            <h1>Location directory</h1>
            <p>
              Keep the places used across your job listings accurate and
              searchable.
            </p>
          </div>
          <div className="location-count">
            {locations.countries.length +
              locations.states.length +
              locations.cities.length}
            <span>Total records</span>
          </div>
        </header>

        {error && (
          <div className="location-alert" role="alert">
            {error}
          </div>
        )}
        <section className="location-workspace">
          <div
            className="location-tabs"
            role="tablist"
            aria-label="Location type"
          >
            {(Object.keys(labels) as LocationKind[]).map((kind) => (
              <button
                key={kind}
                className={activeKind === kind ? "active" : ""}
                onClick={() => {
                  setActiveKind(kind);
                  resetForm();
                  setQuery("");
                }}
                role="tab"
                aria-selected={activeKind === kind}
              >
                {labels[kind]} <span>{locations[kind].length}</span>
              </button>
            ))}
          </div>
          <div className="location-content">
            <form className="location-form" onSubmit={submit}>
              <div className="form-heading">
                <span className="form-number">{editingId ? "02" : "01"}</span>
                <div>
                  <h2>
                    {editingId
                      ? `Edit ${activeKind.slice(0, -1)}`
                      : `Add ${activeKind.slice(0, -1)}`}
                  </h2>
                  <p>
                    {editingId
                      ? "Update this record's details."
                      : "Create a new directory record."}
                  </p>
                </div>
              </div>
              <label>
                Name
                <input
                  required
                  value={form.name}
                  onChange={(event) =>
                    setForm({ ...form, name: event.target.value })
                  }
                  placeholder={`e.g. ${activeKind === "countries" ? "India" : activeKind === "states" ? "Maharashtra" : "Mumbai"}`}
                />
              </label>
              <label>
                Code
                <input
                  required
                  maxLength={6}
                  value={form.code}
                  onChange={(event) =>
                    setForm({ ...form, code: event.target.value })
                  }
                  placeholder="e.g. IN"
                />
              </label>
              {parentKind && (
                <label>
                  {parentKind === "countries" ? "Country" : "State"}
                  <select
                    required
                    value={form.parentId}
                    onChange={(event) =>
                      setForm({ ...form, parentId: event.target.value })
                    }
                  >
                    <option value="">
                      Select{" "}
                      {parentKind === "countries" ? "a country" : "a state"}
                    </option>
                    {locations[parentKind].map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              <div className="form-actions">
                <button className="primary-action" disabled={saving}>
                  {saving
                    ? "Saving..."
                    : editingId
                      ? "Update record"
                      : "Add record"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    className="cancel-action"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
            <div className="location-list-panel">
              <div className="list-toolbar">
                <div>
                  <h2>All {labels[activeKind].toLowerCase()}</h2>
                  <p>{visibleLocations.length} matching records</p>
                </div>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search records"
                  aria-label="Search records"
                />
              </div>
              {loading ? (
                <div className="empty-state">Loading locations...</div>
              ) : visibleLocations.length === 0 ? (
                <div className="empty-state">
                  No {labels[activeKind].toLowerCase()} found.
                </div>
              ) : (
                <div className="location-table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Code</th>
                        <th className="actions-heading">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visibleLocations.map((item) => (
                        <tr key={item._id}>
                          <td>
                            <strong>{item.name}</strong>
                          </td>
                          <td>
                            <span className="code-chip">{item.code}</span>
                          </td>
                          <td className="row-actions">
                            <button
                              onClick={() => beginEdit(item)}
                              aria-label={`Edit ${item.name}`}
                            >
                              Edit
                            </button>
                            <button
                              className="delete-action"
                              onClick={() => void remove(item)}
                              aria-label={`Delete ${item.name}`}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Location;
