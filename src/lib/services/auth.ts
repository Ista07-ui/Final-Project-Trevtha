import axios from "axios";
import apiClient from "../api";

// Types untuk Authentication
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  name: string;
  password: string;
  passwordRepeat: string;
  role: "admin" | "user";
  profilePictureUrl?: string;
  phoneNumber?: string;
}

export interface AuthResponse {
  code: string;
  status: string;
  message: string;
  token: string;
  data: {
    id: string;
    name: string;
    email: string;
    role: "admin" | "user";
    profilePictureUrl: string;
    phoneNumber: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  profilePictureUrl: string;
  phoneNumber: string;
}

const getAuthErrorMessage = (error: unknown, fallback: string): string => {
  if (axios.isAxiosError(error)) {
    const apiMessage = (
      error.response?.data as { message?: string } | undefined
    )?.message;
    return apiMessage || error.message || fallback;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
};

// Authentication Service
export const authService = {
  // Login
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    try {
      console.log('🔐 [AUTH] Attempting login with:', { email: credentials.email });
      const response = await apiClient.post<AuthResponse>(
        "/login",
        credentials,
      );
      console.log('✅ [AUTH] Login successful:', response.data);

      // Simpan token dan user data ke localStorage
      if (response.data.token) {
        localStorage.setItem("trevtha_auth_token", response.data.token);
        localStorage.setItem(
          "trevtha_user",
          JSON.stringify(response.data.data),
        );
      }

      return response.data;
    } catch (error: unknown) {
      console.error('❌ [AUTH] Login failed:', error);
      throw new Error(
        getAuthErrorMessage(error, "Login gagal. Silakan coba lagi."),
      );
    }
  },

  // Register
  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    try {
      console.log('📝 [AUTH] Attempting register with:', { email: userData.email, role: userData.role });
      const response = await apiClient.post<AuthResponse>(
        "/register",
        userData,
      );
      console.log('✅ [AUTH] Register successful:', response.data);

      // Auto-login setelah register: simpan token dan user data
      if (response.data.token) {
        localStorage.setItem("trevtha_auth_token", response.data.token);
        localStorage.setItem(
          "trevtha_user",
          JSON.stringify(response.data.data),
        );
      }

      return response.data;
    } catch (error: unknown) {
      console.error('❌ [AUTH] Register failed:', error);
      throw new Error(
        getAuthErrorMessage(error, "Registrasi gagal. Silakan coba lagi."),
      );
    }
  },

  // Logout
  logout: async (): Promise<void> => {
    try {
      // Call logout endpoint
      await apiClient.get("/logout");
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      // Hapus token dan user data dari localStorage
      localStorage.removeItem("trevtha_auth_token");
      localStorage.removeItem("trevtha_user");

      // Hapus semua data user lainnya
      localStorage.removeItem("trevtha_user_cart");
      localStorage.removeItem("trevtha_user_payment_methods");
      localStorage.removeItem("trevtha_user_promos");
      localStorage.removeItem("trevtha_user_profile");
      localStorage.removeItem("trevtha_user_security");
      localStorage.removeItem("trevtha_user_passengers");
    }
  },

  // Get Current User
  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem("trevtha_user");
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    const token = localStorage.getItem("trevtha_auth_token");
    const user = localStorage.getItem("trevtha_user");
    return !!(token && user);
  },

  // Get auth token
  getToken: (): string | null => {
    return localStorage.getItem("trevtha_auth_token");
  },
};

export default authService;
