import AdminCrudForm from "@/components/admin/AdminCrudForm";

export default function NewCategoryPage() {
  return (
    <AdminCrudForm
      activeNav="categories"
      title="Add New Category"
      subtitle="Create a new activity category for marketplace organization."
      backHref="/admin/categories"
      saveLabel="Save Category"
      fields={[
        { label: "Category Name", placeholder: "Beach" },
        { label: "Display Image URL", placeholder: "https://..." },
        { label: "Sort Order", type: "number", placeholder: "1" },
        { label: "Status", options: ["Active", "Inactive"] },
        {
          label: "Category Description",
          textarea: true,
          placeholder: "Describe this category",
        },
      ]}
    />
  );
}
