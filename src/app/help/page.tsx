import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function HelpPage() {
  const bookingGuides = [
    {
      icon: "travel_explore",
      title: "Discovery & Search",
      description:
        "Browse thousands of curated experiences and find your perfect adventure using our smart filters.",
      items: [
        "Filter by destination",
        "Sort by price & ratings",
        "Save favorites",
        "Get recommendations",
      ],
    },
    {
      icon: "card_giftcard",
      title: "Promo Codes & Cart",
      description:
        "Apply exclusive discounts and manage your bookings with our easy cart system.",
      items: [
        "Apply promo codes",
        "View discounts",
        "Edit bookings",
        "Share with friends",
      ],
    },
    {
      icon: "lock",
      title: "Checkout & Security",
      description:
        "Complete your booking securely with multiple payment options and fraud protection.",
      items: [
        "Secure payment",
        "Multiple methods",
        "Instant confirmation",
        "Receipt saved",
      ],
    },
  ];

  const paymentMethods = [
    {
      icon: "account_balance",
      title: "Bank Transfer",
      description: "Direct transfer to our secured account",
    },
    {
      icon: "credit_card",
      title: "Credit Card",
      description: "Visa, Mastercard, American Express",
    },
    {
      icon: "phone_iphone",
      title: "E-Wallet",
      description: "GCash, OVO, Dana, Grab Pay",
    },
    {
      icon: "paid",
      title: "Buy Now Pay Later",
      description: "Flexible installment options available",
    },
  ];

  const accountHelp = [
    {
      title: "New Account Registration",
      description: "Getting started with TREVTHA is simple",
      steps: [
        "Visit our website or download the app",
        "Click 'Sign Up' and enter your email",
        "Create a strong password",
        "Verify your email address",
        "Complete your profile",
      ],
    },
    {
      title: "Password Recovery",
      description: "Forgot your password? No problem",
      steps: [
        "Click 'Forgot Password' on login page",
        "Enter your registered email",
        "Check your inbox for reset link",
        "Click the link and create new password",
        "Log in with new password",
      ],
    },
    {
      title: "Two-Factor Authentication",
      description: "Enhance your account security",
      steps: [
        "Go to Account Settings",
        "Select 'Security Settings'",
        "Enable 2FA",
        "Choose verification method (SMS/App)",
        "Confirm with verification code",
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Help Hero Section */}
        <section className="bg-gradient-to-r from-forest to-forest/70 rounded-3xl p-12 mb-12">
          <h1 className="text-4xl font-extrabold text-white mb-4">
            Help Center
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-2xl">
            Find answers to your questions and get the support you need for your
            next adventure.
          </p>
          <div className="relative max-w-xl">
            <input
              type="text"
              placeholder="How can we help you find your next journey?"
              className="w-full px-6 py-4 rounded-xl text-forest placeholder-forest/50 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-forest hover:bg-primary/80 transition-colors rounded-lg">
              <span className="material-symbols-outlined">search</span>
            </button>
          </div>
        </section>

        {/* Booking Guide */}
        <section className="mb-16">
          <h2 className="text-3xl font-extrabold text-forest mb-8">
            Booking Guide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {bookingGuides.map((guide) => (
              <div
                key={guide.title}
                className="bg-white border border-forest/5 rounded-2xl p-8 hover:shadow-xl transition-all"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                  <span className="material-symbols-outlined text-primary text-3xl">
                    {guide.icon}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-forest mb-3">
                  {guide.title}
                </h3>
                <p className="text-forest/60 mb-6">{guide.description}</p>
                <ul className="space-y-2">
                  {guide.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-forest">
                      <span className="material-symbols-outlined text-primary text-sm">
                        check_circle
                      </span>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Payment Methods */}
        <section className="bg-forest rounded-3xl p-12 mb-16">
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Payment Methods We Accept
          </h2>
          <p className="text-white/80 mb-12 max-w-2xl">
            We support multiple secure payment options for your convenience. All
            transactions are encrypted and protected.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {paymentMethods.map((method, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-white hover:bg-white/20 transition-all"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-4">
                  <span className="material-symbols-outlined text-primary text-2xl">
                    {method.icon}
                  </span>
                </div>
                <h3 className="font-bold mb-2">{method.title}</h3>
                <p className="text-white/70 text-sm">{method.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Account Help */}
        <section className="mb-16">
          <h2 className="text-3xl font-extrabold text-forest mb-8">
            Account & Security
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {accountHelp.map((help, idx) => (
              <div
                key={idx}
                className="bg-white border border-forest/5 rounded-2xl p-8"
              >
                <h3 className="text-xl font-bold text-forest mb-2">
                  {help.title}
                </h3>
                <p className="text-forest/60 text-sm mb-6">
                  {help.description}
                </p>
                <ol className="space-y-3">
                  {help.steps.map((step, i) => (
                    <li key={`${help.title}-${i}`} className="flex gap-3">
                      <span className="flex items-center justify-center w-6 h-6 bg-primary text-forest text-xs font-bold rounded-full flex-shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-forest text-sm pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>

        {/* Cancellation Policy */}
        <section className="bg-slate-50 rounded-2xl p-12 mb-16 border border-forest/5">
          <h2 className="text-3xl font-extrabold text-forest mb-6">
            Cancellation & Refund Policy
          </h2>
          <div className="space-y-4 text-forest/80">
            <p>
              <span className="font-bold text-forest">Free Cancellation:</span>{" "}
              Cancel any booking up to 14 days before your experience date for a
              full refund.
            </p>
            <p>
              <span className="font-bold text-forest">7-14 Days Before:</span>{" "}
              50% refund on cancellations within 7-14 days of your booking.
            </p>
            <p>
              <span className="font-bold text-forest">Less Than 7 Days:</span>{" "}
              No refund for cancellations within 7 days of your experience.
            </p>
            <p>
              <span className="font-bold text-forest">Special Offers:</span>{" "}
              Discounted bookings may have different cancellation terms. Check
              your booking confirmation.
            </p>
            <p>
              <span className="font-bold text-forest">Modification:</span> You
              can modify your booking at no extra cost if the same experience is
              available on your new date.
            </p>
            <div className="mt-6 p-4 bg-primary/10 border-l-4 border-primary rounded">
              <p className="font-semibold text-forest">
                Need to cancel or modify?{" "}
              </p>
              <p className="text-sm mt-1">
                Contact our support team at least 24 hours before your
                experience for immediate assistance.
              </p>
            </div>
          </div>
        </section>

        {/* Direct Support */}
        <section className="mb-20">
          <h2 className="text-3xl font-extrabold text-forest mb-8 text-center">
            Still Need Help?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-primary to-primary/70 rounded-3xl p-8 text-white">
              <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6 mx-auto">
                <span className="material-symbols-outlined text-white text-3xl">
                  phone
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-center">
                WhatsApp & Phone Support
              </h3>
              <p className="text-white/80 text-center mb-6">
                Available Monday - Friday, 9 AM - 9 PM (Your Local Time)
              </p>
              <div className="space-y-3 text-center">
                <p className="text-lg font-semibold">+62 811 9999 8888</p>
                <p className="text-white/70 mb-6">
                  WhatsApp support available 24/7
                </p>
                <button className="w-full px-6 py-3 bg-white text-primary font-bold rounded-xl hover:bg-primary/10 transition-all">
                  <span className="material-symbols-outlined mr-2">
                    message
                  </span>
                  Message Us Now
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-forest to-forest/70 rounded-3xl p-8 text-white">
              <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6 mx-auto">
                <span className="material-symbols-outlined text-white text-3xl">
                  mail
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-center">
                Email Support
              </h3>
              <p className="text-white/80 text-center mb-6">
                We typically respond within 24 hours
              </p>
              <div className="space-y-3 text-center">
                <p className="text-lg font-semibold">support@trevtha.id</p>
                <p className="text-white/70 mb-6">
                  For urgent matters, please call our hotline
                </p>
                <button className="w-full px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/80 transition-all">
                  <span className="material-symbols-outlined mr-2">send</span>
                  Send Email
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
