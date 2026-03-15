import AdminCrudForm from "@/components/admin/AdminCrudForm";

export default function NewActivityPage() {
  return (
    <AdminCrudForm
      activeNav="activities"
      title="Add New Activity"
      subtitle="Create a new premium travel activity listing."
      backHref="/admin/activities"
      saveLabel="Save Activity"
      fields={[
        { label: "Activity Name", placeholder: "Nusa Penida Snorkeling" },
        { label: "Category" },
        { label: "Price", type: "number", placeholder: "850000" },
        { label: "Address", placeholder: "Jl. Pantai Pandawa No. 1" },
        { label: "Province", placeholder: "Bali" },
        { label: "City", placeholder: "Badung" },
        { label: "Image URL", placeholder: "https://..." },
        {
          label: "Activity Description",
          textarea: true,
          placeholder: "Describe this activity",
        },
        {
          label: "Facilities",
          textarea: true,
          placeholder: "Snorkeling gear, guide, lunch",
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
          placeholder: "50000",
          required: false,
        },
      ]}
    />
  );
}
