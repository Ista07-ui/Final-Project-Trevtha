"use client";

import AdminShell from "@/components/admin/AdminShell";
import Link from "next/link";
import { useState } from "react";
import {
  deleteStoredAdminRecord,
  getStoredValue,
  useStoredAdminRecords,
} from "@/hooks/admin/useStoredAdminRecords";

const users = [
  {
    id: 1,
    name: "Alexander Van Der Bilt",
    username: "@alexvanderbilt",
    email: "alex.v@luxurytravel.com",
    role: "Admin",
    roleClass: "bg-gold/20 text-gold border-gold/30",
    status: "Active",
    statusDot: "bg-green-500",
    joined: "Oct 12, 2023",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBx_ypcC5jKvyYBmyM_RGt2pd-KAKof9Snz1YqQuzn4hzp_GUBHp-zk_TbC9IrcLtzXDmsN47IXYdPp9EQNDT1t7fu46rbSiJ6uwo7CMvEbceMrtgx_GEpZ0z0nSUdG8YBqZWEBb8p8xyy5oJWBNt_ODqvs1PD_Xd1y-Lb0rUGsou64KjwpWl0gAieVa4SRn90j2Yve8Nvf1NeoTTprZUae_sUrqV8LjQQ2GQtBTb8ZCVVvN9d2R_lu7xfE8eCz4HIxUzBC8Uz6_Iw2",
  },
  {
    id: 2,
    name: "Isabella Thorne",
    username: "@bella_travels",
    email: "isabella.thorne@gmail.com",
    role: "User",
    roleClass: "bg-forest/10 text-forest border-forest/20",
    status: "Active",
    statusDot: "bg-green-500",
    joined: "Nov 04, 2023",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDNX_fJUGDARRIZo-jf4TSWPTj17yvaoOXO8W0fCWBWuzUtDGidSeTYAxB82YwUgZ4XW55IpUz8cGqx335lF5qB7--2JTsHeCB0ge3ewoLtyKsJQLGsuICQ-KD0r4mYG0NXc635vrUmQVC39c-fKonAbm1f1gA3L7XI6xoFz4EgbNvXmf2iei477b0_df1wfiehFQE7lzAmTd0Ihyrp0z3deE9OKzrPvMCQeFvzR34o_P9qOzPxJJ_IMKBjS82oAsjSau3iDrRFR7zv",
  },
  {
    id: 3,
    name: "Julian S. Pierce",
    username: "@julianpierce",
    email: "jpierce.biz@outlook.com",
    role: "User",
    roleClass: "bg-forest/10 text-forest border-forest/20",
    status: "Suspended",
    statusDot: "bg-red-400",
    joined: "Dec 18, 2023",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDwgLT57aV_diKHwLT1mhEuStpIDZSFUg2ULDaBHXe-7llH4IohRHu9YPk_jqfvZmz-yO0AMZH7YkyaICuwsQ2dQK-zk5SJKnOFb_yw8BPwgnAOYBtfVqdCYTw4-zb_TXHl17tbxpzJwgOsM0u2uA2bnmnQ-RpN70ArwIkCrnslcP726kO2V6VECb0HuvmZuXSYCEK_vDnEhm15sM_zu0o4xl1ICnfhuKuZcwxKFPCIdrvy2RHffN1H2SVtxRT6Cu5eECkXzbxj_cn4",
  },
  {
    id: 4,
    name: "Sophia Chen",
    username: "@sophie_concierge",
    email: "sophia.chen@trevtha.com",
    role: "User",
    roleClass: "bg-forest/10 text-forest border-forest/20",
    status: "Active",
    statusDot: "bg-green-500",
    joined: "Jan 12, 2026",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBVrbYJtz5MbDl0KmwoOcZda-2c2MR3U7PLXK8GmT_yg36FsyoWbZHS-0Clb4rSLuOV95Nfno141XltY5JTOztNEbRwEgO4PIPxyHV1S2YoTEOIEAboTYE9zPs4hc3h0ou1XWKsfsOFH00-rH3Pf8NaAurzYDNZO-cMAn5MnMQcCuxo5TtlBMvAt5kGtYiVRM7SGVBZbT9lUjfH4UaD8nURflQjmPRMB4YH6KgL_kGQXrtqy2UQDQjbCcGvUXfZrQ-73_I8ETYnrnSZ",
  },
];

