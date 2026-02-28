"use client";

import AdminShell from "@/components/admin/AdminShell";
import Link from "next/link";
import { useState } from "react";
import {
  deleteStoredAdminRecord,
  getStoredValue,
  useStoredAdminRecords,
} from "@/hooks/admin/useStoredAdminRecords";

const banners = [
  {
    id: 1,
    title: "Summer Luxury Collection 2024",
    link: "trevtha.com/home",
    size: "1920x1080",
    status: "Active",
    statusClass: "bg-emerald-100 text-emerald-800 border-emerald-200",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAL0JxhHzwYm781-eifB-pAN1PuKPf-aA9UGZMnucQz7TH9zN80iwYlcGU6pWznxd-a2cdK1eOypSM1zu1iEIXeDg6z8DQc14iiMbQdYKu3H9MI3STht3v6-Gs3iivAQa9r2S0b-gfQYkuAc4K3fgUZ_taaON6v-MUTACFKu6IC3imyZuIDozCtx3tJ3oMPjPA8U_GVUFuxUw-ce2IOQBRMMkIH9PnlsyYcHrmAsyghMscWDfgQrwTUP7TBEfC8OwAVaAYy4ORwloDk",
  },
  {
    id: 2,
    title: "Winter Escapes Special",
    link: "trevtha.com/deals",
    size: "1440x900",
    status: "Inactive",
    statusClass: "bg-charcoal/10 text-charcoal/60 border-charcoal/10",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAVa1xLoI8O4GGh0L4Esov9uTNR2xKGgjPAWrJTg8ah0YpovP3dMeJodcRp-vJDqErg90WgiPZya0pAQlxRYv-Dkom1ohWWHpmjnk6dwWS-0t9FbbLXzh71S9J4Hr5OiD1II1vOewQvC7wd6p3rFdmL3X4Qqjfe4Y_CulR5hERX8Zeypf3EmNyXwar1qGTOy8nnsfy5e5DNRXsZ2i0g2letixm4ZYpri3wlY7A6-Wl1XYsoZrhh5CPDAPtnseapUBXNofr2c02NPJlS",
  },
  {
    id: 3,
    title: "Premium Living Brand Hero",
    link: "trevtha.com/premium",
    size: "2560x1440",
    status: "Active",
    statusClass: "bg-emerald-100 text-emerald-800 border-emerald-200",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCdOYzYQmpUUQafjHLzheRs75h2vFGa0EbxSU5zvoIr3jYp9JNEhjGhLipGZceW92J1YPTwQ80s7Zq_qiOzc7s8KTupNXVDjG8IBnbfPq3EjJKJS1tnxELfuMdIt8lVHsThzB0cuLazbOmMm7z1SOE1KfSyBioavPIwaZx44U3EDZCAKq5eM-DY6TouKC1pvxVZ7atP4oif0KXpiQrRgyCp-pLtq5jGeZ0PQEr60DagVmdtgaMTuBWpCAxlhgAIVwwylnSEGdUtUiVK",
  },
];

