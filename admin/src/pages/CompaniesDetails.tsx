import { FormEvent, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { API_ROOT } from "../services/api";
import type { Company } from "../types/company";

function CompaniesDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [company, setCompany] = useState<Company | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const [form, setForm] = useState<Partial<Company>>({});

    const loadData = async () => {
        try {
            const response = await fetch(`${API_ROOT}/companies/${id}`);
            if (!response.ok) {
                throw new Error("Failed to fetch company");
            }
            const data = await response.json();
            setCompany(data.data);
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

    const saveCompany = async (event: FormEvent) => {
        event.preventDefault();
        if (!company) return;

        setSaving(true);
        setError("");

        try {
            const response = await fetch(`${API_ROOT}/companies/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const payload = await response.json().catch(() => ({}));
            if (!response.ok) {
                throw new Error(payload.message ?? "Could not update company.");
            }

            await loadData();
        } catch (saveError) {
            setError(
                saveError instanceof Error ? saveError.message : "Could not update company.",
            );
        } finally {
            setSaving(false);
        }
    };

    const deleteCompany = async () => {
        if (!company || !window.confirm(`Delete company ${company.companyName}?`)) return;

        setError("");
        setSaving(true);

        try {
            const response = await fetch(`${API_ROOT}/companies/${id}`, {
                method: "DELETE",
            });
            const payload = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(payload.message ?? "Could not delete company.");
            }

            navigate("/companies");
        } catch (deleteError) {
            setError(
                deleteError instanceof Error ? deleteError.message : "Could not delete company.",
            );
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="p-8 text-center">Loading...</div>;
    }

    if (!company) {
        return <div className="p-8 text-center text-red-600">Company not found.</div>;
    }

    return (
        <main className="min-h-screen bg-slate-50 p-4 text-slate-900 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-3xl">
                <header className="mb-8 flex items-center justify-between border-b border-slate-200 pb-6">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                            COMPANY DETAILS
                        </p>
                        <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">
                            {company.companyName}
                        </h1>
                    </div>
                    <button
                        onClick={() => navigate("/companies")}
                        className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                        ← Back to Companies
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
                                Update company
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                Modify company details.
                            </p>
                        </div>

                        <form className="space-y-4" onSubmit={saveCompany}>
                            <label className="block text-xs font-bold uppercase tracking-wide text-slate-600">
                                Company Name
                                <input
                                    required
                                    value={form.companyName || ""}
                                    onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                                    className="mt-2 block w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                />
                            </label>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <label className="block text-xs font-bold uppercase tracking-wide text-slate-600">
                                    Email
                                    <input
                                        type="email"
                                        required
                                        value={form.companyEmail || ""}
                                        onChange={(e) => setForm({ ...form, companyEmail: e.target.value })}
                                        className="mt-2 block w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                    />
                                </label>
                                <label className="block text-xs font-bold uppercase tracking-wide text-slate-600">
                                    Contact Number
                                    <input
                                        required
                                        value={form.contactNumber || ""}
                                        onChange={(e) => setForm({ ...form, contactNumber: e.target.value })}
                                        className="mt-2 block w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                    />
                                </label>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <label className="block text-xs font-bold uppercase tracking-wide text-slate-600">
                                    Company Type
                                    <input
                                        value={form.companyType || ""}
                                        onChange={(e) => setForm({ ...form, companyType: e.target.value })}
                                        className="mt-2 block w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                    />
                                </label>
                                <label className="block text-xs font-bold uppercase tracking-wide text-slate-600">
                                    Number of Employees
                                    <input
                                        value={form.numberOfEmployee || ""}
                                        onChange={(e) => setForm({ ...form, numberOfEmployee: e.target.value })}
                                        className="mt-2 block w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                    />
                                </label>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <label className="block text-xs font-bold uppercase tracking-wide text-slate-600">
                                    Website
                                    <input
                                        value={form.website || ""}
                                        onChange={(e) => setForm({ ...form, website: e.target.value })}
                                        className="mt-2 block w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                    />
                                </label>
                                <label className="block text-xs font-bold uppercase tracking-wide text-slate-600">
                                    GST Number
                                    <input
                                        value={form.gstNumber || ""}
                                        onChange={(e) => setForm({ ...form, gstNumber: e.target.value })}
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

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <label className="block text-xs font-bold uppercase tracking-wide text-slate-600">
                                    City
                                    <input
                                        value={form.city || ""}
                                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                                        className="mt-2 block w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
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
                                <label className="block text-xs font-bold uppercase tracking-wide text-slate-600">
                                    Country
                                    <input
                                        value={form.country || ""}
                                        onChange={(e) => setForm({ ...form, country: e.target.value })}
                                        className="mt-2 block w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                    />
                                </label>
                            </div>

                            <label className="block text-xs font-bold uppercase tracking-wide text-slate-600">
                                About Company
                                <textarea
                                    rows={3}
                                    value={form.aboutCompany || ""}
                                    onChange={(e) => setForm({ ...form, aboutCompany: e.target.value })}
                                    className="mt-2 block w-full resize-none rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
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
                                    {saving ? "Saving..." : "Update company"}
                                </button>
                                <button
                                    type="button"
                                    onClick={deleteCompany}
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

export default CompaniesDetails;