"use client";

import AdminCrudForm from "@/components/admin/AdminCrudForm";
import { useSearchParams } from "next/navigation";

export default function EditTransactionPage() {
  const searchParams = useSearchParams();
  const invoiceId = searchParams.get("invoiceId") || "#TRV-2026-002";
  const userId = searchParams.get("userId") || "-";
  const customerName = searchParams.get("customerName") || "Marcus Aurelius";
  const customerMeta = searchParams.get("customerMeta") || "m.aurelius@luxury.it";

  return (
    <AdminCrudForm
      activeNav="transactions"
      title="Edit Transaction"
      subtitle="Review and update transaction verification status."
      backHref="/admin/transactions"
      saveLabel="Update Transaction"
      fields={[
        { label: "Invoice ID", placeholder: invoiceId },
        { label: "User ID", placeholder: userId },
        { label: "Customer Name", placeholder: customerName },
        { label: "Customer Email", placeholder: customerMeta },
        { label: "Activity Name", placeholder: "Yacht Charter Amalfi" },
        { label: "Total Payment", placeholder: "$12,800.00" },
        {
          label: "Payment Method",
          options: ["Visa", "Transfer", "E-wallet", "Crypto"],
        },
        { label: "Date", type: "date" },
        {
          label: "Status",
          options: ["Success", "Pending", "Failed", "Canceled"],
        },
      ]}
    />
  );
}
