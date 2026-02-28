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
        {
          label: "Category",
          options: [
            "Water Activity",
            "Mountain Trekking",
            "Luxury Tour",
            "Culinary Experience",
          ],
        },
        { label: "Price", placeholder: "$85.00" },
        { label: "Location", placeholder: "Bali, Indonesia" },
        { label: "Image URL", placeholder: "https://..." },
        {
          label: "Activity Description",
          textarea: true,
          placeholder: "Describe this activity",
        },
      ]}
    />
  );
}
