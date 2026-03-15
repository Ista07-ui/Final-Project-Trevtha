"use client";

import UserDashboardHeader from "@/components/user/UserDashboardHeader";
import { useEffect, useMemo, useState } from "react";
import transactionService, {
  type Transaction,
} from "@/lib/services/transaction";

type FilterStatus = "all" | "pending" | "success" | "cancelled" | "failed";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    string | null
  >(null);
  const [activeFilter, setActiveFilter] = useState<FilterStatus>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTransactions = async () => {
    setIsLoading(true);
    setError(null);

    const result = await transactionService.getMyTransactions();

    if (!result.success || !result.data) {
      setError(result.message || "Failed to load transactions");
      setTransactions([]);
      setIsLoading(false);
      return;
    }

    setTransactions(result.data);
    setSelectedTransactionId(
      (current) => current ?? result.data[0]?.id ?? null,
    );
    setIsLoading(false);
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const filteredTransactions = useMemo(() => {
    if (activeFilter === "all") {
      return transactions;
    }

    return transactions.filter(
      (transaction) => transaction.status === activeFilter,
    );
  }, [activeFilter, transactions]);

  const selectedTransaction =
    transactions.find(
      (transaction) => transaction.id === selectedTransactionId,
    ) ??
    filteredTransactions[0] ??
    null;

  const handleUploadProof = async () => {
    if (!selectedTransaction) {
      return;
    }

    const proofPaymentUrl = window.prompt(
      "Masukkan URL bukti pembayaran:",
      selectedTransaction.proofPaymentUrl ||
        "https://example.com/proof-payment.jpg",
    );

    if (!proofPaymentUrl) {
      return;
    }

    setIsSubmitting(true);
    const result = await transactionService.uploadPaymentProof(
      selectedTransaction.id,
      proofPaymentUrl,
    );

    if (!result.success) {
      setError(result.message || "Failed to upload payment proof");
      setIsSubmitting(false);
      return;
    }

    await loadTransactions();
    setIsSubmitting(false);
  };

  const handleCancelTransaction = async () => {
    if (!selectedTransaction) {
      return;
    }

    const confirmed = window.confirm("Batalkan transaksi ini?");
    if (!confirmed) {
      return;
    }

    setIsSubmitting(true);
    const result = await transactionService.cancelTransaction(
      selectedTransaction.id,
    );

    if (!result.success) {
      setError(result.message || "Failed to cancel transaction");
      setIsSubmitting(false);
      return;
    }

    await loadTransactions();
    setIsSubmitting(false);
  };

  const getStatusClass = (status: Transaction["status"]) => {
    if (status === "success") return "bg-green-100 text-green-700";
    if (status === "pending")
      return "bg-primary/20 text-primary border border-primary/20";
    if (status === "cancelled") return "bg-slate-100 text-slate-500";
    return "bg-red-100 text-red-600";
  };

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
            <button
              onClick={loadTransactions}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-forest/10 rounded-lg text-sm font-semibold hover:bg-forest hover:text-white transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-xl">refresh</span>
              Refresh Data
            </button>
          </div>
        </header>

        {error ? (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        ) : null}

        {/* Filters Section */}
        <section className="mb-8 bg-white p-4 rounded-xl shadow-sm border border-forest/5 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center bg-background-light p-1 rounded-lg">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${activeFilter === "all" ? "bg-forest text-white" : "text-charcoal/60 hover:text-forest"}`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter("pending")}
              className={`px-6 py-2 rounded-md text-sm font-semibold transition-all ${activeFilter === "pending" ? "bg-forest text-white" : "text-charcoal/60 hover:text-forest"}`}
            >
              Pending
            </button>
            <button
              onClick={() => setActiveFilter("success")}
              className={`px-6 py-2 rounded-md text-sm font-semibold transition-all ${activeFilter === "success" ? "bg-forest text-white" : "text-charcoal/60 hover:text-forest"}`}
            >
              Success
            </button>
            <button
              onClick={() => setActiveFilter("cancelled")}
              className={`px-6 py-2 rounded-md text-sm font-semibold transition-all ${activeFilter === "cancelled" ? "bg-forest text-white" : "text-charcoal/60 hover:text-forest"}`}
            >
              Cancelled
            </button>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm font-medium text-charcoal/50">
              Total transaksi: {filteredTransactions.length}
            </p>
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
              {isLoading ? (
                <tr>
                  <td
                    className="px-6 py-8 text-center text-charcoal/60"
                    colSpan={6}
                  >
                    Loading transactions...
                  </td>
                </tr>
              ) : filteredTransactions.length === 0 ? (
                <tr>
                  <td
                    className="px-6 py-8 text-center text-charcoal/60"
                    colSpan={6}
                  >
                    Belum ada transaksi.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className={`hover:bg-background-light/50 transition-colors cursor-pointer ${selectedTransaction?.id === transaction.id ? "bg-background-light/60" : ""}`}
                    onClick={() => setSelectedTransactionId(transaction.id)}
                  >
                    <td className="px-6 py-5 font-bold text-forest">
                      {transaction.invoiceId || transaction.id}
                    </td>
                    <td className="px-6 py-5 text-charcoal/70">
                      {new Date(
                        transaction.orderDate || transaction.createdAt,
                      ).toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-6 py-5 font-semibold text-charcoal">
                      {transaction.transaction_items?.[0]?.title || "-"}
                    </td>
                    <td className="px-6 py-5 font-bold text-forest">
                      IDR{" "}
                      {Number(transaction.totalAmount).toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`px-3 py-1.5 rounded-full text-[11px] font-extrabold uppercase tracking-wide ${getStatusClass(transaction.status)}`}
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
                ))
              )}
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
                  {selectedTransaction?.invoiceId || "No transaction selected"}
                </h3>
              </div>
              <span
                className={`px-4 py-1.5 rounded-full font-bold text-xs uppercase ${selectedTransaction ? getStatusClass(selectedTransaction.status) : "bg-slate-100 text-slate-500"}`}
              >
                {selectedTransaction?.status || "No Data"}
              </span>
            </div>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-charcoal/60 font-medium">Order date</span>
                <span className="text-charcoal font-bold">
                  {selectedTransaction
                    ? new Date(
                        selectedTransaction.orderDate ||
                          selectedTransaction.createdAt,
                      ).toLocaleString("id-ID")
                    : "-"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-charcoal/60 font-medium">
                  Expired date
                </span>
                <span className="text-charcoal font-bold">
                  {selectedTransaction?.expiredDate
                    ? new Date(selectedTransaction.expiredDate).toLocaleString(
                        "id-ID",
                      )
                    : "-"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-charcoal/60 font-medium">Items</span>
                <span className="text-charcoal font-bold">
                  {selectedTransaction?.transaction_items?.length || 0}
                </span>
              </div>
              <div className="border-t border-forest/5 pt-4 flex justify-between">
                <span className="text-forest font-extrabold">Total Price</span>
                <span className="text-xl font-extrabold text-forest">
                  {selectedTransaction
                    ? `IDR ${Number(selectedTransaction.totalAmount).toLocaleString("id-ID")}`
                    : "-"}
                </span>
              </div>
            </div>
            <div className="p-4 bg-background-light rounded-lg border border-forest/5 mb-8 flex items-center gap-4">
              <div className="w-12 h-8 bg-forest rounded flex items-center justify-center text-white font-bold text-[10px]">
                {selectedTransaction?.payment_method?.name
                  ?.slice(0, 4)
                  .toUpperCase() || "PAY"}
              </div>
              <div>
                <p className="text-[11px] font-bold text-charcoal/40 uppercase tracking-wider">
                  Payment Method
                </p>
                <p className="text-sm font-bold text-forest">
                  {selectedTransaction?.payment_method?.name || "-"} •{" "}
                  {selectedTransaction?.payment_method
                    ?.virtual_account_number ||
                    selectedTransaction?.paymentMethodId ||
                    "-"}
                </p>
              </div>
            </div>
            <div className="mb-8 rounded-lg border border-forest/10 bg-background-light/70 p-4">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-charcoal/40">
                Activities
              </p>
              <div className="space-y-3">
                {selectedTransaction?.transaction_items?.length ? (
                  selectedTransaction.transaction_items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-4 text-sm"
                    >
                      <div>
                        <p className="font-bold text-forest">{item.title}</p>
                        <p className="text-charcoal/60">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-charcoal">
                        IDR {Number(item.price).toLocaleString("id-ID")}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-charcoal/60">
                    Tidak ada detail item.
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleUploadProof}
                disabled={!selectedTransaction || isSubmitting}
                className="bg-forest text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-forest/90 transition-all text-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined text-lg">
                  cloud_upload
                </span>
                {isSubmitting ? "Processing..." : "Upload Proof"}
              </button>
              <button
                onClick={handleCancelTransaction}
                disabled={
                  !selectedTransaction ||
                  isSubmitting ||
                  selectedTransaction?.status !== "pending"
                }
                className="bg-white border border-red-200 text-red-500 font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-red-50 transition-all text-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
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
                {selectedTransaction?.transaction_items?.[0]?.title ||
                  "No active booking"}
              </h3>
              <p className="text-primary/80 font-medium mb-6">
                {selectedTransaction
                  ? `${selectedTransaction.status.toUpperCase()} • ${new Date(selectedTransaction.orderDate || selectedTransaction.createdAt).toLocaleDateString("id-ID")}`
                  : "No transaction selected"}
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-white/70">
                  <span className="material-symbols-outlined text-primary">
                    groups
                  </span>
                  <span className="text-sm font-medium">
                    {selectedTransaction?.transaction_items?.reduce(
                      (sum, item) => sum + item.quantity,
                      0,
                    ) || 0}{" "}
                    Travelers
                  </span>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <span className="material-symbols-outlined text-primary">
                    payments
                  </span>
                  <span className="text-sm font-medium">
                    {selectedTransaction?.payment_method?.name ||
                      "Payment method unavailable"}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <span className="material-symbols-outlined text-primary">
                    receipt_long
                  </span>
                  <span className="text-sm font-medium">
                    {selectedTransaction?.proofPaymentUrl
                      ? "Proof uploaded"
                      : "Waiting for payment proof"}
                  </span>
                </div>
              </div>
            </div>
            <div className="relative z-10">
              <button
                onClick={loadTransactions}
                className="w-full bg-primary text-forest font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-black/40"
              >
                <span className="material-symbols-outlined">sync</span>
                REFRESH TRANSACTIONS
              </button>
              <p className="text-center text-white/40 text-[10px] uppercase font-bold tracking-[0.2em] mt-4">
                Synced from live API
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
