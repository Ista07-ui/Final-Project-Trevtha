"use client";

import AdminShell from "@/components/admin/AdminShell";
import Link from "next/link";
import { useEffect, useState } from "react";
import { bannerService, Banner } from "@/lib/services/banner";
import { useToast } from "@/hooks/useToast";
import { ToastContainer } from "@/components/Toast";

export default function ManageBannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const toast = useToast();

  useEffect(() => {
    const fetchBanners = async () => {
      setIsLoading(true);
      const data = await bannerService.getAllBanners();
      setBanners(Array.isArray(data) ? data : []);
      setIsLoading(false);
    };

    fetchBanners();
  }, []);

  const handleDeleteBanner = async (id: string) => {
    if (!confirm("Are you sure you want to delete this banner?")) return;

    setDeletingId(id);
    const success = await bannerService.deleteBanner(id);
    if (success) {
      setBanners((prev) => prev.filter((banner) => banner.id !== id));
      toast.success("Banner deleted successfully");
    } else {
      toast.error("Failed to delete banner");
    }
    setDeletingId(null);
  };

  const totalBanners = banners.length;
  const activeBanners = banners.filter((b) => b.status === "active").length;
  const inactiveBanners = banners.filter((b) => b.status === "inactive").length;

  return (
    <AdminShell activeNav="banners">
      <ToastContainer toasts={toast.toasts} onRemove={toast.removeToast} />
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
            <p className="text-3xl font-bold text-forest mt-1">
              {totalBanners}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-forest/5 shadow-sm">
            <p className="text-sm font-semibold text-charcoal/50 uppercase tracking-wider">
              Active
            </p>
            <p className="text-3xl font-bold text-forest mt-1">
              {activeBanners}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-forest/5 shadow-sm">
            <p className="text-sm font-semibold text-charcoal/50 uppercase tracking-wider">
              Inactive
            </p>
            <p className="text-3xl font-bold text-gold mt-1">
              {inactiveBanners}
            </p>
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
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <p className="text-charcoal/60 font-medium">
                      Loading banners...
                    </p>
                  </td>
                </tr>
              ) : banners.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <p className="text-charcoal/60 font-medium">
                      No banners found
                    </p>
                  </td>
                </tr>
              ) : (
                banners.map((banner) => (
                  <tr
                    key={banner.id}
                    className="hover:bg-cream/50 transition-colors"
                  >
                    <td className="px-6 py-5">
                      <div
                        className="h-16 w-16 rounded-lg bg-cover bg-center border border-forest/10 shadow-sm"
                        style={{ backgroundImage: `url('${banner.imageUrl}')` }}
                      />
                    </td>
                    <td className="px-6 py-5">
                      <h4 className="font-bold text-forest">{banner.name}</h4>
                      <div className="flex gap-4 mt-1">
                        <span className="text-xs font-medium text-charcoal/60 flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">
                            link
                          </span>
                          {banner.id}
                        </span>
                        <span className="text-xs font-medium text-charcoal/60 flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">
                            calendar_today
                          </span>
                          {new Date(banner.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                          banner.status === "active"
                            ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                            : "bg-charcoal/10 text-charcoal/60 border-charcoal/10"
                        }`}
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
                        <button
                          onClick={() => handleDeleteBanner(banner.id)}
                          disabled={deletingId === banner.id}
                          className="p-2 hover:bg-rose-500/10 hover:text-rose-500 text-forest/40 rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="material-symbols-outlined">
                            {deletingId === banner.id
                              ? "hourglass_empty"
                              : "delete"}
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="px-6 py-4 bg-cream/30 border-t border-forest/5 flex items-center justify-between">
            <p className="text-sm text-charcoal/50">
              Showing{" "}
              <span className="font-bold text-charcoal">{banners.length}</span>{" "}
              of <span className="font-bold text-charcoal">{totalBanners}</span>{" "}
              banners
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
