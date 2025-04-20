import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import CONFIG from '../config/Config';
const { BASE_URL } = CONFIG;

export const getUserById = createAsyncThunk(
  'users/fetchuser',
  async(userId,{rejectWithValue})=>{
    try {
      const response = await axios.get(`${BASE_URL}/user/get-user/${userId}`);
      console.log('getuser by id')
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'failed getting users')
    }
  }
);



export const getUsers = createAsyncThunk(
  'users/getUsers',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/user/get-users`)
      console.log('res of get user in slice', response.data.data.users);
      return response.data.data.users;
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
      .addCase(getUsers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
  },
});

export default userSlice.reducer;