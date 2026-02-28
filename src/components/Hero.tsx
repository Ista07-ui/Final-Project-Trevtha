"use client";

export default function Hero() {
  return (
    <section className="relative @container">
      <div
        className="h-150 w-full bg-cover bg-center flex items-center justify-center px-4"
        style={{
          backgroundImage: `linear-gradient(rgba(27, 48, 34, 0.6) 0%, rgba(27, 48, 34, 0.8) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCE7d_Qk_p5RFbSrqoxzbeSyeTr3KuE-rZoCVazaK22J1LtvmcjFfR4hQ9Ppuqxx4G4cuKFFj6qSbwy0CPUJLE-_6rQFF-yi4PZVHJLmfPpWgoGRBdFAxP0rg3N-5lExP0AG5B2Kk8LqXLZupoahlxeKLCHGABbotQZw9GdDV0fIpilT_9MqZrCro7p7YpxIGu-GJLDVHqVfOcUNnmRcMiB9REGNnFLNydeJI5rdgYarRpERQdHkvlH1Los9apNKI5E8nNMoyqWq4X9")`,
        }}
      >
        <div className="max-w-4xl w-full flex flex-col gap-8 text-center items-center">
          <div className="flex flex-col gap-4">
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm">
              Elevate Your Journey
            </span>
            <h1 className="text-white text-5xl md:text-7xl font-black leading-tight tracking-tight">
              Experience The World In <span className="text-primary">Gold</span>{" "}
              Standard
            </h1>
            <p className="text-cream/80 text-lg md:text-xl max-w-2xl mx-auto font-light">
              Curated luxury travels and hidden gems across the globe for the
              discerning explorer.
            </p>
          </div>

          <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 shadow-2xl">
            <div className="flex flex-col md:flex-row gap-2 bg-white rounded-xl overflow-hidden p-1 shadow-inner">
              <div className="flex flex-1 items-center px-4 py-3 border-b md:border-b-0 md:border-r border-slate-100">
                <span className="material-symbols-outlined text-primary mr-3">
                  location_on
                </span>
                <input
                  className="w-full border-none focus:ring-0 text-charcoal font-medium placeholder:text-slate-400"
                  placeholder="Where do you want to go?"
                  type="text"
                />
              </div>
              <div className="flex flex-1 items-center px-4 py-3 border-b md:border-b-0 md:border-r border-slate-100">
                <span className="material-symbols-outlined text-primary mr-3">
                  calendar_today
                </span>
                <input
                  className="w-full border-none focus:ring-0 text-charcoal font-medium placeholder:text-slate-400"
                  placeholder="Add dates"
                  type="text"
                />
              </div>
              <button className="bg-forest text-primary font-bold px-8 py-3 rounded-lg flex items-center justify-center gap-2 hover:brightness-125 transition-all">
                <span className="material-symbols-outlined">search</span>
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
