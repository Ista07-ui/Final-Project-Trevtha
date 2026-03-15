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
  quantity?: number;
  pricePerPerson?: number;
  title?: string;
  location?: string;
  imageUrl?: string;
}

export interface UpdateCartRequest {
  quantity: number;
}

export interface CartResponse {
  code: string;
  status: string;
  message: string;
  data: CartApiItem[];
}

export interface CartItemResponse {
  code: string;
  status: string;
  message: string;
  data?: CartApiItem;
}

type CartApiItem = {
  id: string;
  activityId?: string;
  quantity?: number;
  activity?: {
    title?: string;
    imageUrls?: string[];
    price?: number;
    price_discount?: number;
    address?: string;
    city?: string;
    province?: string;
  };
};

const buildActivityLocation = (activity: CartApiItem["activity"]): string => {
  if (!activity) {
    return "-";
  }

  const cityProvince = [activity.city, activity.province]
    .filter(Boolean)
    .join(", ");

  return cityProvince || activity.address || "-";
};

const getEffectivePrice = (activity: CartApiItem["activity"]): number => {
  const fullPrice = activity?.price ?? 0;
  const discountedPrice = activity?.price_discount ?? 0;

  if (discountedPrice > 0 && discountedPrice < fullPrice) {
    return discountedPrice;
  }

  return fullPrice;
};

const normalizeCartItem = (item: CartApiItem): CartItem => {
  const quantity = item.quantity ?? 1;
  const pricePerPerson = getEffectivePrice(item.activity);

  return {
    id: item.id,
    activityId: item.activityId,
    title: item.activity?.title || "Untitled Activity",
    location: buildActivityLocation(item.activity),
    pricePerPerson,
    quantity,
    subtotal: pricePerPerson * quantity,
    imageUrl:
      item.activity?.imageUrls?.[0] ||
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  };
};

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
      const normalized = response.data.data.map(normalizeCartItem);
      console.log(
        "✅ Cart fetched successfully:",
        normalized.length,
        "items",
      );
      return normalized;
    } catch (error: unknown) {
      console.error("❌ Failed to fetch cart:", getApiErrorMessage(error));
      return [];
    }
  },

  // Add item ke cart
  addToCart: async (request: AddToCartRequest): Promise<CartItem | null> => {
    try {
      const response = await apiClient.post<CartItemResponse>(
        "/add-cart",
        {
          activityId: request.activityId,
          ...(request.quantity ? { quantity: request.quantity } : {}),
        },
      );

      if (response.data.data) {
        const normalized = normalizeCartItem(response.data.data);
        console.log("✅ Item added to cart:", normalized.title);
        return normalized;
      }

      const refreshedItems = await cartService.getCart();
      const lastItem =
        refreshedItems.find((item) => item.activityId === request.activityId) ||
        refreshedItems.at(-1) ||
        null;
      console.log("✅ Item added to cart and refreshed");
      return lastItem;
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
      const response = await apiClient.post<CartItemResponse>(
        `/update-cart/${cartItemId}`,
        {
          quantity,
        },
      );

      if (response.data.data) {
        const normalized = normalizeCartItem(response.data.data);
        console.log("✅ Cart item updated:", normalized.title, "Qty:", quantity);
        return normalized;
      }

      const refreshedItems = await cartService.getCart();
      const updatedItem = refreshedItems.find((item) => item.id === cartItemId) || null;
      console.log("✅ Cart item updated and refreshed. Qty:", quantity);
      return updatedItem;
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
      await apiClient.delete(`/delete-cart/${cartItemId}`);
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
      const items = await cartService.getCart();
      await Promise.all(
        items.map((item) => apiClient.delete(`/delete-cart/${item.id}`)),
      );
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
