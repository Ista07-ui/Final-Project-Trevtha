"use client";

import AdminShell from "@/components/admin/AdminShell";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/useToast";
import promoService from "@/lib/services/promo";
import { ToastContainer } from "@/components/Toast";

interface Promo {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  terms_condition: string;
  promo_code: string;
  promo_discount_price: number;
  minimum_claim_price: number;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

export default function PromosPage() {
  const toast = useToast();
  const [promos, setPromos] = useState<Promo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchPromos = async () => {
      setIsLoading(true);
      const data = await promoService.getActivePromos(1, 50);
      setPromos(Array.isArray(data) ? data : []);
      setIsLoading(false);
    };

    fetchPromos();
  }, []);

  const handleDeletePromo = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this promo?")) {
      return;
    }

    setDeletingId(id);
    const result = await promoService.deletePromo(id);

    if (result) {
      setPromos(promos.filter((promo) => promo.id !== id));
      toast.success("Promo deleted successfully!");
    } else {
      toast.error("Failed to delete promo");
    }

    setDeletingId(null);
  };

  const totalPromos = promos.length;
  const activePromos = promos.filter(
    (promo) => promo.status === "active",
  ).length;
  const totalDiscountValue = promos.reduce(
    (sum, promo) => sum + promo.promo_discount_price,
    0,
  );

  return (
    <AdminShell activeNav="promos">
      <ToastContainer toasts={toast.toasts} onRemove={toast.removeToast} />
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-forest">Promos & Discounts</h1>
          <p className="text-slate-600 mt-2">
            Manage special offers and discount codes
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">
                  Total Promos
                </p>
                <p className="text-3xl font-bold text-forest mt-2">
                  {totalPromos}
                </p>
              </div>
              <span className="material-symbols-outlined text-gold text-4xl">
                local_offer
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">
                  Active Promos
                </p>
                <p className="text-3xl font-bold text-emerald-500 mt-2">
                  {activePromos}
                </p>
              </div>
              <span className="material-symbols-outlined text-emerald-500 text-4xl">
                check_circle
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">
                  Total Discount Value
                </p>
                <p className="text-3xl font-bold text-amber-500 mt-2">
                  IDR {totalDiscountValue.toLocaleString("id-ID")}
                </p>
              </div>
              <span className="material-symbols-outlined text-amber-500 text-4xl">
                trending_up
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search promos..."
              className="px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-gold"
            />
            <select className="px-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-600 focus:outline-none focus:border-gold">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
          <Link
            href="/admin/promos/new"
            className="bg-gold hover:bg-[#c19b2a] text-forest font-bold px-6 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-md whitespace-nowrap"
          >
            <span className="material-symbols-outlined">add</span>Add New Promo
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
                <p className="mt-4 text-slate-600">Loading promos...</p>
              </div>
            </div>
          ) : promos.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <span className="material-symbols-outlined text-4xl text-slate-300">
                  local_offer
                </span>
                <p className="mt-4 text-slate-600">
                  No promos found. Create your first one!
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                      No
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                      Promo
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                      Promo Code
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                      Discount
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                      Min. Claim
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {promos.map((promo, index) => (
                    <tr
                      key={promo.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-slate-400 font-medium">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={
                              promo.imageUrl || "https://via.placeholder.com/48"
                            }
                            alt={promo.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium text-slate-900">
                              {promo.title}
                            </p>
                            <p className="text-xs text-slate-500">
                              {promo.description?.substring(0, 30)}...
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="inline-block px-3 py-1 bg-gold/10 text-forest font-mono font-bold text-sm rounded-lg">
                          {promo.promo_code}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-emerald-600">
                        IDR{" "}
                        {promo.promo_discount_price?.toLocaleString("id-ID") ||
                          "0"}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        IDR{" "}
                        {promo.minimum_claim_price?.toLocaleString("id-ID") ||
                          "0"}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            href={`/admin/promos/${promo.id}/edit`}
                            className="p-2 text-slate-500 hover:text-gold hover:bg-slate-100 rounded-lg transition-all"
                          >
                            <span className="material-symbols-outlined">
                              edit
                            </span>
                          </Link>
                          <button
                            onClick={() => handleDeletePromo(promo.id)}
                            disabled={deletingId === promo.id}
                            className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"
                          >
                            <span className="material-symbols-outlined">
                              {deletingId === promo.id
                                ? "hourglass_empty"
                                : "delete"}
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
            <p className="text-xs text-slate-500 font-medium">
              Showing {promos.length} of {totalPromos} promos
            </p>
            <div className="flex items-center gap-2">
              <button className="p-2 text-slate-400" disabled>
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-8 h-8 rounded-lg bg-gold text-forest font-bold text-sm shadow-sm">
                1
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
