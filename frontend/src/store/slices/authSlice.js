import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL for API requests
const API_URL = "http://localhost:5050/api/auth/";

// Get user from localStorage
const userFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

// Login user
export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}login`, userData);

      // Store user in localStorage
      localStorage.setItem("user", JSON.stringify(data));

      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return rejectWithValue(message);
    }
  }
);

// Register user
export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      // If registering as admin, use the admin endpoint
      const endpoint = userData.isAdmin ? "registerAdmin" : "register";

      // Remove isAdmin field before sending to API
      const { isAdmin, ...userDataToSend } = userData;
      console.log(isAdmin);

      const { data } = await axios.post(
        `${API_URL}${endpoint}`,
        userDataToSend
      );

      // Store user in localStorage
      localStorage.setItem("user", JSON.stringify(data));

      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return rejectWithValue(message);
    }
  }
);

// Logout user
export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("user");
});

const initialState = {
  user: userFromStorage,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Register cases
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Logout case
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { resetAuthError } = authSlice.actions;

export default authSlice.reducer;
