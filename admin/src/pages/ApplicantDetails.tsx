import { useEffect, useState } from "react";
import type { FormEvent } from 'react'
import { useParams, useNavigate } from "react-router";
import { API_ROOT } from "../services/api";
import type { Applicant } from "../types/applicant";

function ApplicantDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [applicant, setApplicant] = useState<Applicant | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<Partial<Applicant>>({});

  const loadData = async () => {
    try {
      const response = await fetch(`${API_ROOT}/applicants/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch applicant");
      }
      const data = await response.json();
      setApplicant(data.data);
      setForm(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, [id]);

  const saveApplicant = async (event: FormEvent) => {
    event.preventDefault();
    if (!applicant) return;

    setSaving(true);
    setError("");

    try {
      const response = await fetch(`${API_ROOT}/applicants/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.message ?? "Could not update applicant.");
      }

      await loadData();
    } catch (saveError) {
      setError(
        saveError instanceof Error ? saveError.message : "Could not update applicant.",
      );
    } finally {
      setSaving(false);
    }
  };

  const deleteApplicant = async () => {
    if (!applicant || !window.confirm(`Delete applicant ${applicant.firstName}?`)) return;

    setError("");
    setSaving(true);

    try {
      const response = await fetch(`${API_ROOT}/applicants/${id}`, {
        method: "DELETE",
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload.message ?? "Could not delete applicant.");
      }

      navigate("/applicants");
    } catch (deleteError) {
      setError(
        deleteError instanceof Error ? deleteError.message : "Could not delete applicant.",
      );
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (!applicant) {
    return <div className="p-8 text-center text-red-600">Applicant not found.</div>;
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 text-slate-900 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8 flex items-center justify-between border-b border-slate-200 pb-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              APPLICANT DETAILS
            </p>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">
              {applicant.firstName} {applicant.lastName}
            </h1>
          </div>
          <button
            onClick={() => navigate("/applicants")}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            ← Back to Applicants
          </button>
        </header>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-900">
                Update applicant
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Modify applicant details.
              </p>
            </div>

            <form className="space-y-4" onSubmit={saveApplicant}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-600">
                  First Name
                  <input
                    required
                    value={form.firstName || ""}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    className="mt-2 block w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  />
                </label>
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-600">
                  Last Name
                  <input
                    required
                    value={form.lastName || ""}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    className="mt-2 block w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-600">
                  Email
                  <input
                    type="email"
                    required
                    value={form.email || ""}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="mt-2 block w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  />
                </label>
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-600">
                  Mobile Number
                  <input
                    value={form.mobileNumber || ""}
                    onChange={(e) => setForm({ ...form, mobileNumber: e.target.value })}
                    className="mt-2 block w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-600">
                  Username
                  <input
                    required
                    value={form.userName || ""}
                    onChange={(e) => setForm({ ...form, userName: e.target.value })}
                    className="mt-2 block w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  />
                </label>
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-600">
                  Higher Qualification
                  <input
                    value={form.higherQualification || ""}
                    onChange={(e) => setForm({ ...form, higherQualification: e.target.value })}
                    className="mt-2 block w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-600">
                  Experience
                  <input
                    value={form.experience || ""}
                    onChange={(e) => setForm({ ...form, experience: e.target.value })}
                    className="mt-2 block w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  />
                </label>
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-600">
                  Gender
                  <input
                    value={form.gender || ""}
                    onChange={(e) => setForm({ ...form, gender: e.target.value })}
                    className="mt-2 block w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  />
                </label>
              </div>

              <label className="block text-xs font-bold uppercase tracking-wide text-slate-600">
                Address
                <textarea
                  rows={2}
                  value={form.address || ""}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="mt-2 block w-full resize-none rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                />
              </label>

              <label className="block text-xs font-bold uppercase tracking-wide text-slate-600">
                State
                <input
                  value={form.state || ""}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  className="mt-2 block w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                />
              </label>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={form.isActive ?? false}
                    onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                    className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  Is Active
                </label>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={form.isDisplay ?? false}
                    onChange={(e) => setForm({ ...form, isDisplay: e.target.checked })}
                    className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  Is Display
                </label>
              </div>

              <div className="mt-6 flex gap-4 border-t border-slate-100 pt-6">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-1/2 rounded-lg bg-emerald-700 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Update applicant"}
                </button>
                <button
                  type="button"
                  onClick={deleteApplicant}
                  disabled={saving}
                  className="w-1/2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-100 disabled:opacity-60"
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ApplicantDetails;