"use client";

import UserDashboardHeader from "@/components/user/UserDashboardHeader";
import { useEffect, useState } from "react";
import { cartService, type CartItem } from "@/lib/services/cart";

export default function MyCartPage() {
  const defaultCartItems: CartItem[] = [
    {
      id: "1",
      title: "Bali Private Villa",
      location: "Uluwatu, Indonesia • 5 Nights",
      pricePerPerson: 2500.0,
      quantity: 2,
      subtotal: 5000.0,
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCKyGdtCp_8aBaG13yK1PtenlCtnhabooOb2cvbwB03jCtXJ8ZKqO2EVeaxR4J3iC8UHwzRo7ssbcg_j9svrPWDRMl2Ins1AeJ49f141PWDNVcX0dxavPDf65oR3Mcj94Z65tg75Ja1iGWK8r8hkMjdUpYUUrkAS05yFv-w4q4aMMFQzslRLxqe7ufonaD1HmV5OdZ4cdbo-wy0SzF4Qb4MQWNKzP0_9WxZGN03_jLZD9tF43OHwLYropYpJ4aK-8jqPz4Fo6QgIxnr",
    },
    {
      id: "2",
      title: "Tokyo City Tour",
      location: "Guided VIP Culinary Experience",
      pricePerPerson: 450.0,
      quantity: 2,
      subtotal: 900.0,
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDKEca-7PKlsL2U9e2yeepWQScYy6QS6TZrIDDchgOrlFW7CKtG46ES5rul6pjpOwVj25JvBHC3AXLaOO7INwG341PpkaUO3Sv-D7PVhKQL5J0Ery8W5wkinYqVOzV2aIokz0Umd_ncoTj93q3giiGz8JTffv9pgI3SdPAqe8MuyHM8hg0R1EYtyiDV4UY1gKmMiEQU_EXoAAWSRcZik-tPZ97gWD8KnR4LIdl2QpOcJ4N7bZ1a-jL9_rPjGqGp3tzufHt9ip1toMWl",
    },
  ];
  const [cartItems, setCartItems] = useState<CartItem[]>(defaultCartItems);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [addForm, setAddForm] = useState({
    title: "",
    location: "",
    pricePerPerson: 0,
    quantity: 1,
    imageUrl: "",
  });

  // Fetch cart from API on mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setIsLoading(true);
        const data = await cartService.getCart();
        setCartItems(data.length > 0 ? data : defaultCartItems);
        setError(null);
      } catch (err) {
        console.error("Error fetching cart:", err);
        setError("Failed to load cart");
        setCartItems(defaultCartItems);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleAddItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!addForm.title || addForm.pricePerPerson <= 0 || addForm.quantity <= 0)
      return;

    try {
      setIsLoading(true);
      const newItem = await cartService.addToCart({
        activityId: "manual",
        quantity: addForm.quantity,
        pricePerPerson: addForm.pricePerPerson,
        title: addForm.title,
        location: addForm.location,
        imageUrl: addForm.imageUrl,
      });

      if (newItem) {
        setCartItems((prev) => [...prev, newItem]);
        setAddForm({
          title: "",
          location: "",
          pricePerPerson: 0,
          quantity: 1,
          imageUrl: "",
        });
        setIsAddFormOpen(false);
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
            <div className="text-right">
              <p className="text-sm font-medium text-forest/40 uppercase tracking-widest">
                Cart Items
              </p>
              <p className="text-2xl font-bold text-forest">
                {String(cartItems.length).padStart(2, "0")}
              </p>
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
                  <input
                    type="text"
                    value={addForm.title}
                    onChange={(e) =>
                      setAddForm({ ...addForm, title: e.target.value })
                    }
                    placeholder="Experience Title"
                    className="rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-primary"
                    required
                  />
                  <input
                    type="text"
                    value={addForm.location}
                    onChange={(e) =>
                      setAddForm({ ...addForm, location: e.target.value })
                    }
                    placeholder="Location & Duration"
                    className="rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-primary"
                  />
                  <input
                    type="number"
                    value={addForm.pricePerPerson || ""}
                    onChange={(e) =>
                      setAddForm({
                        ...addForm,
                        pricePerPerson: parseFloat(e.target.value) || 0,
                      })
                    }
                    placeholder="Price per Person"
                    className="rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-primary"
                    step="0.01"
                    required
                  />
                  <input
                    type="number"
                    value={addForm.quantity || ""}
                    onChange={(e) =>
                      setAddForm({
                        ...addForm,
                        quantity: parseInt(e.target.value) || 1,
                      })
                    }
                    placeholder="Quantity"
                    className="rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-primary"
                    min="1"
                    required
                  />
                  <input
                    type="url"
                    value={addForm.imageUrl}
                    onChange={(e) =>
                      setAddForm({ ...addForm, imageUrl: e.target.value })
                    }
                    placeholder="Image URL"
                    className="rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-primary md:col-span-2"
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
                  {!isAddFormOpen && (
                    <button
                      onClick={() => setIsAddFormOpen(true)}
                      className="self-start mb-4 bg-forest text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 hover:bg-opacity-90 transition-all"
                    >
                      <span className="material-symbols-outlined">add</span>
                      Add New Item
                    </button>
                  )}
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
                    href="#"
                  >
                    View Available Promos
                  </a>
                </div>
                <div className="flex gap-3">
                  <input
                    className="flex-1 rounded-xl border-forest/10 bg-white px-4 py-3 text-sm focus:border-primary focus:ring-primary"
                    placeholder="Enter code (e.g. TREVTHA2026)"
                    type="text"
                  />
                  <button className="rounded-xl bg-forest px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-charcoal">
                    Apply
                  </button>
                </div>
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
                    <span className="font-medium text-primary">-$0.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">
                      Service Fee (Luxury Care)
                    </span>
                    <span className="font-medium">$120.00</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 pt-2">
                  <div className="flex justify-between items-end">
                    <span className="text-lg font-medium text-white/80">
                      Final Total
                    </span>
                    <span className="text-3xl font-black text-primary">
                      ${(parseFloat(totalPrice) + 120).toFixed(2)}
                    </span>
                  </div>
                  <p className="text-[10px] text-white/40 italic">
                    *All taxes and luxury surcharges included
                  </p>
                </div>
                <div className="mt-4 flex flex-col gap-3">
                  <button className="w-full rounded-xl bg-primary py-4 text-center text-lg font-extrabold text-forest shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95">
                    Proceed to Checkout
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
