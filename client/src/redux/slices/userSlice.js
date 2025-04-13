import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import CONFIG from '../config/Config';
const { BASE_URL } = CONFIG;


export const signUp = createAsyncThunk(
  'users/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/user/create-user`, userData);
      console.log('API Response:', response.data); // Log the full response
      return response.data; // This should be passed into action.payload
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Signup failed');
    }
  }
);



export const otpVerify = createAsyncThunk(
  'users/otpVerify',
  async (otpData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/user/verify-user`, otpData);
      console.log('res otp in slice', response.data);
      return response.data.user; // success response
    } catch (error) {
      return rejectWithValue(error.response?.data || 'OTP verification failed');
    }
  }
);


export const getUser = createAsyncThunk(
    'users/getUsers',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/user/get-users`)
            console.log('res of get user in slice',response.data.data.users[0]);
            return response.data.data.users[0];

        } catch (error) {
          return rejectWithValue(error.response?.data || 'get user failed');
        }
    }
)

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/user/delete-user/${userId}`);
      return userId; // Return the deleted user's ID so we can remove it from the state
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Delete failed');
    }
  }
);


const userSlice = createSlice({
    name: 'users',
    initialState: {
      users: null,
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: builder => {
      builder
        .addCase(getUser.pending, state => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getUser.fulfilled, (state, action) => {
          state.loading = false;
          state.users = action.payload;
        })
        .addCase(getUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(signUp.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(signUp.fulfilled, (state, action) => {
          state.loading = false;
          state.users = action.payload;
        })
        .addCase(signUp.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || 'Sign up failed';
        })
        .addCase(otpVerify.rejected, (state,action)=> {
          state.loading = false;
          state.users = null;
        })
        // .addCase(otpVerify.fulfilled, (state, action)=>{
        //   state.loading = false;
        //   state.users = action.payload
        // })
    },
  });

  export default userSlice.reducer;