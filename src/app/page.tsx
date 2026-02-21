import React from "react";

export default function Home() {
  return (
    <>
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                <span className="material-symbols-outlined">explore</span>
              </div>
              <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
                Travelio
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a
                className="text-sm font-semibold hover:text-primary transition-colors"
                href="#"
              >
                Destinations
              </a>
              <a
                className="text-sm font-semibold hover:text-primary transition-colors"
                href="#"
              >
                Promos
              </a>
              <a
                className="text-sm font-semibold hover:text-primary transition-colors"
                href="#"
              >
                My Bookings
              </a>
            </nav>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all">
                Login
              </button>
              <button className="px-5 py-2 text-sm font-bold bg-primary text-white rounded-lg shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                Register
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative h-[600px] w-full overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            data-alt="Breathtaking tropical island aerial view with turquoise water"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuDGWFVfQmmpXsdea8MI6JId38pKj3b95zVD-b6936lnNKiK0EQCmXZqphF8sxF6wDToGDQqrMq6hJhmKKjcVlwiMMOzFa4qdoSkjas1vnicxR1aJ_sM4u-PNXBHOZ9Y86K8r48pS3Z_-IjPXu_H4bl07zNofGW46F5AEUlThfBawKd0Cj4mzWalMOhzMtzaZGciV9lZeolXOUdO1wjjn1y7SwmTftW5T_03x1G9Xv1TdVpt2AI-wSZmO59w0DY9dggKDU4czhLqdf0')",
            }}
          ></div>
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-md leading-tight">
              Explore Your Next <span className="text-primary">Adventure</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-12 font-medium">
              Find the best deals on flights, hotels, and unique travel
              experiences around the world.
            </p>
            {/* Search Bar */}
            <div className="w-full max-w-4xl bg-white dark:bg-slate-900 p-3 md:p-4 rounded-xl md:rounded-full shadow-2xl flex flex-col md:flex-row items-center gap-4">
              <div className="flex-1 w-full flex items-center px-4 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700">
                <span className="material-symbols-outlined text-primary mr-3">
                  location_on
                </span>
                <input
                  className="w-full border-none focus:ring-0 bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 font-medium outline-none"
                  placeholder="Where to?"
                  type="text"
                />
              </div>
              <div className="flex-1 w-full flex items-center px-4 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700">
                <span className="material-symbols-outlined text-primary mr-3">
                  calendar_month
                </span>
                <input
                  className="w-full border-none focus:ring-0 bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 font-medium outline-none"
                  placeholder="Date"
                  type="text"
                />
              </div>
              <div className="flex-1 w-full flex items-center px-4">
                <span className="material-symbols-outlined text-primary mr-3">
                  category
                </span>
                <select className="w-full border-none focus:ring-0 bg-transparent text-slate-900 dark:text-white font-medium appearance-none outline-none">
                  <option>Category</option>
                  <option>Beach</option>
                  <option>Mountain</option>
                  <option>City</option>
                </select>
              </div>
              <button className="w-full md:w-auto px-10 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">search</span>
                Search
              </button>
            </div>
          </div>
        </section>

        {/* Category Search */}
        <section className="py-12 bg-white dark:bg-slate-950">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-6 md:gap-12">
              <button className="flex flex-col items-center gap-3 group">
                <div className="size-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                  <span className="material-symbols-outlined text-3xl">
                    beach_access
                  </span>
                </div>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Beach
                </span>
              </button>
              <button className="flex flex-col items-center gap-3 group">
                <div className="size-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                  <span className="material-symbols-outlined text-3xl">
                    terrain
                  </span>
                </div>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Mountain
                </span>
              </button>
              <button className="flex flex-col items-center gap-3 group">
                <div className="size-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                  <span className="material-symbols-outlined text-3xl">
                    apartment
                  </span>
                </div>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  City
                </span>
              </button>
              <button className="flex flex-col items-center gap-3 group">
                <div className="size-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                  <span className="material-symbols-outlined text-3xl">
                    explore
                  </span>
                </div>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Adventure
                </span>
              </button>
              <button className="flex flex-col items-center gap-3 group">
                <div className="size-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                  <span className="material-symbols-outlined text-3xl">
                    temple_buddhist
                  </span>
                </div>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Culture
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Special Offers Section */}
        <section className="py-20 bg-background-light dark:bg-background-dark">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
                  Special Offers
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  Exclusive deals for your dream vacation
                </p>
              </div>
              <a
                className="text-primary font-bold flex items-center gap-1 hover:underline"
                href="#"
              >
                View all deals
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Promo Card 1 */}
              <div className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="relative h-64">
                  <img
                    alt="Bali"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    data-alt="Luxury villa in Bali with private pool"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfAympBNiUoN1L8LZRpiNSJVpJB2hiIt_Eb4gykTrXT84fdXEcIbZ6Cc187jYba9Ez39HbFZneJfVXoqNTOdDvcqEYTERxG_Hsa0pC1R_kSsSnd8nPdGlcVQWp2uZB8SGSRygVcMbHin1r4wYElVoNtzO_BQ45iAiJ4u9Ux5z1GAQ1TjRGjVWky6HNyNLWy3Es_wEM-zDe1ndudwnFPIiBkgFzWicS7EfGm8YKaDnl68Lj-aV96YTWvWc6zLemZarBoarU8AQQacU"
                  />
                  <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                    20% OFF
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      Bali Island Resort
                    </h3>
                    <div className="flex items-center gap-1 text-amber-500">
                      <span className="material-symbols-outlined text-sm fill-current">
                        star
                      </span>
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                        4.9
                      </span>
                    </div>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">
                      location_on
                    </span>
                    Indonesia
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-slate-400 line-through text-sm font-medium">
                        $1,200
                      </span>
                      <div className="text-2xl font-black text-primary">
                        $899
                        <span className="text-sm text-slate-500 font-normal">
                          /person
                        </span>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-bold rounded-lg hover:bg-primary hover:text-white transition-all">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
              {/* Promo Card 2 */}
              <div className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="relative h-64">
                  <img
                    alt="Paris"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    data-alt="Eiffel Tower at sunset in Paris"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDuhl26_ob4tEB6t_6AMITURJdNrrnEXyy9SoTBbLSo1WhhZt1UNuEqqBc4_qG61Bjnayjx_4pYnwZ9zRsIxPOVJ9OmBpNswg_eX6lUslWAR1YvPIcqffTR1vd7GtAfvnL9UgZKccYabb4-mlVf23q7PpUwBcDMZ4erEjE9p-_-_bFyFAFCw8Hkbn9wXfMD98wq4OWSRg0_lKVqqBUirqBkTzuBZQbOtBdFZsd2P_cffzUw7Gd-h9yl3v90PEfp4YRMOhHJa4lYQU"
                  />
                  <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                    15% OFF
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      Parisian Romance
                    </h3>
                    <div className="flex items-center gap-1 text-amber-500">
                      <span className="material-symbols-outlined text-sm fill-current">
                        star
                      </span>
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                        4.7
                      </span>
                    </div>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">
                      location_on
                    </span>
                    France
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-slate-400 line-through text-sm font-medium">
                        $2,400
                      </span>
                      <div className="text-2xl font-black text-primary">
                        $1,999
                        <span className="text-sm text-slate-500 font-normal">
                          /person
                        </span>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-bold rounded-lg hover:bg-primary hover:text-white transition-all">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
              {/* Promo Card 3 */}
              <div className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="relative h-64">
                  <img
                    alt="Tokyo"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    data-alt="Modern skyline of Tokyo with neon lights"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCO-L7eh8z9OzKXmwIHXt0uyfDPkr3zWHd8xnBWPOXF93HGzTnU53OT5tJ7C6rujY0EWjIv9XLCWYqFqsAAmtGWWhGlAbTzgSsmNWf9mk6LGSy6FA55kqhNllXfhRjaXTkGl8gDjLJK-3Uu5OmzCcHWTPGWtPHzfsJvuAIx4axjcIwJLyHVcl5F_3Ar0P9j-cp-80-5KT0pgYy5TtPD90nTmxmLJwDpOKgj6kZNDyGq5PJkq15IUvc-AH55SbrcNkQKqOHX9kzWAXc"
                  />
                  <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                    30% OFF
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      Tokyo City Lights
                    </h3>
                    <div className="flex items-center gap-1 text-amber-500">
                      <span className="material-symbols-outlined text-sm fill-current">
                        star
                      </span>
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                        4.8
                      </span>
                    </div>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">
                      location_on
                    </span>
                    Japan
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-slate-400 line-through text-sm font-medium">
                        $1,850
                      </span>
                      <div className="text-2xl font-black text-primary">
                        $1,295
                        <span className="text-sm text-slate-500 font-normal">
                          /person
                        </span>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-bold rounded-lg hover:bg-primary hover:text-white transition-all">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Top Activities */}
        <section className="py-20 bg-white dark:bg-slate-950">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tighter">
                Top Activities
              </h2>
              <div className="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Activity Card 1 */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] group cursor-pointer shadow-lg shadow-black/10">
                <img
                  alt="Scuba Diving"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  data-alt="Person scuba diving in clear blue ocean water"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzfuK-nIIVmWL8yasy6_waFbocH1LKq_FLEQQmcFeNRj__iQHnwlwF_foi16vM9rs1M1cJ-0WCo3Bebj1juthOe9JLijzAM9r5vXAr98kF4bOhaCy4A3njPqN5Y3MfLPwOFOjOrorIYlQ_YyTnyKCPEBcU9He9-dsqOAOnUACzl_k6zKxjLPLLfdLAWv_5ri5TL9p18Uoj7ChydBKsW5ajv9YwbVpxrv15gdwwiiRJNLge2IczlyEAC0SHJLX8qlTK7MBzTtEDDhE"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <div className="flex items-center gap-1 text-amber-400 mb-2">
                    <span className="material-symbols-outlined text-xs fill-current">
                      star
                    </span>
                    <span className="text-xs font-bold text-white">4.9</span>
                  </div>
                  <h4 className="text-white text-lg font-bold mb-1">
                    Deep Sea Diving
                  </h4>
                  <p className="text-white/80 text-xs mb-3">
                    Great Barrier Reef, AU
                  </p>
                  <div className="text-white font-black">
                    <span className="text-[10px] font-normal opacity-80 uppercase block">
                      Starts from
                    </span>
                    $249
                  </div>
                </div>
              </div>
              {/* Activity Card 2 */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] group cursor-pointer shadow-lg shadow-black/10">
                <img
                  alt="Hiking"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  data-alt="Hiker reaching mountain peak at sunrise"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcZ7rtx4hJ5xRobpjJmFpUFbqd0L-abm7hFj0tsbLRACDMgCPOW-8EMdmP9KbEVpseZHHUHOgKAzxKYORj7URUBAXhdiKOWuWYyLq50LsXSIBZqEl1lD7HRBdhVIxAYb7CsNyIe5y_G3tJPlAlOGGuEy3vLYDrrV5RUTbvGM6WW10X4PrBcSY1R278Rq8AOPdWEpGcp6-tfxDRhSbFdKturysh1E_tVE6uemKLExmKD_bPhv1LdltbWItuQqoFrgmIuTtGAbiN7R4"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <div className="flex items-center gap-1 text-amber-400 mb-2">
                    <span className="material-symbols-outlined text-xs fill-current">
                      star
                    </span>
                    <span className="text-xs font-bold text-white">4.8</span>
                  </div>
                  <h4 className="text-white text-lg font-bold mb-1">
                    Mountain Trekking
                  </h4>
                  <p className="text-white/80 text-xs mb-3">
                    Interlaken, Switzerland
                  </p>
                  <div className="text-white font-black">
                    <span className="text-[10px] font-normal opacity-80 uppercase block">
                      Starts from
                    </span>
                    $159
                  </div>
                </div>
              </div>
              {/* Activity Card 3 */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] group cursor-pointer shadow-lg shadow-black/10">
                <img
                  alt="Skiing"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  data-alt="Person skiing down a snowy mountain slope"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwEmJLe97iItS__9rxaR7yyqLV8iMeJppS4RgW2f7D_skAjp8nRYxY6d-Ti4NxcbC3mBSSxY3_IhlouhB0JVeb47zfc64vRGWpOUL00TSDTRTk-iyA_YSAT2QD-l8BmMl2nEbQdXljdDtnKlJ6JB9plgacPbunPRa-d6ayJp7HT3iwUoHlypawG7cmpzBmYYrahEM56Pbd_RibbgEVPTIqsIJGch8i7Kr_rDrgSCBCIRdQmyCjjcMWLLxjQVS-zm1RY12tBblCpZ8"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <div className="flex items-center gap-1 text-amber-400 mb-2">
                    <span className="material-symbols-outlined text-xs fill-current">
                      star
                    </span>
                    <span className="text-xs font-bold text-white">5.0</span>
                  </div>
                  <h4 className="text-white text-lg font-bold mb-1">
                    Alpine Skiing
                  </h4>
                  <p className="text-white/80 text-xs mb-3">Aspen, Colorado</p>
                  <div className="text-white font-black">
                    <span className="text-[10px] font-normal opacity-80 uppercase block">
                      Starts from
                    </span>
                    $310
                  </div>
                </div>
              </div>
              {/* Activity Card 4 */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] group cursor-pointer shadow-lg shadow-black/10">
                <img
                  alt="Santorini"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  data-alt="Santorini white buildings and blue ocean"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWmesHm_exnbXM4AaGL13DN9ca59qeN9zH_VURAa36dkn6M1vrsePNLY27vobXWbe_xfn3IOQYTHQIbir46i5A9XP6p57be8ILYGhyGlcb53p6hEQrHkEKPytpvPPDWQ3uxMsxA4MgPlFjutSD8k7wsnqVnYEgLF4mhI-ef7hD48N-ndhShiCWa-33DA1kiQJS-4Lg3BcdY7a4VJl4k-mCCmaehveNhIwIgZDUA4Gzy1LsNqurUUWnnlbqYkvX1Z-vo48aaPI25-E"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <div className="flex items-center gap-1 text-amber-400 mb-2">
                    <span className="material-symbols-outlined text-xs fill-current">
                      star
                    </span>
                    <span className="text-xs font-bold text-white">4.9</span>
                  </div>
                  <h4 className="text-white text-lg font-bold mb-1">
                    Sunset Yacht Cruise
                  </h4>
                  <p className="text-white/80 text-xs mb-3">
                    Santorini, Greece
                  </p>
                  <div className="text-white font-black">
                    <span className="text-[10px] font-normal opacity-80 uppercase block">
                      Starts from
                    </span>
                    $199
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-primary/10 dark:bg-primary/5">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">
              Get Special Offers
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 font-medium">
              Subscribe to our newsletter and get exclusive weekly travel deals
              right in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                className="flex-1 px-6 py-4 rounded-full border-none focus:ring-2 focus:ring-primary bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-white outline-none"
                placeholder="Your email address"
                type="email"
              />
              <button className="px-8 py-4 bg-primary text-white font-bold rounded-full shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="size-6 bg-primary rounded flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-sm">
                    explore
                  </span>
                </div>
                <span className="text-xl font-black tracking-tight text-white uppercase">
                  Travelio
                </span>
              </div>
              <p className="text-sm leading-relaxed mb-6 opacity-70">
                Making world-class travel experiences accessible to everyone.
                Explore, dream, and discover with Travelio.
              </p>
              <div className="flex gap-4">
                <a
                  className="size-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                  href="#"
                >
                  <svg className="size-5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                </a>
                <a
                  className="size-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                  href="#"
                >
                  <svg className="size-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.058-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    About Us
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Our Destinations
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Special Promos
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Travel Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Support</h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Help Center
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Contact Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Mobile App</h4>
              <p className="text-xs opacity-60 mb-4">
                Download our app for better experience.
              </p>
              <div className="flex flex-col gap-3">
                <button className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors">
                  <span className="material-symbols-outlined">
                    phone_iphone
                  </span>
                  <div className="text-left">
                    <div className="text-[10px] uppercase">Download on</div>
                    <div className="text-xs font-bold">App Store</div>
                  </div>
                </button>
                <button className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors">
                  <span className="material-symbols-outlined">play_arrow</span>
                  <div className="text-left">
                    <div className="text-[10px] uppercase">Get it on</div>
                    <div className="text-xs font-bold">Google Play</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-center text-xs opacity-50">
            © 2024 Travelio Marketplace. All rights reserved. Designed with
            passion for travelers.
          </div>
        </div>
      </footer>
    </>
  );
}
