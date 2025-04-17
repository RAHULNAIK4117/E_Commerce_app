import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_BASE_URL}/api/carts/`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await api.post("add", { userId, productId, quantity });
      return response.data;
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data || error.message);
      // toast.error(error.response?.data?.message || "Failed to add to cart");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    item: [], // ✅ Always initialized as an empty array
  },
  reducers: {
    setItem: (state, action) => {
      state.item = action.payload || []; // ✅ Always ensure it's an array
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.fulfilled, (state, action) => {
        // console.log("Payload:", action.payload);

        if (action.payload && action.payload.data && action.payload.data.length > 0) {
          state.item = action.payload.data[0]?.products || []; // ✅ Ensures it's an array
        } else {
          toast.error("Unexpected response format");
          state.item = []; // ✅ Prevents undefined state
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        console.error("Add to cart failed:", action.payload);
      });
  },
});

export const { setItem } = cartSlice.actions;
export default cartSlice.reducer;
