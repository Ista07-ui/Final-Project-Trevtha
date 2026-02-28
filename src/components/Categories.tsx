"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { categoryService, type Category } from "@/lib/services/category";

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        // Fetch active categories dari API
        const data = await categoryService.getActiveCategories();
        setCategories(data.length > 0 ? data : getDefaultCategories());
        setError(null);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories");
        // Fallback ke default categories jika API gagal
        setCategories(getDefaultCategories());
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Default categories fallback
  const getDefaultCategories = (): Category[] => [
    {
      id: "1",
      name: "Beach",
      description: "Beach vacation",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCE7d_Qk_p5RFbSrqoxzbeSyeTr3KuE-rZoCVazaK22J1LtvmcjFfR4hQ9Ppuqxx4G4cuKFFj6qSbwy0CPUJLE-_6rQFF-yi4PZVHJLmfPpWgoGRBdFAxP0rg3N-5lExP0AG5B2Kk8LqXLZupoahlxeKLCHGABbotQZw9GdDV0fIpilT_9MqZrCro7p7YpxIGu-GJLDVHqVfOcUNnmRcMiB9REGNnFLNydeJI5rdgYarRpERQdHkvlH1Los9apNKI5E8nNMoyqWq4X9",
      status: "active",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "2",
      name: "Mountain",
      description: "Mountain adventure",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCBFle4JTmaiOBxceuMXcm6QLKM4gWvQ2hvt6y9bR19cbUq_qIYknBWhbmOmr33WMt27zK31Fn7diM3_HUUjbnB32n7VugpbtIOb3AcwkLmqlt1YuUCKjfuwSJXsf6YTS4MhFZIPjfUz-z5VFX1mhvls0eoBSGBHSuu9rp29Ej69IZN8msvUfNvb87s1njTAadKRIRD3VOFeunSIWjvkfbhoqnB8eI32DDZM_yiYq_lBc1BuDgakl85nRQwqDv-VLFV-uPmi2TtBx76",
      status: "active",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "3",
      name: "City Tour",
      description: "City exploration",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD5mia5vnVY8Xt-_lJeLNn25DzU43Umd3ttwI9rmaECf65WqyTONdHfEHPIsIpIRJ50jt6x-4zFkn22fvkiN7_1bz_PEkCNGbSSMO-QpMpLcf0BMFc5X3RcpeFGv44rk_ptvT0587hpCcinYoVALwqaD0f-rDlgXJsY7MJKNZOi5FBy2BtQm8F5oMeqc_WbZqxB_qM8LET_OX43OAPH22zvFIdVBwlcXDwnumHTTycgqQo9FIiwlCi6VWc90JEM_goP6l6eQj1pzf2U",
      status: "active",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "4",
      name: "Safari",
      description: "Wildlife adventure",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD3-WAE8ersb_P6oLd7pBOLa3iu0QhMmaq4LdpQOO-cUPLjozGU73DvrajqPcvtiOLCu9uEqhFIhSJjcnY0f_gldm0RtY25m1vJuCz_DhFL16DBuc6qsI6HkTNz9kaQO_icwhOvRl8ShQ8HBDSIb5MgeFX9btGOaOkWStHX9JfIcHm9sD6NfET97IeSl_sVlf5oi9EQl3RERVpH53PDOaIT6F30j63JJBYRgw8FgWTE89e1E4zehbZ-NnVdIJkPwy5BQ0il7PyQiI-Q",
      status: "active",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "5",
      name: "Nordic",
      description: "Nordic experience",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCTSN2mc-PXHB_0tIu-fuQsVh1Rw274OOyF61yhsgfI3VZavcsCeeBqEdyj6GZTnp2popaBgNDckMJZhDn1JUp3CUNVrHrCQZ0uJXx5W12dDY2LF3r78qTVV1JEUj3tCiPRqEvjZ1Zv6I2AcxBy5AdI-ockQqGWFpzoPwBXz6NM_VDgSk0zSOMPuKitOFf9Nlfh5ZL0206LlqjmpSe06il3q6P4n5kj0P2VIP45n9TNtsrIaxxVzZXFKQeku8pSrVI1N8nrCUJHK-gV",
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
            Popular Categories
          </h2>
          <p className="text-slate-500">
            Explore our hand-picked collections by travel style
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {isLoading ? (
          <div className="col-span-2 md:col-span-5 text-center py-8">
            <p className="text-slate-500">Loading categories...</p>
          </div>
        ) : error ? (
          <div className="col-span-2 md:col-span-5 text-center py-8">
            <p className="text-red-500">{error}</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="col-span-2 md:col-span-5 text-center py-8">
            <p className="text-slate-500">No categories available</p>
          </div>
        ) : (
          categories.map((category) => (
            <Link
              key={category.id}
              className="group relative h-40 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all"
              href="/destinations"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url('${category.imageUrl}')` }}
              />
              <div className="absolute inset-0 bg-forest/40 group-hover:bg-forest/20 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center">
                <span className="font-bold uppercase tracking-wider text-sm">
                  {category.name}
                </span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
