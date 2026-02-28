import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function PromoPage() {
  const promos = [
    {
      code: "MAULIAKU",
      description: "Birthday Month Special",
      discount: "25% OFF",
      terms: "Valid for bookings in your birth month only",
    },
    {
      code: "TREVTHAVIP",
      description: "Elite Member Exclusive",
      discount: "35% OFF",
      terms: "VIP members get priority access to all deals",
    },
    {
      code: "SEASIDE50",
      description: "Year-End Celebration",
      discount: "Up to 50% OFF",
      terms: "On select beach villas & water activities",
    },
  ];

  const experiences = [
    {
      title: "Maldives Private Island Resort",
      location: "Maldives",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCA04-wpTuYrnE8oibEejomBhUSlshFD9OkVA1Zx-TxM90BpCJoF3SBYvs9tUPq1cu6q4uRhpNQr59vdC1mLmGs-0tSLBWtZc4vMLoFCEPC1JbXY_Ppgjb3SPhxMkAaRiktrwz5YSQAIII2NrrWLL9w8ldhdKvkQTBBoEDLM_kcNnZ2m0DgOUvDuqFz7Z9OhmVk94JIaVtLutA3Marz3fF8EOURyWQHQtxYF5XiaUrcG68GnuOaDPcIpXod8O1VTNGNq82HP7gpLjmv",
    },
    {
      title: "Swiss Alps Ski Chalet",
      location: "Switzerland",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAfQG3fV2oAfaA2FV1Qr9vhF3jFJdBx1i1xGhVvZBwKf00OFxWgbjfGQnZDLJNv7w9YcIGGlCj4c3jGGXMqZrRkj60f0m8W15qGQNfaXMKqO7Jxnph8WH0cSNJZ0KhXfZC7L_wZj3pT-1pL5EZZP3JL_5iWy8YZ-wWYVx-J2c2EtMiPn1KHN8Ke5m54VHLvB3WIqT8LZqL-8YzYn5gVPCiJFfXAZ9O-O0xVxFpTjHZR5dslFqHT9v1vYJC1Hb7PbbsDKlJ8z0x85-wMvjc8p9g0FP0mJ9E1x02GJh_YECPwRZR_wBEZCpn7M_zYjLGrPnbZhw",
      label: "50% OFF",
    },
    {
      title: "Japanese Temple Stay",
      location: "Kyoto, Japan",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAoyI-0nJU-zk2AiYoEDuhEUNzJbRkITesyelqLpj-MtAaJ5KYlE56NQGnA9j1RPS194P8EWzu387gIqoK6qlUXKhqL-OBWgVIfL5qHOUR-o62aubVKrCvOa_f52zzEX0BZOpBNwK5TE8VMO8DiTZ3UwsnplvutK5AdJNAt4lXAma0VCFOnzNIIhP7Uk-7wdbeo6Hj3zLv8S0myJk8rXdlNT7FvzM3uu8b9QQYfZJ-TaEjGSDwSU-99RrDJc2nmsGKBJgmlte1pYu17",
      label: "SAVE $220",
    },
    {
      title: "Bora Bora Overwater Villa",
      location: "French Polynesia",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBDr_av39_j7iv88pv850DZao3cHQe8rK5pGeY-xz1CAPc599s-pvCKKV0aCSPyHWRyQjVklTkwbXy3X0JJogS9QAjFigvaBTzldP_rGes3Uu2sOm52gf6tEJxfhR5XIkqkdSR9USoBB6AsKzhvzVvBRMZVeQwOmLWNAm6mm_1YO-e7DQ-aepuISSURUMOw-ZNr8TFjc0kGE4SGTaMAG8LLKLcts2g1HGRfKen_-zY9VKJKk2DrgzqMJOoRVGTIEes1G_8dK_Bug8nI",
      label: "DEAL",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Year-End Sale Hero */}
        <section className="relative rounded-3xl overflow-hidden mb-12 h-[400px] flex items-center bg-gradient-to-r from-primary to-primary/70">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10"></div>
            <Image
              alt="Year-End Sale"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_SodyjNnAyZtTCzd5Nn-AfHHnUH1LF6hsheJ0z3PM8BmLhKQmVDQMYM6Qqy9W6UMqdZBoYzpLF1WZ9wRE-xTbHa4bxmwryD7wcKP7hLuebUb2gfQ5aXlSUJaswhVJMcNT-26CxZzPipq_U7Y6lsDSUXthaXLLO2r-rl4pIAW5uXlOd4eJvNBM_SMFXV-1k7k9Px5ErKEEPV0kYfGWrjlNjUvpeeCBJ1QV9Tlz66fvFLsCPMHixbm65tiCn29DEKpFJQyhMDuMcJuX"
              fill
              className="w-full h-full object-cover opacity-30"
            />
          </div>
          <div className="relative z-20 px-12 max-w-2xl">
            <h1 className="text-6xl font-extrabold text-forest leading-tight mb-4">
              Year-End Luxury <span className="text-primary">Sale</span>
            </h1>
            <p className="text-2xl font-bold text-forest mb-2">Up to 50% OFF</p>
            <p className="text-lg text-forest/60 mb-8 font-light leading-relaxed">
              The biggest luxury travel sale of the year. Limited time offers
              ending soon.
            </p>
            <button className="px-10 py-4 bg-forest text-white font-bold text-lg rounded-xl hover:scale-105 transition-transform">
              Shop Now
            </button>
          </div>
        </section>

        {/* Promo Codes Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-extrabold text-forest mb-8">
            Exclusive Promo Codes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {promos.map((promo) => (
              <div
                key={promo.code}
                className="border-2 border-dashed border-primary rounded-2xl p-8 bg-linear-to-br from-primary/5 to-transparent hover:shadow-lg transition-all"
              >
                <div className="mb-6">
                  <p className="text-sm font-bold text-primary uppercase tracking-widest mb-2">
                    Save With Code
                  </p>
                  <h3 className="text-3xl font-extrabold text-forest mb-2 font-mono tracking-wider">
                    {promo.code}
                  </h3>
                  <p className="text-lg font-bold text-primary mb-4">
                    {promo.discount}
                  </p>
                  <p className="text-forest font-semibold mb-4">
                    {promo.description}
                  </p>
                  <p className="text-sm text-forest/60 italic mb-6">
                    {promo.terms}
                  </p>
                </div>
                <button className="w-full px-6 py-3 bg-primary text-forest font-bold rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all">
                  <span className="material-symbols-outlined text-lg align-middle mr-2">
                    content_copy
                  </span>
                  Copy Code
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Curated Experiences Sale */}
        <section className="mb-16">
          <h2 className="text-3xl font-extrabold text-forest mb-8">
            Limited Time Offers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {experiences.map((exp) => (
              <div
                key={exp.title}
                className="group bg-white rounded-2xl overflow-hidden border border-forest/5 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  {exp.label && (
                    <div className="absolute top-3 right-3 z-10">
                      <span className="px-4 py-2 bg-red-600 text-white text-xs font-bold uppercase rounded-lg">
                        {exp.label}
                      </span>
                    </div>
                  )}
                  <Image
                    alt={exp.title}
                    src={exp.image}
                    fill
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h4 className="text-lg font-bold text-forest mb-1">
                    {exp.title}
                  </h4>
                  <div className="flex items-center gap-1 text-forest/60 text-sm mb-4">
                    <span className="material-symbols-outlined text-[16px]">
                      location_on
                    </span>
                    {exp.location}
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-primary text-forest text-xs font-bold rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all">
                      Add to Cart
                    </button>
                    <button className="px-4 py-2 border border-forest/10 rounded-lg text-forest hover:bg-forest hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-sm">
                        favorite
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-forest to-forest/70 rounded-3xl p-12 text-center mb-12">
          <h2 className="text-4xl font-extrabold text-white mb-4">
            Ready for Your Next Masterpiece?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join TREVTHA Elite to get instant access to exclusive deals, early
            booking perks, and VIP customer support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-4 bg-primary text-forest font-bold rounded-xl hover:scale-105 transition-transform">
              Become a Member
            </button>
            <button className="px-10 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all">
              Learn More
            </button>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-extrabold text-forest mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-forest/10 rounded-2xl p-6 hover:border-primary/30 transition-colors">
              <h3 className="text-lg font-bold text-forest mb-3 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">
                  help
                </span>
                How do I use promo codes?
              </h3>
              <p className="text-forest/60">
                Copy the code and paste it at checkout. Discounts apply
                automatically to eligible bookings.
              </p>
            </div>
            <div className="border border-forest/10 rounded-2xl p-6 hover:border-primary/30 transition-colors">
              <h3 className="text-lg font-bold text-forest mb-3 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">
                  event_repeat
                </span>
                Can I combine multiple codes?
              </h3>
              <p className="text-forest/60">
                Only one promo code per booking. Choose the one that gives you
                the best value.
              </p>
            </div>
            <div className="border border-forest/10 rounded-2xl p-6 hover:border-primary/30 transition-colors">
              <h3 className="text-lg font-bold text-forest mb-3 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">
                  schedule
                </span>
                When do deals expire?
              </h3>
              <p className="text-forest/60">
                Check the terms of each promo. Most year-end offers expire on
                December 31st.
              </p>
            </div>
            <div className="border border-forest/10 rounded-2xl p-6 hover:border-primary/30 transition-colors">
              <h3 className="text-lg font-bold text-forest mb-3 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">
                  block
                </span>
                What about cancellations?
              </h3>
              <p className="text-forest/60">
                Discounted bookings follow standard cancellation policies. Full
                refund up to 14 days prior.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
