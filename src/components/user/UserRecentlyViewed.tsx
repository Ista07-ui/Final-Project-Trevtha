export default function UserRecentlyViewed() {
  const userRecentlyViewedItems = [
    {
      id: 1,
      title: "Maldives Villa",
      viewedTime: "Viewed 2 hours ago",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCWbkChIKzcqsRr-LqeDKtRsKpZFv7cQoLRLqKv3JSsTr-gmEO9p3WWGGYpxic47yWhVXtgnhwdGQl19np7z7T3ioEhzcQ4GZLzkD6Q7JLlID47V5OlyA9zfD_BWhP6863EHd2hM4ETyPtVgDOa6gIVIqWS9Wx27hznDQu8iFk24ICOYVViby1gwI2ntOckfkWhPa2zIGLnd0Xf835RUMrzLmXzJ71si6N6x-ik_3iMbv1kqL9Lg0jguoqWe3huV9SdHShVVdtgAgvi",
    },
    {
      id: 2,
      title: "Alpine Chalet Stay",
      viewedTime: "Viewed yesterday",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCfX97XgjDgvBQphHUmEMlQM566dflBiZyYICVUAd3aDg7sEYzd3JaOIuZ8doqYbb6IQzucMCcutTdrZAelwksYMPi2JSbOKLqRVHJoCSnggaj26G4z2pKWgaKw-SXq2geIaTSP8M6mlQGo5H8DNq3uAz1m687VT-vW3MTDFxT8ie_KbK9cIUeFIp_rOKyDpeh8-qfkzRGASO4ySbvaPf7W7qYg8GrJYOllR08Lql0ETauKJ-fzj8ENUC1nKb5jGs1yWc5rTtiL4iM1",
    },
  ];

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-primary">Recently Viewed</h2>
        <button className="text-charcoal/40 text-xs font-bold flex items-center gap-1 hover:text-primary">
          Clear History
        </button>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {userRecentlyViewedItems.map((item) => (
          <div
            key={item.id}
            className="min-w-[240px] bg-white rounded-lg border border-primary/5 p-3 flex gap-3 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div
              className="size-16 rounded-lg bg-cover bg-center flex-shrink-0"
              style={{ backgroundImage: `url('${item.image}')` }}
            />
            <div className="flex flex-col justify-center">
              <h5 className="text-sm font-bold text-primary line-clamp-1">
                {item.title}
              </h5>
              <p className="text-[10px] text-charcoal/60">{item.viewedTime}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
