import { Link } from "react-router";

const stats = [
  {
    label: "Total Users",
    value: "2,847",
    change: "+12.5%",
    tone: "text-emerald-600 bg-emerald-50",
    icon: "👥",
  },
  {
    label: "Active Bookings",
    value: "186",
    change: "+8.2%",
    tone: "text-blue-600 bg-blue-50",
    icon: "📅",
  },
  {
    label: "Total Revenue",
    value: "₹4,28,650",
    change: "+18.4%",
    tone: "text-violet-600 bg-violet-50",
    icon: "₹",
  },
  {
    label: "Pending Requests",
    value: "24",
    change: "-4.6%",
    tone: "text-orange-600 bg-orange-50",
    icon: "⏳",
  },
];

const recentBookings = [
  {
    name: "Aarav Sharma",
    service: "Home Cleaning",
    date: "Today, 10:30 AM",
    status: "Confirmed",
    avatar: "AS",
  },
  {
    name: "Priya Mehta",
    service: "Plumbing Service",
    date: "Today, 1:00 PM",
    status: "Pending",
    avatar: "PM",
  },
  {
    name: "Rohan Kapoor",
    service: "Electrical Repair",
    date: "Tomorrow, 9:00 AM",
    status: "Confirmed",
    avatar: "RK",
  },
  {
    name: "Ananya Singh",
    service: "Appliance Repair",
    date: "Tomorrow, 3:30 PM",
    status: "Cancelled",
    avatar: "AS",
  },
];

function Home() {
  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-1 text-sm font-medium text-slate-500">
              Thursday, August 27, 2026
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Good morning, Admin!
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Here&apos;s what&apos;s happening with HireComfort today.
            </p>
          </div>

          <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
            <span className="text-lg leading-none">+</span>
            Add new booking
          </button>
        </div>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {stat.label}
                  </p>
                  <p className="mt-3 text-2xl font-bold text-slate-900">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl text-lg ${stat.tone}`}
                >
                  {stat.icon}
                </div>
              </div>
              <p className="mt-4 text-xs font-medium text-emerald-600">
                {stat.change}{" "}
                <span className="font-normal text-slate-400">
                  vs. last month
                </span>
              </p>
            </div>
          ))}
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Recent bookings
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Latest customer appointments
                </p>
              </div>
              <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                View all
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {recentBookings.map((booking, index) => (
                <div
                  key={`${booking.name}-${index}`}
                  className="flex items-center justify-between gap-3 p-5"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                      {booking.avatar}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {booking.name}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {booking.service} · {booking.date}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                      booking.status === "Confirmed"
                        ? "bg-emerald-50 text-emerald-700"
                        : booking.status === "Pending"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-red-50 text-red-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5">
              <h2 className="font-semibold text-slate-900">Quick actions</h2>
              <p className="mt-1 text-sm text-slate-500">
                Common administrative tasks
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 y-overflow-scroll">
              {[
                ["＋", "Add service", "Create a new service", "#"],
                ["♙", "Manage providers", "View and approve providers", "#"],
                ["▣", "View reports", "Check business performance", "#"],
                ["⚙", "Settings", "Update platform settings", "#"],
                ["⚙", "Locations", "Manage location information", "/location"],
              ].map(([icon, title, description, to], idx) => (
                <Link
                  key={idx}
                  className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 text-left transition hover:border-blue-200 hover:bg-blue-50"
                  to={to}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-lg text-blue-600">
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

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">
                Today&apos;s overview
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Booking activity for today
              </p>
            </div>
            <span className="text-sm font-medium text-slate-500">27 Aug</span>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              ["32", "New bookings"],
              ["18", "Completed"],
              ["8", "In progress"],
              ["₹72,400", "Today&apos;s revenue"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-xl bg-slate-50 p-4">
                <p className="text-xl font-bold text-slate-900">{value}</p>
                <p className="mt-1 text-xs text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Home;
