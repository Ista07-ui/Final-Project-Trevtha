"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { bannerService, type Banner } from "@/lib/services/banner";

export default function SeasonalDeals() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setIsLoading(true);
        // Fetch active banners dari API
        const data = await bannerService.getActiveBanners();
        setBanners(data.length > 0 ? data : getDefaultBanners());
        setError(null);
      } catch (err) {
        console.error("Error fetching banners:", err);
        setError("Failed to load banners");
        // Fallback ke default banners jika API gagal
        setBanners(getDefaultBanners());
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanners();
  }, []);

  // Default banners fallback
  const getDefaultBanners = (): Banner[] => [
    {
      id: "1",
      title: "Amalfi Coast",
      description: "Starting from $1,299",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDexww3XmtpTVzKqwRfwb-FSsYCU5yWYcwPA4AYGQJoE33uVIVqy9UJx9zS7t6MxwzBI6FBXTNlvtHfu0KfuVi2dYHzqGfwpFypk5g7rTcBb2mcN9xRMaBFu1KHbBzjMbrw1JEvRBkiShw72S96MUR4rw2jFBAoZjpKfZOd_NnKbkZHswZJdNW3t-DNiJshP6sSTTJ-1lCbOC6lZS231vK7uq4--hzcVHWJx3ycBEjxslwukEAjhfqJeDepRu_0kkXXr4NGu9xGVryj",
      status: "active",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "2",
      title: "Swiss Alps Retreat",
      description: "Starting from $2,450",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCBFle4JTmaiOBxceuMXcm6QLKM4gWvQ2hvt6y9bR19cbUq_qIYknBWhbmOmr33WMt27zK31Fn7diM3_HUUjbnB32n7VugpbtIOb3AcwkLmqlt1YuUCKjfuwSJXsf6YTS4MhFZIPjfUz-z5VFX1mhvls0eoBSGBHSuu9rp29Ej69IZN8msvUfNvb87s1njTAadKRIRD3VOFeunSIWjvkfbhoqnB8eI32DDZM_yiYq_lBc1BuDgakl85nRQwqDv-VLFV-uPmi2TtBx76",
      status: "active",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "3",
      title: "Tokyo Metro Experience",
      description: "Starting from $980",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD5mia5vnVY8Xt-_lJeLNn25DzU43Umd3ttwI9rmaECf65WqyTONdHfEHPIsIpIRJ50jt6x-4zFkn22fvkiN7_1bz_PEkCNGbSSMO-QpMpLcf0BMFc5X3RcpeFGv44rk_ptvT0587hpCcinYoVALwqaD0f-rDlgXJsY7MJKNZOi5FBy2BtQm8F5oMeqc_WbZqxB_qM8LET_OX43OAPH22zvFIdVBwlcXDwnumHTTycgqQo9FIiwlCi6VWc90JEM_goP6l6eQj1pzf2U",
      status: "active",
      createdAt: "",
      updatedAt: "",
    },
  ];

  return (
    <div className="mb-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black text-forest">
            Exclusive Seasonal Offers
          </h2>
          <p className="text-slate-500">
            Limited time deals for your next dream escape
          </p>
        </div>
        <Link
          className="text-primary font-bold flex items-center gap-1 hover:underline"
          href="/view-all"
        >
          <span>View All</span>
          <span className="material-symbols-outlined">chevron_right</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-3 text-center py-12">
            <p className="text-slate-500">Loading banners...</p>
          </div>
        ) : error ? (
          <div className="col-span-3 text-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        ) : banners.length === 0 ? (
          <div className="col-span-3 text-center py-12">
            <p className="text-slate-500">No banners available</p>
          </div>
        ) : (
          banners.map((banner) => (
            <div
              key={banner.id}
              className="group relative overflow-hidden rounded-2xl aspect-16/10 bg-forest cursor-pointer"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url("${banner.imageUrl}")` }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-forest/90 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white text-2xl font-bold mb-1">
                  {banner.title}
                </h3>
                <p className="text-cream/80 text-sm">
                  {banner.description}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
