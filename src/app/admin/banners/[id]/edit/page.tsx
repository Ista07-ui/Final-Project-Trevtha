import AdminCrudForm from "@/components/admin/AdminCrudForm";

export default function EditBannerPage() {
  return (
    <AdminCrudForm
      activeNav="banners"
      title="Edit Banner"
      subtitle="Update banner content, target page, and publication status."
      backHref="/admin/banners"
      saveLabel="Update Banner"
      fields={[
        { label: "Banner Title", placeholder: "Summer Luxury Collection 2026" },
        { label: "Target Link", placeholder: "trevtha.com/home" },
        { label: "Image URL", placeholder: "https://..." },
        { label: "Resolution", placeholder: "1920x1080" },
        { label: "Status", options: ["Active", "Inactive", "Scheduled"] },
        {
          label: "Description",
          textarea: true,
          placeholder: "Update banner description",
        },
      ]}
    />
  );
}
