"use client";

import AdminShell from "@/components/admin/AdminShell";
import Link from "next/link";
import { useState } from "react";
import {
  deleteStoredAdminRecord,
  getStoredValue,
  useStoredAdminRecords,
} from "@/hooks/admin/useStoredAdminRecords";

const activities = [
  {
    id: "01",
    name: "Nusa Penida Snorkeling",
    code: "ACT-8821",
    category: "Water Activity",
    categoryClass: "bg-blue-100 text-blue-700",
    price: "$85.00",
    oldPrice: "$120.00",
    location: "Bali, Indonesia",
    rating: "4.9",
    reviews: "128",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDlrO9NuW7xWY8ZTSeZbaVs5W3uY5Bi1xcLGTxTotxCPhRidwjKaSvkJ6EO939bJ331aM2ZvbxRFPeZQiQQrs9kA8v2JHeJXxP5mL59cjuq7JKwKhVNelK9bnbiqWQ9TeyeR5LwWLM3XvF6elQhZmtkPXvakitKRDrzY4GdojcTOotKza60zD-xuy_GsZ-_IhmV9s2IRSuL-WQUJ5zTKyzGdfC9xPFs7EUwbRaMXue-1Ds5aRimLDERgi7IKRrT22gE6oT1dbiifWaB",
  },
  {
    id: "02",
    name: "Mount Batur Sunrise Trek",
    code: "ACT-9012",
    category: "Mountain Trekking",
    categoryClass: "bg-emerald-100 text-emerald-700",
    price: "$55.00",
    oldPrice: "$75.00",
    location: "Kintamani, Bali",
    rating: "4.8",
    reviews: "342",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBHNw01L4bJyj0SaUzu4ffTi5gNEHG4zskdWWXFdMRxoci16bGhGFlVRuwvhiB0uY7HQUTCzlXFDSBPW7a4l9EknECXINFVxyxenv49u7yiESgx5s9UQP1t3KFmbfMHdS0hBCiY5IK6-kiA_ibNVJE_RNXed5eR0z0s4sY9YqP7qgLbj_poY_5YoL06YZrvMBk_I_yeSWJx2XGsJSTpqHxFHsPrR1jxukj5d2y-JTpvHSy_xY61wDAHrKKGBuSoKdAlE_nD48-AYH62",
  },
  {
    id: "03",
    name: "Private Villa Wine Tasting",
    code: "ACT-1102",
    category: "Luxury Tour",
    categoryClass: "bg-amber-100 text-amber-700",
    price: "$210.00",
    oldPrice: "$250.00",
    location: "Seminyak, Bali",
    rating: "5.0",
    reviews: "56",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDlcsVbfo39QJlV3SWASKQJ8NG5zIDShQMyqKeLei7nAXRL3GnqLkDIqWFwsj34Sg2LUDxNgyXGVyBKI_K4Yr0-YgYYSK9EoR6jMk0xD__2zY8yl_46qKEZCOSx50veo7kM3hnDnjaA7FHl1NxTvP704PMQ6m0QYgxRgqRm52fs26y5Hlumi9WAFS7EpAx7mqfrm4X34rlSf9PdwQlO4b6hG4NmnDetD1rKsAlXSXYpIEjkaaiwGFrlYfY6BE3eju6lxAgM9nQdzAPL",
  },
  {
    id: "04",
    name: "Ubud Traditional Cooking",
    code: "ACT-4491",
    category: "Culinary Experience",
    categoryClass: "bg-purple-100 text-purple-700",
    price: "$42.00",
    oldPrice: "$50.00",
    location: "Ubud, Bali",
    rating: "4.7",
    reviews: "210",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuASQcR_5u3I9ljPSbwEtXxEQBOiDRscJVE2G2UtUDORW_YuXZehyxYW_b--bH1ePcVYOiw601iKUFDjY_A9_cInQPut8lBMHrBdsIXGuTIFqD7JBNcuQcNrzRZBmrcg_lypTIgEFYhRHww9gv7lNcj_11WN0M26hOGjPn4dVBhzDj7HOY8A8VKmToRbJXgqbfWLe62F_8RQd7zTy4fBFJp39UFvpH9mZtZ2H4yDE5mYHi0wgLuA0q4sf2r1nYDS_ZodtEwHVnqSRTqz",
  },
];

