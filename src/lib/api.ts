import axios from "axios";

// Base URL API dari requirements
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://travel-journal-api-bootcamp.do.dibimbing.id";

// API Key untuk authentication
const API_KEY =
  process.env.NEXT_PUBLIC_API_KEY || "24405e01-fbc1-45a5-9f5a-be13afcd757c";

// Create axios instance dengan konfigurasi default
export const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
    apiKey: API_KEY, // API Key header sesuai dokumentasi
  },
  timeout: 10000, // 10 detik timeout
});

// Request interceptor: Tambahkan token ke setiap request
apiClient.interceptors.request.use(
  (config) => {
    // Ambil token dari localStorage
    const token = localStorage.getItem("trevtha_auth_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Untuk upload file, set Content-Type multipart/form-data
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor: Handle errors globally
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized: Token expired/invalid
    if (error.response?.status === 401) {
      localStorage.removeItem("trevtha_auth_token");
      localStorage.removeItem("trevtha_user");

      // Redirect ke login jika bukan di halaman login
      if (
        globalThis.window !== undefined &&
        !globalThis.window.location.pathname.includes("/login")
      ) {
        globalThis.window.location.href = "/login";
      }
    }

    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      console.error("Access denied: Insufficient permissions");
    }

    // Handle 404 Not Found
    if (error.response?.status === 404) {
      console.error("Resource not found");
    }

    // Handle 500 Internal Server Error
    if (error.response?.status === 500) {
      console.error("Server error: Please try again later");
    }

    return Promise.reject(error);
  },
);

export default apiClient;
