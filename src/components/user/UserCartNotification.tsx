export default function UserCartNotification() {
  return (
    <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="size-10 bg-accent text-primary rounded-full flex items-center justify-center shadow-sm">
          <span className="material-symbols-outlined">shopping_cart</span>
        </div>
        <div>
          <p className="font-bold text-primary">Items in your cart</p>
          <p className="text-xs text-primary/70">
            You have 2 luxury experiences waiting. Complete your booking now.
          </p>
        </div>
      </div>
      <button className="bg-primary text-accent px-4 py-2 rounded-lg font-bold text-xs hover:brightness-110 transition-all">
        Checkout
      </button>
    </div>
  );
}
