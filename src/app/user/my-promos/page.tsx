import UserDashboardHeader from "@/components/user/UserDashboardHeader";

export default function MyPromosPage() {
  const promos = [
    {
      id: 1,
      title: "Gold Member Exclusive: 20% Off",
      description:
        "Get 20% discount for all City Tour activities in Paris and London.",
      code: "TREVTHAGOLD20",
      conditions: ["Min. transaction $500", "Valid until Dec 31, 2024"],
      badge: "Limited",
      badgeColor: "accent",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCrNzv5siDoGtxb5uFzWKEGRjxZCP3sfikEiJPD9Jb1f6DQ6MbTFzM-uzitM5MGDOUjXg6g5Xiwy3ELYfkCX8-7Oyb1PYoZIGe8x781SVCylnJtQoyMxGdg7ucUpMdfOAxuKHahLfWpvrm2CREUJG1_v1crHSTI23mzaewTr795urNpotma-WAfvYL1jcUmeb5Qq7Ua3iYhAZaIxW9KbLF5EuIjwlSTVm6oqaMTxOkKR_hpQxtt4jCiAcchH7G-H3_luCFTSy_kuP47",
    },
    {
      id: 2,
      title: "Suite Upgrade: Tokyo Nights",
      description:
        "Complementary room upgrade to Imperial Suite for 3+ night stays.",
      code: "TOKYOUPGRADE",
      conditions: ["Valid for Park Hyatt Tokyo only", "Expires in 14 days"],
      badge: "New",
      badgeColor: "primary",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBlODqGsnbo17CF7e5k_aROLBMfhUC7DD7EPz8ANztz-DhqczT2VhEbSQnd8bDhMbkeBKg8CP9BXkUMFz638h-dx_aspWF7GMLrCp6P-qBBpsOSYZC4wNhCVlJ0O3GSeDfm0KgTYqRhoSgVU6nBllZLVJEnWiaevxVczXCvyzQRHwe1iyYJ0izU58QYw94jYlCg6i66ZtjwKlpVv17oB8TCFdNuZvzNFgceUd0bnBzKQkB0oeoJ2vd8nkMXnSe_CXUGj-XczJeMA3F1",
    },
    {
      id: 3,
      title: "Yacht Rental Voucher",
      description: "$200 discount on your first Riviera yacht charter booking.",
      code: "RIVIERA200",
      conditions: ["Min. booking 4 hours", "Valid until Nov 15, 2024"],
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA0WIqzQTzWUBc4HgXcDHlFGMBa6OxYKx1psOJ7jAQkXpz4W40ML1eoZEt6TM2sw8aonrLSU-7W-dbCZwDtlweJ2Me61pu9ratuA3zncRM7fcNetz7s3KDyrNXOSTzLK5-8Rm4Z02UTdVbOczCUa8V37AmbL3n6K5-37OM89d78tI7yTP2QQWSv-HoIGVrJFwXRN2ltJjuXko7zd9Qi06TYwktWiUW6YMGbDmMY-HaGb31znEz_y93ceHhGjQsJSOljf5A1ClPolN1W",
    },
    {
      id: 4,
      title: "Michelin Dining Pass",
      description:
        "Complimentary wine pairing for two at any partner restaurant.",
      code: "SOMMELIER24",
      conditions: [
        "Valid for dinner bookings only",
        "Valid until end of month",
      ],
      badge: "Expiring Soon",
      badgeColor: "accent",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCR-61T6j3Y4S75XKIgcPUrHtYTyVQENy0BQH_Ah-f77hjUQubrqbE443qRI-9dkBTCxp6BFA-kRsyfjMVkbYsoAKZDnCo294cIIftxtrbE3aJhxsQ7MlpersdLJpfKK4PIzyZIqwWsqVlTGwL7zw6-F_Oq-BwEdW-EfdJnl07xWswETLGWepO2E25Acdj_kJ76wtsv30CS_QczP9PeiYWW2i5HnRne1_bIX9cfKfUyBgDN6q5rJCa5Y5BbaP1H9UBW7b6io9C4n0Sb",
    },
  ];

  return (
    <div className="layout-container flex h-full grow flex-col bg-background-light text-charcoal [--color-primary:#1B3022] [--color-forest:#1B3022] [--color-gold:#D4AF37] [--color-background-light:#F9F7F2] [--color-background-dark:#121212]">
      {/* Top Navigation */}
      <UserDashboardHeader />

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="h-20 flex items-center justify-between px-10 bg-white/50 backdrop-blur-md border-b border-accent/10 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="relative w-96">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-accent/40">
                search
              </span>
              <input
                className="w-full bg-accent/5 border-none rounded-full pl-10 pr-4 py-2 focus:ring-2 focus:ring-primary text-sm"
                placeholder="Search experiences, destinations..."
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative">
              <span className="material-symbols-outlined text-accent/60">
                notifications
              </span>
              <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-accent/10">
              <div className="text-right">
                <p className="text-xs font-bold text-accent">Julian Thorne</p>
                <p className="text-[10px] text-accent/60">Gold Member</p>
              </div>
              <div className="size-10 rounded-full bg-accent/10 overflow-hidden border-2 border-primary">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyb1hezmhswvXEOMi36FAjCHbTFsVM8t6tjWFziDlBkqFMWFL08Ic8aq2S83Gi_DUu092zCV9CrCb8fb4AvLgdLGxmYpnpL2lC3MS8k0yE51hf3StIcIaKZiVJnv8_WZ4P31ArLmTm2_ucvug5e5zAIVPxtwVen0TKl0ZFh7UtLLCHy7affv__OQyDHcS849tf3bsiGLDe1zamB9NvM6bpTdMMOa3d47P1jK2G8fnTpu8C0bTPV1OfSAKrTNo3q0_dfzYq4m48VTMM"
                  alt="User"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Page Title Area */}
        <div className="px-10 py-8">
          <div className="mb-8">
            <h2 className="text-4xl font-black text-accent tracking-tight">
              My Promos
            </h2>
            <p className="text-accent/60 mt-1">
              Exclusive deals and vouchers just for you
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-8 border-b border-accent/10 mb-8">
            <button className="pb-4 text-sm font-bold text-accent/40 hover:text-accent transition-colors">
              All Promos
            </button>
            <button className="pb-4 text-sm font-bold text-primary border-b-2 border-primary">
              Active
            </button>
            <button className="pb-4 text-sm font-bold text-accent/40 hover:text-accent transition-colors">
              Used
            </button>
            <button className="pb-4 text-sm font-bold text-accent/40 hover:text-accent transition-colors">
              Expired
            </button>
          </div>

          {/* Promo Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {promos.map((promo) => (
              <div
                key={promo.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-accent/5 flex flex-col md:flex-row"
              >
                <div className="w-full md:w-52 h-48 md:h-auto shrink-0 relative">
                  {promo.badge && (
                    <div
                      className={`absolute top-3 left-3 z-10 ${
                        promo.badgeColor === "accent"
                          ? "bg-accent text-primary"
                          : "bg-primary text-accent"
                      } text-[10px] font-black px-2 py-1 rounded uppercase tracking-wider`}
                    >
                      {promo.badge}
                    </div>
                  )}
                  <img
                    className="w-full h-full object-cover"
                    src={promo.image}
                    alt={promo.title}
                  />
                </div>
                <div className="p-6 flex flex-col justify-between grow">
                  <div>
                    <h3 className="text-xl font-bold text-accent mb-2 leading-tight">
                      {promo.title}
                    </h3>
                    <p className="text-accent/70 text-sm mb-4">
                      {promo.description}
                    </p>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="bg-primary/10 border border-primary/20 rounded-lg px-3 py-1.5 flex items-center gap-3">
                        <span className="text-xs font-bold text-primary tracking-widest uppercase">
                          {promo.code}
                        </span>
                        <button className="material-symbols-outlined text-primary text-lg leading-none">
                          content_copy
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col text-[11px] text-accent/50 italic">
                      {promo.conditions.map((condition, idx) => (
                        <span key={idx}>• {condition}</span>
                      ))}
                    </div>
                    <button className="w-full bg-primary hover:bg-primary/90 text-accent font-black text-sm py-2.5 rounded-lg transition-all uppercase tracking-tight">
                      Use Promo
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Section */}
        <footer className="mt-auto py-10 px-10 border-t border-accent/10 text-center">
          <p className="text-xs text-accent/40">
            © 2024 TREVTHA Luxury Travel Marketplace. All rights reserved.{" "}
            <a className="underline hover:text-primary" href="#">
              Terms of Service
            </a>{" "}
            &{" "}
            <a className="underline hover:text-primary" href="#">
              Privacy Policy
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}
