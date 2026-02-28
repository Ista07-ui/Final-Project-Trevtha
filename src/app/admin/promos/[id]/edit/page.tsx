import AdminCrudForm from "@/components/admin/AdminCrudForm";

export default function EditPromoPage() {
  return (
    <AdminCrudForm
      activeNav="promos"
      title="Edit Promo"
      subtitle="Modify promo details, period, and status."
      backHref="/admin/promos"
      saveLabel="Update Promo"
      fields={[
        { label: "Promo Code", placeholder: "SUMMER24" },
        { label: "Discount Type", options: ["Percentage", "Fixed Amount"] },
        { label: "Discount Value", placeholder: "Rp 50.000" },
        { label: "Minimum Purchase", placeholder: "Rp 250.000" },
        { label: "Start Date", type: "date" },
        { label: "End Date", type: "date" },
        { label: "Status", options: ["Active", "Upcoming", "Expired"] },
        {
          label: "Promo Notes",
          textarea: true,
          placeholder: "Update campaign notes",
        },
      ]}
    />
  );
}
