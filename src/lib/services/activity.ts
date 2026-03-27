import axios from "axios";
import apiClient from "../api";

// Types untuk Activity (Travel Package)
export interface Activity {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageUrls?: string[];
  price: number;
  rating?: number;
  categoryId: string;
  location: string;
  country: string;
  province: string;
  city: string;
  startDate?: string;
  endDate?: string;
  duration?: number;
  facilities?: string[];
  highlight?: string[];
  itinerary?: string[];
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

export interface ActivityListResponse {
  code: string;
  status: string;
  message: string;
  data: Activity[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface ActivityDetailResponse {
  code: string;
  status: string;
  message: string;
  data?: Activity;
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

// Transform raw API response to Activity format
// API returns imageUrls (array), but Activity interface expects imageUrl (string)
const transformActivityData = (rawData: any): Activity => {
  let imageCandidates: unknown[] = [];
  if (Array.isArray(rawData.imageUrls)) {
    imageCandidates = rawData.imageUrls;
  } else if (rawData.imageUrl) {
    imageCandidates = [rawData.imageUrl];
  }

  const normalizedImageUrls: string[] = imageCandidates.filter(
    (value: unknown): value is string =>
      typeof value === "string" &&
      value.trim().length > 0 &&
      /^https?:\/\//i.test(value),
  );

  const imageUrl = normalizedImageUrls[0] ?? "";

  let facilities: string[] = [];
  if (rawData.facilities) {
    if (typeof rawData.facilities === "string") {
      facilities = [rawData.facilities];
    } else {
      facilities = rawData.facilities;
    }
  }

  return {
    id: rawData.id,
    title: rawData.title,
    description: rawData.description,
    imageUrl,
    imageUrls: normalizedImageUrls,
    price: rawData.price,
    rating: rawData.rating,
    categoryId: rawData.categoryId,
    location: rawData.address || rawData.location || "",
    country: rawData.country || "",
    province: rawData.province || "",
    city: rawData.city || "",
    startDate: rawData.startDate,
    endDate: rawData.endDate,
    duration: rawData.duration,
    facilities,
    highlight: rawData.highlight || [],
    itinerary: rawData.itinerary || [],
    status: rawData.status || "active",
    createdAt: rawData.createdAt || "",
    updatedAt: rawData.updatedAt || "",
  };
};

// Activity Service - GET activities dari API
export const activityService = {
  // Get semua activities
  getAllActivities: async (
    page: number = 1,
    limit: number = 10,
  ): Promise<Activity[]> => {
    try {
      const response = await apiClient.get<ActivityListResponse>(
        `/activities?page=${page}&limit=${limit}`,
      );
      console.log(
        "✅ Activities fetched successfully:",
        response.data.data.length,
        "items",
      );
      return response.data.data.map(transformActivityData);
    } catch (error: unknown) {
      console.error(
        "❌ Failed to fetch activities:",
        getApiErrorMessage(error),
      );
      return [];
    }
  },

  // Get activity by ID
  getActivityById: async (id: string): Promise<Activity | null> => {
    try {
      const response = await apiClient.get<ActivityDetailResponse>(
        `/activity/${id}`,
      );
      console.log(
        "✅ Activity fetched successfully:",
        response.data.data?.title,
      );
      return response.data.data
        ? transformActivityData(response.data.data)
        : null;
    } catch (error: unknown) {
      console.error("❌ Failed to fetch activity:", getApiErrorMessage(error));
      return null;
    }
  },

  // Get activities by category
  getActivitiesByCategory: async (
    categoryId: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<Activity[]> => {
    try {
      const response = await apiClient.get<ActivityListResponse>(
        `/activities?categoryId=${categoryId}&page=${page}&limit=${limit}`,
      );
      console.log(
        "✅ Activities by category fetched:",
        response.data.data.length,
        "items",
      );
      return response.data.data.map(transformActivityData);
    } catch (error: unknown) {
      console.error(
        "❌ Failed to fetch activities by category:",
        getApiErrorMessage(error),
      );
      return [];
    }
  },

  // Get activities with search
  searchActivities: async (query: string): Promise<Activity[]> => {
    try {
      const response = await apiClient.get<ActivityListResponse>(
        `/activities/search?q=${encodeURIComponent(query)}`,
      );
      console.log(
        "✅ Activities search results:",
        response.data.data.length,
        "items",
      );
      return response.data.data.map(transformActivityData);
    } catch (error: unknown) {
      console.error(
        "❌ Failed to search activities:",
        getApiErrorMessage(error),
      );
      return [];
    }
  },

  // Get active activities
  getActiveActivities: async (
    page: number = 1,
    limit: number = 10,
  ): Promise<Activity[]> => {
    try {
      const response = await apiClient.get<ActivityListResponse>(
        `/activities?status=active&page=${page}&limit=${limit}`,
      );
      console.log(
        "✅ Active activities fetched:",
        response.data.data.length,
        "items",
      );
      return response.data.data.map(transformActivityData);
    } catch (error: unknown) {
      console.error(
        "❌ Failed to fetch active activities:",
        getApiErrorMessage(error),
      );
      return [];
    }
  },

  // Create activity
  createActivity: async (data: {
    categoryId: string;
    title: string;
    description: string;
    imageUrls: string[];
    price: number;
    price_discount?: number;
    rating?: number;
    total_reviews?: number;
    facilities?: string;
    address: string;
    province: string;
    city: string;
    location_maps?: string;
  }): Promise<Activity | null> => {
    try {
      const response = await apiClient.post<ActivityDetailResponse>(
        "/create-activity",
        data,
      );

      if (response.data.data) {
        console.log("✅ Activity created successfully:", response.data.data.id);
        return transformActivityData(response.data.data);
      }

      const refreshedActivities = await activityService.getAllActivities(
        1,
        100,
      );
      const createdActivity =
        refreshedActivities.find(
          (activity) =>
            activity.title === data.title && activity.city === data.city,
        ) ?? null;

      console.log("✅ Activity created successfully:", response.data.message);
      return createdActivity;
    } catch (error: unknown) {
      console.error("❌ Failed to create activity:", getApiErrorMessage(error));
      return null;
    }
  },

  // Update activity
  updateActivity: async (
    id: string,
    data: {
      categoryId: string;
      title: string;
      description: string;
      imageUrls: string[];
      price: number;
      price_discount?: number;
      rating?: number;
      total_reviews?: number;
      facilities?: string;
      address: string;
      province: string;
      city: string;
      location_maps?: string;
    },
  ): Promise<Activity | null> => {
    try {
      const response = await apiClient.post<ActivityDetailResponse>(
        `/update-activity/${id}`,
        data,
      );

      if (response.data.data) {
        console.log("✅ Activity updated successfully:", response.data.data.id);
        return transformActivityData(response.data.data);
      }

      const refreshedActivity = await activityService.getActivityById(id);
      console.log("✅ Activity updated successfully:", response.data.message);
      return refreshedActivity;
    } catch (error: unknown) {
      console.error("❌ Failed to update activity:", getApiErrorMessage(error));
      return null;
    }
  },

  // Delete activity
  deleteActivity: async (id: string): Promise<boolean> => {
    try {
      await apiClient.delete(`/delete-activity/${id}`);
      console.log("✅ Activity deleted successfully");
      return true;
    } catch (error: unknown) {
      console.error("❌ Failed to delete activity:", getApiErrorMessage(error));
      return false;
    }
  },
};

export default activityService;
