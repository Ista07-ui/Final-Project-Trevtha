"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { activityService, type Activity } from "@/lib/services/activity";

const LOCAL_FALLBACK_IMAGE = "/images/fallback/activity-default.svg";
const LOCAL_THEME_FALLBACKS = {
  beach: "/images/activities/beach.svg",
  mountain: "/images/activities/mountain.svg",
  city: "/images/activities/city.svg",
  culture: "/images/activities/culture.svg",
  desert: "/images/activities/desert.svg",
  forest: "/images/activities/forest.svg",
  island: "/images/activities/island.svg",
  safari: "/images/activities/safari.svg",
  temple: "/images/activities/temple.svg",
  snow: "/images/activities/snow.svg",
};

const FALLBACK_POOL = [
  LOCAL_THEME_FALLBACKS.beach,
  LOCAL_THEME_FALLBACKS.mountain,
  LOCAL_THEME_FALLBACKS.city,
  LOCAL_THEME_FALLBACKS.culture,
  LOCAL_THEME_FALLBACKS.desert,
  LOCAL_THEME_FALLBACKS.forest,
  LOCAL_THEME_FALLBACKS.island,
  LOCAL_THEME_FALLBACKS.safari,
  LOCAL_THEME_FALLBACKS.temple,
  LOCAL_THEME_FALLBACKS.snow,
];

