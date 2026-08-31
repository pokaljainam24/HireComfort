import { useEffect, useState } from "react";
import { API_ROOT } from "../services/api";

interface AnalyticsEvent {
    _id: string;
    jobId: string;
    applicantId?: string;
    eventType: string;
    createdAt: string;
}

function AnalyticsEvents() {
    const [events, setEvents] = useState<AnalyticsEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const loadData = async () => {
        try {
            setLoading(true);
            let url = `${API_ROOT}/analytics-events`;
            const params = new URLSearchParams();
            if (startDate) params.append("startDate", startDate);
            if (endDate) params.append("endDate", endDate);
            if (params.toString()) {
                url += `?${params.toString()}`;
            }

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch analytics events");
            }
            const data = await response.json();
            setEvents(data.data || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void loadData();
    }, [startDate, endDate]);

    return (
        <main className="min-h-screen bg-slate-50 p-4 text-slate-900 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">
                <header className="mb-8 border-b border-slate-200 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                            Analytics Events
                        </h1>
                        <p className="mt-2 text-sm text-slate-500">
                            View and track real-time applicant events and interactions.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <div>
                            <label className="block text-xs font-medium text-slate-700">Start Date</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm sm:text-sm p-2 border"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-slate-700">End Date</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm sm:text-sm p-2 border"
                            />
                        </div>
                    </div>
                </header>

                {error && (
                    <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm font-medium text-red-600">
                        {error}
                    </div>
                )}

                <section>
                    {loading ? (
                        <div className="p-8 text-center text-slate-500">Loading events...</div>
                    ) : events.length === 0 ? (
                        <div className="p-8 text-center text-slate-500 bg-white rounded-xl border border-slate-200">
                            No events found for this date range.
                        </div>
                    ) : (
                        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                            <table className="min-w-full divide-y divide-slate-200">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Event Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Job ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Applicant ID</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 bg-white">
                                    {events.map((event) => (
                                        <tr key={event._id} className="hover:bg-slate-50">
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-900">
                                                {new Date(event.createdAt).toLocaleString()}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm">
                                                <span className="inline-flex rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                                    {event.eventType}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500 font-mono">
                                                {event.jobId}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500 font-mono">
                                                {event.applicantId || "—"}
                                            </td>
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

export default AnalyticsEvents;