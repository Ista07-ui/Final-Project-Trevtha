import UserDashboardHeader from "@/components/user/UserDashboardHeader";

export default function HelpCenterPage() {
  const faqCategories = [
    {
      title: "Booking",
      icon: "calendar_month",
      items: [
        "How to cancel stays?",
        "Modifying itineraries",
        "Group reservations",
      ],
    },
    {
      title: "Payments",
      icon: "payments",
      items: [
        "How to use a promo code?",
        "Payment confirmation issues",
        "Refund timelines",
      ],
    },
    {
      title: "Account",
      icon: "account_circle",
      items: [
        "Two-factor auth setup",
        "Changing email address",
        "Privacy settings",
      ],
    },
    {
      title: "Destinations",
      icon: "map",
      items: [
        "Visa requirements guide",
        "Destination health advice",
        "Local concierge services",
      ],
    },
  ];

  return (
    <div className="layout-container flex h-full grow flex-col bg-background-light text-charcoal [--color-primary:#1B3022] [--color-forest:#1B3022] [--color-gold:#D4AF37] [--color-background-light:#F9F7F2] [--color-background-dark:#121212]">
      {/* Top Navigation */}
      <UserDashboardHeader />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Hero Section */}
        <section
          className="relative h-96 flex items-center justify-center p-8 bg-background-dark overflow-hidden"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(27, 48, 34, 0.8), rgba(27, 48, 34, 1)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuBXQ-IRt43GTesuZdtMbz59XY5bcgLcV1M3qqcuTKD0_IQCTDuTKk68gW-D6l4Hi1pqrvn34uJonS9H7zHN5bT80OgNtESzudYTzhf7IfDgth_XKUDqXpOpOsrxxKXiv0POFzY1jr2EElSzs5mx7ZCdD0BQwnB5pookJCO2MlbbsxaQsoFvn_cj2-kWtT1f1u9fTh9U9FNM3f2WzS1HcMptw1UiwBjdQGjXnnlOjoceMGQZbGR1zZGYmzLhYGeGIpwzlDPunQ61Etg4')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 opacity-20"></div>
          <div className="relative z-10 w-full max-w-3xl text-center space-y-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              How can we help you?
            </h1>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-primary">
                  search
                </span>
              </div>
              <input
                className="block w-full pl-12 pr-32 py-5 bg-background-light/10 border border-primary/30 rounded-xl focus:ring-primary focus:border-primary text-white placeholder-slate-400 backdrop-blur-md"
                placeholder="Search for articles, guides, or FAQs..."
                type="text"
              />
              <div className="absolute inset-y-2 right-2 flex">
                <button className="bg-primary text-accent-dark font-bold px-8 rounded-lg hover:bg-neutral-gold transition-colors">
                  Search
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* System Status Banner */}
        <div className="px-8 -mt-6 relative z-20">
          <div className="bg-white border border-primary/20 rounded-xl p-4 flex items-center justify-between shadow-xl">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <div>
                <p className="text-sm font-bold">System Status</p>
                <p className="text-xs text-slate-500">
                  All systems are operational. Our concierge is ready to assist.
                </p>
              </div>
            </div>
            <a
              className="text-xs font-bold text-primary flex items-center gap-1 hover:underline"
              href="#"
            >
              Detailed Status{" "}
              <span className="material-symbols-outlined text-sm">
                chevron_right
              </span>
            </a>
          </div>
        </div>

        <div className="p-8 space-y-12">
          {/* FAQ Categories Grid */}
          <section>
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold">FAQ Categories</h2>
                <p className="text-slate-500">
                  Browse by topic to find quick answers
                </p>
              </div>
              <a
                className="text-primary font-semibold hover:underline"
                href="#"
              >
                View All Topics
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {faqCategories.map((category, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all group"
                >
                  <span className="material-symbols-outlined text-primary text-4xl mb-4">
                    {category.icon}
                  </span>
                  <h3 className="text-lg font-bold mb-4">{category.title}</h3>
                  <ul className="space-y-3">
                    {category.items.map((item, itemIdx) => (
                      <li key={itemIdx}>
                        <a
                          className="text-sm text-slate-600 hover:text-primary flex items-center gap-2"
                          href="#"
                        >
                          <span className="material-symbols-outlined text-xs">
                            description
                          </span>{" "}
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Direct Support Section */}
          <section className="bg-primary/5 rounded-3xl p-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold mb-2">
                Speak with our Concierge
              </h2>
              <p className="text-slate-500">
                Personalized support for your elite travel needs
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Live Chat */}
              <div className="bg-white p-8 rounded-2xl text-center border border-primary/20 shadow-sm flex flex-col items-center">
                <div className="bg-primary/20 p-4 rounded-full mb-6">
                  <span className="material-symbols-outlined text-primary text-3xl">
                    chat
                  </span>
                </div>
                <h4 className="text-xl font-bold mb-2">Live Chat</h4>
                <p className="text-sm text-slate-500 mb-6">
                  Real-time assistance with our travel specialists
                </p>
                <button className="mt-auto w-full py-3 px-6 bg-accent-dark text-primary font-bold rounded-lg border border-primary/40">
                  Start Chat
                </button>
              </div>

              {/* Email Support */}
              <div className="bg-white p-8 rounded-2xl text-center border border-primary/20 shadow-sm flex flex-col items-center">
                <div className="bg-primary/20 p-4 rounded-full mb-6">
                  <span className="material-symbols-outlined text-primary text-3xl">
                    mail
                  </span>
                </div>
                <h4 className="text-xl font-bold mb-2">Email Support</h4>
                <p className="text-sm text-slate-500 mb-2">
                  Detailed inquiries for curated trips
                </p>
                <p className="text-primary font-bold mb-6">
                  support@trevtha.com
                </p>
                <button className="mt-auto w-full py-3 px-6 bg-accent-dark text-primary font-bold rounded-lg border border-primary/40">
                  Send Email
                </button>
              </div>

              {/* Call Center */}
              <div className="bg-white p-8 rounded-2xl text-center border border-primary/20 shadow-sm flex flex-col items-center">
                <div className="bg-primary/20 p-4 rounded-full mb-6">
                  <span className="material-symbols-outlined text-primary text-3xl">
                    call
                  </span>
                </div>
                <h4 className="text-xl font-bold mb-2">24/7 Call Center</h4>
                <p className="text-sm text-slate-500 mb-2">
                  Immediate assistance anywhere, anytime
                </p>
                <p className="text-primary font-bold mb-6">+1-800-TREVTHA</p>
                <button className="mt-auto w-full py-3 px-6 bg-accent-dark text-primary font-bold rounded-lg border border-primary/40">
                  Call Now
                </button>
              </div>
            </div>
          </section>

          {/* User Guides */}
          <section className="pb-12">
            <h2 className="text-xl font-bold mb-6">User Guides & Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <a
                className="flex items-center p-6 bg-white rounded-xl border border-slate-200 hover:border-primary transition-colors group"
                href="#"
              >
                <div className="size-16 bg-background-light rounded-lg flex items-center justify-center mr-6 group-hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined text-primary text-3xl">
                    play_circle
                  </span>
                </div>
                <div>
                  <h5 className="text-lg font-bold">Video Tutorials</h5>
                  <p className="text-sm text-slate-500">
                    Master our booking platform in minutes
                  </p>
                </div>
                <span className="material-symbols-outlined ml-auto text-slate-300 group-hover:text-primary">
                  arrow_forward_ios
                </span>
              </a>
              <a
                className="flex items-center p-6 bg-white rounded-xl border border-slate-200 hover:border-primary transition-colors group"
                href="#"
              >
                <div className="size-16 bg-background-light rounded-lg flex items-center justify-center mr-6 group-hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined text-primary text-3xl">
                    library_books
                  </span>
                </div>
                <div>
                  <h5 className="text-lg font-bold">Step-by-step Articles</h5>
                  <p className="text-sm text-slate-500">
                    Comprehensive guides for new travelers
                  </p>
                </div>
                <span className="material-symbols-outlined ml-auto text-slate-300 group-hover:text-primary">
                  arrow_forward_ios
                </span>
              </a>
            </div>
          </section>
        </div>

        {/* Footer Small */}
        <footer className="mt-auto border-t border-primary/10 p-8 text-center text-slate-500 text-xs">
          © 2024 TREVTHA Luxury Travel Marketplace. All Rights Reserved. Private
          & Confidential.
        </footer>
      </main>
    </div>
  );
}
