import axios from "axios";
import apiClient from "../api";

// Types untuk Payment Methods
export interface PaymentCard {
  id: string;
  cardType: "visa" | "mastercard" | "amex" | "discover";
  cardNumber: string; // Last 4 digits only
  expiryDate: string; // MM/YY format
  cardholderName?: string;
  isDefault: boolean;
  logo?: string;
  status: "active" | "inactive";
  createdAt?: string;
  updatedAt?: string;
}

export interface AddPaymentCardRequest {
  cardType: "visa" | "mastercard" | "amex" | "discover";
  cardNumber: string; // Full card number - API will store securely
  expiryDate: string; // MM/YY format
  cardholderName: string;
  cvv: string;
  isDefault?: boolean;
}

export interface UpdatePaymentCardRequest {
  isDefault?: boolean;
  status?: "active" | "inactive";
}

export interface PaymentCardListResponse {
  code: string;
  status: string;
  message: string;
  data: PaymentCard[];
}

export interface PaymentCardResponse {
  code: string;
  status: string;
  message: string;
  data: PaymentCard;
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

// Payment Methods Service - CRUD operation untuk payment methods
export const paymentService = {
  // Get semua payment methods
  getAllPaymentMethods: async (): Promise<PaymentCard[]> => {
    try {
      const response =
        await apiClient.get<PaymentCardListResponse>("/payment-methods");
      console.log(
        "✅ Payment methods fetched successfully:",
        response.data.data.length,
        "cards",
      );
      return response.data.data;
    } catch (error: unknown) {
      console.error(
        "❌ Failed to fetch payment methods:",
        getApiErrorMessage(error),
      );
      return [];
    }
  },

  // Add payment method
  addPaymentMethod: async (
    request: AddPaymentCardRequest,
  ): Promise<PaymentCard | null> => {
    try {
      const response = await apiClient.post<PaymentCardResponse>(
        "/payment-methods",
        request,
      );
      console.log(
        "✅ Payment method added:",
        response.data.data.cardType,
        "ending in",
        response.data.data.cardNumber,
      );
      return response.data.data;
    } catch (error: unknown) {
      console.error(
        "❌ Failed to add payment method:",
        getApiErrorMessage(error),
      );
      return null;
    }
  },

  // Update payment method
  updatePaymentMethod: async (
    cardId: string,
    request: UpdatePaymentCardRequest,
  ): Promise<PaymentCard | null> => {
    try {
      const response = await apiClient.put<PaymentCardResponse>(
        `/payment-methods/${cardId}`,
        request,
      );
      console.log("✅ Payment method updated:", response.data.data.cardNumber);
      return response.data.data;
    } catch (error: unknown) {
      console.error(
        "❌ Failed to update payment method:",
        getApiErrorMessage(error),
      );
      return null;
    }
  },

  // Set default payment method
  setDefaultPaymentMethod: async (
    cardId: string,
  ): Promise<PaymentCard | null> => {
    try {
      const response = await apiClient.put<PaymentCardResponse>(
        `/payment-methods/${cardId}`,
        { isDefault: true },
      );
      console.log(
        "✅ Default payment method set:",
        response.data.data.cardNumber,
      );
      return response.data.data;
    } catch (error: unknown) {
      console.error(
        "❌ Failed to set default payment method:",
        getApiErrorMessage(error),
      );
      return null;
    }
  },

  // Delete payment method
  deletePaymentMethod: async (cardId: string): Promise<boolean> => {
    try {
      await apiClient.delete(`/payment-methods/${cardId}`);
      console.log("✅ Payment method deleted:", cardId);
      return true;
    } catch (error: unknown) {
      console.error(
        "❌ Failed to delete payment method:",
        getApiErrorMessage(error),
      );
      return false;
    }
  },

  // Get default payment method
  getDefaultPaymentMethod: async (): Promise<PaymentCard | null> => {
    try {
      const response = await apiClient.get<PaymentCardResponse>(
        "/payment-methods/default",
      );
      console.log(
        "✅ Default payment method fetched:",
        response.data.data.cardNumber,
      );
      return response.data.data;
    } catch (error: unknown) {
      console.error(
        "❌ Failed to fetch default payment method:",
        getApiErrorMessage(error),
      );
      return null;
    }
  },
};

export default paymentService;
