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
        { label: "Promo Title", placeholder: "Trevtha Golden Escape" },
        { label: "Image URL", placeholder: "https://..." },
        { label: "Promo Code", placeholder: "TREVTHAGOLD2025" },
        {
          label: "Discount Value",
          type: "number",
          placeholder: "50000",
        },
        {
          label: "Minimum Purchase",
          type: "number",
          placeholder: "500000",
        },
        {
          label: "Terms Condition",
          textarea: true,
          placeholder: "Valid on selected activities only",
        },
        {
          label: "Description",
          textarea: true,
          placeholder: "Describe this promo campaign",
        },
      ]}
    />
  );
}
