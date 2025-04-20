// messageSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import CONFIG from '../config/Config';
const { BASE_URL } = CONFIG;

export const sendMessage = createAsyncThunk(
  'messages/sendMessage',
  async ({ senderId, receiverId, message, createdAt }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/chat/saveMessage`, {
        senderId,
        receiverId,
        message,
        createdAt,
      });
      console.log('res of sendmessage', response.data)
      return response.data; // return saved message from backend
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Signup failed');
    }
  }
);

export const getMessages = createAsyncThunk(
  'messages/getMessagesBetweenUsers',
  async ({ senderId, receiverId }, { rejectWithValue }) => {
    try {
      const fullUrl = `${BASE_URL}/chat/getChat/${senderId}/${receiverId}`;
      console.log('🔍 Fetching messages from:', fullUrl);

      const res = await axios.get(fullUrl);
      return res.data.messages;
    } catch (error) {
        return rejectWithValue(error.response?.data || ' failed to fetch chat');
    }
  }
);


const messageSlice = createSlice({
  name: 'messages',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(sendMessage.pending, state => {
        state.loading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload); // optionally store sent message
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default messageSlice.reducer;
