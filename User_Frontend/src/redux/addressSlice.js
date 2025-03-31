import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_BASE_URL}/api/addresses/`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const addAddress = createAsyncThunk(
  "addAddress",
  async (
    {
      user,
      fullName,
      email,
      phoneNumber,
      country,
      street,
      apartment,
      city,
      state,
      postcode,
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post("add", {
        user,
        fullName,
        email,
        phoneNumber,
        country,
        street,
        apartment,
        city,
        state,
        postcode,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAddress = createAsyncThunk(
  "fetchAddress",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await api.get(`get/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState: {
    address: {},
  },
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addAddress.fulfilled, (state, action) => {
        if (action.payload && action.payload.data) {
          // console.log("Full action object:", action); // Debugging: Log entire action object
          // console.log("Payload:", action.payload); // Ensure payload is logged

          // toast.success(action.payload.message);
          state.address = action.payload.data;
        } else {
          toast.error("Unexpected response format");
        }
      })
      .addCase(addAddress.rejected, (state, action) => {
        console.error("Add address failed:", action.payload);
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        // console.log("Full action object:", action); // Debugging: Log entire action object
        // console.log("Payload:", action.payload); // Ensure payload is logged
        if (action.payload && action.payload.data) {
          state.address = action.payload.data[0];
        } else {
          toast.error("Unexpected response format");
        }
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        console.error("Fetch address failed:", action.payload);
      });
  },
});

export const { setAddress } = addressSlice.actions;
export default addressSlice.reducer;
