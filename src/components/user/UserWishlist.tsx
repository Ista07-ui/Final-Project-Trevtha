interface UserWishlistItemProps {
  id: number;
  location: string;
  rating: number;
  title: string;
  price: number;
  priceUnit: string;
  image: string;
}

const userWishlistItems: UserWishlistItemProps[] = [
  {
    id: 1,
    location: "Maldives",
    rating: 4.9,
    title: "Luxury Overwater Villa Escape",
    price: 1250,
    priceUnit: "/night",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCWbkChIKzcqsRr-LqeDKtRsKpZFv7cQoLRLqKv3JSsTr-gmEO9p3WWGGYpxic47yWhVXtgnhwdGQl19np7z7T3ioEhzcQ4GZLzkD6Q7JLlID47V5OlyA9zfD_BWhP6863EHd2hM4ETyPtVgDOa6gIVIqWS9Wx27hznDQu8iFk24ICOYVViby1gwI2ntOckfkWhPa2zIGLnd0Xf835RUMrzLmXzJ71si6N6x-ik_3iMbv1kqL9Lg0jguoqWe3huV9SdHShVVdtgAgvi",
  },
  {
    id: 2,
    location: "Italy",
    rating: 5,
    title: "Private Amalfi Coast Yacht Tour",
    price: 4800,
    priceUnit: "/day",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCQOd04CSaeyawvt-ZYa8IeBE_0z8EjRA2dontfO7DTZZWmFcBgVsfX6qXWOJshLuUGwTP3o49jAagAz2aJg4c2cbcz7usAQpTB2D0IGkwsGX4owmv9hs0XZ6iauS1jvyeGxzsPzwxhYWtCgoPAj1O9fV035kMrczUDvLunuvIHRIAtBPfXVAzEPQORqgjkVZNGN8QW-SzQsXwJJU8RpiCuG_dJLM2J10ZZqu1lq2hDIWLom1Qg8b9UrbuTbSKRMw7zro2--2qK__NE",
  },
  {
    id: 3,
    location: "Switzerland",
    rating: 4.8,
    title: "Alpine Majesty Chalet Stay",
    price: 950,
    priceUnit: "/night",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCfX97XgjDgvBQphHUmEMlQM566dflBiZyYICVUAd3aDg7sEYzd3JaOIuZ8doqYbb6IQzucMCcutTdrZAelwksYMPi2JSbOKLqRVHJoCSnggaj26G4z2pKWgaKw-SXq2geIaTSP8M6mlQGo5H8DNq3uAz1m687VT-vW3MTDFxT8ie_KbK9cIUeFIp_rOKyDpeh8-qfkzRGASO4ySbvaPf7W7qYg8GrJYOllR08Lql0ETauKJ-fzj8ENUC1nKb5jGs1yWc5rTtiL4iM1",
  },
];

function UserWishlistCard({ item }: { item: UserWishlistItemProps }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-primary/5 shadow-md hover:shadow-xl transition-all">
      <div className="relative h-48">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url('${item.image}')` }}
        />
        <button className="absolute top-4 right-4 size-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-red-500 shadow-sm">
          <span className="material-symbols-outlined fill-1">favorite</span>
        </button>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">
            {item.location}
          </span>
          <span className="flex items-center text-accent">
            <span className="material-symbols-outlined text-[14px]">star</span>
            <span className="text-xs font-bold text-charcoal/80 ml-1">
              {item.rating}
            </span>
          </span>
        </div>
        <h4 className="font-bold text-primary text-lg mb-4 line-clamp-1">
          {item.title}
        </h4>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-charcoal/40 uppercase font-bold tracking-wider">
              Starting from
            </p>
            <p className="text-primary font-extrabold text-xl">
              ${item.price}
              <span className="text-sm font-normal text-charcoal/60">
                {item.priceUnit}
              </span>
            </p>
          </div>
          <button className="bg-accent text-primary px-4 py-2 rounded-lg font-bold text-sm hover:brightness-105 transition-all">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default function UserWishlist() {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-primary">Your Wishlist</h2>
        <button className="text-accent font-bold text-sm flex items-center gap-1 hover:underline">
          View All
          <span className="material-symbols-outlined text-[16px]">
            arrow_forward
          </span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {userWishlistItems.map((item) => (
          <UserWishlistCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