export default function CuratedActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imgIndexes, setImgIndexes] = useState<Record<string, number>>({});

  const getImageCandidates = (activity: Activity): string[] => {
    const urlsFromArray = Array.isArray(activity.imageUrls)
      ? activity.imageUrls.filter(
          (value) => value.trim().length > 0 && /^https?:\/\//i.test(value),
        )
      : [];

    const urlsFromSingle =
      activity.imageUrl && /^https?:\/\//i.test(activity.imageUrl)
        ? [activity.imageUrl]
        : [];

    const uniqueRemoteUrls = Array.from(
      new Set([...urlsFromArray, ...urlsFromSingle]),
    );

    const searchableText =
      `${activity.title} ${activity.location} ${activity.description}`.toLowerCase();

    const categoryHash = Array.from(activity.categoryId || "default").reduce(
      (sum, char) => sum + char.charCodeAt(0),
      0,
    );
    let themedFallback = FALLBACK_POOL[categoryHash % FALLBACK_POOL.length];

    if (
      searchableText.includes("beach") ||
      searchableText.includes("island") ||
      searchableText.includes("coast") ||
      searchableText.includes("sea")
    ) {
      themedFallback = LOCAL_THEME_FALLBACKS.beach;
    } else if (
      searchableText.includes("mount") ||
      searchableText.includes("mountain") ||
      searchableText.includes("hill") ||
      searchableText.includes("hiking") ||
      searchableText.includes("bromo")
    ) {
      themedFallback = LOCAL_THEME_FALLBACKS.mountain;
    } else if (
      searchableText.includes("desert") ||
      searchableText.includes("dune")
    ) {
      themedFallback = LOCAL_THEME_FALLBACKS.desert;
    } else if (
      searchableText.includes("forest") ||
      searchableText.includes("jungle")
    ) {
      themedFallback = LOCAL_THEME_FALLBACKS.forest;
    } else if (
      searchableText.includes("safari") ||
      searchableText.includes("wildlife")
    ) {
      themedFallback = LOCAL_THEME_FALLBACKS.safari;
    } else if (
      searchableText.includes("temple") ||
      searchableText.includes("ritual") ||
      searchableText.includes("heritage")
    ) {
      themedFallback = LOCAL_THEME_FALLBACKS.temple;
    } else if (
      searchableText.includes("snow") ||
      searchableText.includes("alps")
    ) {
      themedFallback = LOCAL_THEME_FALLBACKS.snow;
    } else if (
      searchableText.includes("city") ||
      searchableText.includes("metro") ||
      searchableText.includes("urban") ||
      searchableText.includes("paris") ||
      searchableText.includes("new york") ||
      searchableText.includes("tokyo")
    ) {
      themedFallback = LOCAL_THEME_FALLBACKS.city;
    }

    return [...uniqueRemoteUrls, themedFallback, LOCAL_FALLBACK_IMAGE];
  };

  const handleImageError = (activityId: string, totalCandidates: number) => {
    setImgIndexes((prev) => {
      const currentIndex = prev[activityId] ?? 0;
      if (currentIndex >= totalCandidates - 1) {
        return prev;
      }

      return { ...prev, [activityId]: currentIndex + 1 };
    });
  };

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setIsLoading(true);
        // Fetch active activities dari API (limit 4 untuk homepage)
        const data = await activityService.getActiveActivities(1, 4);
        setActivities(data.length > 0 ? data : getDefaultActivities());
        setError(null);
      } catch (err) {
        console.error("Error fetching activities:", err);
        setError("Failed to load activities");
        // Fallback ke default activities jika API gagal
        setActivities(getDefaultActivities());
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivities();
  }, []);

  // Default activities fallback
  const getDefaultActivities = (): Activity[] => [
    {
      id: "1",
      title: "Golden Desert Safari",
      description: "Experience the golden desert with expert guides",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD3-WAE8ersb_P6oLd7pBOLa3iu0QhMmaq4LdpQOO-cUPLjozGU73DvrajqPcvtiOLCu9uEqhFIhSJjcnY0f_gldm0RtY25m1vJuCz_DhFL16DBuc6qsI6HkTNz9kaQO_icwhOvRl8ShQ8HBDSIb5MgeFX9btGOaOkWStHX9JfIcHm9sD6NfET97IeSl_sVlf5oi9EQl3RERVpH53PDOaIT6F30j63JJBYRgw8FgWTE89e1E4zehbZ-NnVdIJkPwy5BQ0il7PyQiI-Q",
      imageUrls: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD3-WAE8ersb_P6oLd7pBOLa3iu0QhMmaq4LdpQOO-cUPLjozGU73DvrajqPcvtiOLCu9uEqhFIhSJjcnY0f_gldm0RtY25m1vJuCz_DhFL16DBuc6qsI6HkTNz9kaQO_icwhOvRl8ShQ8HBDSIb5MgeFX9btGOaOkWStHX9JfIcHm9sD6NfET97IeSl_sVlf5oi9EQl3RERVpH53PDOaIT6F30j63JJBYRgw8FgWTE89e1E4zehbZ-NnVdIJkPwy5BQ0il7PyQiI-Q",
      ],
      price: 149,
      rating: 4.9,
      categoryId: "1",
      location: "Dubai",
      country: "UAE",
      province: "Dubai",
      city: "Dubai",
      status: "active",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "2",
      title: "Skyline Helicopter Tour",
      description: "Breathtaking views of the city skyline",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB3xcQlcycaVr2TwnITipzMLQEkFnEVzsQthIXnvsI-t3CCrzaJVrhleGudGdDbNUJ_zpnX_U1zM6zAdCpS9yj5899MJ0P_69y-OLKyJpVU-3R1b7vNKt97wmjHJ424hGkMRn38XiBt4OL4tBXQo1lTGPvbxNH_X0xVFZkymUugfm27riA18HOp-qttcDymKAmd57WTVM9NZu7Rxv4ZBLzjLQtlytHdgzJqTaBjuRXKzWQQuf9w-68z4bTZgnSwnWAmFgp3ayCReqYZ",
      imageUrls: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB3xcQlcycaVr2TwnITipzMLQEkFnEVzsQthIXnvsI-t3CCrzaJVrhleGudGdDbNUJ_zpnX_U1zM6zAdCpS9yj5899MJ0P_69y-OLKyJpVU-3R1b7vNKt97wmjHJ424hGkMRn38XiBt4OL4tBXQo1lTGPvbxNH_X0xVFZkymUugfm27riA18HOp-qttcDymKAmd57WTVM9NZu7Rxv4ZBLzjLQtlytHdgzJqTaBjuRXKzWQQuf9w-68z4bTZgnSwnWAmFgp3ayCReqYZ",
      ],
      price: 399,
      rating: 5,
      categoryId: "1",
      location: "New York",
      country: "USA",
      province: "New York",
      city: "New York",
      status: "active",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "3",
      title: "Traditional Tea Ritual",
      description: "Immerse yourself in Japanese tea culture",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCTSN2mc-PXHB_0tIu-fuQsVh1Rw274OOyF61yhsgfI3VZavcsCeeBqEdyj6GZTnp2popaBgNDckMJZhDn1JUp3CUNVrHrCQZ0uJXx5W12dDY2LF3r78qTVV1JEUj3tCiPRqEvjZ1Zv6I2AcxBy5AdI-ockQqGWFpzoPwBXz6NM_VDgSk0zSOMPuKitOFf9Nlfh5ZL0206LlqjmpSe06il3q6P4n5kj0P2VIP45n9TNtsrIaxxVzZXFKQeku8pSrVI1N8nrCUJHK-gV",
      imageUrls: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCTSN2mc-PXHB_0tIu-fuQsVh1Rw274OOyF61yhsgfI3VZavcsCeeBqEdyj6GZTnp2popaBgNDckMJZhDn1JUp3CUNVrHrCQZ0uJXx5W12dDY2LF3r78qTVV1JEUj3tCiPRqEvjZ1Zv6I2AcxBy5AdI-ockQqGWFpzoPwBXz6NM_VDgSk0zSOMPuKitOFf9Nlfh5ZL0206LlqjmpSe06il3q6P4n5kj0P2VIP45n9TNtsrIaxxVzZXFKQeku8pSrVI1N8nrCUJHK-gV",
      ],
      price: 85,
      rating: 4.8,
      categoryId: "1",
      location: "Kyoto",
      country: "Japan",
      province: "Kyoto",
      city: "Kyoto",
      status: "active",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "4",
      title: "Private Seine Cruise",
      description: "Romantic evening cruise along the Seine River",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDyVIjeUsQfALQA5S5_bov6pbb-ZVoWuLILRatRY6gYjDrXLWqH6qu1vUjQtHOhuxAvrwIY-2jyrq-t7aOFR4VuihcmAWJhwZcm9lOeRxrFbaO1H29TBo9CTra3IZb88zGuwLytgn5cTTgUhN2wvMlmpM7D0qcawJyhCPHdNdohhxbFmZ4ZExwQHmab9CI3NW6yGThR5ap3v9DD46zEMKphjpOVGKMM_8T5HMWkPUugXkrk3EjlnWdastqEP9WvOktMitLSYUrMDVZj",
      imageUrls: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDyVIjeUsQfALQA5S5_bov6pbb-ZVoWuLILRatRY6gYjDrXLWqH6qu1vUjQtHOhuxAvrwIY-2jyrq-t7aOFR4VuihcmAWJhwZcm9lOeRxrFbaO1H29TBo9CTra3IZb88zGuwLytgn5cTTgUhN2wvMlmpM7D0qcawJyhCPHdNdohhxbFmZ4ZExwQHmab9CI3NW6yGThR5ap3v9DD46zEMKphjpOVGKMM_8T5HMWkPUugXkrk3EjlnWdastqEP9WvOktMitLSYUrMDVZj",
      ],
      price: 120,
      rating: 4.7,
      categoryId: "1",
      location: "Paris",
      country: "France",
      province: "Ile-de-France",
      city: "Paris",
      status: "active",
      createdAt: "",
      updatedAt: "",
    },
  ];

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-black text-forest mb-8">
        Curated Activities
      </h2>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-slate-500">Loading activities...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-500">{error}</p>
        </div>
      ) : activities.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-500">No activities available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {activities.map((activity) => {
            const imageCandidates = getImageCandidates(activity);
            const imageIndex = imgIndexes[activity.id] ?? 0;
            const currentImageUrl =
              imageCandidates[Math.min(imageIndex, imageCandidates.length - 1)];

            return (
              <div
                key={activity.id}
                className="flex flex-col gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="h-48 rounded-xl overflow-hidden bg-slate-100 relative">
                  <Image
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    src={currentImageUrl}
                    alt={activity.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    onError={() =>
                      handleImageError(activity.id, imageCandidates.length)
                    }
                  />
                </div>
                <div>
                  {activity.rating && (
                    <div className="flex items-center gap-1 text-primary mb-1">
                      <span className="material-symbols-outlined text-[18px] fill-1">
                        star
                      </span>
                      <span className="text-sm font-bold text-charcoal">
                        {activity.rating.toFixed(1)}
                      </span>
                    </div>
                  )}
                  <h4 className="font-bold text-lg text-forest line-clamp-1">
                    {activity.title}
                  </h4>
                  <p className="text-slate-500 text-sm mb-4">
                    {activity.location}
                  </p>
                  <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                    <p className="font-bold text-forest text-xl">
                      ${activity.price}
                      <span className="text-slate-400 text-sm font-normal">
                        {" "}
                        / person
                      </span>
                    </p>
                    <button className="size-10 bg-forest text-primary rounded-lg flex items-center justify-center hover:bg-primary hover:text-forest transition-colors">
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
