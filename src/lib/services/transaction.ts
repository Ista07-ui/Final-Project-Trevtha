import axios from "axios";
import apiClient from "../api";

// Types untuk Transaction
export interface Transaction {
  id: string;
  userId: string;
  paymentMethodId: string;
  invoiceId?: string;
  status: "pending" | "success" | "failed" | "cancelled";
  totalAmount: number;
  proofPaymentUrl?: string | null;
  orderDate?: string;
  expiredDate?: string;
  createdAt: string;
  updatedAt: string;
  payment_method?: {
    id: string;
    name: string;
    virtual_account_number?: string;
    virtual_account_name?: string;
    imageUrl?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  transaction_items?: {
    id: string;
    transactionId: string;
    title: string;
    quantity: number;
    price: number;
    price_discount?: number;
    description?: string;
    imageUrls?: string[];
    createdAt?: string;
    updatedAt?: string;
  }[];
}

export interface TransactionRequest {
  cartIds?: string[];
  paymentMethodId: string;
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
  data?: Transaction;
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
      const response =
        await apiClient.get<TransactionListResponse>("/all-transactions");
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
   * Get logged user transactions
   */
  async getMyTransactions() {
    try {
      const response =
        await apiClient.get<TransactionListResponse>("/my-transactions");
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
   * Get transaction detail by ID
   */
  async getTransactionDetail(transactionId: string) {
    try {
      const response = await apiClient.get<TransactionDetailResponse>(
        `/transaction/${transactionId}`,
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
        "/create-transaction",
        payload,
      );

      const latestTransactions =
        await apiClient.get<TransactionListResponse>("/my-transactions");
      const latestTransaction = latestTransactions.data.data.at(-1) ?? null;

      return {
        success: true,
        data: latestTransaction,
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
      const response = await apiClient.post<TransactionDetailResponse>(
        `/update-transaction-status/${transactionId}`,
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
  async uploadPaymentProof(transactionId: string, proofPaymentUrl: string) {
    try {
      const response = await apiClient.post<TransactionDetailResponse>(
        `/update-transaction-proof-payment/${transactionId}`,
        { proofPaymentUrl },
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
      const response = await apiClient.post<TransactionDetailResponse>(
        `/cancel-transaction/${transactionId}`,
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
