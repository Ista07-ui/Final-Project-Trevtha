export default function UserCurrentOffers() {
  const userOffers = [
    {
      id: 1,
      tag: "Limited Time",
      title: "25% OFF Summer\nResort Escapes",
      cta: "Claim Offer",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCYCGBc7CR9mNynSvaE1oLKfOEt38-iUapZS_VSlGYDiQDtNnPuv_ar2gPnpc7aaEqR0DaSbf5CRd5KTT3ABdNMpdhjd31NPqzNumGo1R8WmZVHYl3ngNoz0wnMfo0FJnLXKXr3KKIcV0SQJ0ObOFMUfG7ddx9Kug3NcEUAIFJ_UIlDCmksVlLE5Fe6BN0Se1QX7qVGZVJqW_xGBNueew7JFbYzeARhKl1OQZdhXRrlfqmiJ6X084zRfskYQEHsHTF5DHyCYPkUJwnY",
    },
    {
      id: 2,
      tag: "Exclusive",
      title: "Complimentary Concierge\nfor Yacht Bookings",
      cta: "Explore",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCQOd04CSaeyawvt-ZYa8IeBE_0z8EjRA2dontfO7DTZZWmFcBgVsfX6qXWOJshLuUGwTP3o49jAagAz2aJg4c2cbcz7usAQpTB2D0IGkwsGX4owmv9hs0XZ6iauS1jvyeGxzsPzwxhYWtCgoPAj1O9fV035kMrczUDvLunuvIHRIAtBPfXVAzEPQORqgjkVZNGN8QW-SzQsXwJJU8RpiCuG_dJLM2J10ZZqu1lq2hDIWLom1Qg8b9UrbuTbSKRMw7zro2--2qK__NE",
    },
  ];

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-primary">Current Offers</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {userOffers.map((offer) => (
          <div
            key={offer.id}
            className="relative h-40 rounded-xl overflow-hidden group cursor-pointer shadow-md"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent z-10"></div>
            <div
              className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
              style={{ backgroundImage: `url('${offer.image}')` }}
            ></div>
            <div className="absolute inset-0 z-20 p-6 flex flex-col justify-center">
              <p className="text-accent text-[10px] font-bold uppercase tracking-widest mb-1">
                {offer.tag}
              </p>
              <h4 className="text-white font-bold text-lg leading-tight mb-2">
                {offer.title}
              </h4>
              <span className="text-white text-xs font-semibold flex items-center gap-1">
                {offer.cta}
                <span className="material-symbols-outlined text-[14px]">
                  arrow_forward
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
