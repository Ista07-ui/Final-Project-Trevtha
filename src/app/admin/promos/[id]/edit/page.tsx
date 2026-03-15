import AdminCrudForm from "@/components/admin/AdminCrudForm";

export default function EditPromoPage() {
  return (
    <AdminCrudForm
      activeNav="promos"
      title="Edit Promo"
      subtitle="Modify promo details, period, and status."
      backHref="/admin/promos"
      saveLabel="Update Promo"
      fields={[
        { label: "Promo Title", placeholder: "Summer Escape 2026" },
        { label: "Image URL", placeholder: "https://..." },
        { label: "Promo Code", placeholder: "SUMMER24" },
        {
          label: "Discount Value",
          type: "number",
          placeholder: "50000",
        },
        {
          label: "Minimum Purchase",
          type: "number",
          placeholder: "250000",
        },
        {
          label: "Terms Condition",
          textarea: true,
          placeholder: "Update promo terms and conditions",
        },
        {
          label: "Description",
          textarea: true,
          placeholder: "Update campaign description",
        },
      ]}
    />
  );
}
