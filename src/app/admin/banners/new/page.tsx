import AdminCrudForm from "@/components/admin/AdminCrudForm";

export default function NewBannerPage() {
  return (
    <AdminCrudForm
      activeNav="banners"
      title="Add New Banner"
      subtitle="Create a new promotional banner for TREVTHA pages."
      backHref="/admin/banners"
      saveLabel="Save Banner"
      fields={[
        { label: "Banner Title", placeholder: "Summer Luxury Collection 2025" },
        { label: "Target Link", placeholder: "trevtha.com/home" },
        { label: "Image URL", placeholder: "https://..." },
        { label: "Resolution", placeholder: "1920x1080" },
        { label: "Status", options: ["Active", "Inactive", "Scheduled"] },
        {
          label: "Description",
          textarea: true,
          placeholder: "Optional banner description",
        },
      ]}
    />
  );
}
