"use client";

import UserDashboardHeader from "@/components/user/UserDashboardHeader";
import { useEffect, useState } from "react";
import paymentService, { type PaymentCard } from "@/lib/services/payment";

export default function PaymentMethodsPage() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPaymentMethods = async () => {
    setIsLoading(true);
    setError(null);

    const methods = await paymentService.getAllPaymentMethods();
    setPaymentMethods(methods);
    setIsLoading(false);
  };

  useEffect(() => {
    loadPaymentMethods();
  }, []);

  const handleGenerateMethods = async () => {
    setIsGenerating(true);
    setError(null);

    const result = await paymentService.addPaymentMethod({
      cardType: "visa",
      cardNumber: "4111111111111111",
      expiryDate: "12/30",
      cardholderName: "Trevtha User",
      cvv: "123",
      isDefault: true,
    });

    if (!result) {
      setError("Failed to generate payment methods");
      setIsGenerating(false);
      return;
    }

    await loadPaymentMethods();
    setIsGenerating(false);
  };

  const featuredMethod = paymentMethods[0] ?? null;

  return (
    <div className="layout-container flex h-full grow flex-col bg-background-light text-charcoal [--color-primary:#1B3022] [--color-forest:#1B3022] [--color-gold:#D4AF37] [--color-background-light:#F9F7F2] [--color-background-dark:#121212]">
      {/* Top Navigation */}
      <UserDashboardHeader />

      {/* Main Content Area */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <header className="max-w-5xl mx-auto mb-10">
          <h2 className="text-4xl font-extrabold text-forest mb-2">
            Payment Methods
          </h2>
          <p className="text-charcoal/60 text-lg">
            Securely manage your preferred ways to pay for your luxury journeys.
          </p>
          <div className="mt-5 flex gap-3">
            <button
              onClick={loadPaymentMethods}
              className="rounded-lg border border-primary/20 bg-white px-4 py-2.5 text-sm font-bold text-forest hover:bg-forest hover:text-white"
            >
              Refresh
            </button>
            <button
              onClick={handleGenerateMethods}
              disabled={isGenerating}
              className="rounded-lg bg-forest px-4 py-2.5 text-sm font-bold text-white disabled:opacity-60"
            >
              {isGenerating ? "Generating..." : "Generate Payment Methods"}
            </button>
          </div>
        </header>

        {error ? (
          <div className="max-w-5xl mx-auto mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        ) : null}

        <div className="max-w-5xl mx-auto space-y-12">
          {/* Section 1: Saved Cards */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-forest flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  credit_card
                </span>
                Saved Cards
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                <div className="col-span-3 rounded-2xl bg-white p-8 text-center text-charcoal/60 shadow-sm">
                  Loading payment methods...
                </div>
              ) : paymentMethods.length === 0 ? (
                <div className="col-span-3 rounded-2xl bg-white p-8 text-center text-charcoal/60 shadow-sm">
                  Belum ada payment method. Klik tombol generate untuk mengambil
                  data dari API.
                </div>
              ) : (
                paymentMethods.map((method, index) => (
                  <div
                    key={method.id}
                    className={`relative group p-6 rounded-2xl flex flex-col justify-between h-48 shadow-md overflow-hidden ${index === 0 ? "bg-forest text-cream shadow-xl" : "bg-white border border-primary/30 text-forest hover:shadow-lg transition-all"}`}
                  >
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                      <span className="material-symbols-outlined text-9xl">
                        account_balance
                      </span>
                    </div>
                    <div className="flex justify-between items-start z-10 gap-3">
                      <div className="w-12 h-8 bg-primary/20 rounded flex items-center justify-center overflow-hidden">
                        {method.imageUrl ? (
                          <img
                            alt={method.name}
                            className="w-8 h-auto"
                            src={method.imageUrl}
                          />
                        ) : (
                          <span className="text-[10px] font-bold">PAY</span>
                        )}
                      </div>
                      {index === 0 ? (
                        <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                          Featured
                        </span>
                      ) : null}
                    </div>
                    <div className="z-10">
                      <p className="text-xl font-bold tracking-wide mb-1">
                        {method.name}
                      </p>
                      <div className="flex justify-between items-end gap-4">
                        <div>
                          <p
                            className={`text-[10px] uppercase ${index === 0 ? "opacity-60" : "text-charcoal/40"}`}
                          >
                            Virtual Account
                          </p>
                          <p className="text-sm font-medium break-all">
                            {method.virtual_account_number || method.id}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Section 2: Available Payment Options */}
          <section className="space-y-8">
            <h3 className="text-xl font-bold text-forest flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">
                account_balance_wallet
              </span>
              Available Payment Options
            </h3>

            {/* Bank Transfer */}
            <div>
              <p className="text-sm font-bold text-charcoal/40 uppercase tracking-widest mb-4">
                Bank Transfer
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {paymentMethods.map((bank) => (
                  <div
                    key={`bank-${bank.id}`}
                    className="bg-white p-4 rounded-xl border border-primary/10 hover:border-primary hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="flex flex-col gap-3">
                      <div className="h-8 flex items-center justify-start grayscale group-hover:grayscale-0 transition-all">
                        {bank.imageUrl ? (
                          <img
                            alt={bank.name}
                            className="h-6 w-auto"
                            src={bank.imageUrl}
                          />
                        ) : null}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-forest">
                          {bank.name}
                        </p>
                        <span className="inline-block mt-1 text-[10px] bg-cream px-2 py-0.5 rounded text-primary font-bold">
                          VA:{" "}
                          {bank.virtual_account_number ||
                            "Available after checkout"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {featuredMethod ? (
              <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
                <p className="text-sm font-bold text-charcoal/40 uppercase tracking-widest mb-4">
                  Featured Payment Instructions
                </p>
                <div className="flex flex-col gap-3 text-sm text-charcoal/70">
                  <p>
                    <span className="font-bold text-forest">Provider:</span>{" "}
                    {featuredMethod.name}
                  </p>
                  <p>
                    <span className="font-bold text-forest">Account Name:</span>{" "}
                    {featuredMethod.virtual_account_name || "dibimbing"}
                  </p>
                  <p>
                    <span className="font-bold text-forest">
                      Virtual Account:
                    </span>{" "}
                    {featuredMethod.virtual_account_number ||
                      "Will appear after generation"}
                  </p>
                  <p>
                    <span className="font-bold text-forest">Tips:</span> Gunakan
                    payment method ini saat checkout, lalu upload bukti
                    pembayaran di halaman transaksi user.
                  </p>
                </div>
              </div>
            ) : null}
          </section>
        </div>

        {/* Footer Meta */}
        <footer className="max-w-5xl mx-auto mt-20 pt-8 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-4 text-charcoal/40 text-xs">
          <p>© 2026 TREVTHA Luxury Travel Marketplace. All rights reserved.</p>
          <div className="flex gap-6">
            <a className="hover:text-primary transition-colors" href="#">
              Privacy Policy
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              Terms of Service
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              PCI-DSS Compliant
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
