import AdminCrudForm from "@/components/admin/AdminCrudForm";

export default function NewTransactionPage() {
  return (
    <AdminCrudForm
      activeNav="transactions"
      title="Add Manual Transaction"
      subtitle="Input transaction details for manual reconciliation."
      backHref="/admin/transactions"
      saveLabel="Save Transaction"
      fields={[
        { label: "Invoice ID", placeholder: "#TRV-2025-001" },
        { label: "Customer Name", placeholder: "Julian De Silva" },
        { label: "Customer Email", placeholder: "julian@villas.com" },
        { label: "Activity Name", placeholder: "Private Safari Villa" },
        { label: "Total Payment", placeholder: "$2,450.00" },
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
