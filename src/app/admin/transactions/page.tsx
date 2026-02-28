"use client";

import AdminShell from "@/components/admin/AdminShell";
import Link from "next/link";
import { useState } from "react";
import {
  deleteStoredAdminRecord,
  getStoredValue,
  useStoredAdminRecords,
} from "@/hooks/admin/useStoredAdminRecords";

const transactions = [
  {
    id: "#TRV-2026-001",
    customer: "Julian De Silva",
    email: "julian@villas.com",
    initials: "JD",
    activity: "Private Safari Villa",
    amount: "$2,450.00",
    method: "Visa",
    date: "Oct 12, 2026",
    status: "Success",
    statusClass: "bg-emerald-50 text-emerald-700 border-emerald-100",
    dotClass: "bg-emerald-500",
  },
  {
    id: "#TRV-2026-002",
    customer: "Marcus Aurelius",
    email: "m.aurelius@luxury.it",
    initials: "MA",
    activity: "Yacht Charter Amalfi",
    amount: "$12,800.00",
    method: "Transfer",
    date: "Oct 13, 2026",
    status: "Pending",
    statusClass: "bg-amber-50 text-amber-700 border-amber-100",
    dotClass: "bg-amber-500",
  },
  {
    id: "#TRV-2026-003",
    customer: "Elena Laurent",
    email: "e.laurent@paris.fr",
    initials: "EL",
    activity: "Helicopter Tour Alps",
    amount: "$4,200.00",
    method: "E-wallet",
    date: "Oct 14, 2026",
    status: "Failed",
    statusClass: "bg-red-50 text-red-700 border-red-100",
    dotClass: "bg-red-500",
  },
  {
    id: "#TRV-2026-004",
    customer: "Satoshi Nakamoto",
    email: "genesis@block.com",
    initials: "SK",
    activity: "Island Retreat Bali",
    amount: "$8,900.00",
    method: "Crypto",
    date: "Oct 14, 2026",
    status: "Canceled",
    statusClass: "bg-gray-100 text-gray-700 border-gray-200",
    dotClass: "bg-gray-400",
  },
];

