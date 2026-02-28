import AdminCrudForm from "@/components/admin/AdminCrudForm";

export default function NewUserPage() {
  return (
    <AdminCrudForm
      activeNav="users"
      title="Add New User"
      subtitle="Create a new user or admin account in the marketplace."
      backHref="/admin/users"
      saveLabel="Save User"
      fields={[
        { label: "Full Name", placeholder: "Sophia Chen" },
        { label: "Username", placeholder: "@sophie_concierge" },
        { label: "Email", placeholder: "sophia.chen@trevtha.com" },
        { label: "Role", options: ["Admin", "User", "Vendor"] },
        { label: "Status", options: ["Active", "Suspended"] },
        { label: "Avatar URL", placeholder: "https://..." },
      ]}
    />
  );
}
