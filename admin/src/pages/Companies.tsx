import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { API_ROOT } from "../services/api";
import type { Company } from "../types/company";

function Companies() {
    const navigate = useNavigate();
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadData = async () => {
        try {
            const response = await fetch(`${API_ROOT}/companies`);
            if (!response.ok) {
                throw new Error("Failed to fetch companies");
            }
            const data = await response.json();
            setCompanies(data.data || []);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Failed to load data",
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void loadData();
    }, []);

    return (
        <main className="min-h-screen bg-slate-50 p-4 text-slate-900 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">
                <header className="mb-8 border-b border-slate-200 pb-6">
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                        Companies
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                        Manage company profiles.
                    </p>
                </header>

                {error && (
                    <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm font-medium text-red-600">
                        {error}
                    </div>
                )}

                <section>
                    {loading ? (
                        <div className="p-8 text-center text-slate-500">Loading companies...</div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {companies.map((company) => (
                                <div
                                    key={company._id}
                                    onClick={() => navigate(`/companies/${company._id}`)}
                                    className="group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/10"
                                >
                                    <div className="flex flex-1 flex-col p-5">
                                        <div className="mb-3 flex items-center gap-3">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 uppercase font-bold">
                                                {company.companyName?.[0] || "C"}
                                            </div>
                                            <div>
                                                <h3 className="line-clamp-1 font-bold text-slate-900">
                                                    {company.companyName}
                                                </h3>
                                                <p className="text-xs font-medium text-emerald-600">
                                                    {company.companyType || "Company"}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-auto border-t border-slate-100 pt-4">
                                            <p className="line-clamp-1 text-xs text-slate-500">
                                                {company.companyEmail}
                                            </p>
                                            <p className="mt-1 line-clamp-1 text-xs text-slate-500">
                                                {company.city ? `${company.city}, ${company.country}` : "—"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}

export default Companies;