export default function ManageActivitiesPage() {
  const [deleteKey, setDeleteKey] = useState(0);
  const storedRecords = useStoredAdminRecords("activities");

  const handleDeleteRecord = (formId: string) => {
    deleteStoredAdminRecord("activities", formId);
    setDeleteKey((prev) => prev + 1);
  };

  return (
    <AdminShell activeNav="activities">
      <div className="p-8">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 min-w-[280px]">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                search
              </span>
              <input
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                placeholder="Search by activity name or location..."
                type="text"
              />
            </div>
            <select className="bg-slate-50 border border-slate-200 text-slate-600 text-sm rounded-lg py-2 pl-3 pr-8">
              <option>All Categories</option>
            </select>
            <select className="bg-slate-50 border border-slate-200 text-slate-600 text-sm rounded-lg py-2 pl-3 pr-8">
              <option>Sort by: Newest</option>
            </select>
          </div>
          <Link
            href="/admin/activities/new"
            className="bg-gold hover:bg-[#c19b2a] text-forest font-bold px-6 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-md whitespace-nowrap"
          >
            <span className="material-symbols-outlined">add</span>Add New
            Activity
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                    No
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                    Activity
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                    Category
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                    Price
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                    Location
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                    Rating
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {storedRecords.map((record, index) => (
                  <tr
                    key={`stored-${record.id}`}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-slate-400 font-medium">
                      N{index + 1}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="size-12 rounded-lg bg-slate-100 shadow-sm flex items-center justify-center text-[10px] font-bold text-slate-500">
                          New
                        </div>
                        <div>
                          <p className="text-sm font-bold text-charcoal">
                            {getStoredValue(record.values, ["activity_name"])}
                          </p>
                          <p className="text-xs text-slate-400">
                            ID: {record.formId}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-[10px] font-bold rounded-full uppercase bg-blue-100 text-blue-700">
                        {getStoredValue(
                          record.values,
                          ["category"],
                          "Uncategorized",
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-charcoal">
                        {getStoredValue(record.values, ["price"], "-")}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-slate-500">
                        <span className="material-symbols-outlined text-sm">
                          location_on
                        </span>
                        <span className="text-sm">
                          {getStoredValue(record.values, ["location"], "-")}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-gold">
                        <span className="material-symbols-outlined text-sm">
                          star
                        </span>
                        <span className="text-sm font-bold text-charcoal">
                          -
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/admin/activities/${record.formId}/edit`}
                          className="p-2 text-slate-400 hover:text-forest hover:bg-slate-100 rounded-lg"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            edit_square
                          </span>
                        </Link>
                        <button
                          onClick={() => handleDeleteRecord(record.formId)}
                          className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {activities.map((activity) => (
                  <tr
                    key={activity.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-slate-400 font-medium">
                      {activity.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div
                          className="size-12 rounded-lg bg-cover bg-center shadow-sm"
                          style={{
                            backgroundImage: `url('${activity.image}')`,
                          }}
                        />
                        <div>
                          <p className="text-sm font-bold text-charcoal">
                            {activity.name}
                          </p>
                          <p className="text-xs text-slate-400">
                            ID: {activity.code}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase ${activity.categoryClass}`}
                      >
                        {activity.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-charcoal">
                        {activity.price}
                      </p>
                      <p className="text-xs text-slate-400 line-through">
                        {activity.oldPrice}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-slate-500">
                        <span className="material-symbols-outlined text-sm">
                          location_on
                        </span>
                        <span className="text-sm">{activity.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-gold">
                        <span className="material-symbols-outlined text-sm">
                          star
                        </span>
                        <span className="text-sm font-bold text-charcoal">
                          {activity.rating}
                        </span>
                        <span className="text-xs text-slate-400 ml-1">
                          ({activity.reviews} reviews)
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-2 text-slate-400 hover:text-gold hover:bg-slate-100 rounded-lg">
                          <span className="material-symbols-outlined text-[20px]">
                            visibility
                          </span>
                        </button>
                        <Link
                          href={`/admin/activities/${activity.id}/edit`}
                          className="p-2 text-slate-400 hover:text-forest hover:bg-slate-100 rounded-lg"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            edit_square
                          </span>
                        </Link>
                        <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-slate-100 rounded-lg">
                          <span className="material-symbols-outlined text-[20px]">
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
            <p className="text-xs text-slate-500 font-medium">
              Showing 4 of 24 active experiences
            </p>
            <div className="flex items-center gap-2">
              <button className="p-2 text-slate-400" disabled>
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-8 h-8 rounded-lg bg-gold text-forest font-bold text-sm shadow-sm">
                1
              </button>
              <button className="w-8 h-8 rounded-lg text-slate-500 hover:bg-slate-100 font-medium text-sm">
                2
              </button>
              <button className="w-8 h-8 rounded-lg text-slate-500 hover:bg-slate-100 font-medium text-sm">
                3
              </button>
              <span className="text-slate-300">...</span>
              <button className="w-8 h-8 rounded-lg text-slate-500 hover:bg-slate-100 font-medium text-sm">
                6
              </button>
              <button className="p-2 text-slate-400 hover:text-forest">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
