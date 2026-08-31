import { Link } from "react-router";

function Home() {
  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Good morning, Admin!
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Here&apos;s what&apos;s happening with HireComfort today.
            </p>
          </div>
        </div>

        <section className="mt-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5">
              <h2 className="font-semibold text-slate-900">Quick actions</h2>
              <p className="mt-1 text-sm text-slate-500">
                Common administrative tasks
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[
                ["＋", "Add service", "Create a new service", "#"],
                [
                  "♙",
                  "Manage job categories",
                  "Add, edit, or remove job categories and sub categories",
                  "/job-categories",
                ],
                ["▣", "Manage recruiters", "Manage recruiters", "/recruiters"],
                ["⚙", "Manage companies", "Manage companies", "/companies"],
                ["⚙", "Locations", "Manage location information", "/location"],
                ["⚙", "Applicants", "Manage Applicants", "/applicants"],
                ["⚙", "Analytics master", "Manage analytics master", "/analytics"],
                ["⚙", "Analytics events", "Manage analytics events", "/analytics-events"],
                ["👤", "Profile", "Manage your profile", "/profile"],
              ].map(([icon, title, description, to], idx) => (
                <Link
                  key={idx}
                  className="flex items-center gap-3 rounded-xl border border-slate-100 p-4 text-left transition hover:border-blue-200 hover:bg-blue-50"
                  to={to}
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xl text-blue-600">
                    {icon}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-slate-900">
                      {title}
                    </span>
                    <span className="block text-xs text-slate-500">
                      {description}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Home;
