"use client";

import UserDashboardHeader from "@/components/user/UserDashboardHeader";
import { useEffect, useState } from "react";
import paymentService, { type PaymentCard } from "@/lib/services/payment";

export default function PaymentMethodsPage() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
  const [addCardForm, setAddCardForm] = useState({
    cardType: "visa" as "visa" | "mastercard" | "amex" | "discover",
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

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
      cardType: addCardForm.cardType,
      cardNumber: addCardForm.cardNumber || "4111111111111111",
      expiryDate: addCardForm.expiryDate || "12/30",
      cardholderName: addCardForm.cardholderName || "Trevtha User",
      cvv: addCardForm.cvv || "123",
      isDefault: paymentMethods.length === 0,
    });

    if (!result) {
      setError("Failed to add card. Please try again.");
      setIsGenerating(false);
      return;
    }

    await loadPaymentMethods();
    setIsGenerating(false);
    setIsAddCardOpen(false);
    setAddCardForm({
      cardType: "visa",
      cardholderName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    });
    setSuccessMsg("Card added successfully!");
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleDeleteCard = async (cardId: string) => {
    if (!confirm("Remove this payment method?")) return;
    setIsDeletingId(cardId);
    const ok = await paymentService.deletePaymentMethod(cardId);
    if (ok) {
      setPaymentMethods((prev) => prev.filter((m) => m.id !== cardId));
      setSuccessMsg("Payment method removed.");
      setTimeout(() => setSuccessMsg(null), 3000);
    } else {
      setError("Failed to remove payment method.");
    }
    setIsDeletingId(null);
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
              onClick={() => setIsAddCardOpen((v) => !v)}
              className="rounded-lg bg-forest px-4 py-2.5 text-sm font-bold text-white hover:bg-forest/80"
            >
              {isAddCardOpen ? "Cancel" : "+ Add Card"}
            </button>
          </div>

          {/* Add Card Form */}
          {isAddCardOpen ? (
            <div className="mt-6 rounded-2xl border border-primary/20 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-forest mb-4">
                Add New Card
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-charcoal/60 uppercase tracking-wider mb-1">
                    Card Type
                  </label>
                  <select
                    value={addCardForm.cardType}
                    onChange={(e) =>
                      setAddCardForm({
                        ...addCardForm,
                        cardType: e.target.value as
                          | "visa"
                          | "mastercard"
                          | "amex"
                          | "discover",
                      })
                    }
                    className="w-full rounded-lg border border-primary/20 bg-background-light px-4 py-2.5 text-sm text-forest focus:border-primary focus:outline-none"
                  >
                    <option value="visa">Visa</option>
                    <option value="mastercard">Mastercard</option>
                    <option value="amex">American Express</option>
                    <option value="discover">Discover</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-charcoal/60 uppercase tracking-wider mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Thatha Ananta"
                    value={addCardForm.cardholderName}
                    onChange={(e) =>
                      setAddCardForm({
                        ...addCardForm,
                        cardholderName: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-primary/20 bg-background-light px-4 py-2.5 text-sm text-forest focus:border-primary focus:outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-charcoal/60 uppercase tracking-wider mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 4111 1111 1111 1111"
                    maxLength={19}
                    value={addCardForm.cardNumber}
                    onChange={(e) =>
                      setAddCardForm({
                        ...addCardForm,
                        cardNumber: e.target.value.replace(/\D/g, ""),
                      })
                    }
                    className="w-full rounded-lg border border-primary/20 bg-background-light px-4 py-2.5 text-sm text-forest font-mono focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal/60 uppercase tracking-wider mb-1">
                    Expiry Date (MM/YY)
                  </label>
                  <input
                    type="text"
                    placeholder="12/30"
                    maxLength={5}
                    value={addCardForm.expiryDate}
                    onChange={(e) =>
                      setAddCardForm({
                        ...addCardForm,
                        expiryDate: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-primary/20 bg-background-light px-4 py-2.5 text-sm text-forest focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal/60 uppercase tracking-wider mb-1">
                    CVV
                  </label>
                  <input
                    type="password"
                    placeholder="•••"
                    maxLength={4}
                    value={addCardForm.cvv}
                    onChange={(e) =>
                      setAddCardForm({ ...addCardForm, cvv: e.target.value })
                    }
                    className="w-full rounded-lg border border-primary/20 bg-background-light px-4 py-2.5 text-sm text-forest focus:border-primary focus:outline-none"
                  />
                </div>
              </div>
              <div className="mt-5 flex gap-3">
                <button
                  onClick={handleGenerateMethods}
                  disabled={isGenerating}
                  className="rounded-lg bg-forest px-6 py-2.5 text-sm font-bold text-white disabled:opacity-60 hover:bg-forest/80"
                >
                  {isGenerating ? "Adding..." : "Add Card"}
                </button>
                <button
                  onClick={() => setIsAddCardOpen(false)}
                  className="rounded-lg border border-primary/20 px-6 py-2.5 text-sm font-bold text-forest hover:bg-primary/5"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : null}
        </header>

        {error ? (
          <div className="max-w-5xl mx-auto mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        ) : null}

        {successMsg ? (
          <div className="max-w-5xl mx-auto mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            {successMsg}
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
                  No payment methods yet. Click{" "}
                  <strong>+ Add Card</strong> to add one.
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
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-[10px] uppercase ${index === 0 ? "opacity-60" : "text-charcoal/40"}`}
                          >
                            Virtual Account
                          </p>
                          <p className="text-sm font-medium break-all">
                            {method.virtual_account_number || method.id}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeleteCard(method.id)}
                          disabled={isDeletingId === method.id}
                          className={`z-10 shrink-0 rounded-lg px-2.5 py-1 text-[11px] font-bold transition-colors disabled:opacity-50 ${
                            index === 0
                              ? "bg-white/20 text-white hover:bg-white/30"
                              : "bg-red-50 text-red-600 hover:bg-red-100"
                          }`}
                        >
                          {isDeletingId === method.id ? "…" : "Remove"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Section 2: Payment Instructions */}
          {featuredMethod ? (
            <section>
              <h3 className="text-xl font-bold text-forest flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary">
                  account_balance_wallet
                </span>
                How to Pay
              </h3>
              <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
                <p className="text-sm font-bold text-charcoal/40 uppercase tracking-widest mb-4">
                  Payment Instructions — {featuredMethod.name}
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
                    {featuredMethod.virtual_account_number || "—"}
                  </p>
                  <p className="text-xs text-charcoal/50 mt-2">
                    Select a payment method at checkout, then upload your
                    payment proof on the Transactions page.
                  </p>
                </div>
              </div>
            </section>
          ) : null}
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
