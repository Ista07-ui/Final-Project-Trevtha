"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function AdminDashboard() {
  const router = useRouter();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const metrics = [
    {
      id: 1,
      icon: "group",
      label: "Total Users",
      value: "14,258",
      trend: "+12%",
      trendColor: "#16a34a",
    },
    {
      id: 2,
      icon: "payments",
      label: "Total Revenue",
      value: "$842,000",
      trend: "+8.4%",
      trendColor: "#16a34a",
    },
    {
      id: 3,
      icon: "receipt_long",
      label: "Transactions",
      value: "3,210",
      trend: "+5%",
      trendColor: "#16a34a",
    },
    {
      id: 4,
      icon: "confirmation_number",
      label: "Active Promos",
      value: "12",
      trend: "-2%",
      trendColor: "#dc2626",
    },
    {
      id: 5,
      icon: "local_activity",
      label: "Activities",
      value: "158",
      trend: "+15%",
      trendColor: "#16a34a",
    },
  ];

  const transactions = [
    {
      trxId: 1,
      id: "#TRX-94821",
      user: "Julianne Moore",
      amount: "$1,250.00",
      status: "Success",
      statusBg: "#d1fae5",
      statusText: "#047857",
    },
    {
      trxId: 2,
      id: "#TRX-94822",
      user: "Marcus Aurelius",
      amount: "$3,400.00",
      status: "Pending",
      statusBg: "#fef3c7",
      statusText: "#b45309",
    },
    {
      trxId: 3,
      id: "#TRX-94823",
      user: "Elena Rodriguez",
      amount: "$890.00",
      status: "Success",
      statusBg: "#d1fae5",
      statusText: "#047857",
    },
    {
      trxId: 4,
      id: "#TRX-94824",
      user: "David Chen",
      amount: "$2,100.00",
      status: "Success",
      statusBg: "#d1fae5",
      statusText: "#047857",
    },
  ];

  const topActivities = [
    {
      actId: 1,
      title: "Private Island Escape",
      location: "Maldives, Asia",
      bookings: 142,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuADnPcoj29YzxXrv-kRcTOUuOj2UyNxK0Cy1MyWR3ylnEWIcE8MHot9-DZb7jaFZvjYNLhwzfQUk3DE9T_82QNW_gGM6mfH-OGkbQ4r0l7fmkz_xixynOwoOwSdPKvMCsLGGOUQDJwy5NL-ktAIBTFw8ePOXEsd_uvrvobnE2gK6Tbb0nuFzfb-3mi7V7ZMl0X_94p6U-mFpT4jltsRsVPFnrV2KLLNJD81j5wkR79VUZWfB6CwQOPPvUwu7KQ7Uc4luCQO2toeC_zp",
    },
    {
      actId: 2,
      title: "Alps Helicopter Tour",
      location: "Switzerland, Europe",
      bookings: 98,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDQq5ANvJbJ9EJMPE-3uh052LyCgg2qjPQI3R1N_oSLThArxhhXxXe_b5d34ak7grVprN7RqS1LKEbNtcgE8vZmnLc3t7LVrZtcQid31ALUCiQcE5BakALzttE713vZoRxaCygXTYdrrqsd76uuPGHs8XbxeYoVdoq9XZgzRntgtr65-Wk50PqJPbK99j0RlPJfY8MrdDZ99JwJBuH7co8i3fzFZe6LI4msYao7PicpNeb6VksNCJgTe2JhPb6pyhXcNO0d52YX0jzN",
    },
    {
      actId: 3,
      title: "Tuscany Wine Tasting",
      location: "Italy, Europe",
      bookings: 87,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBz3wfpd_QfJBpL8-z9YVkkVw4z8TT2cdHPVLXBwbdzc8yNkCWmtENDs1uDboaq-Z5U9gLeyChUsHRInNiSuGqTK5N1EQG5oLUPXddxo-R5p4NkRm7Dw8yy6yqcfd1mG1PSG5KCqoQ7Z5Kj5gPbsEog5vGsjVPb0HokJfDkRRqQmCmsgv4BSZ3-dpEe7prtbUty2tpCXixAqWcex8ZG27jLHY6v0qcjX4lhAg3wurFXrMexCXKuMul-nsncpizk4dcmcfgSvM8AD_Is",
    },
    {
      actId: 4,
      title: "Kyoto Garden Retreat",
      location: "Japan, Asia",
      bookings: 65,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDz4z1VwcxGezEmST2WopkdCMDXp092anJ7q99psNAYCXZsvjzLk_lnzqdGIjWx0ag38x0mUYLjs1DrJWHcHi2-tAnLgCSVWQqPSfE88ektaQcLdrge4-Fp2qFiZ3_yESUO44tfIlZxqfAGPU8c0LlxjEafBqrXw8YiY4MeTQ00W6T8TJ1_6fMWRsPI1aHcwudbKDP9iCAssGE6zqTiw-w9xCgaKGC8o3_iJYKPSoteqRG2Vl1IyLLGsOSHIk3IGLH6nb9L7zJ6DxEx",
    },
    {
      actId: 5,
      title: "Amazon River Cruise",
      location: "Brazil, S. America",
      bookings: 42,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBdRANlRm58OkHnij_isZUtElnTCs3ACPBdtTdY0uEMeTLI2-8zYSIxYvDqvMoP0ws31ywQVRuxIA4_P-TL4_girdNtivEf0zdcBHnMgM-rsJWzprRiskIz0yPLtEs3SlTGH3xP-ib7C9iZbKjUzW_odDUnLgcKujn5hVufmHfWEcWGLLPc_HRQzi2-0LvlKmQfxEneqCvkvSdSY0w7x_iLv1TdE5ESrZ6PniJYbE154aEbh9eSyPd0C0EaoIGbRJ0jNmidrpwepxVK",
    },
  ];

  return (
    <div className="flex overflow-hidden min-h-screen bg-cream text-charcoal">
      {/* Sidebar */}
      <aside className="w-72 bg-forest flex flex-col h-screen text-white/80 shrink-0 sticky top-0">
        {/* Logo */}
        <div className="p-6 flex items-center gap-3">
          <div className="size-10 bg-gold/20 rounded-lg flex items-center justify-center">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiurMpR0E35NjjjixoHOzcHc9lBh_SjBUG1sahq4qFnFF8GuXUH0T_1y-TEkd6W2G2Ib9gIBN0t04BzgYpBvgErUA27y2RK6mZjgq-48QlqWTf30MIovx9G2M85jDk9H9Fd9sf10KDWex2F30zyOZAElllGSaK9gmrFgu70ZwBvpcIWplmT_S2PbhY2vYSgdhQhcWIzhb_OdeviIj_nKBhPXvlbRtb_Bon_UJ3IbVEWcn-AkPV7o_HQb419C1Y5CsW5r5fjcHSWZgT"
              alt="TREVTHA Luxury Logo"
              width={32}
              height={32}
              className="size-8"
            />
          </div>
          <div>
            <h1 className="text-white font-bold tracking-tight text-lg leading-none">
              TREVTHA
            </h1>
            <p className="text-gold text-[10px] font-medium tracking-widest uppercase mt-1">
              Luxury Marketplace
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          <a
            href="/admin/dashboard"
            className="sidebar-item-active flex items-center gap-3 px-4 py-3 text-white rounded-r-lg"
            style={{
              backgroundColor: "rgba(212, 175, 55, 0.15)",
              borderLeft: "4px solid #D4AF37",
            }}
          >
            <span className="material-symbols-outlined text-gold">
              dashboard
            </span>
            <span className="text-sm font-semibold">Dashboard Overview</span>
          </a>
          <a
            href="/admin/banners"
            className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 hover:text-white transition-all rounded-lg"
          >
            <span className="material-symbols-outlined text-gold/70">
              view_carousel
            </span>
            <span className="text-sm">Manage Banners</span>
          </a>
          <a
            href="/admin/categories"
            className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 hover:text-white transition-all rounded-lg"
          >
            <span className="material-symbols-outlined text-gold/70">
              category
            </span>
            <span className="text-sm">Manage Categories</span>
          </a>
          <a
            href="/admin/activities"
            className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 hover:text-white transition-all rounded-lg"
          >
            <span className="material-symbols-outlined text-gold/70">
              explore
            </span>
            <span className="text-sm">Manage Activities</span>
          </a>
          <a
            href="/admin/promos"
            className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 hover:text-white transition-all rounded-lg"
          >
            <span className="material-symbols-outlined text-gold/70">
              redeem
            </span>
            <span className="text-sm">Manage Promos</span>
          </a>
          <a
            href="/admin/payment-methods"
            className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 hover:text-white transition-all rounded-lg"
          >
            <span className="material-symbols-outlined text-gold/70">
              payments
            </span>
            <span className="text-sm">Payment Methods</span>
          </a>
          <a
            href="/admin/transactions"
            className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 hover:text-white transition-all rounded-lg"
          >
            <span className="material-symbols-outlined text-gold/70">
              history
            </span>
            <span className="text-sm">Manage Transactions</span>
          </a>
          <a
            href="/admin/users"
            className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 hover:text-white transition-all rounded-lg"
          >
            <span className="material-symbols-outlined text-gold/70">
              group
            </span>
            <span className="text-sm">Manage Users</span>
          </a>
        </nav>

        {/* Sidebar Footer */}
        <div className="px-4 py-6 space-y-4">
          <button className="w-full bg-gold hover:bg-gold/90 text-forest font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
            <span className="material-symbols-outlined">add_circle</span>
            <span className="text-sm">New Activity</span>
          </button>
          <div className="pt-4 border-t border-white/10 space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-2 hover:text-white transition-all text-left">
              <span className="material-symbols-outlined text-sm">
                settings
              </span>
              <span className="text-sm">Settings</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 hover:text-white transition-all text-left"
            >
              <span className="material-symbols-outlined text-sm">logout</span>
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Header */}
        <header className="h-20 bg-white border-b border-charcoal/5 px-8 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <h2 className="text-xl font-bold text-forest">
            Admin Dashboard Overview
          </h2>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 px-4 py-2 bg-cream/50 rounded-full border border-charcoal/5">
              <span className="material-symbols-outlined text-charcoal/40">
                search
              </span>
              <input
                type="text"
                placeholder="Search activities..."
                className="bg-transparent border-none focus:ring-0 text-sm w-48 placeholder:text-charcoal/40 outline-none"
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-bold text-charcoal">
                  {user?.name || "Admin User"}
                </p>
                <p className="text-[11px] text-charcoal/60 uppercase tracking-wider">
                  {user?.role === "admin" ? "Admin" : "User"}
                </p>
              </div>
              <div className="size-10 rounded-full border-2 border-gold p-0.5">
                {user?.profilePictureUrl ? (
                  <Image
                    src={user.profilePictureUrl}
                    alt={`${user.name} Profile Avatar`}
                    width={40}
                    height={40}
                    className="size-full rounded-full object-cover"
                  />
                ) : (
                  <div className="size-full rounded-full bg-gold/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-gold text-xl">
                      person
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* System Status Banner */}
          <div className="bg-forest/5 border-l-4 border-gold p-4 flex items-center justify-between rounded-r-lg">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-gold">
                check_circle
              </span>
              <p className="text-sm font-medium text-forest">
                System Status:{" "}
                <span className="text-forest font-bold uppercase tracking-tight">
                  API Connected
                </span>
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold text-forest/60">
              <span>Server Load: 12%</span>
              <div className="w-24 h-1.5 bg-forest/10 rounded-full overflow-hidden">
                <div className="h-full bg-gold w-1/4"></div>
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-5 gap-6">
            {metrics.map((metric) => (
              <div
                key={metric.id}
                className="bg-white p-6 rounded-xl shadow-sm border border-charcoal/5 flex flex-col gap-1"
              >
                <div className="flex justify-between items-start mb-2">
                  <span
                    className={`material-symbols-outlined text-gold bg-gold/10 p-2 rounded-lg`}
                  >
                    {metric.icon}
                  </span>
                  <span
                    style={{ color: metric.trendColor }}
                    className="text-xs font-bold"
                  >
                    {metric.trend}
                  </span>
                </div>
                <p className="text-charcoal/60 text-xs font-bold uppercase tracking-wider">
                  {metric.label}
                </p>
                <p className="text-2xl font-extrabold text-forest">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-3 gap-8">
            {/* Sales Trend Chart */}
            <div className="col-span-2 bg-white p-8 rounded-xl shadow-sm border border-charcoal/5">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="font-bold text-forest text-lg">
                    Monthly Sales Trend
                  </h3>
                  <p className="text-charcoal/60 text-sm">
                    Revenue performance over the last 6 months
                  </p>
                </div>
                <select className="text-xs font-bold text-forest border border-charcoal/10 rounded-lg px-3 py-2 outline-none">
                  <option>Last 6 Months</option>
                  <option>Last Year</option>
                </select>
              </div>
              <div className="h-64 flex items-end gap-2 relative">
                <svg
                  className="absolute inset-0 w-full h-full"
                  preserveAspectRatio="none"
                  viewBox="0 0 100 40"
                >
                  <path
                    d="M0,35 Q10,10 20,25 T40,15 T60,30 T80,10 T100,20"
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="0.5"
                  ></path>
                  <path
                    d="M0,35 Q10,10 20,25 T40,15 T60,30 T80,10 T100,20 V40 H0 Z"
                    fill="url(#grad)"
                    opacity="0.1"
                  ></path>
                  <defs>
                    <linearGradient id="grad" x1="0%" x2="0%" y1="0%" y2="100%">
                      <stop
                        offset="0%"
                        style={{ stopColor: "#D4AF37", stopOpacity: 1 }}
                      ></stop>
                      <stop
                        offset="100%"
                        style={{ stopColor: "#D4AF37", stopOpacity: 0 }}
                      ></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <div className="flex w-full justify-between items-end h-full pt-10 px-2 border-b border-charcoal/5 text-[10px] font-bold text-charcoal/40 uppercase tracking-tighter relative z-10">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                </div>
              </div>
            </div>

            {/* Popular Categories */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-charcoal/5">
              <h3 className="font-bold text-forest text-lg mb-2">
                Popular Categories
              </h3>
              <p className="text-charcoal/60 text-sm mb-8">
                Booking distribution by type
              </p>
              <div className="flex flex-col items-center justify-center h-48 relative">
                <div className="size-36 rounded-full border-[16px] border-cream border-t-gold border-r-forest border-b-gold/50 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl font-extrabold text-forest">342</p>
                    <p className="text-[10px] uppercase font-bold text-charcoal/60">
                      Total
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-3 rounded-full bg-forest"></div>
                    <span className="text-sm font-medium">City Tour</span>
                  </div>
                  <span className="text-sm font-bold">45%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-3 rounded-full bg-indigo-400"></div>
                    <span className="text-sm font-medium">Beach</span>
                  </div>
                  <span className="text-sm font-bold">30%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-3 rounded-full bg-teal-400"></div>
                    <span className="text-sm font-medium">Mountain</span>
                  </div>
                  <span className="text-sm font-bold">25%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-3 gap-8 pb-12">
            {/* Recent Transactions */}
            <div className="col-span-2 bg-white rounded-xl shadow-sm border border-charcoal/5 overflow-hidden">
              <div className="p-6 border-b border-charcoal/5 flex justify-between items-center">
                <h3 className="font-bold text-forest text-lg">
                  Recent Transactions
                </h3>
                <button className="text-xs font-bold text-gold uppercase tracking-wider hover:text-gold/80">
                  View All
                </button>
              </div>
              <table className="w-full text-left">
                <thead className="bg-cream/50 text-[11px] font-bold text-charcoal/50 uppercase tracking-widest">
                  <tr>
                    <th className="px-6 py-4">Transaction ID</th>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-charcoal/5">
                  {transactions.map((trx) => (
                    <tr
                      key={trx.trxId}
                      className="hover:bg-cream/20 transition-colors"
                    >
                      <td className="px-6 py-4 font-mono font-medium text-xs">
                        {trx.id}
                      </td>
                      <td className="px-6 py-4 font-semibold text-forest">
                        {trx.user}
                      </td>
                      <td className="px-6 py-4 font-bold">{trx.amount}</td>
                      <td className="px-6 py-4">
                        <span
                          className="px-3 py-1 text-[10px] font-bold uppercase rounded-full"
                          style={{
                            backgroundColor: trx.statusBg,
                            color: trx.statusText,
                          }}
                        >
                          {trx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Top Activities */}
            <div className="bg-white rounded-xl shadow-sm border border-charcoal/5 overflow-hidden">
              <div className="p-6 border-b border-charcoal/5">
                <h3 className="font-bold text-forest text-lg">
                  Top Activities
                </h3>
              </div>
              <div className="divide-y divide-charcoal/5">
                {topActivities.map((activity) => (
                  <div
                    key={activity.actId}
                    className="p-4 flex items-center gap-4 hover:bg-cream/20 transition-all cursor-pointer"
                  >
                    <Image
                      src={activity.image}
                      alt={`${activity.title} Activity Thumbnail`}
                      width={48}
                      height={48}
                      className="size-12 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-forest truncate">
                        {activity.title}
                      </p>
                      <p className="text-[11px] text-charcoal/50">
                        {activity.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-extrabold text-gold">
                        {activity.bookings}
                      </p>
                      <p className="text-[9px] uppercase font-bold text-charcoal/40">
                        Bookings
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-4">
        <div className="group relative flex items-center justify-end">
          <span className="mr-4 bg-forest text-white text-xs font-bold py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
            Upload Banner
          </span>
          <button className="size-14 bg-white border-2 border-forest text-forest hover:bg-forest hover:text-white rounded-full shadow-xl flex items-center justify-center transition-all transform hover:scale-110">
            <span className="material-symbols-outlined">image</span>
          </button>
        </div>
        <div className="group relative flex items-center justify-end">
          <span className="mr-4 bg-forest text-white text-xs font-bold py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
            Create Promo
          </span>
          <button className="size-14 bg-white border-2 border-forest text-forest hover:bg-forest hover:text-white rounded-full shadow-xl flex items-center justify-center transition-all transform hover:scale-110">
            <span className="material-symbols-outlined">
              confirmation_number
            </span>
          </button>
        </div>
        <div className="group relative flex items-center justify-end">
          <span className="mr-4 bg-gold text-forest text-xs font-bold py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
            Add Activity
          </span>
          <button className="size-16 bg-gold text-forest rounded-full shadow-2xl flex items-center justify-center transition-all transform hover:scale-110">
            <span className="material-symbols-outlined text-3xl font-bold">
              add
            </span>
          </button>
        </div>
      </div>

      {/* Alert Notification */}
      <div className="fixed bottom-4 left-80 flex items-center gap-4 bg-rose-50 border border-rose-200 px-4 py-2 rounded-lg shadow-lg">
        <span className="material-symbols-outlined text-rose-600 animate-pulse text-sm">
          error
        </span>
        <p className="text-xs font-bold text-rose-800 tracking-tight">
          Low Stock Alert:{" "}
          <span className="font-normal">&apos;Alps Helicopter Tour&apos;</span>{" "}
          only 2 spots remaining.
        </p>
      </div>
    </div>
  );
}
