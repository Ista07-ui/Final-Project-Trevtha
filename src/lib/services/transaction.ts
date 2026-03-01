import axios from "axios";
import apiClient from "../api";

// Types untuk Transaction
export interface Transaction {
  id: string;
  userId: string;
  cartId?: string;
  paymentMethodId: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  totalAmount: number;
  paymentProof?: string;
  notes?: string;
  invoiceNumber?: string;
  createdAt: string;
  updatedAt: string;
  items?: {
    id: string;
    activityId: string;
    title: string;
    quantity: number;
    pricePerPerson: number;
    subtotal: number;
  }[];
}

export interface TransactionRequest {
  cartId?: string;
  paymentMethodId: string;
  notes?: string;
  proofPaymentUrl?: string;
}

export interface TransactionListResponse {
  code: string;
  status: string;
  message: string;
  data: Transaction[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface TransactionDetailResponse {
  code: string;
  status: string;
  message: string;
  data: Transaction;
}

const getApiErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const apiMessage = (
      error.response?.data as { message?: string } | undefined
    )?.message;
    return apiMessage || error.message;
  }
  return "An unexpected error occurred";
};

/**
 * Transaction Service - Mengelola transaksi pembayaran liburan
 */
export const transactionService = {
  /**
   * Get all transactions (admin atau user sendiri)
   */
  async getTransactions(page: number = 1, limit: number = 10) {
    try {
      const response = await apiClient.get<TransactionListResponse>(
        `/transactions?page=${page}&limit=${limit}`,
      );
      return {
        success: true,
        data: response.data.data,
        pagination: response.data.pagination,
        message: response.data.message,
      };
    } catch (error) {
      const message = getApiErrorMessage(error);
      return {
        success: false,
        data: null,
        message,
      };
    }
  },

  /**
   * Get transaction detail by ID
   */
  async getTransactionDetail(transactionId: string) {
    try {
      const response = await apiClient.get<TransactionDetailResponse>(
        `/transactions/${transactionId}`,
      );
      return {
        success: true,
        data: response.data.data,
        message: response.data.message,
      };
    } catch (error) {
      const message = getApiErrorMessage(error);
      return {
        success: false,
        data: null,
        message,
      };
    }
  },

  /**
   * Create new transaction (checkout)
   */
  async createTransaction(payload: TransactionRequest) {
    try {
      const response = await apiClient.post<TransactionDetailResponse>(
        "/transactions",
        payload,
      );
      return {
        success: true,
        data: response.data.data,
        message: response.data.message,
      };
    } catch (error) {
      const message = getApiErrorMessage(error);
      return {
        success: false,
        data: null,
        message,
      };
    }
  },

  /**
   * Update transaction status (approval, cancellation, etc)
   */
  async updateTransaction(
    transactionId: string,
    payload: { status?: string; notes?: string },
  ) {
    try {
      const response = await apiClient.put<TransactionDetailResponse>(
        `/transactions/${transactionId}`,
        payload,
      );
      return {
        success: true,
        data: response.data.data,
        message: response.data.message,
      };
    } catch (error) {
      const message = getApiErrorMessage(error);
      return {
        success: false,
        data: null,
        message,
      };
    }
  },

  /**
   * Upload payment proof
   */
  async uploadPaymentProof(transactionId: string, file: File) {
    try {
      const formData = new FormData();
      formData.append("proofPaymentUrl", file);

      const response = await apiClient.put<TransactionDetailResponse>(
        `/transactions/${transactionId}/proof`,
        formData,
      );
      return {
        success: true,
        data: response.data.data,
        message: response.data.message,
      };
    } catch (error) {
      const message = getApiErrorMessage(error);
      return {
        success: false,
        data: null,
        message,
      };
    }
  },

  /**
   * Cancel transaction
   */
  async cancelTransaction(transactionId: string, reason?: string) {
    try {
      const response = await apiClient.put<TransactionDetailResponse>(
        `/transactions/${transactionId}/cancel`,
        { reason },
      );
      return {
        success: true,
        data: response.data.data,
        message: response.data.message,
      };
    } catch (error) {
      const message = getApiErrorMessage(error);
      return {
        success: false,
        data: null,
        message,
      };
    }
  },
};

export default transactionService;
