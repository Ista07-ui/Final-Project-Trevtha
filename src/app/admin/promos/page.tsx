"use client";

import AdminShell from "@/components/admin/AdminShell";
import Link from "next/link";
import { useState } from "react";
import {
  deleteStoredAdminRecord,
  getStoredValue,
  useStoredAdminRecords,
} from "@/hooks/admin/useStoredAdminRecords";

const promos = [
  {
    id: 1,
    code: "TREVTHAGOLD2026",
    type: "Percentage 20%",
    min: "Rp 500.000",
    validity: "Jan 1 - Dec 31, 2026",
    status: "Active",
    statusClass: "bg-green-100 text-green-700 border-green-200",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBHNEpil8pDwHEMwOTBH1kQnHpqi9hZeLlwGi9Ozaw0zTcFaoU5H5asN3Fr39Zxl9C_glVxv0luLodQophLFHpXw91fMfRzq-gsYPy65xLPTYdYu78YgZKn4QjeLBwQscgX8eHQZPJu2rQQP5hBx4BQf3mE946FTCPAEbwG7zCEuQqmCxPuPVLeYe8_E_gzcpTPJ_rcHTgG1PCRdpiKq_7vM193UaD0HBUpdzCtpBMLwNyehTqrdHwPy4TrzkJWqeAW6lzA5lrIZ8gh",
  },
  {
    id: 2,
    code: "SUMMER24",
    type: "Fixed Rp 50.000",
    min: "Rp 250.000",
    validity: "Jun 1 - Aug 31, 2026",
    status: "Upcoming",
    statusClass: "bg-blue-100 text-blue-700 border-blue-200",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAOboWVKP3_-MGkpVC-hsUmEpv5w3pET6Sv_jbbIUcmbQYnSN0oJpFEXLvnSIKE3pInjRC6A6GA5htlHlSnuJhNSV2ROOgGgqgmBc7cTFnqVw-pE0baBgauBw_acqCuFAc2tN3rw19_LZQPnBQo_gnO4yC9etI5_cXrzgARXysr9mkb7Zhoz7zWpu8625akkSlHQm3rn5irJNf8QY17h216UrMNIWVsEnKNeTwd5kwTntTX9CZQ3JlKvQva1hm-yKv1ln0WZrz9cqPl",
  },
  {
    id: 3,
    code: "WINTER23",
    type: "Percentage 15%",
    min: "Rp 1.000.000",
    validity: "Nov 1 - Dec 31, 2023",
    status: "Expired",
    statusClass: "bg-slate-100 text-slate-600 border-slate-200",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAAmuIpHAyI-83cHWs6UP78ay7uuJmzTQfSOz_lU2U0hY-yNEmXw_kTSNr78KlmR-_gTP2pG90nSM92LjVhY2xge2ucOmqo_k3XI_O7yZAJ3f9mxlfvbQjIkb8tnm34QswMk_UEHYDn2Kc_tK0C0zZKYV16ojLPfLSOtGoiqfTGdRC4xTJG_cY-_C_O9qPG5oQrhDSHl0J2sIAAg-IXOgbU1wzky9IaTaeVeeMpnTV6kSvkIBoF6JrZP4O7qh1s1ySVrx9S9QiT85ua",
  },
  {
    id: 4,
    code: "WELCOMEGOLD",
    type: "Fixed Rp 100.000",
    min: "Rp 0",
    validity: "Jan 1 - Dec 31, 2026",
    status: "Active",
    statusClass: "bg-green-100 text-green-700 border-green-200",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBOegLP02J6899CMatjkFl9qhw0rSthfi_K0mZkmMkAoDEeCVUwoW6UTtuEWvo0jDIBK_cOa0NLzNbsoy5tZV5LGTNvkBg3C8pW08wFiBSkgGQmpwY41-l8io0QxAVgPHRbI5jn0CPL0g2C6JlETvkOojNu3tOu1qT_k58an5HgNvDqz4S3tadgxnPsSRiiCawYkHIM0JJxWJeLY1VXUUvv3KFw-uTQTHhvh_5-HM7GEx82QupXaYYE1EznBvp6iVQCj1jhNXsTJK1V",
  },
];