export default function ManageUsersPage() {
  const [deleteKey, setDeleteKey] = useState(0);
  const storedRecords = useStoredAdminRecords("users");

  const handleDeleteRecord = (formId: string) => {
    deleteStoredAdminRecord("users", formId);
    setDeleteKey((prev) => prev + 1);
  };

  return (
    <AdminShell activeNav="users">
      <div className="flex-1 overflow-y-auto px-10 py-8">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-charcoal tracking-tight">
              Manage Users
            </h2>
            <p className="text-charcoal/60 text-sm mt-1">
              Overview and management of your marketplace user base.
            </p>
          </div>
          <Link
            href="/admin/users/new"
            className="bg-gold hover:bg-gold/90 text-forest px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-all shadow-lg shadow-gold/20"
          >
            <span className="material-symbols-outlined">person_add</span>Add New
            User
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl border border-gold/10 shadow-sm flex items-center gap-5">
            <div className="p-3 bg-forest/5 rounded-full text-forest">
              <span className="material-symbols-outlined text-3xl">groups</span>
            </div>
            <div>
              <p className="text-charcoal/50 text-xs font-bold uppercase tracking-wider">
                Total Users
              </p>
              <p className="text-2xl font-black text-charcoal">14,284</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gold/10 shadow-sm flex items-center gap-5">
            <div className="p-3 bg-gold/10 rounded-full text-gold">
              <span className="material-symbols-outlined text-3xl">
                shield_person
              </span>
            </div>
            <div>
              <p className="text-charcoal/50 text-xs font-bold uppercase tracking-wider">
                Active Admins
              </p>
              <p className="text-2xl font-black text-charcoal">24</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gold/10 shadow-sm flex items-center gap-5">
            <div className="p-3 bg-green-50 rounded-full text-green-700">
              <span className="material-symbols-outlined text-3xl">
                trending_up
              </span>
            </div>
            <div>
              <p className="text-charcoal/50 text-xs font-bold uppercase tracking-wider">
                New Signups (Month)
              </p>
              <p className="text-2xl font-black text-charcoal">892</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gold/10 mb-6 flex flex-wrap gap-4 items-center shadow-sm">
          <div className="relative flex-1 min-w-[300px]">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40">
              search
            </span>
            <input
              className="w-full pl-10 pr-4 py-2 bg-cream/50 border border-gold/10 rounded-lg outline-none text-sm"
              placeholder="Search by name, username or email..."
              type="text"
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-charcoal/60 uppercase">
              Filter by Role:
            </span>
            <select className="bg-cream/50 border border-gold/10 rounded-lg px-4 py-2 text-sm font-medium">
              <option>All Roles</option>
              <option>Admin</option>
              <option>User</option>
            </select>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gold/20 rounded-lg hover:bg-cream text-sm font-bold text-forest">
            <span className="material-symbols-outlined text-sm">
              filter_alt
            </span>
            Advanced Filters
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gold/10 overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
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
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest">
                  Joined Date
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/5">
              {storedRecords.map((record) => (
                <tr
                  key={`stored-${record.id}`}
                  className="hover:bg-cream/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gold/20 overflow-hidden border border-gold/20 flex items-center justify-center text-[10px] font-bold text-forest">
                        New
                      </div>
                      <div>
                        <p className="text-sm font-bold text-charcoal">
                          {getStoredValue(record.values, ["full_name"])}
                        </p>
                        <p className="text-xs text-charcoal/50">
                          {getStoredValue(
                            record.values,
                            ["username"],
                            "@new_user",
                          )}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-charcoal/70 font-medium">
                    {getStoredValue(record.values, ["email"], "-")}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 border rounded-full text-[10px] font-black uppercase bg-gold/20 text-gold border-gold/30">
                      {getStoredValue(record.values, ["role"], "User")}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      <span className="text-sm text-charcoal/80 font-medium">
                        {getStoredValue(record.values, ["status"], "Active")}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-charcoal/60">-</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/users/${record.formId}/edit`}
                        className="p-2 hover:bg-forest/5 rounded-lg text-forest/70"
                      >
                        <span className="material-symbols-outlined text-lg">
                          edit
                        </span>
                      </Link>
                      <button
                        onClick={() => handleDeleteRecord(record.formId)}
                        className="p-2 hover:bg-rose-500/10 rounded-lg text-forest/70 hover:text-rose-500 transition-colors"
                      >
                        <span className="material-symbols-outlined text-lg">
                          delete
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-cream/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-10 w-10 rounded-full bg-gold/20 overflow-hidden border border-gold/20 bg-cover bg-center"
                        style={{ backgroundImage: `url('${user.avatar}')` }}
                      />
                      <div>
                        <p className="text-sm font-bold text-charcoal">
                          {user.name}
                        </p>
                        <p className="text-xs text-charcoal/50">
                          {user.username}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-charcoal/70 font-medium">
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 border rounded-full text-[10px] font-black uppercase ${user.roleClass}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${user.statusDot}`}
                      ></span>
                      <span className="text-sm text-charcoal/80 font-medium">
                        {user.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-charcoal/60">
                    {user.joined}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/users/${user.id}/edit`}
                        className="p-2 hover:bg-forest/5 rounded-lg text-forest/70"
                      >
                        <span className="material-symbols-outlined text-lg">
                          edit
                        </span>
                      </Link>
                      <button className="p-2 hover:bg-gold/10 rounded-lg text-gold">
                        <span className="material-symbols-outlined text-lg">
                          lock_reset
                        </span>
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-lg text-red-600">
                        <span className="material-symbols-outlined text-lg">
                          delete
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-6 py-4 bg-cream/30 border-t border-gold/5 flex items-center justify-between">
            <p className="text-xs font-bold text-charcoal/50 uppercase tracking-widest">
              Showing 1 to 4 of 14,284 users
            </p>
            <div className="flex gap-1">
              <button className="px-3 py-1 border border-gold/10 rounded bg-white text-forest">
                <span className="material-symbols-outlined text-sm leading-none">
                  chevron_left
                </span>
              </button>
              <button className="px-3 py-1 bg-gold text-forest font-bold rounded text-xs">
                1
              </button>
              <button className="px-3 py-1 border border-gold/10 rounded bg-white text-forest text-xs font-bold">
                2
              </button>
              <button className="px-3 py-1 border border-gold/10 rounded bg-white text-forest text-xs font-bold">
                3
              </button>
              <button className="px-3 py-1 border border-gold/10 rounded bg-white text-forest">
                <span className="material-symbols-outlined text-sm leading-none">
                  chevron_right
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
