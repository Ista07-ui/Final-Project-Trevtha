"use client";

import AdminShell from "@/components/admin/AdminShell";
import Link from "next/link";
import { useState } from "react";
import {
  deleteStoredAdminRecord,
  getStoredValue,
  useStoredAdminRecords,
} from "@/hooks/admin/useStoredAdminRecords";

const methods = [
  {
    id: 1,
    name: "BCA Virtual Account",
    type: "Automatic Settlement",
    account: "8801234567",
    accountName: "Main Corp Account",
    status: "Active",
    statusClass: "bg-emerald-100 text-emerald-700",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUpRKpHy5jPXlWZ2puZbyHmajQIt_eazY16qRQKSll8QG5_K-jJHRo7l4i0QV-iqKp3mHJvGYXz-IuwRG1jpWkY5Vmkt8_GOCz3NTGusnAdcvytF3FnfrD2fo1syBydwXmJdK7lBLV2Al8S3gp22ksLGTq5YmI88XpTDk4Mn7vAVQF2LBB3AH9gOt07hsfeWd3yjRu2k2i8Xc-26MAT1Wg9tnIrje_RFNqQL4nn1rWyPXIs202EQz8NsjfAeB73VeTfkvZs3e4TDxB",
  },
  {
    id: 2,
    name: "Mandiri VA",
    type: "Automatic Settlement",
    account: "9001122334",
    accountName: "Main Corp Account",
    status: "Active",
    statusClass: "bg-emerald-100 text-emerald-700",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9YLl5JV0C0SJhUgVg_JmLp43ILa57WqfQ_yERYyh8Z7435id9N09YrVOI4Fpg2GHd-rF1nQkkEdq4lGVUaefShRitllUTQCS8bqpIwFL9mnQf4NeZwx9E9mW0MWBCShILqKCiMWf2eDse1a2o3vpG_6BtQyYfB4Teu7oRfGdo9QrSeQzvsJDQhWstiX9YcKG72CZf7ozscZmP2stYEhkOyb0B1hYcEe_S-yycGlLYHLT9121nDzG5BtDZa-ni-EeEzihH0JqDhCm3",
  },
  {
    id: 3,
    name: "GoPay",
    type: "E-Wallet Gateway",
    account: "08123456789",
    accountName: "Gopay Business",
    status: "Active",
    statusClass: "bg-emerald-100 text-emerald-700",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1bH6FdAlsuCWum3fe2EvlZc9CuqPMgB1cuJik7ViVXGD5AYnqyJAp7Bvzn5Is4QEaa5UgDe0P33PE_uOIIBR0y-rqSZlNcXM3lsdt--EJzoksl6_osjIEsr0fGJzUQ45V8SkBw_sbMj6KUHVV6qZb9f4J7g8SsFU7LsGx2wt9VwAH0WcVTZazDNGJGDkI3yOlH1X7Vew6cF_LsVskpnzwbxRzyA6_zJeFPAfla-zc62Nw_FcirJOVC_YkWapXNRkC1sXr41N9jLnT",
  },
  {
    id: 4,
    name: "OVO",
    type: "E-Wallet Gateway",
    account: "08123456789",
    accountName: "OVO Business",
    status: "Maintenance",
    statusClass: "bg-amber-100 text-amber-700",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5WkhppZaTnTsp6oT7wn7ENpjNI5vurGwJpXJxYea9b_r5TZAKLMvPH667KDG_PVrG-OgRbhtwqpzBgH-oOFBjhPP3jUl2YukN0paCIP8EsckJ5iE_vuzzCAHG-KZo8siY_qfK0k7d51XcEMOuaKqQ0xb-ae1eWfRTAhH4NZr0wgB11yp_yvpfdprInu6kVcw-AGbx77DXlvd92qeieRoMiFvYkA2QybFnPRs4CDvvKEtKpesUPVU-4a_T1f18c3E65pg3JEiDYIdb",
  },
  {
    id: 5,
    name: "Visa/Mastercard",
    type: "Credit/Debit Gateway",
    account: "4111 XXXX",
    accountName: "Global Gateway",
    status: "Active",
    statusClass: "bg-emerald-100 text-emerald-700",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQw7XU1afdsG-z2KKjnQXlHFuqy1pwFW5_HwURGPb_z0GwptmInEDNfTFcgdbm5i1dvbzt9MEAIGRdb_exsaHDTZKtMlPViE645UJAPHzERWg4XoVLWusbXnquXhw7S-P_MC_SWCjbqqmNg_ln8vmtLVweav-FZKsCv60JK33_6NKICrKEwsAjXZ7lQb9CzX94vn-m5Jah-QpswUI3V7ae5Ko2t7sYJXT36QGuno1eUuaOMTyqJuiCYVJkGa9rEp2LJs6SBDOqwbTe",
  },
];