export default function ManagePromosPage() {
  const [deleteKey, setDeleteKey] = useState(0);
  const storedRecords = useStoredAdminRecords("promos");

  const handleDeleteRecord = (formId: string) => {
    deleteStoredAdminRecord("promos", formId);
    setDeleteKey((prev) => prev + 1);
  };

  return (
    <AdminShell activeNav="promos">
      <div className="p-8 min-h-screen">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Manage Promos
            </h2>
            <p className="text-slate-500 mt-1">
              Configure and monitor all discount campaigns.
            </p>
          </div>
          <Link
            href="/admin/promos/new"
            className="flex items-center gap-2 px-6 py-3 bg-gold text-forest rounded-xl font-bold shadow-md hover:brightness-110 transition-all"
          >
            <span className="material-symbols-outlined text-xl">add</span>
            <span>Add New Promo</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-slate-500 text-sm font-medium">Active Promos</p>
            <h3 className="text-2xl font-bold mt-1">12</h3>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-slate-500 text-sm font-medium">
              Scheduled Campaigns
            </p>
            <h3 className="text-2xl font-bold mt-1 text-blue-600">4</h3>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-slate-500 text-sm font-medium">
              Redemption Rate
            </p>
            <h3 className="text-2xl font-bold mt-1 text-gold">24.8%</h3>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Thumbnail
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Promo Code
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Discount Type
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Min. Purchase
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Validity Period
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-center">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {storedRecords.map((record) => (
                  <tr
                    key={`stored-${record.id}`}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="h-12 w-20 rounded-lg border border-slate-200 bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">
                        Custom
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono font-bold text-slate-900">
                        {getStoredValue(record.values, ["promo_code"])}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {getStoredValue(record.values, ["discount_type"])}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {getStoredValue(record.values, ["minimum_purchase"])}
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-sm">
                      Custom period
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <span className="px-3 py-1 text-xs font-bold rounded-full border bg-gold/15 text-forest border-gold/20">
                          {getStoredValue(record.values, ["status"], "Active")}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/promos/${record.formId}/edit`}
                          className="p-2 text-gold hover:bg-gold/10 rounded-lg"
                        >
                          <span className="material-symbols-outlined">
                            edit
                          </span>
                        </Link>
                        <button
                          onClick={() => handleDeleteRecord(record.formId)}
                          className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
                        >
                          <span className="material-symbols-outlined">
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {promos.map((promo) => (
                  <tr
                    key={promo.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div
                        className="h-12 w-20 rounded-lg bg-cover bg-center border border-slate-200"
                        style={{ backgroundImage: `url('${promo.image}')` }}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono font-bold text-slate-900">
                        {promo.code}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{promo.type}</td>
                    <td className="px-6 py-4 text-slate-600">{promo.min}</td>
                    <td className="px-6 py-4 text-slate-600 text-sm">
                      {promo.validity}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <span
                          className={`px-3 py-1 text-xs font-bold rounded-full border ${promo.statusClass}`}
                        >
                          {promo.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/promos/${promo.id}/edit`}
                          className="p-2 text-gold hover:bg-gold/10 rounded-lg"
                        >
                          <span className="material-symbols-outlined">
                            edit
                          </span>
                        </Link>
                        <button className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-lg">
                          <span className="material-symbols-outlined">
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 flex items-center justify-between border-t border-slate-200">
            <p className="text-sm text-slate-500">
              Showing 1 to 4 of 24 results
            </p>
            <div className="flex gap-1">
              <button className="flex size-9 items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="flex size-9 items-center justify-center rounded-lg bg-gold text-forest font-bold">
                1
              </button>
              <button className="flex size-9 items-center justify-center rounded-lg hover:bg-slate-100">
                2
              </button>
              <button className="flex size-9 items-center justify-center rounded-lg hover:bg-slate-100">
                3
              </button>
              <button className="flex size-9 items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
