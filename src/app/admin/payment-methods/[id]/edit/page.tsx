import AdminCrudForm from "@/components/admin/AdminCrudForm";

export default function EditPaymentMethodPage() {
  return (
    <AdminCrudForm
      activeNav="payments"
      title="Edit Payment Method"
      subtitle="Update gateway account info and operational status."
      backHref="/admin/payment-methods"
      saveLabel="Update Method"
      fields={[
        { label: "Method Name", placeholder: "OVO" },
        {
          label: "Gateway Type",
          options: [
            "Automatic Settlement",
            "E-Wallet Gateway",
            "Credit/Debit Gateway",
          ],
        },
        { label: "Account / ID", placeholder: "08123456789" },
        { label: "Account Name", placeholder: "OVO Business" },
        { label: "Logo URL", placeholder: "https://..." },
        { label: "Status", options: ["Active", "Maintenance", "Inactive"] },
      ]}
    />
  );
}
