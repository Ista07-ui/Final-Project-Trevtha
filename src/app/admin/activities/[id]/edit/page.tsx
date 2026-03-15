import AdminCrudForm from "@/components/admin/AdminCrudForm";

export default function EditActivityPage() {
  return (
    <AdminCrudForm
      activeNav="activities"
      title="Edit Activity"
      subtitle="Update activity information, pricing, and category mapping."
      backHref="/admin/activities"
      saveLabel="Update Activity"
      fields={[
        { label: "Activity Name", placeholder: "Mount Batur Sunrise Trek" },
        { label: "Category" },
        { label: "Price", type: "number", placeholder: "550000" },
        { label: "Address", placeholder: "Jl. Raya Kintamani" },
        { label: "Province", placeholder: "Bali" },
        { label: "City", placeholder: "Bangli" },
        { label: "Image URL", placeholder: "https://..." },
        {
          label: "Activity Description",
          textarea: true,
          placeholder: "Update activity description",
        },
        {
          label: "Facilities",
          textarea: true,
          placeholder: "Guide, breakfast, transport",
          required: false,
        },
        {
          label: "Google Maps URL",
          placeholder: "https://maps.google.com/...",
          required: false,
        },
        {
          label: "Price Discount",
          type: "number",
          placeholder: "75000",
          required: false,
        },
      ]}
    />
  );
}
