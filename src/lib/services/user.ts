import axios from "axios";
import apiClient from "../api";

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  profilePictureUrl?: string | null;
  phoneNumber?: string | null;
}

export interface UserListResponse {
  code: string;
  status: string;
  message: string;
  data: AppUser[];
}

export interface UserDetailResponse {
  code: string;
  status: string;
  message: string;
  data: AppUser;
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

export const userService = {
  async getLoggedUser(): Promise<AppUser | null> {
    try {
      const response = await apiClient.get<UserDetailResponse>("/user");
      return response.data.data;
    } catch (error: unknown) {
      console.error(
        "❌ Failed to fetch logged user:",
        getApiErrorMessage(error),
      );
      return null;
    }
  },

  async getAllUsers(): Promise<AppUser[]> {
    try {
      const response = await apiClient.get<UserListResponse>("/all-user");
      return response.data.data;
    } catch (error: unknown) {
      console.error("❌ Failed to fetch users:", getApiErrorMessage(error));
      return [];
    }
  },

  async updateUserRole(
    userId: string,
    role: "admin" | "user",
  ): Promise<AppUser | null> {
    try {
      const response = await apiClient.post<UserDetailResponse>(
        `/update-user-role/${userId}`,
        { role },
      );
      return response.data.data;
    } catch (error: unknown) {
      console.error(
        "❌ Failed to update user role:",
        getApiErrorMessage(error),
      );
      return null;
    }
  },
};

export default userService;
