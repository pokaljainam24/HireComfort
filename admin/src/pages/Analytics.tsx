import { useState } from "react";
import { API_ROOT } from "../services/api";

interface AnalyticsData {
    _id: string;
    jobId: string;
    views: number;
    totalApplication: number;
    uniqueViews: number;
    totalClicks: number;
    uniqueClicks: number;
    applyButtonClicks: number;
    analyticDate: string;
}

function Analytics() {
    const [jobId, setJobId] = useState("");
    const [analytics, setAnalytics] = useState<AnalyticsData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleSearch = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!jobId.trim()) {
            setError("Please enter a valid Job ID");
            return;
        }

        try {
            setLoading(true);
            setError("");

            let url = `${API_ROOT}/analytics/job/${jobId.trim()}`;
            const params = new URLSearchParams();
            if (startDate) params.append("startDate", startDate);
            if (endDate) params.append("endDate", endDate);
            if (params.toString()) {
                url += `?${params.toString()}`;
            }

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch analytics");
            }
            const data = await response.json();
            setAnalytics(data.data || []);

            if (data.data?.length === 0) {
                setError("No analytics found for this Job ID and date range.");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load data");
            setAnalytics([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-50 p-4 text-slate-900 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">
                <header className="mb-8 border-b border-slate-200 pb-6">
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                        Analytics Master
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                        Search for aggregated daily metrics for a specific job.
                    </p>
                </header>

                <form onSubmit={handleSearch} className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                        <div className="flex-1">
                            <label htmlFor="jobId" className="block text-sm font-medium text-slate-700">Job ID</label>
                            <input
                                type="text"
                                id="jobId"
                                value={jobId}
                                onChange={(e) => setJobId(e.target.value)}
                                placeholder="Enter Job ObjectId (e.g. 64b8...)"
                                className="mt-1 block w-full rounded-md border border-slate-300 p-2 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="startDate" className="block text-sm font-medium text-slate-700">Start Date</label>
                            <input
                                type="date"
                                id="startDate"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="mt-1 block w-full rounded-md border border-slate-300 p-2 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="endDate" className="block text-sm font-medium text-slate-700">End Date</label>
                            <input
                                type="date"
                                id="endDate"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="mt-1 block w-full rounded-md border border-slate-300 p-2 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-emerald-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:bg-emerald-400 sm:mt-0"
                        >
                            {loading ? "Searching..." : "Search Analytics"}
                        </button>
                    </div>
                </form>

                {error && (
                    <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm font-medium text-red-600">
                        {error}
                    </div>
                )}

                <section>
                    {analytics.length > 0 && (
                        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                            <table className="min-w-full divide-y divide-slate-200">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Views</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Unique Views</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Clicks</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Unique Clicks</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Apply Clicks</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Applications</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 bg-white">
                                    {analytics.map((row) => (
                                        <tr key={row._id} className="hover:bg-slate-50">
                                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900">
                                                {new Date(row.analyticDate).toLocaleDateString()}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">{row.views}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">{row.uniqueViews}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">{row.totalClicks}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">{row.uniqueClicks}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">{row.applyButtonClicks}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500 font-bold text-emerald-600">{row.totalApplication}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}

export default Analytics;