import axios from "axios";
import apiClient from "../api";

// Types untuk Banner
export interface Banner {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  destinationId?: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

export interface BannerListResponse {
  code: string;
  status: string;
  message: string;
  data: Banner[];
}

export interface BannerDetailResponse {
  code: string;
  status: string;
  message: string;
  data: Banner;
}

const getApiErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const apiMessage = (
      error.response?.data as { message?: string } | undefined
    )?.message;
    return apiMessage || error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unknown error";
};

// Banner Service - GET banners dari API
export const bannerService = {
  // Get semua banners
  getAllBanners: async (): Promise<Banner[]> => {
    try {
      const response = await apiClient.get<BannerListResponse>("/banners");
      console.log("✅ Banners fetched successfully:", response.data.data);
      return response.data.data;
    } catch (error: unknown) {
      console.error("❌ Failed to fetch banners:", getApiErrorMessage(error));
      // Return empty array jika API gagal
      return [];
    }
  },

  // Get banner by ID
  getBannerById: async (id: string): Promise<Banner | null> => {
    try {
      const response = await apiClient.get<BannerDetailResponse>(
        `/banners/${id}`,
      );
      console.log("✅ Banner fetched successfully:", response.data.data);
      return response.data.data;
    } catch (error: unknown) {
      console.error("❌ Failed to fetch banner:", getApiErrorMessage(error));
      return null;
    }
  },

  // Get active banners only (untuk homepage)
  getActiveBanners: async (): Promise<Banner[]> => {
    try {
      const response = await apiClient.get<BannerListResponse>(
        "/banners?status=active",
      );
      console.log(
        "✅ Active banners fetched successfully:",
        response.data.data,
      );
      return response.data.data;
    } catch (error: unknown) {
      console.error(
        "❌ Failed to fetch active banners:",
        getApiErrorMessage(error),
      );
      return [];
    }
  },
};

export default bannerService;
