import axios from "axios";
import apiClient from "../api";

// Types untuk Banner
export interface Banner {
  id: string;
  name: string;
  imageUrl: string;
  status?: "active" | "inactive";
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
  data?: Banner;
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
        `/banner/${id}`,
      );
      console.log("✅ Banner fetched successfully:", response.data.data);
      return response.data.data ?? null;
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

  // Create banner
  createBanner: async (data: {
    name: string;
    imageUrl: string;
  }): Promise<Banner | null> => {
    try {
      const response = await apiClient.post<BannerDetailResponse>(
        "/create-banner",
        data,
      );

      if (response.data.data) {
        console.log("✅ Banner created successfully:", response.data.data.id);
        return response.data.data;
      }

      const refreshedBanners = await bannerService.getAllBanners();
      const createdBanner =
        refreshedBanners.find((banner) => banner.name === data.name) ?? null;

      console.log("✅ Banner created successfully:", response.data.message);
      return createdBanner;
    } catch (error: unknown) {
      console.error("❌ Failed to create banner:", getApiErrorMessage(error));
      return null;
    }
  },

  // Update banner
  updateBanner: async (
    id: string,
    data: {
      name: string;
      imageUrl: string;
    },
  ): Promise<Banner | null> => {
    try {
      const response = await apiClient.post<BannerDetailResponse>(
        `/update-banner/${id}`,
        data,
      );

      if (response.data.data) {
        console.log("✅ Banner updated successfully:", response.data.data.id);
        return response.data.data;
      }

      const refreshedBanner = await bannerService.getBannerById(id);
      console.log("✅ Banner updated successfully:", response.data.message);
      return refreshedBanner;
    } catch (error: unknown) {
      console.error("❌ Failed to update banner:", getApiErrorMessage(error));
      return null;
    }
  },

  // Delete banner
  deleteBanner: async (id: string): Promise<boolean> => {
    try {
      await apiClient.delete(`/delete-banner/${id}`);
      console.log("✅ Banner deleted successfully");
      return true;
    } catch (error: unknown) {
      console.error("❌ Failed to delete banner:", getApiErrorMessage(error));
      return false;
    }
  },
};

export default bannerService;
