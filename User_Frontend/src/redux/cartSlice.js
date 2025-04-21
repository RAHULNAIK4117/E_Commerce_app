import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_BASE_URL}/api/carts/`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Async thunk for adding to cart (with size support)
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity, size }, { rejectWithValue }) => {
    try {
      const response = await api.post("add", { userId, productId, quantity, size });
      return response.data;
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    item: [],
  },
  reducers: {
    setItem: (state, action) => {
      state.item = action.payload || [];
    },
    // Local cart logic if needed (e.g. offline use or frontend-only mode)
    addToCartLocal: (state, action) => {
      const { productId, quantity, size } = action.payload;
      const existingItem = state.item.find(
        (item) => item.productId === productId && item.size === size
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.item.push({
          productId,
          quantity,
          size,
          details,
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.fulfilled, (state, action) => {
        if (action.payload && action.payload.data && action.payload.data.length > 0) {
          state.item = action.payload.data[0]?.products || [];
        } else {
          toast.error("Unexpected response format");
          state.item = [];
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        console.error("Add to cart failed:", action.payload);
      });
  },
});

export const { setItem, addToCartLocal } = cartSlice.actions;
export default cartSlice.reducer;
