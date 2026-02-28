import Image from "next/image";

export default function HotDealsPromo() {
  return (
    <div className="mb-16 bg-forest rounded-3xl p-8 md:p-12 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-32 -mt-32 blur-3xl" />
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary font-bold text-xs uppercase tracking-widest mb-4">
            Limited Time
          </span>
          <h2 className="text-white text-4xl md:text-5xl font-black mb-6">
            Hot Deals & <span className="text-primary">Exclusive Promos</span>
          </h2>
          <p className="text-cream/70 text-lg mb-8 max-w-xl">
            Experience the pinnacle of luxury for less. Book your dream escape
            today and enjoy unparalleled discounts on world-class destinations.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-2 min-w-50">
              <span className="text-primary text-3xl font-black">Save 50%</span>
              <span className="text-cream/60 text-sm">
                On Maldives Overwater Villas
              </span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-2 min-w-50">
              <span className="text-primary text-3xl font-black">BOGO</span>
              <span className="text-cream/60 text-sm">
                On European River Cruises
              </span>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3 aspect-square rounded-2xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 relative">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDexww3XmtpTVzKqwRfwb-FSsYCU5yWYcwPA4AYGQJoE33uVIVqy9UJx9zS7t6MxwzBI6FBXTNlvtHfu0KfuVi2dYHzqGfwpFypk5g7rTcBb2mcN9xRMaBFu1KHbBzjMbrw1JEvRBkiShw72S96MUR4rw2jFBAoZjpKfZOd_NnKbkZHswZJdNW3t-DNiJshP6sSTTJ-1lCbOC6lZS231vK7uq4--hzcVHWJx3ycBEjxslwukEAjhfqJeDepRu_0kkXXr4NGu9xGVryj"
            alt="Luxury Deal"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      </div>
    </div>
  );
}
