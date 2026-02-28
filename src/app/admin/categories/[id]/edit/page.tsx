import AdminCrudForm from "@/components/admin/AdminCrudForm";

export default function EditCategoryPage() {
  return (
    <AdminCrudForm
      activeNav="categories"
      title="Edit Category"
      subtitle="Modify category details and visibility settings."
      backHref="/admin/categories"
      saveLabel="Update Category"
      fields={[
        { label: "Category Name", placeholder: "Mountain" },
        { label: "Display Image URL", placeholder: "https://..." },
        { label: "Sort Order", type: "number", placeholder: "2" },
        { label: "Status", options: ["Active", "Inactive"] },
        {
          label: "Category Description",
          textarea: true,
          placeholder: "Update category description",
        },
      ]}
    />
  );
}
