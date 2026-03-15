"use client";

import UserDashboardHeader from "@/components/user/UserDashboardHeader";
import { useEffect, useState } from "react";
import { cartService, type CartItem } from "@/lib/services/cart";
import paymentService from "@/lib/services/payment";
import transactionService from "@/lib/services/transaction";
import activityService, { type Activity } from "@/lib/services/activity";
import promoService, { type Promo } from "@/lib/services/promo";

export default function MyCartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [activePromos, setActivePromos] = useState<Promo[]>([]);
  const [appliedPromo, setAppliedPromo] = useState<Promo | null>(null);
  const [addForm, setAddForm] = useState({
    activityId: "",
    quantity: 1,
  });

  // Fetch cart from API on mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setIsLoading(true);
        const [cartData, activityData] = await Promise.all([
          cartService.getCart(),
          activityService.getAllActivities(1, 50),
        ]);

        setCartItems(cartData);
        setActivities(activityData);

        if (activityData.length > 0) {
          setAddForm((prev) => ({
            ...prev,
            activityId: prev.activityId || activityData[0].id,
          }));
        }

        setError(null);
      } catch (err) {
        console.error("Error fetching cart:", err);
        setError("Failed to load cart");
        setCartItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, []);

  useEffect(() => {
    const fetchPromos = async () => {
      const promos = await promoService.getActivePromos(1, 100);
      setActivePromos(promos);
    };

    fetchPromos();
  }, []);

  const handleAddItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!addForm.activityId || addForm.quantity <= 0)
      return;

    try {
      setIsLoading(true);
      const newItem = await cartService.addToCart({
        activityId: addForm.activityId,
        quantity: addForm.quantity,
      });

      if (newItem) {
        setCartItems((prev) => {
          const existing = prev.find((item) => item.id === newItem.id);
          if (existing) {
            return prev.map((item) => (item.id === newItem.id ? newItem : item));
          }

          return [...prev, newItem];
        });
        setAddForm({
          activityId: addForm.activityId,
          quantity: 1,
        });
        setIsAddFormOpen(false);
      } else {
        setError("Failed to add item to cart");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      setError("Failed to add item to cart");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) return;

    try {
      setIsLoading(true);
      const updated = await cartService.updateCartItem(itemId, newQuantity);

      if (updated) {
        setCartItems((prev) =>
          prev.map((item) =>
            item.id === itemId
              ? {
                  ...item,
                  quantity: newQuantity,
                  subtotal: item.pricePerPerson * newQuantity,
                }
              : item,
          ),
        );
      }
    } catch (err) {
      console.error("Error updating cart item:", err);
      setError("Failed to update item quantity");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    try {
      setIsLoading(true);
      const success = await cartService.removeFromCart(itemId);

      if (success) {
        setCartItems((prev) => prev.filter((item) => item.id !== itemId));
      }
    } catch (err) {
      console.error("Error deleting from cart:", err);
      setError("Failed to remove item from cart");
    } finally {
      setIsLoading(false);
    }
  };

  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.subtotal, 0)
    .toFixed(2);
  const subtotal = Number.parseFloat(totalPrice) || 0;
  const serviceFee = cartItems.length > 0 ? 120 : 0;
  const promoDiscount =
    appliedPromo && subtotal >= appliedPromo.minimum_claim_price
      ? Math.min(appliedPromo.promo_discount_price, subtotal)
      : 0;
  const finalTotal = subtotal - promoDiscount + serviceFee;

  useEffect(() => {
    if (!appliedPromo) return;

    if (subtotal < appliedPromo.minimum_claim_price) {
      setAppliedPromo(null);
      setPromoMessage(
        `Promo removed: minimum claim is IDR ${appliedPromo.minimum_claim_price.toLocaleString("id-ID")}.`,
      );
      setTimeout(() => setPromoMessage(null), 3500);
    }
  }, [appliedPromo, subtotal]);

  const handleApplyPromo = async () => {
    const code = promoCode.trim().toUpperCase();

    if (!code) {
      setPromoMessage("Please enter a promo code first.");
      return;
    }

    if (cartItems.length === 0) {
      setPromoMessage("Add item(s) to cart before applying promo.");
      return;
    }

    setIsApplyingPromo(true);

    const promos = activePromos.length > 0
      ? activePromos
      : await promoService.getActivePromos(1, 100);

    if (activePromos.length === 0) {
      setActivePromos(promos);
    }

    const matched = promos.find(
      (promo) => promo.promo_code.toUpperCase() === code,
    );

    if (!matched) {
      setAppliedPromo(null);
      setPromoMessage("Promo code is invalid or inactive.");
      setIsApplyingPromo(false);
      return;
    }

    if (subtotal < matched.minimum_claim_price) {
      setAppliedPromo(null);
      setPromoMessage(
        `Minimum claim for this promo is IDR ${matched.minimum_claim_price.toLocaleString("id-ID")}.`,
      );
      setIsApplyingPromo(false);
      return;
    }

    setAppliedPromo(matched);
    setPromoMessage(`Promo ${matched.promo_code} applied successfully.`);
    setIsApplyingPromo(false);
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0 || isCheckingOut) {
      return;
    }

    try {
      setIsCheckingOut(true);
      setError(null);

      let paymentMethods = await paymentService.getAllPaymentMethods();

      if (paymentMethods.length === 0) {
        await paymentService.addPaymentMethod({
          cardType: "visa",
          cardNumber: "4111111111111111",
          expiryDate: "12/30",
          cardholderName: "Trevtha User",
          cvv: "123",
          isDefault: true,
        });
        paymentMethods = await paymentService.getAllPaymentMethods();
      }

      const selectedPaymentMethod = paymentMethods[0];

      if (!selectedPaymentMethod) {
        setError("No payment method found. Please add a payment method first.");
        return;
      }

      const result = await transactionService.createTransaction({
        cartIds: cartItems.map((item) => item.id),
        paymentMethodId: selectedPaymentMethod.id,
      });

      if (!result.success) {
        setError(result.message || "Failed to create transaction");
        return;
      }

      await cartService.clearCart();
      setCartItems([]);
      alert("Checkout successful! Your transaction has been created.");
    } catch (checkoutError) {
      console.error("Checkout failed:", checkoutError);
      setError("Checkout failed. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="layout-container flex h-full grow flex-col bg-background-light text-charcoal [--color-primary:#1B3022] [--color-forest:#1B3022] [--color-gold:#D4AF37] [--color-background-light:#F9F7F2] [--color-background-dark:#121212]">
      {/* Top Navigation */}
      <UserDashboardHeader />

      {/* Main Content */}
      <main className="flex-1 px-10 py-12 bg-background-light">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <header className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-4xl font-extrabold text-forest">My Cart</h2>
              <p className="mt-1 text-forest/60">
                Review your luxury experiences before checkout
              </p>
            </div>
            <div className="text-right flex flex-col items-end gap-3">
              <p className="text-sm font-medium text-forest/40 uppercase tracking-widest">
                Cart Items
              </p>
              <p className="text-2xl font-bold text-forest">
                {String(cartItems.length).padStart(2, "0")}
              </p>
              {!isAddFormOpen ? (
                <button
                  onClick={() => setIsAddFormOpen(true)}
                  disabled={activities.length === 0}
                  className="bg-forest text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-opacity-90 transition-all disabled:opacity-60"
                >
                  <span className="material-symbols-outlined text-base">add</span>
                  Add New Item
                </button>
              ) : null}
            </div>
          </header>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {isAddFormOpen && (
              <div className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-sm border border-primary/10 mb-6">
                <h3 className="text-lg font-bold text-forest mb-4">
                  Add New Item
                </h3>
                <form
                  onSubmit={handleAddItem}
                  className="grid grid-cols-1 gap-4 md:grid-cols-2"
                >
                  <select
                    value={addForm.activityId}
                    onChange={(e) =>
                      setAddForm({ ...addForm, activityId: e.target.value })
                    }
                    className="rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-primary"
                    required
                  >
                    {activities.length === 0 ? (
                      <option value="">No activities available</option>
                    ) : (
                      activities.map((activity) => (
                        <option key={activity.id} value={activity.id}>
                          {activity.title}
                        </option>
                      ))
                    )}
                  </select>
                  <input
                    type="number"
                    value={addForm.quantity || ""}
                    onChange={(e) =>
                      setAddForm({
                        ...addForm,
                        quantity: Number.parseInt(e.target.value, 10) || 1,
                      })
                    }
                    placeholder="Quantity"
                    className="rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-primary"
                    min="1"
                    required
                  />
                  <div className="md:col-span-2 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsAddFormOpen(false)}
                      className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={activities.length === 0}
                      className="rounded-lg bg-forest px-5 py-2.5 text-sm font-bold text-white hover:bg-opacity-90"
                    >
                      Add to Cart
                    </button>
                  </div>
                </form>
              </div>
            )}
            {/* Cart Items List */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {error && (
                <div className="rounded-xl bg-red-50 border border-red-200 p-4">
                  <p className="text-red-700 text-sm font-medium">{error}</p>
                </div>
              )}
              {isLoading ? (
                <div className="text-center py-12">
                  <p className="text-slate-500">Loading cart...</p>
                </div>
              ) : cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-slate-500">Your cart is empty</p>
                </div>
              ) : (
                <>
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="group relative flex items-center gap-6 rounded-2xl bg-white p-5 shadow-sm transition-all hover:shadow-md"
                    >
                      <div className="h-32 w-44 shrink-0 overflow-hidden rounded-xl bg-slate-200">
                        <img
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          src={item.imageUrl}
                          alt={item.title}
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between py-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-forest">
                              {item.title}
                            </h3>
                            <p className="text-sm text-forest/60">
                              {item.location}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDeleteItem(item.id)}
                            className="text-forest/30 transition-colors hover:text-red-500"
                            disabled={isLoading}
                          >
                            <span className="material-symbols-outlined">
                              delete
                            </span>
                          </button>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-xs font-bold uppercase tracking-wider text-primary">
                              Price per person
                            </span>
                            <span className="text-lg font-bold text-forest">
                              ${item.pricePerPerson.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center rounded-lg border border-forest/10 bg-background-light px-2 py-1">
                              <button
                                type="button"
                                onClick={() =>
                                  handleUpdateQuantity(
                                    item.id,
                                    item.quantity - 1,
                                  )
                                }
                                className="flex h-8 w-8 items-center justify-center rounded-md text-forest hover:bg-primary/20 disabled:opacity-50"
                                disabled={isLoading}
                              >
                                -
                              </button>
                              <input
                                className="w-10 border-none bg-transparent text-center text-sm font-bold text-forest focus:ring-0"
                                readOnly
                                type="text"
                                value={String(item.quantity).padStart(2, "0")}
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  handleUpdateQuantity(
                                    item.id,
                                    item.quantity + 1,
                                  )
                                }
                                className="flex h-8 w-8 items-center justify-center rounded-md text-forest hover:bg-primary/20 disabled:opacity-50"
                                disabled={isLoading}
                              >
                                +
                              </button>
                            </div>
                            <div className="text-right">
                              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                                Subtotal
                              </span>
                              <p className="text-xl font-black text-forest">
                                ${item.subtotal.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {/* Promo Section */}
              <div className="mt-4 flex flex-col gap-4 rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 p-6">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-forest">Have a promo code?</h4>
                  <a
                    className="text-sm font-bold text-primary hover:underline underline-offset-4"
                    href="/user/my-promos"
                  >
                    View Available Promos
                  </a>
                </div>
                {cartItems.length > 0 ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-3">
                      <input
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-1 rounded-xl border-forest/10 bg-white px-4 py-3 text-sm focus:border-primary focus:ring-primary"
                        placeholder="Enter code (e.g. TREVTHA2026)"
                        type="text"
                      />
                      <button
                        onClick={handleApplyPromo}
                        disabled={isApplyingPromo}
                        className="rounded-xl bg-forest px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-charcoal disabled:opacity-60"
                      >
                        {isApplyingPromo ? "Applying..." : "Apply"}
                      </button>
                    </div>
                    {promoMessage ? (
                      <p className="text-xs font-semibold text-forest/70">
                        {promoMessage}
                      </p>
                    ) : null}
                    {appliedPromo ? (
                      <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
                        Applied: {appliedPromo.promo_code} (Discount IDR{" "}
                        {appliedPromo.promo_discount_price.toLocaleString("id-ID")})
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <p className="text-sm text-forest/60">
                    Add at least one item to your cart to apply a promo code.
                  </p>
                )}
              </div>
            </div>

            {/* Checkout Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 flex flex-col gap-6 rounded-3xl bg-forest p-8 text-white shadow-2xl">
                <h3 className="text-2xl font-bold">Checkout Summary</h3>
                <div className="flex flex-col gap-4 border-b border-white/10 pb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">
                      Subtotal ({cartItems.length} items)
                    </span>
                    <span className="font-medium">${totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Promo Discount</span>
                    <span className="font-medium text-primary">
                      -${promoDiscount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">
                      Service Fee (Luxury Care)
                    </span>
                    <span className="font-medium">${serviceFee.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 pt-2">
                  <div className="flex justify-between items-end">
                    <span className="text-lg font-medium text-white/80">
                      Final Total
                    </span>
                    <span className="text-3xl font-black text-primary">
                      ${finalTotal.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-[10px] text-white/40 italic">
                    *All taxes and luxury surcharges included
                  </p>
                </div>
                <div className="mt-4 flex flex-col gap-3">
                  <button
                    onClick={handleCheckout}
                    disabled={
                      isCheckingOut || isLoading || cartItems.length === 0
                    }
                    className="w-full rounded-xl bg-primary py-4 text-center text-lg font-extrabold text-forest shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isCheckingOut
                      ? "Processing..."
                      : cartItems.length === 0
                        ? "Cart is Empty"
                        : "Proceed to Checkout"}
                  </button>
                  <div className="flex items-center justify-center gap-2 text-xs text-white/40">
                    <span className="material-symbols-outlined text-sm">
                      lock
                    </span>
                    Secure SSL Encrypted Payment
                  </div>
                </div>
                {/* Trust Badges */}
                <div className="mt-4 grid grid-cols-3 gap-2 opacity-50">
                  <div className="flex flex-col items-center gap-1">
                    <span className="material-symbols-outlined text-xl">
                      verified_user
                    </span>
                    <span className="text-[8px] uppercase font-bold text-center">
                      Insured Travel
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1 border-x border-white/10">
                    <span className="material-symbols-outlined text-xl">
                      support_agent
                    </span>
                    <span className="text-[8px] uppercase font-bold text-center">
                      24/7 VIP Concierge
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="material-symbols-outlined text-xl">
                      flight_takeoff
                    </span>
                    <span className="text-[8px] uppercase font-bold text-center">
                      Fast-Track Entry
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
