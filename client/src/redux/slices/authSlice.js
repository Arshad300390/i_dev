// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import CONFIG from '../config/Config';
const { BASE_URL } = CONFIG;

export const signUp = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/user/create-user`, userData);
      console.log('authslice signup', response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Signup failed');
    }
  }
);

export const otpVerify = createAsyncThunk(
  'auth/otpVerify',
  async (otpData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/user/verify-user`, otpData);
      console.log('otp res in authslice', response.data.user)
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'OTP verification failed');
    }
  }
);

export const authUser = createAsyncThunk(
  'users/fetchuser',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/user/get-user/${userId}`);
      console.log('getuser by id', response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'failed getting users')
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
    verificaion: false
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(otpVerify.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(otpVerify.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(otpVerify.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
