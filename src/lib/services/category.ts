import axios from "axios";
import apiClient from "../api";

// Types untuk Category
export interface Category {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  icon?: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

export interface CategoryListResponse {
  code: string;
  status: string;
  message: string;
  data: Category[];
}

export interface CategoryDetailResponse {
  code: string;
  status: string;
  message: string;
  data: Category;
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

// Category Service - GET categories dari API
export const categoryService = {
  // Get semua categories
  getAllCategories: async (): Promise<Category[]> => {
    try {
      const response = await apiClient.get<CategoryListResponse>("/categories");
      console.log("✅ Categories fetched successfully:", response.data.data);
      return response.data.data;
    } catch (error: unknown) {
      console.error(
        "❌ Failed to fetch categories:",
        getApiErrorMessage(error),
      );
      return [];
    }
  },

  // Get category by ID
  getCategoryById: async (id: string): Promise<Category | null> => {
    try {
      const response = await apiClient.get<CategoryDetailResponse>(
        `/categories/${id}`,
      );
      console.log("✅ Category fetched successfully:", response.data.data);
      return response.data.data;
    } catch (error: unknown) {
      console.error("❌ Failed to fetch category:", getApiErrorMessage(error));
      return null;
    }
  },

  // Get active categories only
  getActiveCategories: async (): Promise<Category[]> => {
    try {
      const response = await apiClient.get<CategoryListResponse>(
        "/categories?status=active",
      );
      console.log(
        "✅ Active categories fetched successfully:",
        response.data.data,
      );
      return response.data.data;
    } catch (error: unknown) {
      console.error(
        "❌ Failed to fetch active categories:",
        getApiErrorMessage(error),
      );
      return [];
    }
  },
};

export default categoryService;
