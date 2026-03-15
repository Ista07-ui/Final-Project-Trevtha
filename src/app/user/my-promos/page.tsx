"use client";

import UserDashboardHeader from "@/components/user/UserDashboardHeader";
import promoService, { type Promo } from "@/lib/services/promo";
import { useEffect, useMemo, useState } from "react";

type PromoFilter = "all" | "active" | "inactive";

const parseTerms = (value: string): string[] => {
  if (!value) return [];
  return value
    .split(/\n|;|\.|\|/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 3);
};

export default function MyPromosPage() {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [filter, setFilter] = useState<PromoFilter>("all");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const loadPromos = async () => {
    setIsLoading(true);
    setError(null);
    const data = await promoService.getAllPromos(1, 100);
    setPromos(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadPromos();
  }, []);

  const filteredPromos = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    return promos.filter((promo) => {
      const matchesFilter = filter === "all" || promo.status === filter;
      const matchesSearch =
        keyword.length === 0 ||
        promo.title.toLowerCase().includes(keyword) ||
        promo.description.toLowerCase().includes(keyword) ||
        promo.promo_code.toLowerCase().includes(keyword);
      return matchesFilter && matchesSearch;
    });
  }, [filter, promos, search]);

  const handleCopyCode = async (promoCode: string) => {
    try {
      await navigator.clipboard.writeText(promoCode);
      setSuccessMsg(`Promo code ${promoCode} copied.`);
      setTimeout(() => setSuccessMsg(null), 2500);
    } catch {
      setError("Failed to copy promo code.");
    }
  };

  return (
    <div className="layout-container flex h-full grow flex-col bg-background-light text-charcoal [--color-primary:#1B3022] [--color-forest:#1B3022] [--color-gold:#D4AF37] [--color-background-light:#F9F7F2] [--color-background-dark:#121212]">
      {/* Top Navigation */}
      <UserDashboardHeader />

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="h-20 flex items-center justify-between px-10 bg-white/50 backdrop-blur-md border-b border-accent/10 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="relative w-96">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-accent/40">
                search
              </span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-accent/5 border-none rounded-full pl-10 pr-4 py-2 focus:ring-2 focus:ring-primary text-sm"
                placeholder="Search promos..."
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={loadPromos}
              className="rounded-lg border border-primary/20 bg-white px-4 py-2 text-xs font-bold text-forest hover:bg-forest hover:text-white"
            >
              Refresh
            </button>
          </div>
        </header>

        {/* Page Title Area */}
        <div className="px-10 py-8">
          <div className="mb-8">
            <h2 className="text-4xl font-black text-accent tracking-tight">
              My Promos
            </h2>
            <p className="text-accent/60 mt-1">
              Exclusive deals and vouchers just for you
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-8 border-b border-accent/10 mb-8">
            <button
              onClick={() => setFilter("all")}
              className={`pb-4 text-sm font-bold transition-colors ${
                filter === "all"
                  ? "text-primary border-b-2 border-primary"
                  : "text-accent/40 hover:text-accent"
              }`}
            >
              All Promos
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`pb-4 text-sm font-bold transition-colors ${
                filter === "active"
                  ? "text-primary border-b-2 border-primary"
                  : "text-accent/40 hover:text-accent"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter("inactive")}
              className={`pb-4 text-sm font-bold transition-colors ${
                filter === "inactive"
                  ? "text-primary border-b-2 border-primary"
                  : "text-accent/40 hover:text-accent"
              }`}
            >
              Inactive
            </button>
          </div>

          {error ? (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </div>
          ) : null}

          {successMsg ? (
            <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
              {successMsg}
            </div>
          ) : null}

          {/* Promo Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {isLoading ? (
              <div className="xl:col-span-2 rounded-xl bg-white p-10 text-center text-accent/60">
                Loading promos...
              </div>
            ) : filteredPromos.length === 0 ? (
              <div className="xl:col-span-2 rounded-xl bg-white p-10 text-center text-accent/60">
                No promos found for the selected filter.
              </div>
            ) : (
              filteredPromos.map((promo) => {
                const conditions = parseTerms(promo.terms_condition);
                return (
                  <div
                    key={promo.id}
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-accent/5 flex flex-col md:flex-row"
                  >
                    <div className="w-full md:w-52 h-48 md:h-auto shrink-0 relative">
                      <div
                        className={`absolute top-3 left-3 z-10 text-[10px] font-black px-2 py-1 rounded uppercase tracking-wider ${
                          promo.status === "active"
                            ? "bg-primary text-accent"
                            : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {promo.status}
                      </div>
                      <img
                        className="w-full h-full object-cover"
                        src={promo.imageUrl}
                        alt={promo.title}
                      />
                    </div>
                    <div className="p-6 flex flex-col justify-between grow">
                      <div>
                        <h3 className="text-xl font-bold text-accent mb-2 leading-tight">
                          {promo.title}
                        </h3>
                        <p className="text-accent/70 text-sm mb-4">
                          {promo.description}
                        </p>
                        <div className="mb-4 grid grid-cols-2 gap-3 text-xs">
                          <div className="rounded-lg border border-primary/20 bg-primary/5 px-3 py-2">
                            <p className="font-semibold text-accent/60">
                              Discount
                            </p>
                            <p className="font-bold text-primary">
                              IDR{" "}
                              {Number(
                                promo.promo_discount_price,
                              ).toLocaleString("id-ID")}
                            </p>
                          </div>
                          <div className="rounded-lg border border-primary/20 bg-primary/5 px-3 py-2">
                            <p className="font-semibold text-accent/60">
                              Min. Claim
                            </p>
                            <p className="font-bold text-primary">
                              IDR{" "}
                              {Number(promo.minimum_claim_price).toLocaleString(
                                "id-ID",
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                          <div className="bg-primary/10 border border-primary/20 rounded-lg px-3 py-1.5 flex items-center gap-3">
                            <span className="text-xs font-bold text-primary tracking-widest uppercase">
                              {promo.promo_code}
                            </span>
                            <button
                              onClick={() => handleCopyCode(promo.promo_code)}
                              className="material-symbols-outlined text-primary text-lg leading-none"
                            >
                              content_copy
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col text-[11px] text-accent/50 italic">
                          {conditions.length > 0 ? (
                            conditions.map((condition) => (
                              <span key={`${promo.id}-${condition}`}>
                                • {condition}
                              </span>
                            ))
                          ) : (
                            <span>• No additional terms</span>
                          )}
                        </div>
                        <button
                          onClick={() => handleCopyCode(promo.promo_code)}
                          className="w-full bg-primary hover:bg-primary/90 text-accent font-black text-sm py-2.5 rounded-lg transition-all uppercase tracking-tight"
                        >
                          Copy Promo
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Footer Section */}
        <footer className="mt-auto py-10 px-10 border-t border-accent/10 text-center">
          <p className="text-xs text-accent/40">
            © 2026 TREVTHA Luxury Travel Marketplace. All rights reserved.{" "}
            <a className="underline hover:text-primary" href="#">
              Terms of Service
            </a>{" "}
            &{" "}
            <a className="underline hover:text-primary" href="#">
              Privacy Policy
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}
