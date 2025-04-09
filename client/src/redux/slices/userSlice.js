import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import CONFIG from '../config/Config';
const { BASE_URL } = CONFIG;

export const getUser = createAsyncThunk(
    'users/getUsers',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/user/get-users`)
            console.log(response);
            return response.data;

        } catch (error) {
            console.log(error)
        }
    }
)
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
    },
  });

  export default userSlice.reducer;