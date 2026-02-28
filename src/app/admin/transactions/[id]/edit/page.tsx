import AdminCrudForm from "@/components/admin/AdminCrudForm";

export default function EditTransactionPage() {
  return (
    <AdminCrudForm
      activeNav="transactions"
      title="Edit Transaction"
      subtitle="Review and update transaction verification status."
      backHref="/admin/transactions"
      saveLabel="Update Transaction"
      fields={[
        { label: "Invoice ID", placeholder: "#TRV-2026-002" },
        { label: "Customer Name", placeholder: "Marcus Aurelius" },
        { label: "Customer Email", placeholder: "m.aurelius@luxury.it" },
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
