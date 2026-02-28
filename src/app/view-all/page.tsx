import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const categories = [
  { name: "Luxury", icon: "diamond", active: true },
  { name: "Adventure", icon: "landscape", active: false },
  { name: "Beach", icon: "beach_access", active: false },
  { name: "Mountain", icon: "terrain", active: false },
  { name: "Cultural", icon: "museum", active: false },
];

const stays = [
  {
    id: 1,
    location: "Maldives, Ari Atoll",
    title: "Soneva Fushi Private Retreat",
    reviews: 128,
    oldPrice: "$1,450",
    price: "$1,120",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBLsMkotxX2uToHva37ThV6TaC2t42OnRnyNdqULNSzaChtn3rHgOEl_G04DhaIuQBK92ill8XsCzBHyIhmqVzlaVEBQYqURjMjIm6eCzhc_uMoMVEZ-Sou8H23LKxC8Q4o-s4KAj0olh7Z_iD9RmLx2c6K_gp0JKK5gSK_GQcEiQYYKdyRd0xWjs4jl6r-aDh5ykBQohTPUlviDWRCgPTeTXXelLvRaeqQUYT7PDYf_vaWbhJVnh-XMSzFjaU5FPUwHu1COmlVMZ9T",
    stars: 5,
  },
  {
    id: 2,
    location: "Paris, France",
    title: "Hôtel Plaza Athénée Suite",
    reviews: 85,
    oldPrice: "$2,100",
    price: "$1,850",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA8a0jKvECOk3nYG29DhJkpLIwhE8_ExpMmA5KVMWUcuCmTsVQAbR8OGizPtxO6T9IOeB5G4q-2aoRuc6bEdlPGQUl0qUC8xOGQpmE5vD85FHUCwmTlfNPFvr0WaIZWj5StLr32cdvIBSeaR3OU72psnNiwzsYKHiotXfi8UWgfvFg0xps03YsMWoI1vGjE9D75tpOk2xxDV9LT1YNsagPQMMUX8H2lZnLeTFjWc1FfcZbwE_gl3_2_f6APkNQKCHvbFtCBUqPyFGPs",
    stars: 4,
  },
  {
    id: 3,
    location: "Kyoto, Japan",
    title: "Aman Kyoto Forest Villa",
    reviews: 212,
    oldPrice: "$1,200",
    price: "$950",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCUI6A2Bp3CdrSL45cy06evgEKiTzCXMoKr09McraOO-i1HEGeICQkRT3LRP4n7t4YHXqXO27b1m7vE_ycBlwP_Pys2rW3mlLjuLWR6DxQwS1QC3vQTfCuE5z15ca6iy2zzTexnWOk5_no5_ws2Xe-1GxKfzYBu08mHr3w0SltGyY5Ga6k0UTzBEBWb4crL0zVfbhWPzDM78njE0d5jfQ2gNf05pOpFWXKgLG439ZFOde9CDUiZgkHvBS3_6AV7oTwLREPmT9ZKkyte",
    stars: 5,
  },
  {
    id: 4,
    location: "Santorini, Greece",
    title: "Grace Hotel Infinity Suite",
    reviews: 156,
    oldPrice: "$1,800",
    price: "$1,400",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCCscZVE9XnqaHUu2YZ0AgIwYZlaU-X35dsn2Kbw-Ax1lnmTe6Xq0TEiYJ04uUWVLb4ZHoZuO_kJsHkY0aypRUvw7DKVioHNBzNnR5VEsGdPKMUILRQpioTg4b4qHY2zT0e240iFDAl_TsJVmiIIfZpt29W57wj7DDOcbG-93kpOP9kAgwEFYUUT-nVGDOI_l6haFxajMgvXqRnMWYWkBwRwEbGXsSs0Q-gcOt0nE5U9K3NffASjZV6vZSPwHiScxKjy4x7-XZIyWOE",
    stars: 5,
  },
  {
    id: 5,
    location: "Serengeti, Tanzania",
    title: "Four Seasons Safari Lodge",
    reviews: 94,
    oldPrice: "$2,450",
    price: "$1,990",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDHPIZn9ub2SBMk-cHNwdV2OSTKMk48Mw33_-R8sBrzHlRi2gdlB__UOcYzUC7vrbmB-GKEBtQwsLqqQFSICmBvXA3-Nmc1HJR2QXERgSXKtlAdprYFL82pnOtx-O5s2orZLTEF8-Sw0kV_hOx4Wj04ouhgTFHyer4hzGrJ5qR3_6SaAUKNAG02_7BhQ7PlC3d35X0wACkn-S8PYkKzQjjbJMER1pY9nowNBFRWykNJqmOTGgHt8uxA3edOKHQ9qSBLOStufKEylARE",
    stars: 4,
  },
  {
    id: 6,
    location: "Zermatt, Switzerland",
    title: "Matterhorn Glacier View Chalet",
    reviews: 412,
    oldPrice: "$1,900",
    price: "$1,650",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDCXObHYwDnD-wGHEhD0G_-LxebviPA-2r-oK_EXsTVG0dE5Duk9F0HjTWtwhfvKOzTLY7inPPKUNo-fITvxnvdj41eILG5kTm_a2qdaFPzlt_C9FuAsyhRfcoY1CYhKxwUox0tCzQAv5Hj-pbRieXzGM8v8jgGgzOhD3lbG3r0-yejoKDvJIh1Tzv5szcVSXUBiOIE88b9ZeigJb2CV6E-38v_zMcAn4Y12wiIL0fmFHVRwXrJA0pWxnpoevBdGE-Um0v_9ohpuDDM",
    stars: 5,
  },
];

