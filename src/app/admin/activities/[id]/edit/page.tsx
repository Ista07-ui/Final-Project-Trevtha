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
        {
          label: "Category",
          options: [
            "Water Activity",
            "Mountain Trekking",
            "Luxury Tour",
            "Culinary Experience",
          ],
        },
        { label: "Price", placeholder: "$55.00" },
        { label: "Location", placeholder: "Kintamani, Bali" },
        { label: "Image URL", placeholder: "https://..." },
        {
          label: "Activity Description",
          textarea: true,
          placeholder: "Update activity description",
        },
      ]}
    />
  );
}