export default function ManageBannersPage() {
  const [deleteKey, setDeleteKey] = useState(0);
  const storedRecords = useStoredAdminRecords("banners");

  const handleDeleteRecord = (formId: string) => {
    deleteStoredAdminRecord("banners", formId);
    setDeleteKey((prev) => prev + 1);
  };

  return (
    <AdminShell activeNav="banners">
      <div className="p-10 space-y-8">
        <div className="max-w-4xl flex items-start justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-forest tracking-tight">
              Banner Library
            </h2>
            <p className="text-charcoal/60 mt-2 text-lg leading-relaxed">
              Control the visual identity of TREVTHA. Manage high-resolution
              heroes, featured destination banners, and promotional sections
              across all digital touchpoints.
            </p>
          </div>
          <Link
            href="/admin/banners/new"
            className="bg-gold hover:bg-gold/90 text-forest px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap"
          >
            Add New Banner
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border border-forest/5 shadow-sm">
            <p className="text-sm font-semibold text-charcoal/50 uppercase tracking-wider">
              Total Banners
            </p>
            <p className="text-3xl font-bold text-forest mt-1">24</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-forest/5 shadow-sm">
            <p className="text-sm font-semibold text-charcoal/50 uppercase tracking-wider">
              Active
            </p>
            <p className="text-3xl font-bold text-forest mt-1">18</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-forest/5 shadow-sm">
            <p className="text-sm font-semibold text-charcoal/50 uppercase tracking-wider">
              Scheduled
            </p>
            <p className="text-3xl font-bold text-gold mt-1">4</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-forest/5 shadow-sm">
            <p className="text-sm font-semibold text-charcoal/50 uppercase tracking-wider">
              Storage Used
            </p>
            <div className="flex items-center gap-3 mt-1">
              <p className="text-3xl font-bold text-forest">84%</p>
              <div className="flex-1 h-2 bg-cream rounded-full overflow-hidden">
                <div className="h-full bg-gold w-[84%]" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-forest/10 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-forest/5 border-b border-forest/10">
                <th className="px-6 py-4 text-xs font-bold text-forest uppercase tracking-widest w-24">
                  Preview
                </th>
                <th className="px-6 py-4 text-xs font-bold text-forest uppercase tracking-widest">
                  Banner Details
                </th>
                <th className="px-6 py-4 text-xs font-bold text-forest uppercase tracking-widest text-center">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold text-forest uppercase tracking-widest text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-forest/5">
              {storedRecords.map((record) => (
                <tr
                  key={`stored-${record.id}`}
                  className="hover:bg-cream/50 transition-colors"
                >
                  <td className="px-6 py-5">
                    <div className="h-16 w-16 rounded-lg bg-cream border border-forest/10 shadow-sm flex items-center justify-center text-[10px] font-bold text-forest/60">
                      Custom
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <h4 className="font-bold text-forest">
                      {getStoredValue(record.values, ["banner_title"])}
                    </h4>
                    <div className="flex gap-4 mt-1">
                      <span className="text-xs font-medium text-charcoal/60 flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">
                          link
                        </span>
                        {getStoredValue(record.values, ["target_link"])}
                      </span>
                      <span className="text-xs font-medium text-charcoal/60 flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">
                          aspect_ratio
                        </span>
                        {getStoredValue(record.values, ["resolution"])}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border bg-gold/15 text-forest border-gold/20">
                      {getStoredValue(record.values, ["status"], "Active")}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/banners/${record.formId}/edit`}
                        className="p-2 hover:bg-gold/10 hover:text-gold text-forest/40 rounded transition-all"
                      >
                        <span className="material-symbols-outlined">
                          edit_square
                        </span>
                      </Link>
                      <button
                        onClick={() => handleDeleteRecord(record.formId)}
                        className="p-2 hover:bg-rose-500/10 hover:text-rose-500 text-forest/40 rounded transition-all"
                      >
                        <span className="material-symbols-outlined">
                          delete
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {banners.map((banner) => (
                <tr
                  key={banner.id}
                  className="hover:bg-cream/50 transition-colors"
                >
                  <td className="px-6 py-5">
                    <div
                      className="h-16 w-16 rounded-lg bg-cover bg-center border border-forest/10 shadow-sm"
                      style={{ backgroundImage: `url('${banner.image}')` }}
                    />
                  </td>
                  <td className="px-6 py-5">
                    <h4 className="font-bold text-forest">{banner.title}</h4>
                    <div className="flex gap-4 mt-1">
                      <span className="text-xs font-medium text-charcoal/60 flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">
                          link
                        </span>
                        {banner.link}
                      </span>
                      <span className="text-xs font-medium text-charcoal/60 flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">
                          aspect_ratio
                        </span>
                        {banner.size}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${banner.statusClass}`}
                    >
                      {banner.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/banners/${banner.id}/edit`}
                        className="p-2 hover:bg-gold/10 hover:text-gold text-forest/40 rounded transition-all"
                      >
                        <span className="material-symbols-outlined">
                          edit_square
                        </span>
                      </Link>
                      <button className="p-2 hover:bg-red-50 hover:text-red-500 text-forest/40 rounded transition-all">
                        <span className="material-symbols-outlined">
                          delete
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="px-6 py-4 bg-cream/30 border-t border-forest/5 flex items-center justify-between">
            <p className="text-sm text-charcoal/50">
              Showing <span className="font-bold text-charcoal">1-3</span> of{" "}
              <span className="font-bold text-charcoal">24</span> banners
            </p>
            <div className="flex items-center gap-2">
              <button
                className="size-9 flex items-center justify-center rounded-lg border border-forest/10 text-forest/30"
                disabled
              >
                <span className="material-symbols-outlined text-xl">
                  chevron_left
                </span>
              </button>
              <button className="size-9 flex items-center justify-center rounded-lg bg-gold text-forest font-bold shadow-sm">
                1
              </button>
              <button className="size-9 flex items-center justify-center rounded-lg border border-forest/10 hover:bg-white text-charcoal transition-colors">
                2
              </button>
              <button className="size-9 flex items-center justify-center rounded-lg border border-forest/10 hover:bg-white text-charcoal transition-colors">
                3
              </button>
              <span className="px-1 text-charcoal/30">...</span>
              <button className="size-9 flex items-center justify-center rounded-lg border border-forest/10 hover:bg-white text-charcoal transition-colors">
                8
              </button>
              <button className="size-9 flex items-center justify-center rounded-lg border border-forest/10 hover:bg-white text-forest">
                <span className="material-symbols-outlined text-xl">
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
