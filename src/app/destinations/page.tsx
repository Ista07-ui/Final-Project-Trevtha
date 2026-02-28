import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function DestinationsPage() {
  const activities = [
    {
      id: 1,
      title: "Sunrise at Mount Bromo",
      location: "East Java • 12 Hours",
      rating: 4.9,
      category: "Mountain",
      originalPrice: "IDR 850,000",
      price: "IDR 625,000",
      discount: "25% OFF",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDPqxt-RnBNBnHEMG9FtnpLAD9zuMV3KUx0XtjVBuskenp_GVx34KFTmaNXop7Klfj9ZhFrSXt7vL_NP5KAHNSMt7OZtv4k-AtmeBtI1VhHhW1eRWrKN2xPFjgOES9vAdEm7PaJdyrqMbl1JTiCKVQyziXsptv4TPFPFzz_z5snTqB7SjUY8DryTD_1_c5vp4xTPy-Z_e4dZM-arDdCfLFi3A0CzXwSRvnIw4Vvn5h6e-jtDbnlnnATOwPvPT90eAhgnckw7MIj05nH",
      amenities: ["restaurant", "directions_car", "hiking"],
    },
    {
      id: 2,
      title: "Uluwatu Sunset & Kecak",
      location: "Bali • 6 Hours",
      rating: 4.7,
      category: "Water",
      originalPrice: "IDR 450,000",
      price: "IDR 390,000",
      discount: "15% OFF",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAMEL1PR3GX3H9OSvpQY4xAj6mqFywy5ho0_DeNyg5wJcXU-tBEx1i1wH9vXW-kAcPCqhVkJx_9zQotxB2RD6vWjzT3kMn7yzCdoJiZpxAS-lp3LQGrAHPoypvzuYqq3ShfkahoNaAKJ-rrs27VUzbZdJUvnpq-aULkUm7YGp7vXKN8PuA4bNQEVQcbEzt7Yq6nOL1jPJhcL0iWT5no979_cmQsfRmuCqI_rqJFR8QD2Tc4E-4_PUvmt-aH4GquiJhuh5AYQQIVl3X0",
      amenities: ["confirmation_number", "directions_car", "interpreter_mode"],
    },
    {
      id: 3,
      title: "Yogyakarta Royal Heritage",
      location: "Yogyakarta • 8 Hours",
      rating: 4.8,
      category: "Cultural",
      originalPrice: "IDR 1,200,000",
      price: "IDR 950,000",
      discount: "20% OFF",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDF6viDJAJSOg6cABgmvLz8uE8SYiji5KW6peGleUvuyLdThQYdDBC5BrI5O7ETz2XEd-10r3S3YE2XvjSwwx2QPkTjvtFnJw_kA-9-JxFoB0S2MKeXdGFsT2u_9JL_tlQIUvO0ABxN1F-Wq2xf9Uq4XUk5YnDd8IpV4bGt6esi1Gqsg_THPnYYSIJuurEHvNoGHzU8gZgAqekic3bmpWy638ahL6Roz9ufaBbyTQS4_XNWhWyBqmIhPB3IEfWx2Psr3nhz1NSY_NhD",
      amenities: ["restaurant", "hotel", "directions_bus"],
    },
  ];

  const promos = [
    {
      id: 1,
      title: "Raja Ampat Snorkeling Tour",
      description: "5 Days All-Inclusive Premium Package",
      originalPrice: "IDR 12,500,000",
      price: "IDR 8,750,000",
      badge: "HOT",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBQCUYdzIWsAOqnoGTdivN2tiJrkDtV-t-4lCxmGZ3k7XuioIyccJgru2BfCNC_Jhu5f1PSpP0QoFRcRCj36LkvJyJh78P4PH_Bzhm85vzEqxY9O4BMUHk6gWELuVpoWucWtl8hSTIpH1oaIPfaHQgRsy92nM2wOlCNFA9QLbxYrx7C_vS_OS2QsXqkmX8tyWbLaEcU-756N36sgaARQc3bo8Jhu26YMemku7UhyNjbg5L3yn-zC3qc157isylcPiAEcW5ejrfavH8P",
    },
    {
      id: 2,
      title: "Ubud Nature Adventure",
      description: "Complete Jungle & Waterfall Experience",
      originalPrice: "IDR 1,500,000",
      price: "IDR 899,000",
      badge: "40% OFF",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCPYxGY4rpcTuqlqaHM071M4AeDHB0jF2-Vg_1aO5_lIAgor1YbGOro5fj0d7yBSr-VCn4CNkIUfyN7M4MprRlkF-CGmpmSC6EpudkWl-G8_pTB2Yw4XN2jwEUGy4Xe2H56ZntMju838V_SP_enam1jryxNDAVA198ds9Dr1v-66gVCJ3m39oXED2kyKcXYxjVb3fX_HBpFlBEneYY3B0ZSiY0BCAVFzlBcfQOgsd8dIt23iH20HnBWwPPB8sKQ3HJjzLjxeDXIHxTV",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[500px] w-full overflow-hidden">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <Image
            alt="Majestic mountain landscape"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwq1FiNFkSFOQMT-Or80SlY_u2_d9pgIU8mZ7ww9uLV4cASPfYUpasM-pRvE74FkPQGBotAcSK4or_sxpT2eq2pnaVJkmMmLSJUoaa2YyfppFXE3XOoTRwNH7iZnuKdA3MnzMuS2QBwccGLADlv3fFJXd0SaMCgzg9GiASrF1q7sglGXKxKYOSXwImFSTiY5dyIvCnHFi4U4Wn25rry1_TtvceXRngfIzYAoOlfBj6YRevhymMBjAWboFM5LML0hD6pPe7MhYBNvQP"
            fill
            className="absolute inset-0 object-cover"
          />
          <div className="relative z-20 max-w-7xl mx-auto px-4 h-full flex flex-col justify-center items-start">
            <span className="bg-primary text-forest px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
              Featured Destination
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6 max-w-3xl">
              Experience the Spirit of{" "}
              <span className="text-primary">Indonesia</span>
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-xl mb-8 leading-relaxed">
              From the volcanic peaks of Bromo to the hidden beaches of Raja
              Ampat. Curated adventures for the discerning traveler.
            </p>
            <button className="bg-primary text-forest px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-xl">
              Explore Activities
            </button>
          </div>
        </section>

        {/* Discovery Bar */}
        <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-30 mb-16">
          <div className="bg-white rounded-2xl shadow-2xl p-6 border border-primary/20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
              <div className="lg:col-span-5 relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary">
                  search
                </span>
                <input
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary text-charcoal"
                  placeholder="Search destinations, activities, or tours..."
                  type="text"
                />
              </div>
              <div className="lg:col-span-5 flex gap-2 overflow-x-auto pb-2 lg:pb-0">
                <button className="px-5 py-3 bg-forest text-white rounded-xl text-sm font-semibold whitespace-nowrap">
                  All Activities
                </button>
                <button className="px-5 py-3 bg-slate-100 text-charcoal hover:bg-primary/10 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors">
                  Beach
                </button>
                <button className="px-5 py-3 bg-slate-100 text-charcoal hover:bg-primary/10 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors">
                  Mountain
                </button>
                <button className="px-5 py-3 bg-slate-100 text-charcoal hover:bg-primary/10 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors">
                  Cultural
                </button>
              </div>
              <div className="lg:col-span-2">
                <select className="w-full py-4 bg-slate-50 border-none rounded-xl text-sm font-semibold text-charcoal focus:ring-2 focus:ring-primary">
                  <option>Sort: Popularity</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Highest Rated</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Main Activity Catalog */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-extrabold text-forest mb-2">
                Popular Activities
              </h2>
              <p className="text-charcoal/60">
                Handpicked experiences based on traveler ratings
              </p>
            </div>
            <Link
              className="text-primary font-bold flex items-center gap-2 hover:underline"
              href="#"
            >
              View All{" "}
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-transparent hover:border-primary/30"
              >
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-forest/90 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {activity.category}
                    </span>
                  </div>
                  <Image
                    alt={activity.title}
                    src={activity.image}
                    fill
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-forest leading-tight">
                      {activity.title}
                    </h3>
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded text-primary">
                      <span className="material-symbols-outlined text-[16px]">
                        star
                      </span>
                      <span className="text-xs font-bold">
                        {activity.rating}
                      </span>
                    </div>
                  </div>
                  <p className="text-charcoal/60 text-sm flex items-center gap-1 mb-4">
                    <span className="material-symbols-outlined text-sm">
                      location_on
                    </span>
                    {activity.location}
                  </p>
                  <div className="flex gap-4 mb-6 border-y border-slate-100 py-3">
                    {activity.amenities.map((amenity, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-1 text-charcoal/40"
                      >
                        <span className="material-symbols-outlined text-xl">
                          {amenity}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <span className="block text-xs text-charcoal/40 line-through">
                        {activity.originalPrice}
                      </span>
                      <span className="text-xl font-extrabold text-forest">
                        {activity.price}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-1 rounded">
                      {activity.discount}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="py-2.5 rounded-lg border-2 border-primary text-primary font-bold text-sm hover:bg-primary/5 transition-colors">
                      Details
                    </button>
                    <button className="py-2.5 rounded-lg bg-primary text-forest font-bold text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-sm">
                        shopping_cart
                      </span>
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Promo Section */}
        <section className="bg-forest py-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full -mr-48 -mt-48"></div>
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight">
                  Hot Deals & Limited Offers
                </h2>
                <p className="text-white/60">
                  Exclusive discounts available for a limited time only.
                </p>
              </div>
              <div className="flex gap-4">
                <button className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined">
                    chevron_left
                  </span>
                </button>
                <button className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {promos.map((promo) => (
                <div
                  key={promo.id}
                  className="bg-white/5 border border-primary/20 p-6 rounded-2xl flex flex-col sm:flex-row gap-6 hover:bg-white/10 transition-colors"
                >
                  <div className="relative w-full sm:w-40 h-40 shrink-0">
                    <Image
                      alt={promo.title}
                      src={promo.image}
                      fill
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <div className="absolute -top-2 -left-2 bg-red-600 text-white font-bold text-[10px] px-3 py-1 rounded shadow-lg">
                      {promo.badge}
                    </div>
                  </div>
                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {promo.title}
                      </h3>
                      <p className="text-white/60 text-sm mb-4">
                        {promo.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="block text-xs text-white/40 line-through">
                          {promo.originalPrice}
                        </span>
                        <span className="text-2xl font-black text-primary">
                          {promo.price}
                        </span>
                      </div>
                      <button className="bg-primary text-forest px-4 py-2 rounded-lg text-xs font-bold hover:brightness-110">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
