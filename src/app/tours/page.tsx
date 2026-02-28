"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function ToursPage() {
  const activities = [
    {
      id: 1,
      title: "Sunrise at Mount Bromo",
      location: "East Java, Indonesia",
      rating: 5,
      reviews: 48,
      originalPrice: "$450",
      price: "$360",
      discount: "-20% OFF",
      category: "Mountain",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBDr_av39_j7iv88pv850DZao3cHQe8rK5pGeY-xz1CAPc599s-pvCKKP0aCSPyHWRyQjVklTkwbXy3X0JJogS9QAjFigvaBTzldP_rGes3Uu2sOm52gf6tEJxfhR5XIkqkdSR9USoBB6AsKzhvzVvBRMZVeQwOmLWNAm6mm_1YO-e7DQ-aepuISSURUMOw-ZNr8TFjc0kGE4SGTaMAG8LLKLcts2g1HGRfKen_-zY9VKJKk2DrgzqMJOoRVGTIEes1G_8dK_Bug8nI",
      amenities: [
        { icon: "directions_car", label: "Transport" },
        { icon: "restaurant", label: "Meals" },
      ],
      perPerson: true,
    },
    {
      id: 2,
      title: "Private Yacht Charter",
      location: "Amalfi Coast, Italy",
      rating: 5,
      reviews: 124,
      originalPrice: "",
      price: "$2,400",
      discount: "",
      category: "Beach",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCA04-wpTuYrnE8oibEejomBhUSlshFD9OkVA1Zx-TxM90BpCJoF3SBYvs9tUPq1cu6q4uRhpNQr59vdC1mLmGs-0tSLBWtZc4vMLoFCEPC1JbXY_Ppgjb3SPhxMkAaRiktrwz5YSQAIII2NrrWLL9w8ldhdKvkQTBBoEDLM_kcNnZ2m0DgOUvDuqFz7Z9OhmVk94JIaVtLutA3Marz3fF8EOURyWQHQtxYF5XiaUrcG68GnuOaDPcIpXod8O1VTNGNq82HP7gpLjmv",
      amenities: [
        { icon: "local_bar", label: "Open Bar" },
        { icon: "pool", label: "Diving Gear" },
      ],
      perPerson: false,
    },
    {
      id: 3,
      title: "Traditional Zen Ritual",
      location: "Kyoto, Japan",
      rating: 4.5,
      reviews: 92,
      originalPrice: "$180",
      price: "$125",
      discount: "HOT DEAL",
      category: "Cultural",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAoyI-0nJU-zk2AiYoEDuhEUNzJbRkITesyelqLpj-MtAaJ5KYlE56NQGnA9j1RPS194P8EWzu387gIqoK6qlUXKhqL-OBWgVIfL5qHOUR-o62aubVKrCvOa_f52zzEX0BZOpBNwK5TE8VMO8DiTZ3UwsnplvutK5AdJNAt4lXAma0VCFOnzNIIhP7Uk-7wdbeo6Hj3zLv8S0myJk8rXdlNT7FvzM3uu8b9QQYfZJ-TaEjGSDwSU-99RrDJc2nmsGKBJgmlte1pYu17",
      amenities: [
        { icon: "interpreter_mode", label: "Guide" },
        { icon: "local_cafe", label: "Tea Ceremony" },
      ],
      perPerson: true,
    },
    {
      id: 4,
      title: "Serengeti Balloon Safari",
      location: "Arusha, Tanzania",
      rating: 5,
      reviews: 210,
      originalPrice: "",
      price: "$850",
      discount: "",
      category: "Wildlife",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCGFPUN8eG-2wWnOm8RwicrrZ5qoeH8NTm6n5dtwtqJVTAmK6LdMC3PnPqZ8_TmJOUfK9uQ0oA6GwsoOLRYFlb8vmfY9dPqnN4IQT60fEcrbM1AlpEtSj1k_mPlqA_WrKJ17UBwoSLpRz0dIn6SJH2_Rc9e9Gxozbgw5H-k4ITxEBLO8U8MOXZNVGbBfQmLldx_YC_pWUQzTPa8Y_mmkvEGzjLvpNAvcBzJW__XqHcRs9cXiZ7E1yVKRd1puw67WdwXQ1DyOCJpidxj",
      amenities: [
        { icon: "photo_camera", label: "Pro Photos" },
        { icon: "celebration", label: "Champagne" },
      ],
      perPerson: true,
    },
  ];

  const dealImages = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDhya9wdgNws2l-YhmxfBwGFI2Uikl3XNt8GUbefAkasxBBM03cVz7LywYumZ4gEuPfqB7JMIMKw6sGIh02UB7ai82Ntsq55-R2pkconcMdFwqV_lJDMAL8YL71U7vRO7pOXDcxJNvGsvPyU10I-9PfiBTE_1dH7JpH5yOkxyAYvWFkuiEz-Kl4u1lWjEVO4Gz6bUVTfi2Vzrh75JFpDNQQr-Sg6z0g9jFdlfq1SKk0_JYzMrACD7mtM_C86E0VYLUaGMTCgOXxoxom",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAxWtSOt6sen0w9n1eTjuiHrBdavskRLMcwAd-ZaGxrqsZYU1exTnP3hkaZcPZ_g916n7W0kik_korfTUbSNo--sIP8EcfyUZt83lmhWxeHYl_MjE3wSxvs7DlrNwHqXFo0yCzrdkni2kkRD7SqJ6sDa8Qyz5DWvQuHmP3wRpCXYPbcQjYycBFigFDDEcCmB1R8wLDuVO19562SqMfN5JiiRe0VDDeVQOSVeeFKs9EpmeUrO4NBaNVLQ64xTCck7GSZq8LQeCTmjvBF",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBoqDfQL7Nk8OAANXU-A5CFsiDaxmZgmQS2Q_Lv2hgZJUiWJIErnpPYSs8598Am6d4ZNawGSjEKb0JWJ7sJ5ST-8y6Q87lAjFsjFOz4boFmwzWvssDe2STvCm8YWLC8hxliGBw12CAZmoYJ2g0Wa8I4Iuvbe-IDbVFUvtUh3OHlT4VDLMvpz0eLyeug2i166ml-LEdmGcpy6O6yaBX54y8WkqHi5O1pQAiiCt9iy79b24Q2pgTEXR3XOEQNlpx82lxIvfhNg-tnvFDS",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCHaJl6OrJrB8X7fzAxxF1bmK-NVYTvqEHhvESBWAiwIZe5ujbhzkvMJMJTuAy1HxV8xu4l6a7Dpy4GbIMj46lkLSF8voFAzUgVXXOBaxkOqOafD3SGpmHKes0frqLBXNPP0tJ2gFgyKfhXq0dRG16DqlVUq4yNhjiXGJTcdH_qX0lXqA-3dinwYG2Eb5XTeKz6gbJMBC7CukWaA49UjjCHYHliRsD3xcy1a0iD6wr4N9zbxOatcE5pcPagX9GMgf0xqBCADz3248b5",
  ];

  const renderStars = (rating: number) => {
    return [...new Array(Math.floor(rating))].map((_, i) => (
      <span
        key={`star-${i}`}
        className="material-symbols-outlined text-sm fill-1"
      >
        star
      </span>
    ));
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="relative rounded-3xl overflow-hidden mb-12 h-[500px] flex items-center">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-linear-to-r from-forest/80 via-forest/40 to-transparent z-10"></div>
            <Image
              alt="Premier Destination Banner"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_SodyjNnAyZtTCzd5Nn-AfHHnUH1LF6hsheJ0z3PM8BmLhKQmVDQMYM6Qqy9W6UMqdZBoYzpLF1WZ9wRE-xTbHa4bxmwryD7wcKP7hLuebUb2gfQ5aXlSUJaswhVJMcNT-26CxZzPipq_U7Y6lsDSUXthaXLLO2r-rl4pIAW5uXlOd4eJvNBM_SMFXV-1k7k9Px5ErKEEPV0kYfGWrjlNjUvpeeCBJ1QV9Tlz66fvFLsCPMHixbm65tiCn29DEKpFJQyhMDuMcJuX"
              fill
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-20 px-12 max-w-2xl">
            <span className="inline-block px-4 py-1 bg-primary text-forest text-xs font-bold tracking-widest uppercase rounded-full mb-4">
              Featured Experience
            </span>
            <h2 className="text-5xl font-extrabold text-white leading-tight mb-6">
              Unveil the Secrets of the Ancient Rainforest
            </h2>
            <p className="text-lg text-white/90 mb-8 font-light leading-relaxed">
              Exclusive 5-day private expeditions through the heart of
              Borneo&apos;s untouched wilderness with Michelin-star jungle
              dining.
            </p>
            <div className="flex gap-4">
              <button className="px-8 py-4 bg-primary text-forest font-bold rounded-xl hover:scale-105 transition-transform">
                Explore Expedition
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all">
                View Gallery
              </button>
            </div>
          </div>
        </section>

        {/* Search & Filters */}
        <section className="bg-white rounded-2xl shadow-sm border border-forest/5 p-6 mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="flex flex-wrap gap-3">
              <button className="px-6 py-2 bg-forest text-white rounded-full text-sm font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">
                  grid_view
                </span>
                All Experiences
              </button>
              <button className="px-6 py-2 bg-slate-100 text-forest hover:bg-primary/10 rounded-full text-sm font-semibold flex items-center gap-2 transition-colors">
                <span className="material-symbols-outlined text-sm">
                  beach_access
                </span>
                Beach
              </button>
              <button className="px-6 py-2 bg-slate-100 text-forest hover:bg-primary/10 rounded-full text-sm font-semibold flex items-center gap-2 transition-colors">
                <span className="material-symbols-outlined text-sm">
                  terrain
                </span>
                Mountain
              </button>
              <button className="px-6 py-2 bg-slate-100 text-forest hover:bg-primary/10 rounded-full text-sm font-semibold flex items-center gap-2 transition-colors">
                <span className="material-symbols-outlined text-sm">
                  account_balance
                </span>
                Cultural
              </button>
              <button className="px-6 py-2 bg-slate-100 text-forest hover:bg-primary/10 rounded-full text-sm font-semibold flex items-center gap-2 transition-colors">
                <span className="material-symbols-outlined text-sm">spa</span>
                Wellness
              </button>
            </div>
            <div className="flex items-center gap-4 w-full lg:w-auto border-t lg:border-t-0 pt-4 lg:pt-0">
              <span className="text-sm font-medium text-forest/60">
                Sort by:
              </span>
              <select className="border-none bg-slate-100 rounded-lg text-sm font-semibold text-forest focus:ring-primary w-full lg:w-48 px-3 py-2">
                <option>Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Top Rated</option>
              </select>
            </div>
          </div>
        </section>

        {/* Main Feed Header */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h3 className="text-3xl font-extrabold text-forest">
              Curated For You
            </h3>
            <p className="text-forest/60">
              Discover 124 exclusive luxury activities worldwide
            </p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 border border-forest/10 rounded-lg hover:bg-forest hover:text-white transition-all">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="p-2 border border-forest/10 rounded-lg hover:bg-forest hover:text-white transition-all">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="bg-white rounded-2xl overflow-hidden group border border-forest/5 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                  <span className="px-3 py-1 bg-forest/90 backdrop-blur-md text-white text-[10px] font-bold uppercase rounded-md">
                    {activity.category}
                  </span>
                </div>
                {activity.discount && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 bg-red-600 text-white text-[10px] font-bold uppercase rounded-md">
                      {activity.discount}
                    </span>
                  </div>
                )}
                <Image
                  alt={activity.title}
                  src={activity.image}
                  fill
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-1 text-primary mb-2">
                  {renderStars(activity.rating)}
                  <span className="text-xs font-bold text-forest/40 ml-1">
                    ({activity.reviews})
                  </span>
                </div>
                <h4 className="text-lg font-bold text-forest mb-1">
                  {activity.title}
                </h4>
                <div className="flex items-center gap-1 text-forest/60 text-xs mb-4">
                  <span className="material-symbols-outlined text-[14px]">
                    location_on
                  </span>
                  {activity.location}
                </div>
                <div className="flex gap-3 mb-6">
                  {activity.amenities.map((amenity) => (
                    <div
                      key={amenity.icon}
                      className="flex items-center gap-1 px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-forest/60"
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {amenity.icon}
                      </span>
                      {amenity.label}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    {activity.originalPrice && (
                      <span className="text-xs text-forest/40 line-through block">
                        {activity.originalPrice}
                      </span>
                    )}
                    <span className="text-xl font-extrabold text-forest">
                      {activity.price}
                    </span>
                    <span className="text-[10px] text-forest/60">
                      / {activity.perPerson ? "person" : "group"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 border border-forest/10 rounded-lg text-forest hover:bg-forest hover:text-white transition-colors">
                      <span className="material-symbols-outlined">
                        shopping_cart
                      </span>
                    </button>
                    <button className="px-4 py-2 bg-primary text-forest text-xs font-bold rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hot Deals Section */}
        <section className="mb-16">
          <div className="bg-forest rounded-3xl p-10 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 text-white">
              <h3 className="text-3xl font-extrabold mb-4">
                Exclusive Member Deals
              </h3>
              <p className="text-white/70 mb-8 max-w-lg">
                Unlock up to 35% discount on curated villas and private
                activities when you join the TREVTHA Elite circle today.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl border border-white/10">
                  <span className="material-symbols-outlined text-primary text-3xl">
                    verified_user
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-primary">
                      Insider Price
                    </p>
                    <p className="font-bold">Member Only Rates</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl border border-white/10">
                  <span className="material-symbols-outlined text-primary text-3xl">
                    schedule
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-primary">
                      Priority Access
                    </p>
                    <p className="font-bold">Early Booking Perks</p>
                  </div>
                </div>
              </div>
              <button className="mt-8 px-8 py-3 bg-primary text-forest font-bold rounded-xl hover:scale-105 transition-transform">
                Join for Free
              </button>
            </div>
            <div className="w-full md:w-1/3 grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-8">
                {dealImages.slice(0, 2).map((img, idx) => (
                  <div
                    key={`deal-left-${idx}`}
                    className="aspect-square bg-white/5 rounded-2xl overflow-hidden border border-white/10"
                  >
                    <Image
                      alt={`Deal ${idx + 1}`}
                      src={img}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                {dealImages.slice(2, 4).map((img, idx) => (
                  <div
                    key={`deal-right-${idx}`}
                    className="aspect-square bg-white/5 rounded-2xl overflow-hidden border border-white/10"
                  >
                    <Image
                      alt={`Deal ${idx + 3}`}
                      src={img}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
