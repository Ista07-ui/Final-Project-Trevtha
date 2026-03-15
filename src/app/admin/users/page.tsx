"use client";

import AdminShell from "@/components/admin/AdminShell";
import { ToastContainer } from "@/components/Toast";
import {
  deleteStoredAdminRecord,
  getStoredValue,
  readStoredAdminRecords,
} from "@/hooks/admin/useStoredAdminRecords";
import { useToast } from "@/hooks/useToast";
import userService, { type AppUser } from "@/lib/services/user";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function ManageUsersPage() {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [storedRecords, setStoredRecords] = useState(() =>
    readStoredAdminRecords().filter((item) => item.section === "users"),
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdatingRole, setIsUpdatingRole] = useState<string | null>(null);
  const toast = useToast();

  const loadUsers = async () => {
    setIsLoading(true);
    const data = await userService.getAllUsers();
    setUsers(data);
    setIsLoading(false);
  };

  const refreshStoredRecords = () => {
    setStoredRecords(
      readStoredAdminRecords().filter((item) => item.section === "users"),
    );
  };

  useEffect(() => {
    const initialize = async () => {
      refreshStoredRecords();
      await loadUsers();
    };

    void initialize();
  }, []);

  const handleDeleteRecord = (formId: string) => {
    deleteStoredAdminRecord("users", formId);
    refreshStoredRecords();
  };

  const handleToggleRole = async (user: AppUser) => {
    const nextRole = user.role === "admin" ? "user" : "admin";
    setIsUpdatingRole(user.id);

    const result = await userService.updateUserRole(user.id, nextRole);

    if (!result) {
      toast.error("Failed to update user role");
      setIsUpdatingRole(null);
      return;
    }

    setUsers((prev) =>
      prev.map((item) =>
        item.id === user.id
          ? {
              ...item,
              role: nextRole,
            }
          : item,
      ),
    );
    toast.success(`Role updated to ${nextRole}`);
    setIsUpdatingRole(null);
  };

  const totalUsers = users.length;
  const totalAdmins = useMemo(
    () => users.filter((user) => user.role === "admin").length,
    [users],
  );
  const totalStandardUsers = totalUsers - totalAdmins;

  let userRows: React.ReactNode;

  if (isLoading) {
    userRows = (
      <tr>
        <td className="px-6 py-8 text-center text-charcoal/60" colSpan={5}>
          Loading users...
        </td>
      </tr>
    );
  } else if (users.length === 0) {
    userRows = (
      <tr>
        <td className="px-6 py-8 text-center text-charcoal/60" colSpan={5}>
          No users found.
        </td>
      </tr>
    );
  } else {
    userRows = users.map((user) => {
      const roleClass =
        user.role === "admin"
          ? "bg-gold/20 text-gold border-gold/30"
          : "bg-forest/10 text-forest border-forest/20";

      return (
        <tr key={user.id} className="hover:bg-cream/30 transition-colors">
          <td className="px-6 py-4">
            <div className="flex items-center gap-3">
              <div
                className="h-10 w-10 rounded-full bg-gold/20 overflow-hidden border border-gold/20 bg-cover bg-center"
                style={{
                  backgroundImage: user.profilePictureUrl
                    ? `url('${user.profilePictureUrl}')`
                    : undefined,
                }}
              >
                {user.profilePictureUrl ? null : (
                  <div className="flex h-full w-full items-center justify-center text-[10px] font-bold text-forest">
                    {user.name.slice(0, 1).toUpperCase()}
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm font-bold text-charcoal">{user.name}</p>
                <p className="text-xs text-charcoal/50">{user.id}</p>
              </div>
            </div>
          </td>
          <td className="px-6 py-4 text-sm text-charcoal/70 font-medium">
            {user.email}
          </td>
          <td className="px-6 py-4">
            <span
              className={`px-3 py-1 border rounded-full text-[10px] font-black uppercase ${roleClass}`}
            >
              {user.role}
            </span>
          </td>
          <td className="px-6 py-4 text-sm text-charcoal/60">
            {user.phoneNumber || "-"}
          </td>
          <td className="px-6 py-4 text-right">
            <div className="flex justify-end gap-2">
              <Link
                href={`/admin/users/${user.id}/edit`}
                className="p-2 hover:bg-forest/5 rounded-lg text-forest/70"
              >
                <span className="material-symbols-outlined text-lg">edit</span>
              </Link>
              <button
                onClick={() => handleToggleRole(user)}
                disabled={isUpdatingRole === user.id}
                className="p-2 hover:bg-gold/10 rounded-lg text-gold disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-lg">
                  manage_accounts
                </span>
              </button>
            </div>
          </td>
        </tr>
      );
    });
  }

  return (
    <AdminShell activeNav="users">
      <ToastContainer toasts={toast.toasts} onRemove={toast.removeToast} />
      <div className="flex-1 overflow-y-auto px-10 py-8">
        <header className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-extrabold text-charcoal tracking-tight">
              Manage Users
            </h2>
            <p className="mt-1 text-sm text-charcoal/60">
              Overview and management of your marketplace user base.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={loadUsers}
              className="flex items-center gap-2 rounded-lg border border-gold/20 bg-white px-5 py-3 font-bold text-forest"
            >
              <span className="material-symbols-outlined">refresh</span>
              <span>Refresh</span>
            </button>
            <Link
              href="/admin/users/new"
              className="flex items-center gap-2 rounded-lg bg-gold px-6 py-3 font-bold text-forest shadow-lg shadow-gold/20 transition-all hover:bg-gold/90"
            >
              <span className="material-symbols-outlined">person_add</span>
              <span>Add New User</span>
            </Link>
          </div>
        </header>

        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="flex items-center gap-5 rounded-xl border border-gold/10 bg-white p-6 shadow-sm">
            <div className="rounded-full bg-forest/5 p-3 text-forest">
              <span className="material-symbols-outlined text-3xl">groups</span>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-charcoal/50">
                Total Users
              </p>
              <p className="text-2xl font-black text-charcoal">{totalUsers}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 rounded-xl border border-gold/10 bg-white p-6 shadow-sm">
            <div className="rounded-full bg-gold/10 p-3 text-gold">
              <span className="material-symbols-outlined text-3xl">
                shield_person
              </span>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-charcoal/50">
                Active Admins
              </p>
              <p className="text-2xl font-black text-charcoal">{totalAdmins}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 rounded-xl border border-gold/10 bg-white p-6 shadow-sm">
            <div className="rounded-full bg-green-50 p-3 text-green-700">
              <span className="material-symbols-outlined text-3xl">person</span>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-charcoal/50">
                Standard Users
              </p>
              <p className="text-2xl font-black text-charcoal">
                {totalStandardUsers}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-4 rounded-xl border border-gold/10 bg-white p-4 shadow-sm">
          <div className="relative min-w-75 flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40">
              database
            </span>
            <div className="w-full rounded-lg border border-gold/10 bg-cream/50 py-2 pl-10 pr-4 text-sm text-charcoal/70">
              Live users from API + local records fallback
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-gold/10 bg-white shadow-sm">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-forest text-white">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest">
                  User Details
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest">
                  Email
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest">
                  Role
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest">
                  Phone
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-widest">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/5">
              {storedRecords.map((record) => (
                <tr
                  key={`stored-${record.id}`}
                  className="transition-colors hover:bg-cream/30"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-gold/20 bg-gold/20 text-[10px] font-bold text-forest">
                        New
                      </div>
                      <div>
                        <p className="text-sm font-bold text-charcoal">
                          {getStoredValue(record.values, ["full_name", "name"])}
                        </p>
                        <p className="text-xs text-charcoal/50">local record</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-charcoal/70">
                    {getStoredValue(record.values, ["email"], "-")}
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full border border-gold/30 bg-gold/20 px-3 py-1 text-[10px] font-black uppercase text-gold">
                      {getStoredValue(record.values, ["role"], "user")}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-charcoal/60">
                    {getStoredValue(
                      record.values,
                      ["phone_number", "phone"],
                      "-",
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/users/${record.formId}/edit`}
                        className="rounded-lg p-2 text-forest/70 hover:bg-forest/5"
                      >
                        <span className="material-symbols-outlined text-lg">
                          edit
                        </span>
                      </Link>
                      <button
                        onClick={() => handleDeleteRecord(record.formId)}
                        className="rounded-lg p-2 text-forest/70 transition-colors hover:bg-rose-500/10 hover:text-rose-500"
                      >
                        <span className="material-symbols-outlined text-lg">
                          delete
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {userRows}
            </tbody>
          </table>
          <div className="flex items-center justify-between border-t border-gold/5 bg-cream/30 px-6 py-4">
            <p className="text-xs font-bold uppercase tracking-widest text-charcoal/50">
              Showing {users.length} API users + {storedRecords.length} local
              records
            </p>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