export default function ManagePaymentMethodsPage() {
  const [deleteKey, setDeleteKey] = useState(0);
  const storedRecords = useStoredAdminRecords("payment-methods");

  const handleDeleteRecord = (formId: string) => {
    deleteStoredAdminRecord("payment-methods", formId);
    setDeleteKey((prev) => prev + 1);
  };

  return (
    <AdminShell activeNav="payments">
      <div className="p-10 max-w-[1400px] mx-auto w-full">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Payment Method Management
            </h2>
            <p className="text-slate-500 mt-2 text-lg">
              Configure and manage payment gateways for customer checkout.
            </p>
          </div>
          <Link
            href="/admin/payment-methods/new"
            className="bg-gold hover:bg-gold/90 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-gold/20 flex items-center gap-2"
          >
            <span className="material-symbols-outlined">add_circle</span>Add New
            Method
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5">
            <div className="size-14 rounded-xl bg-forest/5 flex items-center justify-center text-forest">
              <span className="material-symbols-outlined text-3xl">
                account_balance_wallet
              </span>
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium">
                Total Methods
              </p>
              <p className="text-2xl font-black text-slate-900">8</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5">
            <div className="size-14 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <span className="material-symbols-outlined text-3xl">
                verified_user
              </span>
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium">Active</p>
              <p className="text-2xl font-black text-emerald-600">6</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5">
            <div className="size-14 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              <span className="material-symbols-outlined text-3xl">
                build_circle
              </span>
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium">Maintenance</p>
              <p className="text-2xl font-black text-amber-600">2</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Logo
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Method Name
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Account / ID
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Account Name
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {storedRecords.map((record) => (
                  <tr
                    key={`stored-${record.id}`}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-5">
                      <div className="size-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
                        New
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <p className="font-bold text-slate-800">
                        {getStoredValue(record.values, ["method_name"])}
                      </p>
                      <p className="text-[11px] text-slate-400 font-medium">
                        {getStoredValue(
                          record.values,
                          ["gateway_type"],
                          "Gateway",
                        )}
                      </p>
                    </td>
                    <td className="px-6 py-5 font-mono text-sm text-slate-600">
                      {getStoredValue(record.values, ["account_id"])}
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-600">
                      {getStoredValue(record.values, ["account_name"])}
                    </td>
                    <td className="px-6 py-5">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-gold/15 text-forest">
                        {getStoredValue(record.values, ["status"], "Active")}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center gap-3">
                        <Link
                          href={`/admin/payment-methods/${record.formId}/edit`}
                          className="size-9 rounded-lg border border-slate-200 text-slate-400 hover:text-gold hover:border-gold flex items-center justify-center"
                        >
                          <span className="material-symbols-outlined text-lg">
                            edit
                          </span>
                        </Link>
                        <button
                          onClick={() => handleDeleteRecord(record.formId)}
                          className="size-9 rounded-lg border border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-500 flex items-center justify-center transition-colors"
                        >
                          <span className="material-symbols-outlined text-lg">
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {methods.map((method) => (
                  <tr
                    key={method.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-5">
                      <div className="size-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
                        <div
                          className="size-10 object-contain bg-cover bg-center"
                          style={{ backgroundImage: `url('${method.logo}')` }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <p className="font-bold text-slate-800">{method.name}</p>
                      <p className="text-[11px] text-slate-400 font-medium">
                        {method.type}
                      </p>
                    </td>
                    <td className="px-6 py-5 font-mono text-sm text-slate-600">
                      {method.account}
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-600">
                      {method.accountName}
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${method.statusClass}`}
                      >
                        {method.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center gap-3">
                        <Link
                          href={`/admin/payment-methods/${method.id}/edit`}
                          className="size-9 rounded-lg border border-slate-200 text-slate-400 hover:text-gold hover:border-gold flex items-center justify-center"
                        >
                          <span className="material-symbols-outlined text-lg">
                            edit
                          </span>
                        </Link>
                        <button className="size-9 rounded-lg border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-500 flex items-center justify-center">
                          <span className="material-symbols-outlined text-lg">
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
          <div className="p-6 bg-slate-50/50 flex items-center justify-between border-t border-slate-200">
            <p className="text-xs font-medium text-slate-500 tracking-wide uppercase">
              Showing 5 of 8 methods
            </p>
            <div className="flex gap-2">
              <button
                className="px-4 py-2 text-xs font-bold text-slate-400 bg-white border border-slate-200 rounded-lg"
                disabled
              >
                Previous
              </button>
              <button className="px-4 py-2 text-xs font-bold text-slate-800 bg-white border border-slate-200 rounded-lg hover:border-gold">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
