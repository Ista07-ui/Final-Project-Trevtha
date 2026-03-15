import axios from "axios";
import apiClient from "../api";

// Types untuk Payment Methods
export interface PaymentCard {
  id: string;
  name: string;
  virtual_account_number?: string;
  virtual_account_name?: string;
  imageUrl?: string;
  isDefault?: boolean;
  status?: "active" | "inactive";
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
  data?: PaymentCard;
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
      await apiClient.post("/generate-payment-methods", request);
      const refreshed = await paymentService.getAllPaymentMethods();
      const latest = refreshed.at(0) ?? null;
      console.log(
        "✅ Payment methods generated/refreshed:",
        refreshed.length,
        "items",
      );
      return latest;
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
      await apiClient.post("/generate-payment-methods", {
        cardId,
        ...request,
      });
      const refreshed = await paymentService.getAllPaymentMethods();
      return refreshed.find((method) => method.id === cardId) ?? null;
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
      await apiClient.post("/generate-payment-methods", {
        cardId,
        isDefault: true,
      });
      console.log("✅ Default payment method set/refreshed");
      const refreshed = await paymentService.getAllPaymentMethods();
      return refreshed.find((method) => method.id === cardId) ?? null;
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
      await apiClient.post("/generate-payment-methods", { cardId });
      console.log("✅ Payment methods refreshed after delete request:", cardId);
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
      const methods = await paymentService.getAllPaymentMethods();
      const response = {
        data: {
          data:
            methods.find((method) => method.isDefault) ?? methods.at(0) ?? null,
        },
      };
      console.log(
        "✅ Default payment method fetched:",
        response.data.data?.virtual_account_number,
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
