import UserDashboardHeader from "@/components/user/UserDashboardHeader";

export default function TransactionsPage() {
  const transactions = [
    {
      id: "#TRV-88291",
      date: "24 May 2026",
      activityName: "Bali Private Villa Experience",
      totalPrice: "$2,500.00",
      status: "Success",
      statusColor: "green",
    },
    {
      id: "#TRV-88295",
      date: "26 May 2026",
      activityName: "Private Jet Charter to Tokyo",
      totalPrice: "$15,200.00",
      status: "Pending",
      statusColor: "yellow",
    },
    {
      id: "#TRV-88280",
      date: "10 May 2026",
      activityName: "Safari Glamping in Serengeti",
      totalPrice: "$4,800.00",
      status: "Canceled",
      statusColor: "gray",
    },
  ];

  return (
    <div className="layout-container flex h-full grow flex-col bg-background-light text-charcoal [--color-primary:#1B3022] [--color-forest:#1B3022] [--color-gold:#D4AF37] [--color-background-light:#F9F7F2] [--color-background-dark:#121212]">
      {/* Top Navigation */}
      <UserDashboardHeader />

      {/* Main Content Area */}
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="mb-10 flex flex-wrap justify-between items-end gap-6">
          <div className="space-y-2">
            <h2 className="text-4xl font-extrabold text-forest leading-tight">
              My Transactions
            </h2>
            <p className="text-charcoal/60 text-lg">
              Monitor and manage your luxury travel bookings.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-forest/10 rounded-lg text-sm font-semibold hover:bg-forest hover:text-white transition-all shadow-sm">
              <span className="material-symbols-outlined text-xl">
                download
              </span>
              Download Report
            </button>
          </div>
        </header>

        {/* Filters Section */}
        <section className="mb-8 bg-white p-4 rounded-xl shadow-sm border border-forest/5 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center bg-background-light p-1 rounded-lg">
            <button className="px-6 py-2 rounded-md bg-forest text-white text-sm font-bold transition-all">
              All
            </button>
            <button className="px-6 py-2 rounded-md text-charcoal/60 hover:text-forest text-sm font-semibold transition-all">
              Pending
            </button>
            <button className="px-6 py-2 rounded-md text-charcoal/60 hover:text-forest text-sm font-semibold transition-all">
              Success
            </button>
            <button className="px-6 py-2 rounded-md text-charcoal/60 hover:text-forest text-sm font-semibold transition-all">
              Canceled
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40">
                calendar_month
              </span>
              <input
                className="pl-10 pr-4 py-2 bg-background-light border-none rounded-lg text-sm font-medium focus:ring-2 focus:ring-primary w-64"
                placeholder="May 2026 - June 2026"
                type="text"
              />
            </div>
          </div>
        </section>

        {/* Transaction List Table */}
        <div className="bg-white rounded-xl shadow-sm border border-forest/5 overflow-hidden mb-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-forest/5 text-forest uppercase text-[11px] font-bold tracking-widest border-b border-forest/10">
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Activity Name</th>
                <th className="px-6 py-4">Total Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-forest/5 text-sm">
              {transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="hover:bg-background-light/50 transition-colors"
                >
                  <td className="px-6 py-5 font-bold text-forest">
                    {transaction.id}
                  </td>
                  <td className="px-6 py-5 text-charcoal/70">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-5 font-semibold text-charcoal">
                    {transaction.activityName}
                  </td>
                  <td className="px-6 py-5 font-bold text-forest">
                    {transaction.totalPrice}
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`px-3 py-1.5 rounded-full text-[11px] font-extrabold uppercase tracking-wide ${
                        transaction.statusColor === "green"
                          ? "bg-green-100 text-green-700"
                          : transaction.statusColor === "yellow"
                            ? "bg-primary/20 text-primary-700 border border-primary/20"
                            : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <button className="text-primary font-bold hover:underline">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detail Breakdown Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Transaction Detail Card */}
          <div className="bg-white rounded-xl shadow-lg border border-primary/20 p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
                  Active Selection
                </span>
                <h3 className="text-2xl font-bold text-forest mt-1">
                  Order #TRV-88295 Detail
                </h3>
              </div>
              <span className="px-4 py-1.5 rounded-full bg-primary/20 text-primary font-bold text-xs uppercase">
                Pending Payment
              </span>
            </div>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-charcoal/60 font-medium">Base price</span>
                <span className="text-charcoal font-bold">$14,500.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-charcoal/60 font-medium">
                  Service fee
                </span>
                <span className="text-charcoal font-bold">$850.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-charcoal/60 font-medium">
                  Promo discount
                </span>
                <span className="text-red-500 font-bold">-$150.00</span>
              </div>
              <div className="border-t border-forest/5 pt-4 flex justify-between">
                <span className="text-forest font-extrabold">Total Price</span>
                <span className="text-xl font-extrabold text-forest">
                  $15,200.00
                </span>
              </div>
            </div>
            <div className="p-4 bg-background-light rounded-lg border border-forest/5 mb-8 flex items-center gap-4">
              <div className="w-12 h-8 bg-forest rounded flex items-center justify-center text-white font-bold text-[10px]">
                VISA
              </div>
              <div>
                <p className="text-[11px] font-bold text-charcoal/40 uppercase tracking-wider">
                  Payment Method
                </p>
                <p className="text-sm font-bold text-forest">
                  Visa Gold Corporate •••• 4421
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-forest text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-forest/90 transition-all text-sm">
                <span className="material-symbols-outlined text-lg">
                  cloud_upload
                </span>
                Upload Proof
              </button>
              <button className="bg-white border border-red-200 text-red-500 font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-red-50 transition-all text-sm">
                <span className="material-symbols-outlined text-lg">
                  cancel
                </span>
                Cancel Order
              </button>
            </div>
          </div>

          {/* Secondary Detail Section (Success Preview) */}
          <div className="bg-forest p-8 rounded-xl flex flex-col justify-between relative overflow-hidden">
            {/* Abstract Background Pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, #d4af35 1px, transparent 0)",
                backgroundSize: "24px 24px",
              }}
            ></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-2">
                Bali Private Villa
              </h3>
              <p className="text-primary/80 font-medium mb-6">
                Booking Confirmed • May 24, 2026
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-white/70">
                  <span className="material-symbols-outlined text-primary">
                    groups
                  </span>
                  <span className="text-sm font-medium">
                    4 Adults, 2 Children
                  </span>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <span className="material-symbols-outlined text-primary">
                    flight_takeoff
                  </span>
                  <span className="text-sm font-medium">
                    Private Airport Pickup Included
                  </span>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <span className="material-symbols-outlined text-primary">
                    concierge
                  </span>
                  <span className="text-sm font-medium">
                    24/7 Personal Butler Service
                  </span>
                </div>
              </div>
            </div>
            <div className="relative z-10">
              <button className="w-full bg-primary text-forest font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-black/40">
                <span className="material-symbols-outlined">
                  confirmation_number
                </span>
                DOWNLOAD E-TICKET
              </button>
              <p className="text-center text-white/40 text-[10px] uppercase font-bold tracking-[0.2em] mt-4">
                Required at Check-in
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
