import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function AboutPage() {
  const whyChooseUs = [
    {
      icon: "public",
      title: "500+ Destinations",
      description:
        "Handpicked experiences across 6 continents, from hidden gems to iconic landmarks.",
    },
    {
      icon: "card_giftcard",
      title: "Daily Member Promos",
      description:
        "Exclusive deals and early access to limited bookings for our VIP members.",
    },
    {
      icon: "verified_secure",
      title: "Secure Payments",
      description:
        "Bank-grade encryption and fraud protection for every transaction.",
    },
  ];

  const stats = [
    { number: "14K+", label: "Happy Travelers" },
    { number: "500+", label: "Curated Activities" },
    { number: "20+", label: "Travel Categories" },
  ];

  const teamMembers = [
    {
      name: "Aria Sterling",
      role: "Founder & CEO",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCA04-wpTuYrnE8oibEejomBhUSlshFD9OkVA1Zx-TxM90BpCJoF3SBYvs9tUPq1cu6q4uRhpNQr59vdC1mLmGs-0tSLBWtZc4vMLoFCEPC1JbXY_Ppgjb3SPhxMkAaRiktrwz5YSQAIII2NrrWLL9w8ldhdKvkQTBBoEDLM_kcNnZ2m0DgOUvDuqFz7Z9OhmVk94JIaVtLutA3Marz3fF8EOURyWQHQtxYF5XiaUrcG68GnuOaDPcIpXod8O1VTNGNq82HP7gpLjmv",
    },
    {
      name: "James Mitchell",
      role: "Chief Experience Officer",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCGFPUN8eG-2wWnOm8RwicrrZ5qoeH8NTm6n5dtwtqJVTAmK6LdMC3PnPqZ8_TmJOUfK9uQ0oA6GwsoOLRYFlb8vmfY9dPqnN4IQT60fEcrbM1AlpEtSj1k_mPlqA_WrKJ17UBwoSLpRz0dIn6SJH2_Rc9e9Gxozbgw5H-k4ITxEBLO8U8MOXZNVGbBfQmLldx_YC_pWUQzTPa8Y_mmkvEGzjLvpNAvcBzJW__XqHcRs9cXiZ7E1yVKRd1puw67WdwXQ1DyOCJpidxj",
    },
    {
      name: "Sophia Chen",
      role: "Head of Partnerships",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAxWtSOt6sen0w9n1eTjuiHrBdavskRLMcwAd-ZaGxrqsZYU1exTnP3hkaZcPZ_g916n7W0kik_korfTUbSNo--sIP8EcfyUZt83lmhWxeHYl_MjE3wSxvs7DlrNwHqXFo0yCzrdkni2kkRD7SqJ6sDa8Qyz5DWvQuHmP3wRpCXYPbcQjYycBFigFDDEcCmB1R8wLDuVO19562SqMfN5JiiRe0VDDeVQOSVeeFKs9EpmeUrO4NBaNVLQ64xTCck7GSZq8LQeCTmjvBF",
    },
    {
      name: "Marcus Rodriguez",
      role: "Director of Operations",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBDr_av39_j7iv88pv850DZao3cHQe8rK5pGeY-xz1CAPc599s-pvCKKV0aCSPyHWRyQjVklTkwbXy3X0JJogS9QAjFigvaBTzldP_rGes3Uu2sOm52gf6tEJxfhR5XIkqkdSR9USoBB6AsKzhvzVvBRMZVeQwOmLWNAm6mm_1YO-e7DQ-aepuISSURUMOw-ZNr8TFjc0kGE4SGTaMAG8LLKLcts2g1HGRfKen_-zY9VKJKk2DrgzqMJOoRVGTIEes1G_8dK_Bug8nI",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="relative rounded-3xl overflow-hidden mb-12 h-[500px] flex items-center">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-forest/80 via-forest/40 to-transparent z-10"></div>
            <Image
              alt="About TREVTHA"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_SodyjNnAyZtTCzd5Nn-AfHHnUH1LF6hsheJ0z3PM8BmLhKQmVDQMYM6Qqy9W6UMqdZBoYzpLF1WZ9wRE-xTbHa4bxmwryD7wcKP7hLuebUb2gfQ5aXlSUJaswhVJMcNT-26CxZzPipq_U7Y6lsDSUXthaXLLO2r-rl4pIAW5uXlOd4eJvNBM_SMFXV-1k7k9Px5ErKEEPV0kYfGWrjlNjUvpeeCBJ1QV9Tlz66fvFLsCPMHixbm65tiCn29DEKpFJQyhMDuMcJuX"
              fill
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-20 px-12 max-w-2xl">
            <h1 className="text-5xl font-extrabold text-white leading-tight mb-4">
              Redefining Luxury Travel
            </h1>
            <p className="text-xl text-white/90 mb-8 font-light leading-relaxed">
              At TREVTHA, we believe that luxury travel is about creating
              unforgettable experiences, not just booking hotels. Since 2018, we
              have been curating the world is most exclusive adventures for
              discerning travelers.
            </p>
            <button className="px-10 py-4 bg-primary text-forest font-bold rounded-xl hover:scale-105 transition-transform">
              Join Our Community
            </button>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-16">
          <h2 className="text-3xl font-extrabold text-forest mb-8 text-center">
            Why Choose TREVTHA?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseUs.map((item) => (
              <div
                key={item.title}
                className="bg-white border border-forest/5 rounded-2xl p-8 hover:shadow-xl transition-all text-center"
              >
                <div className="flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6 mx-auto">
                  <span className="material-symbols-outlined text-primary text-4xl">
                    {item.icon}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-forest mb-3">
                  {item.title}
                </h3>
                <p className="text-forest/60 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-forest rounded-3xl p-12 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-5xl font-extrabold text-primary mb-2">
                  {stat.number}
                </p>
                <p className="text-xl text-white font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-16">
          <h2 className="text-3xl font-extrabold text-forest mb-8 text-center">
            What Travelers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white border border-forest/5 rounded-2xl p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-primary fill-current"
                  >
                    star
                  </span>
                ))}
              </div>
              <p className="text-forest/80 mb-6 italic leading-relaxed">
                `TREVTHA transformed my travel dreams into reality. Every
                experience was meticulously curated and exceeded my
                expectations. I have never felt more cared for as a traveler.`
              </p>
              <div>
                <p className="font-bold text-forest">Alexandra Pembroke</p>
                <p className="text-sm text-forest/60">Luxury Entrepreneur</p>
              </div>
            </div>

            <div className="bg-white border border-forest/5 rounded-2xl p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-primary fill-current"
                  >
                    star
                  </span>
                ))}
              </div>
              <p className="text-forest/80 mb-6 italic leading-relaxed">
                `The attention to detail is extraordinary. From pre-travel
                planning to post-trip follow-ups, TREVTHA treats you like
                royalty. Absolutely worth every penny.`
              </p>
              <div>
                <p className="font-bold text-forest">David Chen</p>
                <p className="text-sm text-forest/60">Tech Investor</p>
              </div>
            </div>
          </div>

          {/* Partner Logos */}
          <div className="bg-slate-50 rounded-2xl p-8 border border-forest/5">
            <p className="text-center text-forest/60 font-semibold mb-6">
              Trusted by leading financial partners
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center">
              {["Visa", "Mastercard", "PayPal", "Stripe"].map(
                (partner, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-center w-full h-12 bg-white border border-forest/10 rounded-lg font-semibold text-forest/60 text-sm"
                  >
                    {partner}
                  </div>
                ),
              )}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-extrabold text-forest mb-8 text-center">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="bg-white border border-forest/5 rounded-2xl overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="relative h-48">
                  <Image
                    alt={member.name}
                    src={member.image}
                    fill
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-bold text-forest mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-primary font-semibold mb-4">
                    {member.role}
                  </p>
                  <div className="flex gap-2 justify-center">
                    <button className="p-2 text-forest/40 hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">mail</span>
                    </button>
                    <button className="p-2 text-forest/40 hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">link</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mission & Values */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-forest mb-6">
                Our Mission
              </h2>
              <p className="text-forest/80 mb-4 leading-relaxed text-lg">
                To empower travelers to explore the world is most extraordinary
                destinations through thoughtfully curated, sustainable, and
                unforgettable luxury experiences that create lasting memories
                and meaningful connections.
              </p>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-primary flex-shrink-0">
                    check_circle
                  </span>
                  <span className="text-forest font-semibold">
                    Authenticity in every experience
                  </span>
                </div>
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-primary flex-shrink-0">
                    check_circle
                  </span>
                  <span className="text-forest font-semibold">
                    Sustainability and responsible travel
                  </span>
                </div>
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-primary flex-shrink-0">
                    check_circle
                  </span>
                  <span className="text-forest font-semibold">
                    Exceptional customer service
                  </span>
                </div>
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-primary flex-shrink-0">
                    check_circle
                  </span>
                  <span className="text-forest font-semibold">
                    Community and cultural respect
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-forest/5 rounded-2xl p-8 border border-forest/10">
              <h3 className="text-2xl font-bold text-forest mb-6">
                By The Numbers
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-forest/60">Bookings Processed</span>
                  <span className="text-2xl font-bold text-primary">42K+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-forest/60">Countries Covered</span>
                  <span className="text-2xl font-bold text-primary">87</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-forest/60">
                    Partner Hotels & Resorts
                  </span>
                  <span className="text-2xl font-bold text-primary">
                    1,200+
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-forest/60">
                    Professional Travel Guides
                  </span>
                  <span className="text-2xl font-bold text-primary">500+</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-forest to-forest/70 rounded-3xl p-12 text-center mb-12">
          <h2 className="text-4xl font-extrabold text-white mb-4">
            Join the Elite
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Become part of a global community of discerning travelers who demand
            excellence and authenticity in every journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-4 bg-primary text-forest font-bold rounded-xl hover:scale-105 transition-transform">
              Start Your Journey
            </button>
            <button className="px-10 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all">
              Learn More
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
