import axios from "axios";
import apiClient from "../api";

// Types untuk Cart
export interface CartItem {
  id: string;
  activityId?: string;
  title: string;
  location: string;
  pricePerPerson: number;
  quantity: number;
  subtotal: number;
  imageUrl: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AddToCartRequest {
  activityId: string;
  quantity: number;
  pricePerPerson: number;
  title: string;
  location: string;
  imageUrl: string;
}

export interface UpdateCartRequest {
  quantity: number;
}

export interface CartResponse {
  code: string;
  status: string;
  message: string;
  data: CartItem[];
}

export interface CartItemResponse {
  code: string;
  status: string;
  message: string;
  data: CartItem;
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

// Cart Service - CRUD operation untuk shopping cart
export const cartService = {
  // Get semua cart items
  getCart: async (): Promise<CartItem[]> => {
    try {
      const response = await apiClient.get<CartResponse>("/carts");
      console.log(
        "✅ Cart fetched successfully:",
        response.data.data.length,
        "items",
      );
      return response.data.data;
    } catch (error: unknown) {
      console.error("❌ Failed to fetch cart:", getApiErrorMessage(error));
      return [];
    }
  },

  // Add item ke cart
  addToCart: async (request: AddToCartRequest): Promise<CartItem | null> => {
    try {
      const response = await apiClient.post<CartItemResponse>(
        "/carts",
        request,
      );
      console.log("✅ Item added to cart:", response.data.data.title);
      return response.data.data;
    } catch (error: unknown) {
      console.error("❌ Failed to add to cart:", getApiErrorMessage(error));
      return null;
    }
  },

  // Update quantity dari cart item
  updateCartItem: async (
    cartItemId: string,
    quantity: number,
  ): Promise<CartItem | null> => {
    try {
      const response = await apiClient.put<CartItemResponse>(
        `/carts/${cartItemId}`,
        {
          quantity,
        },
      );
      console.log(
        "✅ Cart item updated:",
        response.data.data.title,
        "Qty:",
        quantity,
      );
      return response.data.data;
    } catch (error: unknown) {
      console.error(
        "❌ Failed to update cart item:",
        getApiErrorMessage(error),
      );
      return null;
    }
  },

  // Remove item dari cart
  removeFromCart: async (cartItemId: string): Promise<boolean> => {
    try {
      await apiClient.delete(`/carts/${cartItemId}`);
      console.log("✅ Item removed from cart:", cartItemId);
      return true;
    } catch (error: unknown) {
      console.error(
        "❌ Failed to remove from cart:",
        getApiErrorMessage(error),
      );
      return false;
    }
  },

  // Clear all cart items
  clearCart: async (): Promise<boolean> => {
    try {
      await apiClient.delete("/carts");
      console.log("✅ Cart cleared successfully");
      return true;
    } catch (error: unknown) {
      console.error("❌ Failed to clear cart:", getApiErrorMessage(error));
      return false;
    }
  },

  // Calculate total from cart items
  calculateTotal: (items: CartItem[]): number => {
    return items.reduce((total, item) => total + item.subtotal, 0);
  },
};

export default cartService;
