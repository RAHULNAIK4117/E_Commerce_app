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
  "addToCart",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await api.post("add", { userId, productId, quantity });
      // console.log("response", response.data);
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add to cart");
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
      state.item = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.fulfilled, (state, action) => {
        console.log("Full action object:", action); // Debugging: Log entire action object
        console.log("Payload:", action.payload); // Ensure payload is logged

        if (action.payload && action.payload.data) {
          toast.success(action.payload.message);
          state.item = action.payload.data[0].products;
        //   state.totalPrice = action.payload.data.totalPrice;
        } else {
          toast.error("Unexpected response format");
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        console.error("Add to cart failed:", action.payload);
      });
  },
});

export const { setItem } = cartSlice.actions;
export default cartSlice.reducer;