function Stars({ count }: Readonly<{ count: number }>) {
  return (
    <div className="flex text-primary">
      {Array.from({ length: 5 }, (_, index) => (
        <span
          key={`${count}-${index}`}
          className={`material-symbols-outlined text-lg ${index < count ? "" : "text-forest/30"}`}
        >
          star
        </span>
      ))}
    </div>
  );
}

export default function ViewAllPage() {
  return (
    <div className="min-h-screen bg-cream text-charcoal">
      <Header />

      <section className="px-6 py-6 lg:px-20">
        <div className="relative flex flex-col items-center justify-between gap-6 overflow-hidden rounded-2xl bg-forest p-6 lg:flex-row lg:p-10">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-primary blur-3xl" />
            <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-primary blur-3xl" />
          </div>

          <div className="relative z-10 flex flex-col gap-2">
            <span className="text-xs font-bold tracking-widest text-primary uppercase">
              Limited Time Luxury
            </span>
            <h2 className="text-2xl font-bold text-cream lg:text-3xl">
              Exclusive Seasonal Offers
            </h2>
            <p className="max-w-lg text-base text-cream/70">
              Experience the world&apos;s most breathtaking destinations with
              our curated premium packages.
            </p>
          </div>

          <div className="relative z-10 flex items-center rounded-xl border border-white/10 bg-cream/5 p-2 backdrop-blur-sm">
            <div className="px-4">
              <p className="text-[10px] font-bold tracking-wider text-white/60 uppercase">
                Promo Code
              </p>
              <p className="text-xl font-black tracking-tighter text-primary">
                GOLDEN2026
              </p>
            </div>
            <button className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-forest transition-all hover:brightness-95">
              <span className="material-symbols-outlined text-lg">
                content_copy
              </span>
              <span>Copy Code</span>
            </button>
          </div>
        </div>
      </section>

      <main className="grid grid-cols-1 gap-10 px-6 py-8 lg:grid-cols-4 lg:px-20">
        <aside className="flex flex-col gap-8 lg:col-span-1">
          <div className="rounded-2xl border border-forest/5 bg-white p-6 shadow-sm">
            <h3 className="mb-6 text-lg font-bold text-forest">
              Filter by Category
            </h3>
            <div className="flex flex-col gap-3">
              {categories.map((category) => (
                <button
                  key={category.name}
                  className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition-all ${
                    category.active
                      ? "bg-primary/10 font-bold text-forest"
                      : "font-medium text-forest/60 hover:bg-forest/5"
                  }`}
                >
                  <span
                    className={`material-symbols-outlined ${
                      category.active ? "text-primary" : "text-forest/40"
                    }`}
                  >
                    {category.icon}
                  </span>
                  {category.name}
                </button>
              ))}
            </div>

            <div className="mt-10">
              <h3 className="mb-6 text-lg font-bold text-forest">
                Price Range
              </h3>
              <div className="relative mt-8 h-1 w-full rounded-full bg-forest/10">
                <div className="absolute top-0 left-1/4 right-0 h-full rounded-full bg-primary" />
                <div className="absolute top-1/2 left-1/4 size-4 -translate-y-1/2 rounded-full border-4 border-white bg-primary shadow-md" />
                <div className="absolute top-1/2 right-0 size-4 -translate-y-1/2 rounded-full border-4 border-white bg-primary shadow-md" />
              </div>
              <div className="mt-4 flex justify-between">
                <span className="text-xs font-bold text-forest/40">$500</span>
                <span className="text-sm font-bold text-forest">$10,000+</span>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="mb-4 text-lg font-bold text-forest">Sort By</h3>
              <select className="w-full rounded-xl border border-forest/10 bg-cream p-3 text-sm focus:border-primary focus:ring-primary">
                <option>Recommended</option>
                <option>Lowest Price</option>
                <option>Highest Rating</option>
              </select>
            </div>
          </div>
        </aside>

        <section className="flex flex-col gap-8 lg:col-span-3">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {stays.map((stay) => (
              <article
                key={stay.id}
                className="group overflow-hidden rounded-2xl border border-forest/5 bg-white transition-all hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={stay.image}
                    alt={stay.title}
                    fill
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 rounded-full bg-primary px-3 py-1 text-[10px] font-black tracking-widest text-forest uppercase">
                    Exclusive
                  </div>
                  <button className="absolute top-4 right-4 flex size-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-colors hover:text-red-500">
                    <span className="material-symbols-outlined text-2xl">
                      favorite
                    </span>
                  </button>
                </div>

                <div className="p-6">
                  <div className="mb-2 flex items-center gap-1 text-xs font-bold tracking-wider text-forest/40 uppercase">
                    <span className="material-symbols-outlined text-sm">
                      location_on
                    </span>
                    {stay.location}
                  </div>

                  <h4 className="mb-3 text-lg leading-tight font-bold text-forest">
                    {stay.title}
                  </h4>

                  <div className="mb-4 flex items-center gap-2">
                    <Stars count={stay.stars} />
                    <span className="text-xs font-bold text-forest/40">
                      ({stay.reviews} Reviews)
                    </span>
                  </div>

                  <div className="flex items-end justify-between border-t border-forest/5 pt-4">
                    <div>
                      <span className="block text-xs text-forest/30 line-through">
                        {stay.oldPrice}
                      </span>
                      <span className="text-xl font-black text-forest">
                        {stay.price}
                      </span>
                      <span className="text-[10px] font-bold text-forest/40">
                        {" "}
                        / NIGHT
                      </span>
                    </div>
                    <button className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-all hover:bg-primary hover:text-forest">
                      <span className="material-symbols-outlined">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 py-10">
            <button className="flex size-10 items-center justify-center rounded-lg border border-forest/10 text-forest/40 transition-all hover:text-primary">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="flex size-10 items-center justify-center rounded-lg bg-primary font-bold text-forest">
              1
            </button>
            <button className="flex size-10 items-center justify-center rounded-lg border border-forest/10 font-bold text-forest/60 transition-all hover:border-primary hover:text-primary">
              2
            </button>
            <button className="flex size-10 items-center justify-center rounded-lg border border-forest/10 font-bold text-forest/60 transition-all hover:border-primary hover:text-primary">
              3
            </button>
            <span className="text-forest/40">...</span>
            <button className="flex items-center gap-1 rounded-lg border border-forest/10 px-4 py-2 font-bold text-forest/60 transition-all hover:border-primary hover:text-primary">
              <span>Next</span>
              <span className="material-symbols-outlined text-sm">
                chevron_right
              </span>
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
