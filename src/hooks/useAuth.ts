"use client";

import { useCallback, useEffect, useState } from "react";
import authService, { type User } from "@/lib/services/auth";

export type { User };

export type AuthState = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
};

export type LoginCredentials = {
  email: string;
  password: string;
  accountType?: "user" | "admin";
};

export type RegisterCredentials = {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role?: "user" | "admin";
  phoneNumber?: string;
  profilePictureUrl?: string;
};

/**
 * Hook untuk mengelola authentication state dengan API Integration
 */
export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    error: null,
  });

  /**
   * Load user dari localStorage saat component mount
   */
  useEffect(() => {
    const user = authService.getCurrentUser();
    const isAuth = authService.isAuthenticated();

    setState({
      user,
      isLoading: false,
      isAuthenticated: isAuth,
      error: null,
    });
  }, []);

  /**
   * Login dengan email dan password - MENGGUNAKAN API
   */
  const login = useCallback(async (credentials: LoginCredentials) => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    try {
      // Validasi input
      if (!credentials.email || !credentials.password) {
        throw new Error("Email dan password harus diisi");
      }

      // Call API login
      const response = await authService.login({
        email: credentials.email,
        password: credentials.password,
      });

      // Validasi role jika accountType dipilih
      if (
        credentials.accountType &&
        response.data.role !== credentials.accountType
      ) {
        // Logout jika role tidak sesuai
        await authService.logout();

        const registeredRoleLabel =
          response.data.role === "admin" ? "Admin" : "Traveler";
        throw new Error(
          `Akun ini terdaftar sebagai ${registeredRoleLabel}. Pilih tipe akun yang sesuai.`,
        );
      }

      // Update state dengan user data dari API
      setState({
        user: response.data,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      });

      return { success: true, user: response.data };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login gagal";
      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: errorMessage,
      });
      return { success: false, error: errorMessage };
    }
  }, []);

  /**
   * Register user baru - MENGGUNAKAN API
   */
  const register = useCallback(async (credentials: RegisterCredentials) => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    try {
      // Validasi basic
      if (!credentials.email || !credentials.password || !credentials.name) {
        throw new Error("Email, password, dan name harus diisi");
      }

      if (
        credentials.confirmPassword &&
        credentials.password !== credentials.confirmPassword
      ) {
        throw new Error("Password tidak cocok");
      }

      // Call API register
      const response = await authService.register({
        email: credentials.email,
        name: credentials.name,
        password: credentials.password,
        passwordRepeat: credentials.confirmPassword || credentials.password,
        role: credentials.role || "user",
        phoneNumber: credentials.phoneNumber,
        profilePictureUrl: credentials.profilePictureUrl,
      });

      // Auto-login setelah register: update state dengan user data dari API
      setState({
        user: response.data,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      });

      return { success: true, user: response.data };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Registrasi gagal";
      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: errorMessage,
      });
      return { success: false, error: errorMessage };
    }
  }, []);

  /**
   * Logout - MENGGUNAKAN API
   */
  const logout = useCallback(async () => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));

    try {
      // Call API logout
      await authService.logout();

      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: null,
      });
    } catch (err) {
      console.error("Logout error:", err);
      // Tetap logout meskipun API error
      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: null,
      });
    }
  }, []);

  /**
   * Clear error message
   */
  const clearError = useCallback(() => {
    setState((prev) => ({
      ...prev,
      error: null,
    }));
  }, []);

  return {
    user: state.user,
    isLoading: state.isLoading,
    isAuthenticated: state.isAuthenticated,
    error: state.error,
    login,
    register,
    logout,
    clearError,
  };
}
