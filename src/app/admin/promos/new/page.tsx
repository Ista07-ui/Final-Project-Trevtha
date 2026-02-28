import AdminCrudForm from "@/components/admin/AdminCrudForm";

export default function NewPromoPage() {
  return (
    <AdminCrudForm
      activeNav="promos"
      title="Add New Promo"
      subtitle="Create a new discount campaign for users."
      backHref="/admin/promos"
      saveLabel="Save Promo"
      fields={[
        { label: "Promo Code", placeholder: "TREVTHAGOLD2025" },
        { label: "Discount Type", options: ["Percentage", "Fixed Amount"] },
        { label: "Discount Value", placeholder: "20% or Rp 50.000" },
        { label: "Minimum Purchase", placeholder: "Rp 500.000" },
        { label: "Start Date", type: "date" },
        { label: "End Date", type: "date" },
        { label: "Status", options: ["Active", "Upcoming", "Expired"] },
        {
          label: "Promo Notes",
          textarea: true,
          placeholder: "Optional campaign notes",
        },
      ]}
    />
  );
}
