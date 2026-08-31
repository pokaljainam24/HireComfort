import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { API_ROOT } from "../services/api";
import type { Recruiter } from "../types/recruiter";

function Recruiters() {
  const navigate = useNavigate();
  const [recruiters, setRecruiters] = useState<Recruiter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      const response = await fetch(`${API_ROOT}/recruiters`);
      if (!response.ok) {
        throw new Error("Failed to fetch recruiters");
      }
      const data = await response.json();
      setRecruiters(data.recruiters || []);
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
            Recruiters
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Manage recruiter profiles and access.
          </p>
        </header>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        <section>
          {loading ? (
            <div className="p-8 text-center text-slate-500">Loading recruiters...</div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {recruiters.map((recruiter) => (
                <div
                  key={recruiter._id}
                  onClick={() => navigate(`/recruiters/${recruiter._id}`)}
                  className="group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/10"
                >
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 uppercase font-bold">
                        {recruiter.firstName?.[0]}
                        {recruiter.lastName?.[0]}
                      </div>
                      <div>
                        <h3 className="line-clamp-1 font-bold text-slate-900">
                          {recruiter.firstName} {recruiter.lastName}
                        </h3>
                        <p className="text-xs font-medium text-emerald-600">
                          {recruiter.designation || "Recruiter"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-auto border-t border-slate-100 pt-4">
                      <p className="line-clamp-1 text-xs text-slate-500">
                        {recruiter.email}
                      </p>
                      <p className="mt-1 line-clamp-1 text-xs text-slate-500">
                        {recruiter.department || "—"}
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

export default Recruiters;