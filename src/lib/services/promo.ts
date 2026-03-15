import axios from "axios";
import apiClient from "../api";

// Types untuk Promo
export interface Promo {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  terms_condition: string;
  promo_code: string;
  promo_discount_price: number;
  minimum_claim_price: number;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

export interface PromoListResponse {
  code: string;
  status: string;
  message: string;
  data: Promo[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface PromoDetailResponse {
  code: string;
  status: string;
  message: string;
  data?: Promo;
}

const getApiErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const apiMessage = (
      error.response?.data as { message?: string } | undefined
    )?.message;
    return apiMessage || error.message;
  }
  return "An unknown error occurred";
};

const promoService = {
  // Get all promos
  getAllPromos: async (
    page: number = 1,
    limit: number = 10,
  ): Promise<Promo[]> => {
    try {
      const response = await apiClient.get<PromoListResponse>(
        `/promos?page=${page}&limit=${limit}`,
      );
      console.log("✅ Promos fetched:", response.data.data.length, "items");
      return response.data.data;
    } catch (error: unknown) {
      console.error("❌ Failed to fetch promos:", getApiErrorMessage(error));
      return [];
    }
  },

  // Get promo by ID
  getPromoById: async (id: string): Promise<Promo | null> => {
    try {
      const response = await apiClient.get<PromoDetailResponse>(`/promo/${id}`);
      console.log("✅ Promo fetched:", response.data.data?.id);
      return response.data.data ?? null;
    } catch (error: unknown) {
      console.error("❌ Failed to fetch promo:", getApiErrorMessage(error));
      return null;
    }
  },

  // Get active promos
  getActivePromos: async (
    page: number = 1,
    limit: number = 10,
  ): Promise<Promo[]> => {
    try {
      const response = await apiClient.get<PromoListResponse>(
        `/promos?status=active&page=${page}&limit=${limit}`,
      );
      console.log(
        "✅ Active promos fetched:",
        response.data.data.length,
        "items",
      );
      return response.data.data;
    } catch (error: unknown) {
      console.error(
        "❌ Failed to fetch active promos:",
        getApiErrorMessage(error),
      );
      return [];
    }
  },

  // Create promo
  createPromo: async (data: {
    title: string;
    description: string;
    imageUrl: string;
    terms_condition: string;
    promo_code: string;
    promo_discount_price: number;
    minimum_claim_price: number;
  }): Promise<Promo | null> => {
    try {
      const response = await apiClient.post<PromoDetailResponse>(
        "/create-promo",
        data,
      );

      if (response.data.data) {
        console.log("✅ Promo created successfully:", response.data.data.id);
        return response.data.data;
      }

      const refreshedPromos = await promoService.getAllPromos(1, 100);
      const createdPromo =
        refreshedPromos.find(
          (promo) =>
            promo.promo_code === data.promo_code || promo.title === data.title,
        ) ?? null;

      console.log("✅ Promo created successfully:", response.data.message);
      return createdPromo;
    } catch (error: unknown) {
      console.error("❌ Failed to create promo:", getApiErrorMessage(error));
      return null;
    }
  },

  // Update promo
  updatePromo: async (
    id: string,
    data: {
      title: string;
      description: string;
      imageUrl: string;
      terms_condition: string;
      promo_code: string;
      promo_discount_price: number;
      minimum_claim_price: number;
    },
  ): Promise<Promo | null> => {
    try {
      const response = await apiClient.post<PromoDetailResponse>(
        `/update-promo/${id}`,
        data,
      );

      if (response.data.data) {
        console.log("✅ Promo updated successfully:", response.data.data.id);
        return response.data.data;
      }

      const refreshedPromo = await promoService.getPromoById(id);
      console.log("✅ Promo updated successfully:", response.data.message);
      return refreshedPromo;
    } catch (error: unknown) {
      console.error("❌ Failed to update promo:", getApiErrorMessage(error));
      return null;
    }
  },

  // Delete promo
  deletePromo: async (id: string): Promise<boolean> => {
    try {
      await apiClient.delete(`/delete-promo/${id}`);
      console.log("✅ Promo deleted successfully");
      return true;
    } catch (error: unknown) {
      console.error("❌ Failed to delete promo:", getApiErrorMessage(error));
      return false;
    }
  },
};

export default promoService;