export default function ManageTransactionsPage() {
  const [deleteKey, setDeleteKey] = useState(0);
  const storedRecords = useStoredAdminRecords("transactions");

  const handleDeleteRecord = (formId: string) => {
    deleteStoredAdminRecord("transactions", formId);
    setDeleteKey((prev) => prev + 1);
  };

  return (
    <AdminShell activeNav="transactions">
      <div className="p-8">
        <div className="flex justify-between items-start mb-10">
          <div>
            <h2 className="text-3xl font-black text-charcoal tracking-tight">
              Manage Transactions
            </h2>
            <p className="text-charcoal/60 mt-1">
              Monitor and verify all customer orders with precision.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-forest/10 text-forest font-semibold rounded-xl hover:bg-forest/5">
              <span className="material-symbols-outlined">refresh</span>
            </button>
            <Link
              href="/admin/transactions/new"
              className="flex items-center gap-2 px-6 py-2.5 bg-gold text-cream font-bold rounded-xl border border-gold/20"
            >
              <span className="material-symbols-outlined">add</span>
              <span>Add Transaction</span>
            </Link>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-gold text-cream font-bold rounded-xl border border-gold/20">
              <span className="material-symbols-outlined">file_download</span>
              <span>Export Report</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-forest/5">
            <p className="text-charcoal/50 text-sm font-medium">Total Orders</p>
            <p className="text-2xl font-black text-charcoal mt-1">1,284</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-forest/5">
            <p className="text-charcoal/50 text-sm font-medium">
              Pending Verification
            </p>
            <p className="text-2xl font-black text-charcoal mt-1">42</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-forest/5">
            <p className="text-charcoal/50 text-sm font-medium">
              Successful Payments
            </p>
            <p className="text-2xl font-black text-charcoal mt-1">1,150</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-forest/5">
            <p className="text-charcoal/50 text-sm font-medium">
              Total Revenue
            </p>
            <p className="text-2xl font-black text-charcoal mt-1">$428,500</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-forest/5 mb-6">
          <div className="p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex border-b border-charcoal/5 lg:border-none">
              <button className="px-6 py-3 text-sm font-bold text-gold border-b-2 border-gold">
                All Transactions
              </button>
              <button className="px-6 py-3 text-sm font-medium text-charcoal/40">
                Pending
              </button>
              <button className="px-6 py-3 text-sm font-medium text-charcoal/40">
                Success
              </button>
              <button className="px-6 py-3 text-sm font-medium text-charcoal/40">
                Canceled
              </button>
            </div>
            <div className="relative flex-1 max-w-md">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40">
                search
              </span>
              <input
                className="w-full pl-12 pr-4 py-2.5 bg-cream border-none rounded-xl text-sm placeholder:text-charcoal/30"
                placeholder="Search by Invoice ID or User..."
                type="text"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-cream/50 text-charcoal/40 text-[11px] uppercase tracking-widest font-bold">
                  <th className="px-6 py-4">Invoice ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Activity</th>
                  <th className="px-6 py-4">Total Payment</th>
                  <th className="px-6 py-4">Method</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal/5">
                {storedRecords.map((record, index) => (
                  <tr
                    key={`stored-${record.id}`}
                    className="hover:bg-cream/30 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-bold text-charcoal">
                      NEW-{index + 1}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-forest/10 flex items-center justify-center text-forest font-bold text-xs">
                          N
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-charcoal">
                            {getStoredValue(record.values, ["customer_name"])}
                          </span>
                          <span className="text-[10px] text-charcoal/40">
                            {getStoredValue(
                              record.values,
                              ["customer_email"],
                              "-",
                            )}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-charcoal/80">
                      {getStoredValue(record.values, ["activity_name"], "-")}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-charcoal">
                      {getStoredValue(record.values, ["total_payment"], "-")}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm text-charcoal/60">
                          payments
                        </span>
                        <span className="text-xs text-charcoal/80">
                          {getStoredValue(
                            record.values,
                            ["payment_method"],
                            "-",
                          )}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-charcoal/60 font-medium">
                      {getStoredValue(record.values, ["date"], "-")}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border bg-gold/15 text-forest border-gold/20">
                        {getStoredValue(record.values, ["status"], "Pending")}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <Link
                          href={`/admin/transactions/${record.formId}/edit`}
                          className="p-1.5 text-charcoal/40 hover:text-gold"
                        >
                          <span className="material-symbols-outlined text-lg">
                            edit
                          </span>
                        </Link>
                        <button
                          onClick={() => handleDeleteRecord(record.formId)}
                          className="p-1.5 text-charcoal/40 hover:text-rose-500 transition-colors"
                        >
                          <span className="material-symbols-outlined text-lg">
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {transactions.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-cream/30 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-bold text-charcoal">
                      {item.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-forest/10 flex items-center justify-center text-forest font-bold text-xs">
                          {item.initials}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-charcoal">
                            {item.customer}
                          </span>
                          <span className="text-[10px] text-charcoal/40">
                            {item.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-charcoal/80">
                      {item.activity}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-charcoal">
                      {item.amount}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm text-charcoal/60">
                          payments
                        </span>
                        <span className="text-xs text-charcoal/80">
                          {item.method}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-charcoal/60 font-medium">
                      {item.date}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${item.statusClass}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${item.dotClass}`}
                        ></span>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <Link
                          href={`/admin/transactions/${item.id.replace("#TRV-2026-", "")}/edit`}
                          className="p-1.5 text-charcoal/40 hover:text-gold"
                        >
                          <span className="material-symbols-outlined text-lg">
                            visibility
                          </span>
                        </Link>
                        <button className="p-1.5 text-charcoal/40 hover:text-emerald-600">
                          <span className="material-symbols-outlined text-lg">
                            check_circle
                          </span>
                        </button>
                        <button className="p-1.5 text-charcoal/40 hover:text-red-600">
                          <span className="material-symbols-outlined text-lg">
                            cancel
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 border-t border-charcoal/5 flex justify-between items-center">
            <span className="text-xs text-charcoal/40 font-medium">
              Showing 1 to 4 of 1,284 transactions
            </span>
            <div className="flex gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-charcoal/5 text-charcoal/40">
                <span className="material-symbols-outlined text-sm">
                  chevron_left
                </span>
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-gold text-forest font-bold text-xs">
                1
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-charcoal/5 text-charcoal/60 text-xs">
                2
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-charcoal/5 text-charcoal/60 text-xs">
                3
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-charcoal/5 text-charcoal/40">
                <span className="material-symbols-outlined text-sm">
                  chevron_right
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
