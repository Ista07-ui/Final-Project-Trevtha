"use client";

import AdminShell from "@/components/admin/AdminShell";
import {
  deleteStoredAdminRecord,
  getStoredValue,
  readStoredAdminRecords,
} from "@/hooks/admin/useStoredAdminRecords";
import paymentService, { type PaymentCard } from "@/lib/services/payment";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function ManagePaymentMethodsPage() {
  const [methods, setMethods] = useState<PaymentCard[]>([]);
  const [storedRecords, setStoredRecords] = useState(() =>
    readStoredAdminRecords().filter(
      (item) => item.section === "payment-methods",
    ),
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  const loadMethods = async () => {
    setIsLoading(true);
    const data = await paymentService.getAllPaymentMethods();
    setMethods(data);
    setIsLoading(false);
  };

  const refreshStoredRecords = () => {
    setStoredRecords(
      readStoredAdminRecords().filter(
        (item) => item.section === "payment-methods",
      ),
    );
  };

  useEffect(() => {
    const initialize = async () => {
      refreshStoredRecords();
      await loadMethods();
    };

    void initialize();
  }, []);

  const handleDeleteRecord = (formId: string) => {
    deleteStoredAdminRecord("payment-methods", formId);
    refreshStoredRecords();
  };

  const handleGenerateMethods = async () => {
    setIsGenerating(true);
    await paymentService.addPaymentMethod({
      cardType: "visa",
      cardNumber: "4111111111111111",
      expiryDate: "12/30",
      cardholderName: "Admin Finance",
      cvv: "123",
      isDefault: true,
    });
    await loadMethods();
    setIsGenerating(false);
  };

  const featured = methods[0] ?? null;
  const totalMethods = methods.length;
  const totalActive = useMemo(
    () => methods.filter((method) => method.status !== "inactive").length,
    [methods],
  );

  let methodRows: React.ReactNode;

  if (isLoading) {
    methodRows = (
      <tr>
        <td className="px-6 py-8 text-center text-slate-500" colSpan={6}>
          Loading payment methods...
        </td>
      </tr>
    );
  } else if (methods.length === 0) {
    methodRows = (
      <tr>
        <td className="px-6 py-8 text-center text-slate-500" colSpan={6}>
          No payment methods found.
        </td>
      </tr>
    );
  } else {
    methodRows = methods.map((method) => (
      <tr key={method.id} className="transition-colors hover:bg-slate-50/50">
        <td className="px-6 py-5">
          <div className="flex size-12 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
            {method.imageUrl ? (
              <div
                className="size-10 bg-cover bg-center object-contain"
                style={{ backgroundImage: `url('${method.imageUrl}')` }}
              />
            ) : (
              <span className="text-[10px] font-bold text-slate-500">PAY</span>
            )}
          </div>
        </td>
        <td className="px-6 py-5">
          <p className="font-bold text-slate-800">{method.name}</p>
          <p className="text-[11px] font-medium text-slate-400">API method</p>
        </td>
        <td className="px-6 py-5 font-mono text-sm text-slate-600">
          {method.virtual_account_number || method.id}
        </td>
        <td className="px-6 py-5 text-sm text-slate-600">
          {method.virtual_account_name || "dibimbing"}
        </td>
        <td className="px-6 py-5">
          <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-700">
            {method.status || "active"}
          </span>
        </td>
        <td className="px-6 py-5">
          <div className="flex items-center justify-center gap-3">
            <button className="flex size-9 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:border-gold hover:text-gold">
              <span className="material-symbols-outlined text-lg">
                visibility
              </span>
            </button>
          </div>
        </td>
      </tr>
    ));
  }

  return (
    <AdminShell activeNav="payments">
      <div className="mx-auto w-full max-w-350 p-10">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900">
              Payment Method Management
            </h2>
            <p className="mt-2 text-lg text-slate-500">
              Configure and manage payment gateways for customer checkout.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={loadMethods}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 font-bold text-slate-700"
            >
              <span className="material-symbols-outlined">refresh</span>
              <span>Refresh</span>
            </button>
            <button
              onClick={handleGenerateMethods}
              disabled={isGenerating}
              className="flex items-center gap-2 rounded-xl bg-gold px-6 py-3 font-bold text-white shadow-lg shadow-gold/20 disabled:opacity-60 hover:bg-gold/90"
            >
              <span className="material-symbols-outlined">add_circle</span>
              <span>{isGenerating ? "Generating..." : "Generate Methods"}</span>
            </button>
            <Link
              href="/admin/payment-methods/new"
              className="flex items-center gap-2 rounded-xl bg-gold px-6 py-3 font-bold text-white shadow-lg shadow-gold/20 hover:bg-gold/90"
            >
              <span className="material-symbols-outlined">edit</span>
              <span>Custom Form</span>
            </Link>
          </div>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="flex items-center gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex size-14 items-center justify-center rounded-xl bg-forest/5 text-forest">
              <span className="material-symbols-outlined text-3xl">
                account_balance_wallet
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Methods
              </p>
              <p className="text-2xl font-black text-slate-900">
                {totalMethods}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex size-14 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <span className="material-symbols-outlined text-3xl">
                verified
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Available</p>
              <p className="text-2xl font-black text-emerald-600">
                {totalActive}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex size-14 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <span className="material-symbols-outlined text-3xl">
                featured_seasonal_and_gifts
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Featured</p>
              <p className="text-lg font-black text-slate-900">
                {featured?.name || "-"}
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                    Logo
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                    Method Name
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                    Account / ID
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                    Account Name
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-widest text-slate-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {storedRecords.map((record) => (
                  <tr
                    key={`stored-${record.id}`}
                    className="transition-colors hover:bg-slate-50/50"
                  >
                    <td className="px-6 py-5">
                      <div className="flex size-12 items-center justify-center rounded-lg border border-slate-200 bg-slate-100 text-[10px] font-bold text-slate-500">
                        New
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <p className="font-bold text-slate-800">
                        {getStoredValue(record.values, ["method_name", "name"])}
                      </p>
                      <p className="text-[11px] font-medium text-slate-400">
                        local record
                      </p>
                    </td>
                    <td className="px-6 py-5 font-mono text-sm text-slate-600">
                      {getStoredValue(record.values, [
                        "account_id",
                        "virtual_account_number",
                      ])}
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-600">
                      {getStoredValue(record.values, [
                        "account_name",
                        "virtual_account_name",
                      ])}
                    </td>
                    <td className="px-6 py-5">
                      <span className="inline-flex items-center rounded-full bg-gold/15 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-forest">
                        {getStoredValue(record.values, ["status"], "Active")}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center gap-3">
                        <Link
                          href={`/admin/payment-methods/${record.formId}/edit`}
                          className="flex size-9 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:border-gold hover:text-gold"
                        >
                          <span className="material-symbols-outlined text-lg">
                            edit
                          </span>
                        </Link>
                        <button
                          onClick={() => handleDeleteRecord(record.formId)}
                          className="flex size-9 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition-colors hover:border-rose-500 hover:text-rose-500"
                        >
                          <span className="material-symbols-outlined text-lg">
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {methodRows}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50/50 p-6">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Showing {methods.length} API methods + {storedRecords.length}{" "}
              local records
            </p>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
