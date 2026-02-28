import AdminCrudForm from "@/components/admin/AdminCrudForm";

export default function NewPaymentMethodPage() {
  return (
    <AdminCrudForm
      activeNav="payments"
      title="Add Payment Method"
      subtitle="Register a new payment gateway for checkout."
      backHref="/admin/payment-methods"
      saveLabel="Save Method"
      fields={[
        { label: "Method Name", placeholder: "BCA Virtual Account" },
        {
          label: "Gateway Type",
          options: [
            "Automatic Settlement",
            "E-Wallet Gateway",
            "Credit/Debit Gateway",
          ],
        },
        { label: "Account / ID", placeholder: "8801234567" },
        { label: "Account Name", placeholder: "Main Corp Account" },
        { label: "Logo URL", placeholder: "https://..." },
        { label: "Status", options: ["Active", "Maintenance", "Inactive"] },
      ]}
    />
  );
}
