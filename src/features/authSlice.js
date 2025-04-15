import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



// Register user 
export const registerUser = createAsyncThunk("auth/registerUser", async (user, { rejectWithValue }) => {
  try {
    const response = await axios.post(`https://faq-backend-478w.onrender.com/api/auth/register`, user);
   
    localStorage.setItem("user", JSON.stringify(response.data));
    localStorage.setItem("isAuthenticated", "true");
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message || "Registration failed");
  }
});


export const loginUser = createAsyncThunk("auth/loginUser", async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`https://faq-backend-478w.onrender.com/api/auth/login`, { email, password });
    localStorage.setItem("user", JSON.stringify(response.data));
    localStorage.setItem("isAuthenticated", "true");
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data || "Login failed");
  }
});

export const verifyOTP = createAsyncThunk("auth/verifyOTP", async ({ email, otp }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`https://faq-backend-478w.onrender.com/api/auth/verify-otp`, { email, otp });
    return response.data.message;
  } catch (error) {
    return rejectWithValue(error.response.data.message || "OTP verification failed");
  }
});


export const resendOTP = createAsyncThunk("auth/resendOTP", async (email, { rejectWithValue }) => {
  try {
    const response = await axios.post(`https://faq-backend-478w.onrender.com/api/auth/register/resend-otp`, { email });
    return response.data.message;
  } catch (error) {
    return rejectWithValue(error.response.data.message || "Resend OTP failed");
  }
});

// Logout user
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("user");
  return null;
});

export const forgotPassword = createAsyncThunk("auth/forgotPassword", async (email, { rejectWithValue }) => {
  try {
    const response = await axios.post(`https://faq-backend-478w.onrender.com/api/auth/forgot-password`, { email });
    return response.data.message; // Expecting message like "OTP sent"
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to send OTP");
  }
});

export const resetPassword = createAsyncThunk("auth/resetPassword", async ({ email, newPassword }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`https://faq-backend-478w.onrender.com/api/auth/reset-password`, { email, newPassword });
    return response.data.message; // Expecting message like "Password reset successful"
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to reset password");
  }
});


const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        // Fix error message type
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else if (action.payload?.message) {
          state.error = action.payload.message;
        } else {
          state.error = "Login failed";
        }
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});

export default authSlice.reducer;
