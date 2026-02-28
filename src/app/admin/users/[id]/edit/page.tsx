import AdminCrudForm from "@/components/admin/AdminCrudForm";

export default function EditUserPage() {
  return (
    <AdminCrudForm
      activeNav="users"
      title="Edit User"
      subtitle="Update user profile, role, and account status."
      backHref="/admin/users"
      saveLabel="Update User"
      fields={[
        { label: "Full Name", placeholder: "Alexander Van Der Bilt" },
        { label: "Username", placeholder: "@alexvanderbilt" },
        { label: "Email", placeholder: "alex.v@luxurytravel.com" },
        { label: "Role", options: ["Admin", "User"] },
        { label: "Status", options: ["Active", "Suspended"] },
        { label: "Avatar URL", placeholder: "https://..." },
      ]}
    />
  );
}
